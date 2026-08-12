const mongoose = require("mongoose");
const Review=require("./review.js")

const Schema = mongoose.Schema;

const defaultImage =
    "https://images.unsplash.com/photo-1773176647951-d8f618dee942?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    image: {
        type: String,
        default: defaultImage,
        set: (v) => v === "" ? defaultImage : v
    },

    price: {
        type: Number
    },

    location: {
        type: String
    },

    country: {
        type: String
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }]
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})


const Listing = mongoose.model("Listing", listingSchema);


module.exports=Listing;
