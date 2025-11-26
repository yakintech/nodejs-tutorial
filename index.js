const express = require('express');
const app = express();
const PORT = 3000;

const routes = require('./src/routes/index');
const connectDB = require('./src/config/db');
const validationErrorHandler = require('./src/middleware/validationErrorHandler');

connectDB();

app.use('/api', routes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

