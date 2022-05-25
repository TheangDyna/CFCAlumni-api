const db = require('./../models');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const getUsers = async(req,res)=>{
    try{
        const data = await db.users.find();
        res.status(200).send({
            data:data,
            count:data.length,
            message:'success',
            statusCode:200,
        })
    }catch(error){
        res.status(500).send({
            error:error,
            statusCode:500
        })
    }
};
const createUsers =async(req,res)=>{
    const body =req.body;
    if(Object.keys(body).length==0 ) {
        return res.status(400).send({
            message:"cannot empty body",
            statusCode: 400,
        })
    }

    try{
        const newUser = new db.users({
            profileName:body.profileName,
            fristName:body.fristName,
            lastName:body.lastName,
            gender:body.gender,
            birthdate:body.birthdate,
            email:body.email,
            password:bcrypt.hashSync(body.password, 8),
            contact:body.contact,
            grade:body.grade,
            status:body.status,
            bio:body.bio,
            role:body.role,
        })
        const user = await db.users.findOne({email:body.email})
        if(user){
            return res.status(400).send({message:"Failed!. This email already in use."})
        }

        if (!isEmail(body.email)){
            return res.status(400).send({ message: "Unvalid email format"});
        }
        if (body.password.length<6){
            return res.status(400).send({ message: "password atleast 6 digits "});
        }
        const data = await newUser.save();
        res.status(200).send({
            // 201 create
            statusCode:201,
            data:data,
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({message: "Internal server Error"});
    }
 }

const signin = async(req,res)=>{
    const body =req.body;

    if(Object.keys(body).length==0 ) {
        return res.status(400).send({
            message:"cannot empty body",
            statusCode: 400,
        })
    }
    try{
        const user = await db.users.findOne({email:body.email})
        if(!user){
            return res.status(401).send({
                statusCode:401,
                message:"No User , Please SignUp an account"
            })
        }
        const match = bcrypt.compareSync(body.password,user.password)
        if(!match) {
            return res.status(401).send({
                statusCode:401,
                message:"Wrong Password"
            })
        }
        const token = jwt.sign({usersId: user._id},"cfc-api-alumni",{
            expiresIn: "24h"
        })
        console.log({usersId: user._id})
        console.log(token)
        res.status(200).send({user , token})

    }catch(error){
        console.log(error);
        return res.status(500).send({message: "Internal server Error"});
    }
}
const deleteUsers = async (req,res)=>{
    const {usersId} = req.params;
    try {
     const data =  await db.users.findByIdAndDelete(usersId)
     if(!data) return res.status(404).send({
        message:`Not Found Id :  ${usersId}`,
        statusCode:404
     })
        res.status(200).send({
            data:data,
            message:`Delete User : ${usersId}`,
            statusCode:500,
        })
    }catch (error) {
        console.log(error);
        return res.status(500).send({message: "Internal server Error"});
    }
}
const updateUsers = async(req,res)=>{
    const {usersId} = req.params;
    const body = req.body;
    try {
        const data = await db.users.findByIdAndUpdate(usersId,body)
      if(!data) return res.status(404).send({
        message:`Not Found Id :  ${usersId}`,
        statusCode:404
     })
     //update email
     if (!isEmail(body.email)){
        return res.status(400).send({ message: "Unvalid email format"});
    }
    
        res.status(200).send({
            data:data,
            message:`Updata User Id : ${usersId}`,
            statusCode:200,
        })     
    }
    catch (error) {
    console.log(error);
    res.status(500).send({
        message: "Internal server Error",
        statusCode:500
    })
}
}
module.exports ={
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers,
    signin,

}