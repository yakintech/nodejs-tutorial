const express = require('express');
const morgan = require('morgan');
const limiter = require('express-rate-limit');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const app = express();
const PORT = 3000;

const jwt = require('jsonwebtoken');

const routes = require('./src/routes/index');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const RefreshToken = require('./src/models/RefreshToken');

app.use(express.json());
app.use(limiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
}));
app.use(morgan('dev'));
app.use(helmet());

connectDB();




const secretKey = process.env.SECRET_KEY

app.use((req, res, next) => {
    if (req.path === "/login" || req.path.startsWith("/api/categories")) {
        return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
});

app.use('/api', routes);



app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    let user = await User.findOne({ userName: username });

    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user._id, userName: user.userName },
        secretKey,
        { expiresIn: "1h" }
    );


    let refreshTokenData = uuidv4()

    const refreshToken = new RefreshToken({
        token: refreshTokenData,
        userId: user._id,
    });

    await refreshToken.save()

    res.json({ token, refreshTokenData });
})



//eğer accesstoken süresi dolduysa refresh token ile yeni token al
app.post("/token", async (req, res) => {
    const { refreshToken } = req.body;

    let storedToken = await RefreshToken.findOne({ token: refreshToken });

    if (!storedToken) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }

    //expire date check
    if (storedToken.expiresAt < Date.now()) {
        return res.status(401).json({ message: "Refresh token expired" });
    }

    const user = await User.findById(storedToken.userId);

    const newToken = jwt.sign(
        { id: user._id, userName: user.userName },
        secretKey,
        { expiresIn: "1h" }
    );

    


    // let refreshTokenData = uuidv4()

    // const refreshToken2 = new RefreshToken({
    //     token: refreshTokenData,
    //     userId: user._id,
    // });

    // await refreshToken2.save()

    res.json({ token: newToken });
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

