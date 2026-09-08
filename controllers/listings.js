const Listing=require("../model/listing.js")

//Index 

module.exports.index=async(req,res,next)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
};

//Create

module.exports.newForm=(req,res,next)=>{
    res.render("./listings/new.ejs");
};

// Show

module.exports.showListing=async (req,res,next)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","listing does not exist");
        res.redirect("/listings")
    }
    res.render("./listings/show.ejs",{listing});          
};

// Create

module.exports.createListing=async (req,res,next)=>{
        const newListing=new Listing(req.body.listing);
        newListing.owner=req.user._id;
        await newListing.save();
        req.flash("success","New listing created successfully!");
        res.redirect("/listings");
};

// Render Edit Form

module.exports.renderEditListing=async (req,res,next)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","listing does not exist");
        res.redirect("/listings")
    }
    res.render("./listings/edit.ejs",{listing});
};

//Update

module.exports.updateListing=async (req,res,next)=>{
        let {id}=req.params;
        await Listing.findByIdAndUpdate(id,req.body.listing);
        req.flash("success","Listing updated!");
        res.redirect(`/listings/${id}`);  
};

//Destroy

module.exports.destroyListing=async(req,res,next)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","listing deleted!");
    res.redirect("/listings");
};