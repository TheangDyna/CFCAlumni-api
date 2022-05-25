const express = require('express');
const connectDb =require('./connectDb');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
//connectDb
connectDb()



//user routes
require("./routes/users.routes")(app)
//News Routes
require("./routes/news.routes")(app)
//Events Routes
require("./routes/events.routes")(app)
//Status Routes
require("./routes/statuss.routes")(app)
//Story Routes
require("./routes/storys.routes")(app)
//students Routes
require("./routes/students.routes")(app)




// app.get("/" ,async(req,res)=>{
//   const data = await db.users.find()
//   res.status(200).send({data:data})
// })

app.get('/user', (req, res) => {
  res.status(200).send({
    message:{
      date:['SAREN', 'DYNA','PINA','STRYDATH','BOTH'],
      className:"CFC-G1-ExpressJS&MongoDB",
      amount:7,
    }
  })
})
app.get('/student/:id/name/:name', (req , res)=>{
  const id = req.params.id;
  const name = req.params.name;
  res.status(200).send({message:`student id :${id} , Student Name :${name}`})
})
app.get("/students", (req,res)=>{
  const query = req.query
  res.status(200).send({message:query})
})
app.post('/students', (req,res)=>{
  const body = req.body
  res.status(200).send({message:body})
})
app.get("*", (req,res)=>{
  res.send({message: "Not Founed Route"})
})

app.listen(port, () => {
  console.log(`server is start http://localhost:${port}`)
})

