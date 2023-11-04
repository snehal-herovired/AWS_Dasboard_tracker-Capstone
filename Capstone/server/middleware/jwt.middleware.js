const jwt = require('jsonwebtoken');
const userModel = require('../models/userAuth.model')

const jwtVerify = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            console.log(`Unauthorized: No token provided. ${req.url}`);
            return res.status(400).json({
                message: `Unauthorized to access`
            })
        }
        if (req.headers && req.headers.authorization) {
            let beararToken = req.headers.authorization;
             token = beararToken.split(' ')[1];

            const decoded = jwt.verify(token, process.env.SCRETE_KEY);
            if (!decoded) {
                
                return res.status(400).send('Unauthorized request')
            }

            req.user = decoded;

            next();
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: `Something went wrong ${error.message}`
        })
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById( req.user.id )

        // console.log(user,"isAdmin user");
        if(user.role !=="1")
        {
             console.log(user,"User is not admin");
             return res.status(400).json({
                message: "user is not admin"
            });
        }
        else{ next();}
   } catch (error) {
    console.log(error);
    return res.status(500).json({
        message: `Something went wrong -- ${error}`
    })
}
}

module.exports = { jwtVerify, isAdmin }