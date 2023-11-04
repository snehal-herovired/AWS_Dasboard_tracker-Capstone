const { JsonWebTokenError } = require('jsonwebtoken');
const userModel = require('../models/userAuth.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { json } = require('express');
 const salt = bcrypt.genSaltSync(6);


const register = async (req, res) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    try {
        const { name, lastname, contact, email, password } = req.body;
      
        if (name == '' || lastname == '' || contact == '' || email == '' || password == '') {
            res.status(400).json({
                message: 'Please fill all the fields'
            })
        }

        console.log(email,"*********");
        if (!email.match(emailRegex)) {

            return res.status(400).json({
                message:'Email format is wrong'
            })
        }

        //checking if user exists
        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'User Already Exists',
                user
            })
        }

        const registeredUser = await userModel.create({
            name:name,
            lastname:lastname,
            contact:contact,
            email:email,
            password:bcrypt.hashSync(password,salt),
            role:'0'
        })

        console.log(registeredUser._id);
        const token=  jwt.sign({id:registeredUser._id},process.env.SCRETE_KEY,{  expiresIn:'2h'})
            // console.log(token);
            res.status(200).json({
                success: true,
                message:"User registered successfully",
                user:registeredUser,
                token
            })

    } catch (error) {
        console.log(error);
    }
}


const login = async (req,res) =>{
   
    const emailRegex =/^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        try {
            
            const {email,password}=req.body;
       
            if(email == '' || password == ''){
                return res.status(400).json({
                    status:false,
                    message:"Field should not empty"
                })
            }

       
            if(!email.match(emailRegex)){
                return res.status(400).json({
                    status:false,
                    message:"Email format is wrong"
                })  
            }
            //checking if user exisits
            const isUser = await userModel.find({email});
            if(isUser.length == 0){
                return res.status(400).json({
                    message:'User dose not exist,Please register'
                })
            }

            if(isUser.length>0 && isUser[0].password){
                if(await bcrypt.compare(password,isUser[0].password)){
                    const token = jwt.sign({id:isUser[0]._id},process.env.SCRETE_KEY,{
                        expiresIn:'7d'
                    })

                    res.status(200).json({
                        message:'Login Successfull',
                        user:isUser,
                        token  
                    })

                }
                else{
                    return res.status(400).json({
                        message:'Password is incorect'
                    })
                }
            }
            else{
                return res.status(400).json({
                    message:'Password is incorect'
                })
            }


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message:`Something went wrong ${error.message}`
            })
        }
 }

 const logout = async (req,res)=>{


 }


module.exports = {register,login,logout}