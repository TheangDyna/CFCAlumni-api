const { status } = require('express/lib/response');
const db = require('./../models')
const getStorys = async(req,res)=>{
    try{
        const data = await db.storys.find();
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
const createStorys =async(req,res)=>{
    const body =req.body;
    if(Object.keys(body).length==0 ) {
        return res.status(400).send({
            message:"cannot empty body",
            statusCode: 400,
        })
    }
    const newStory = new db.storys({
        coverName:body.coverName,
        title:body.title,
        description:body.description,
        react:body.react,
        comment:body.comment,
        share:body.share,
        createBy:body.createBy
    })
    try{
        const data = await newStory.save();
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
const deleteStorys = async(req,res)=>{
    const {storyId} = req.params;
    try {
     const data =  await db.storys.findByIdAndDelete(storyId)
     if(!data) return res.status(404).send({
        message:`Not Found Id :  ${storyId}`,
        statusCode:404
     })
        res.status(200).send({
            data:data,
            message:`Delete Story : ${storyId}`,
            statusCode:200,
        })
    }catch (error) {
        res.status(500).send({
            error:error.message,
            statusCode:500
        })
    }
}
const updateStorys = async(req,res)=>{
    const {storyId} = req.params;
    const body = req.body;
    try {
        const data = await db.storys.findByIdAndUpdate(storyId,body)
      if(!data) return res.status(404).send({
        message:`Not Found Id :  ${storyId}`,
        statusCode:404
     })
        res.status(200).send({
            data:data,
            message:`Updata Story Id : ${storyId}`,
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
    getStorys,
    createStorys,
    deleteStorys,
    updateStorys,
}