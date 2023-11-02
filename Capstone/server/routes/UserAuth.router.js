// Authentication and Authorization API Endpoints:

//    - `POST /api/auth/login`: Authenticate a user and generate a token.
//    - `GET /api/auth/logout`: Log out a user and invalidate their token.
//    - `GET /api/auth/me`: Get information about the currently authenticated user.

const express = require('express');
const UserAuthRouter = express.Router();
const {jwtVerify,isAdmin} = require('../middleware/jwt.middleware')
const {register,login,logout}=require('../controllers/userAuth.controller');

// Register the user/admin 
UserAuthRouter.post('/api/auth/register',register);

//  - `POST /api/auth/login`: Authenticate a user and generate a token.
UserAuthRouter.post('/api/auth/login',login);



module.exports = UserAuthRouter;