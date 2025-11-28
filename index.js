const express = require('express');
const morgan = require('morgan');
const limiter = require('express-rate-limit');
const helmet = require('helmet');
const app = express();
const PORT = 3000;

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


app.use('/api', routes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

