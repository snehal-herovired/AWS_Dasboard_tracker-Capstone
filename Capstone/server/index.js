const express= require('express');
const mongoose= require('mongoose');
const morgan= require('morgan');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();
const Port= process.env.Port;
AWS.config.update({
    accessKeyId: process.env.Access_key,
    secretAccessKey: process.env.Secret_access_key,
    region: process.env.REGION,
  });
  

//connect with mongoose, by making it Async
const dbConnect= require('./connection');
dbConnect();
app.use(express.json());
app.use(morgan());

const ActivityRouter= require('./routes/activity.routes');
app.use('/activity', ActivityRouter);



app.listen(Port, () =>{
    console.log(`Server running on port ${Port}`);
});