const { status } = require('express/lib/response');
const db = require('./../models')
const getEvents = async(req,res)=>{
    try{
        const data = await db.events.find();
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
const createEvents =async(req,res)=>{
    const body =req.body;
    if(Object.keys(body).length==0 ) {
        return res.status(400).send({
            message:"cannot empty body",
            statusCode: 400,
        })
    }
    const newEvent = new db.events({
        coverName:body.coverName,
        title:body.title,
        description:body.description,
        category:body.category,
        react:body.react,
        comment:body.comment,
        share:body.share,
        createBy:body.createBy,
        member:body.member,
    })
    try{
        const data = await newEvent.save();
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
const deleteEvents = async(req,res)=>{
    const {eventId} = req.params;
    try {
     const data =  await db.events.findByIdAndDelete(eventId)
     if(!data) return res.status(404).send({
        message:`Not Found Id :  ${eventId}`,
        statusCode:404
     })
        res.status(200).send({
            data:data,
            message:`Delete Events : ${eventId}`,
            statusCode:200,
        })
    }catch (error) {
        res.status(500).send({
            error:error.message,
            statusCode:500
        })
    }
}
const updateEvents = async(req,res)=>{
    const {eventId} = req.params;
    const body = req.body;
    try {
        const data = await db.events.findByIdAndUpdate(eventId,body)
      if(!data) return res.status(404).send({
        message:`Not Found Id :  ${eventId}`,
        statusCode:404
     })
        res.status(200).send({
            data:data,
            message:`Updata Events Id : ${eventId}`,
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


module.exports ={
    getEvents,
    createEvents,
    deleteEvents,
    updateEvents,
}