const express=require("express");
const router=express.Router({mergeParams:true});
const Review=require("../model/review.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../model/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");

// Index and Create Route

router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,validateListing,wrapAsync(listingController.createListing));

//New Route

router.get("/new",isLoggedIn,listingController.newForm);

// Show and Update Route

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


//Edit Route

router.get("/:id/edit",isLoggedIn ,isOwner ,wrapAsync(listingController.renderEditListing));

module.exports=router;