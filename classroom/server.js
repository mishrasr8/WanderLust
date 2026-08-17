const express=require("express");
const app=express();


app.get("/",(req,res)=>{
    res.send("Hi,I'm root!")
})


app.listen(3000, ()=>{
    console.log("Server is listening to port 3000")
})