const express= require('express')
const app = express();
const cors = require('cors');
app.use(cors())
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

//AUTHENTICATION AND AUTHRORIZATION
const UserAuth = require('./routes/UserAuth.router')
app.use('/authentication',UserAuth);


//Cost Optimization
const costController = require('./routes/costOptimization.route')
app.use('/cost',costController)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);

})