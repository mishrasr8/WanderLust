const express=require("express");
const router = express.Router({ mergeParams: true });
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema, reviewSchema}=require("../schema.js");
const Review=require("../model/review.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../model/listing.js");


// Validate Review

const validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
        if(error){
            let errMsg=error.details.map((el)=>el.message).join(",")
            throw new ExpressError(400,errMsg);
        }else{next()}
};


// Reviews

router.post("/", validateReview, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New review created!");
    res.redirect(`/listings/${id}`);
}));

// Delete Review Route

router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","New review deleted!");
    res.redirect(`/listings/${id}`);
}));

module.exports=router;