const express=require("express");
require("dotenv").config();
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const ejs=require("ejs");
const Listing=require("./model/listing.js");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;

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


// app.get("/test",async (req,res)=>{
//     let sample=new Listing({
//         title:"My New Villa",
//         desc:"by the beach",
//         price:7000,
//         location:"Andaman",
//         country:"India"
//     })

//     await sample.save();
//     console.log("Samplewas Saved");
//     res.send("Successful testing");
// });

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



















// ================= DATABASE =================

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}


app.get("/",async (req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/home.ejs",{listing});
});

app.listen(process.env.PORT,()=>{
    console.log("server is listening on ",process.env.PORT)
});
