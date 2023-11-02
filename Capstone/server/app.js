const express= require('express');
const mongoose= require('mongoose');
const morgan= require('morgan')
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();
const Port= process.env.PORT;

AWS.config.update({
    accessKeyId:  process.env.Access_key,
    secretAccessKey: process.env.Secret_access_key,
    region: process.env.REGION,
  });

const ActivityRouter= require('./routes/costRoutes')
app.use('/activity', ActivityRouter)
app.listen(Port, (error)=>{
    console.log(`Server running on port ${Port}`, error);
})