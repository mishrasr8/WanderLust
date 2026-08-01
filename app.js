const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const ejs=require("ejs");
const Listing=require("./model/listing.js");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");


app.engine("ejs",ejsMate);
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));


const MONGO_URL="mongodb+srv://<db_username>:EIm3aUqSRwnrU59b@cluster0.vgrwjdc.mongodb.net/?appName=Cluster0";

main().then((res)=>{
    console.log("Database is Connected")
}).catch((err)=>{
    console.log(err);
});

//Index Route

app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
});

//New Route

app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
});

//Show Route

app.get("/listings/:id",async (req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
    console.log(listing);
});

//Create Route

app.post("/listings",async (req,res)=>{
    let newListing=new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/listings");
});

//Edit Route

app.get("/listings/:id/edit",async (req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
});

//Update Route

app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,req.body.listing);
    res.redirect(`/listings/${id}`);
    console.log(req.body.listing);
});

//Delete Route

app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    console.log(req.body.listing)
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("Root is working");
});

app.listen(process.env.PORT || 8080,()=>{
    console.log("server is listening")
});
