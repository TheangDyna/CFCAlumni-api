const res = require('express/lib/response');
const { status } = require('express/lib/response');
const db = require('./../models')
const getStatuss = async(req,res)=>{
    try{
        const data = await db.statuss.find();
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
const createStatuss =async(req,res)=>{
    const body =req.body;
    if(Object.keys(body).length==0 ) {
        return res.status(400).send({
            message:"cannot empty body",
            statusCode: 400,
        })
    }
    const newStatus = new db.statuss({
        major:body.major,
        job:body.job,
        address:body.address,
        desciption:body.desciption,
    })
    try{
        const data = await newStatus.save();
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
const deleteStatus = async (req,res)=>{
    const {statusId} = req.params;
    try {
     const data =  await db.statuss.findByIdAndDelete(statusId)
     if(!data) return res.status(404).send({
        message:`Not Found Id :  ${statusId}`,
        statusCode:404
     })
        res.status(200).send({
            data:data,
            message:`Delete Status : ${statusId}`,
            statusCode:500,
        })
    }catch (error) {
        res.status(500).send({
            error:error.message,
            statusCode:500
        })
    }
}
const updateStatus = async(req,res)=>{
    const {statusId} = req.params;
    const body = req.body;
    try {
        const dataStatus = await db.statuss.findByIdAndUpdate(statusId,body)
      if(!dataStatus) return res.status(404).send({
        message:`Not Found Id :  ${statusId}`,
        statusCode:404
     })
        res.status(200).send({
            data:dataStatus,
            message:`Updata Status Id : ${statusId}`,
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
    getStatuss,
    createStatuss,
    deleteStatus,
    updateStatus,
}