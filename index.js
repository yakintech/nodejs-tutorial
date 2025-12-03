const express = require('express');
const morgan = require('morgan');
const limiter = require('express-rate-limit');
const helmet = require('helmet');
const app = express();
const PORT = 3000;

const jwt = require('jsonwebtoken');

const routes = require('./src/routes/index');
const connectDB = require('./src/config/db');

app.use(express.json());
app.use(limiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
}));
app.use(morgan('dev'));
app.use(helmet());

connectDB();




const secretKey = "loremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitamet";

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




app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "123") {

        const token = jwt.sign(
            { name: username, country: "Türkiye" },
            secretKey,
            {
                expiresIn: "1h",
                algorithm: "HS256"
            }
        );
        return res.json({ token });
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

