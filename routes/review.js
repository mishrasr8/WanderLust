const express=require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapAsync.js");
const Review=require("../model/review.js");
const Listing=require("../model/listing.js");
const {validateReview, isLoggedIn, isAuthor}=require("../middleware.js");

const reviewController=require("../controllers/reviews.js");

// Reviews

router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.postReview));

// Delete Review Route

router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewController.destroyReview));

module.exports=router;