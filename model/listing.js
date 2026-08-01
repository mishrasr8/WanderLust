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
        default:"https://images.unsplash.com/photo-1773176647951-d8f618dee942?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
