const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./configs/db');

// Dotenv Config
dotenv.config();

// Db Connection
connectDb();

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ROUTES
app.use('/api/v1/auth', require('./routes/auth.route'));
app.use('/api/v1/user', require('./routes/user.route'));

app.get('/', (req, res) => {
    return res.status(200).send("Hello world!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,"0.0.0.0", () => console.log(`Server is running on port ${PORT}`.white.bgBlue));