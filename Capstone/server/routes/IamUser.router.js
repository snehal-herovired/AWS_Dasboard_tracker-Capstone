// - `GET /api/users`: Retrieve a list of IAM users in the AWS account.
// - `GET /api/users/{userId}`: Retrieve detailed information about a specific IAM user.
// - `GET /api/roles`: Retrieve a list of IAM roles in the AWS account.
// - `GET /api/roles/{roleId}`: Retrieve detailed information about a specific IAM role.


const express = require('express')
const UserRouter = express.Router();
const {getAllIamUser,getUserById,getAllRole,getSpecificRole}= require('../controllers/iamUser.controller')


// Retrieve a list of IAM users in the AWS account.
UserRouter.get('/api/users',getAllIamUser)

//Retrieve detailed information about a specific IAM user.
UserRouter.get('/api/users/:userId',getUserById)

// Retrieve a list of IAM roles in the AWS account.
UserRouter.get('/api/roles',getAllRole)


// Retrieve detailed information about a specific IAM role.
UserRouter.get('/api/roles/:roleId',getSpecificRole)


module.exports = UserRouter