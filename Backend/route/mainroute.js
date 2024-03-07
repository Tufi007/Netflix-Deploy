
const mainroute= require('express').Router();
const authrouter= require('./authrouter');
const router= require('./urlroute');
mainroute.use("/",router);
mainroute.use("/user",authrouter);
module.exports=mainroute;