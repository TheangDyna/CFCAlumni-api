const db = require('./../models');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const getStudents = async(req,res)=>{
    try{
        const data = await db.students.find();
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
const createStudents =async(req,res)=>{
    const body =req.body;
    if(Object.keys(body).length==0 ) {
        return res.status(400).send({
            message:"cannot empty body",
            statusCode: 400,
        })
    }

    try{
        const newStudent = new db.students({
            name:body.name,
            email:body.email,
            password:bcrypt.hashSync(body.password, 8),
            role:body.role
    
        })
        const student = await db.students.findOne({email:body.email})
        if(student){
            return res.status(400).send({message:"Failed!. This email already in use."})
        }

        if (!isEmail(body.email)){
            return res.status(400).send({ message: "Unvalid email format"});
        }
        if (body.password.length<6){
            return res.status(400).send({ message: "password atleast 6 digits "});
        }
        const data = await newStudent.save();
        res.status(200).send({
            // 201 create
            statusCode:201,
            data:data,
        })
    }catch(error){
        res.status(500).send({
            statusCode:500,
            error:error.message,
        });
        throw error;
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
        const student = await db.students.findOne({email:body.email})
        if(!student){
            return res.status(401).send({
                statusCode:401,
                message:"No User , Please SignUp an account"
            })
        }
        const match = bcrypt.compareSync(body.password,student.password)
        if(!match) {
            return res.status(401).send({
                statusCode:401,
                message:"Wrong Password"
            })
        }
        const token = jwt.sign({studentId: student._id},"cfc-student",{
            expiresIn: "24h"
        })
        console.log({studentId:student._id})
        res.status(200).send({student , token})

    }catch(error){
        res.status(500).send({
            statusCode:500,
            error:error.message,
        });
        throw error;
    }

}
const deleteStudents = async(req,res)=>{
    const {studentId} = req.params;
    try {
     const data =  await db.students.findByIdAndDelete(studentId)
     if(!data) return res.status(404).send({
        message:`Not Found Id :  ${studentId}`,
        statusCode:404
     })
        res.status(200).send({
            data:data,
            message:`Delete Student Id : ${studentId}`,
            statusCode:200,
        })
    }catch (error) {
        res.status(500).send({
            error:error.message,
            statusCode:500
        })
    }
}
const updateStudents = async(req,res)=>{
    const {studentId} = req.params;
    const body = req.body;
    try {
        const data = await db.students.findByIdAndUpdate(studentId,body)
      if(!data) return res.status(404).send({
        message:`Not Found Id :  ${studentId}`,
        statusCode:404
     })
        res.status(200).send({
            data:data,
            message:`Updata student Id : ${studentId}`,
            statusCode:200,
        })     
    }
    catch (error) {
    res.status(500).send({
        error:error.message,
        statusCode:500
    })
}
}
module.exports={
    getStudents,
    createStudents,
    updateStudents,
    deleteStudents,
    signin,
}