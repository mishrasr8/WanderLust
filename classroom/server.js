const express=require("express");
const app=express();
const session= require("express-session");
const flash=require("connect-flash")
const path=require("path");

const sessionOptions={
    secret:"mysupersecretkey",
    resave:false,
    saveUninitialized:true
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    if (name=="anonymous"){
        req.flash("Error","user not registered");
    }else{
        req.flash("success", "user registered successfully!");

    }
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    res.render("page.ejs",{name: req.session.name});
})


app.get("/",(req,res)=>{
    res.send("Hi,I'm root!")
})


app.listen(3000, ()=>{
    console.log("Server is listening to port 3000")
})