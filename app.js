const express=require("express");
require("dotenv").config();
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const ejs=require("ejs");
const Listing=require("./model/listing.js");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));



main().then((res)=>{
    console.log("Database is Connected")
}).catch((err)=>{
    console.log(err);
});

// ================= DATABASE =================

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}


app.get("/",
    wrapAsync(async (req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/home.ejs",{listing});
}));

app.listen(process.env.PORT,()=>{
    console.log("server is listening on ",process.env.PORT)
});



//Index Route

app.get("/listings",
    wrapAsync(async(req,res,next)=>{
        const allListings=await Listing.find({});
        res.render("./listings/index.ejs",{allListings});
}));

//New Route

app.get("/listings/new",(req,res,next)=>{
    try{res.render("./listings/new.ejs");}
    catch(err){next()}
});

//Show Route

app.get("/listings/:id",wrapAsync(async (req,res,next)=>{
        let{id}=req.params;
        const listing=await Listing.findById(id);
        res.render("./listings/show.ejs",{listing});
        console.log(listing);    
}));

//Create Route

app.post("/listings",
    wrapAsync(async (req,res,next)=>{
        if(!req.body.listing){
            throw new ExpressError(400,"Bad Request");
        }
        let newListing=new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
}));

//Edit Route

app.get("/listings/:id/edit",
    wrapAsync(async (req,res,next)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
}));

//Update Route

app.put("/listings/:id",wrapAsync(async (req,res,next)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Bad Request");
    }
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,req.body.listing);
    res.redirect(`/listings/${id}`);
    console.log(req.body.listing);
}));

//Delete Route

app.delete("/listings/:id",wrapAsync(async(req,res,next)=>{
    let {id}=req.params;
    console.log(req.body.listing)
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

// Error
app.all("/{*splat}", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something went wrong"}=err;
    res.status(statusCode).send(message);
});