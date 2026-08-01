const mongoose=require("mongoose");


const Schema=mongoose.Schema;

const listingSchema=Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String,
        default:"https://unsplash.com/photos/dramatic-sunset-over-a-dark-mountain-valley-j3f1lwXBuAI",
        set:(v)=> v==="" ?"https://unsplash.com/photos/dramatic-sunset-over-a-dark-mountain-valley-j3f1lwXBuAI":v
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    }
});


const Listing=mongoose.model("listing",listingSchema);

module.exports=Listing;