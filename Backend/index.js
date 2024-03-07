
const dotenv= require('dotenv');
dotenv.config({path:'./.env'});
const mongoose= require('mongoose');
const express = require("express");
const app = express();
const cors= require('cors');
const limiter= require('express-rate-limit');
const helmet= require('helmet');
const hpp= require('hpp');
const xss= require('xss-req-sanitizer');
const sanitize= require('express-mongo-sanitize');
const morgan = require("morgan");
const customeError = require("./utlility/customerror");
const globalErrorhandler= require('./controller/errorHandler');
const mainroute = require("./route/mainroute");
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('Uncaught Exception occured! Shutting down...');
    process.exit(1);
 });
mongoose.connect(process.env.CONN_STR).then((conn)=>{
    console.log('database connected');
});
PORT= process.env.PORT;
app.listen(PORT,(req,res)=>{
    console.log('server connected');
});
app.use(helmet());
const limit= limiter({
    max:1000,
    windowMs:60*10*1000,
    message:'too many requests from the same ip address try again after sometimer....'
});
app.use('/user',limit);
app.use(cors());
app.use(express.json({limit:50000000}));
app.use(hpp({whitelist:['price','duration','releaseYear','ratings','totalRating','genres','totalhoures']}));
app.use(sanitize());
app.use(xss());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use("/",mainroute);
app.all('*',(req,res,next)=>{
    const err = new customeError(`the requested url ${req.originalUrl} not found`,404)
    next(err);
})
app.use(globalErrorhandler);
app.use(express.static("./static"));

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('Unhandled rejection occured! Shutting down...');
 
    server.close(() => {
     process.exit(1);
    })
 });

 module.exports=app;