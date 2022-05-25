const jwt = require("jsonwebtoken")
const db = require('./../models');
const verifyToken = async(req,res,next) => {
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(401).send({message: "Unauthorized, No Token"})
    }
    jwt.verify(token, "cfc-api-alumni",(err , decoded)=>{
        if(err) {
            return res.status(401).send({message: "Unauthorized, No Token"})
        }
        console.log(decoded);
        req.usersId = decoded.usersId;
        next()
    })
}
const isAdmin = async (req,res,next) =>{
    const usersId= req.usersId

    try{
        const user = await db.users.findById(usersId);
        if (!user) {
            return res.status(404).send({message: "No User found"});
        }
        if (user.role != "admin") {
            return res.status(400).send({message: "you are not admin role"});
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(500).send({message: "Internal server Error"});
    }
}
const isTeacher = async (req,res,next) =>{
    const usersId= req.usersId

    try{
        const user = await db.users.findById(usersId);
        if (!user) {
            return res.status(404).send({message: "No User found"});
        }
        if (user.role != "teacher") {
            return res.status(400).send({message: "you are not teacher role"});
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(500).send({message: "Internal server Error"});
    }
}

module.exports ={
    verifyToken,
    isAdmin,
    isTeacher,
}