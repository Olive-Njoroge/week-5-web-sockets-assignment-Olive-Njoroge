const dotenv = require('dotenv');
const connectDB = require('./config/db')
dotenv.config();
connectDB();