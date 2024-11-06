const express=require('express')
const app=express();
const mongoose=require('mongoose')
const path = require('path')
const dirpath=path.join(__dirname,'index.html')


app.use(express.static(__dirname)); 
app.get('/',(req,resp)=>{
    resp.sendFile(`${dirpath}`)
})



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/students');
const db =mongoose.connection
db.once('open',()=>{
    console.log("mongodb connection successful")
})

const userSchema=new mongoose.Schema({
    regd_no:String,
    name:String,
    email:String,
    branch:String
})
const users=mongoose.model('datas',userSchema);

app.use(express.urlencoded({extended:true}))
app.post('/post',async(req,resp)=>{
    const {regd_no,name,email,branch}=req.body;
    const user=new users({
        regd_no,
        name,
        email,
        branch
    })
    await user.save();
    console.log("users: " +user)
    console.log(req.body);
    resp.send("form submission successfully")
})

app.listen(5000,()=>{
    console.log("successfully running")
})