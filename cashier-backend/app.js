//require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

const config = require("./config/config");
const globalErrorHandler = require('./middlewares/globalErrorHandler');
//const createHttpError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();

const connectCloudinary = require('./config/cloudinary');

require('colors')

//const PORT = process.env.PORT;
const PORT = config.port || 10000;
// const PORT = process.env.PORT || 10000; 
connectDB();
connectCloudinary();

// Configure CORS properly
const corsOptions = {
  origin: 'https://cashier-1-tzon.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));  // Enable preflight for all routes




app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://cashier-1-tzon.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
 
//Middleware Parse incoming request in json format and cookie parser for cookies and token 
app.use(express.json()); 
// to activate middleware (cookieParser)
app.use(cookieParser());


// endPoint Route
app.get('/', (req, res) => {
    //const err = createHttpError(404, "something went wrong!");
    //throw err;
    res.json({message: 'Hellow from POS Server'})
}) 


app.use('/api/user', require('./routes/userRoute'));
app.use('/api/order', require('./routes/orderRoute'));
app.use('/api/table', require('./routes/tableRoute'));

app.use('/api/category', require('./routes/categoryRoute'));
app.use('/api/services', require('./routes/serviceRoute'));

app.use('/api/transactions', require('./routes/transactionRoute'));
app.use('/api/customers', require('./routes/customerRoute'));
app.use('/api/units', require('./routes/unitRoute'));



// global Error Handler 
app.use(globalErrorHandler)



app.listen(PORT, () => {
    console.log(`POS server is listening on port ${PORT}` .bgCyan); 
})
