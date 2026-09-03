const express=require("express");
const router=express.Router();
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema, reviewSchema}=require("../schema.js");
const Review=require("../model/review.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../model/listing.js");


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

 
//Index Route

router.get("/",
    wrapAsync(async(req,res,next)=>{
        const allListings=await Listing.find({});
        res.render("./listings/index.ejs",{allListings});
}));

//New Route

router.get("/new",(req,res,next)=>{
    try{res.render("./listings/new.ejs");}
    catch(err){next()}
});

//Show Route

router.get("/:id",wrapAsync(async (req,res,next)=>{
        let{id}=req.params;
        const listing=await Listing.findById(id).populate("reviews");
        req.flash("error","listing does not exist");
        res.render("./listings/show.ejs",{listing});
           
}));

//Create Route

router.post("/",
    validateListing,
    wrapAsync(async (req,res,next)=>{
        const newListing=new Listing(req.body.listing);
        await newListing.save();
        req.flash("success","New listing created successfully!");
        res.redirect("/listings");
}));

//Edit Route

router.get("/:id/edit",
    wrapAsync(async (req,res,next)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
}));

//Update Route

router.put("/:id",
    validateListing,
    wrapAsync(async (req,res,next)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,req.body.listing);
    res.redirect(`/listings/${id}`);
    
}));

//Delete Route

router.delete("/:id",wrapAsync(async(req,res,next)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","listing deleted!");
    res.redirect("/listings");
}));



module.exports=router;