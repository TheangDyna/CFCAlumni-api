const { status } = require('express/lib/response');
const db = require('./../models')
const getNews = async(req,res)=>{
    try{
        const data = await db.news.find();
        res.status(200).send({
            data:data,
            count:data.length,
            message:'success',
            statusCode:200,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            message: "Internal server Error",
            statusCode:500
        })
    }
};
const createNews =async(req,res)=>{
    const body =req.body;
    console.log(body)
    try{
        if(Object.keys(body).length==0 ) {
            return res.status(400).send({
                message:"cannot empty body",
                statusCode: 400,
            })
        }
        const newNews = new db.news({
            coverName:body.coverName,
            title:body.title,
            description:body.description,
            category:body.category,
            react:body.react,
            comment:body.comment,
            share:body.share,
            createBy:body.createBy
        })
        const data = await newNews.save();
        console.log(error);
        res.status(500).send({
            message: "Internal server Error",
            statusCode:500
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            message: "Internal server Error",
            statusCode:500
        })
        throw error;
    }
}
const deleteNews = async(req,res)=>{
    const {newsId} = req.params;
    try {
     const data =  await db.news.findByIdAndDelete(newsId)
     if(!data) return res.status(404).send({
        message:`Not Found Id :  ${newsId}`,
        statusCode:404
     })
        res.status(200).send({
            data:data,
            message:`Delete News : ${newsId}`,
            statusCode:200,
        })
    }catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal server Error",
            statusCode:500
        })
    }
}
const updateNews = async(req,res)=>{
    const {newsId} = req.params;
    const body = req.body;
    try {
        const data = await db.news.findByIdAndUpdate(newsId,body)
      if(!data) return res.status(404).send({
        message:`Not News Id :  ${newsId}`,
        statusCode:404
     })
        res.status(200).send({
            data:data,
            message:`Updata News Id : ${newsId}`,
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
    getNews,
    createNews,
    deleteNews,
    updateNews,
}