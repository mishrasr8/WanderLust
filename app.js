const express=require("express");
require("dotenv").config();
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const wrapAsync=require("./utils/wrapAsync.js");
const Listing=require("./model/listing.js");

const listings=require("./routes/listing.js");
const review=require("./routes/review.js");


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

app.listen(process.env.PORT,()=>{
    console.log("server is listening on ",process.env.PORT)
});

app.use((req, res, next) => {
    console.log(req.method, req.url);
    console.log(req.body);
    next();
});


//Validate Listing

const validateListing=(req,res,next)=>{
    const {error}=listingSchema.validate(req.body);
        if(error){
            let errMsg=error.details.map((el)=>el.message).join(",")
            throw new ExpressError(400,errMsg);
        }else{next()}
};

// Validate Review

const validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
        if(error){
            let errMsg=error.details.map((el)=>el.message).join(",")
            throw new ExpressError(400,errMsg);
        }else{next()}
};

app.use("/listings",listings);
app.use("/listings/:id/reviews",review);

//Home Route

app.get("/",
    wrapAsync(async (req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/home.ejs",{listing});
}));




// Error
app.all("/{*splat}", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something went wrong"}=err;
    res.render("error.ejs",{message});
    // res.status(statusCode).send(message);
});