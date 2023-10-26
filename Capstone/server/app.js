const express= require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(express.json());
const PORT = process.env.PORT

const dbConnection = require('./connection')
dbConnection();

//AWS SDK** checking credentials correct or Not




//Configure AWS SDK with your AWS credentials
var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.Access_key,
  secretAccessKey: process.env.Secret_access_key,
  region: process.env.REGION
});

//IAM ROUTER
const IamUserRouter =require('./routes/IamUser.router')
app.use('/iamUser',IamUserRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})