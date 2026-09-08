const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");

require("dotenv").config();
console.log("MONGO_URL:", process.env.MONGO_URL);

const MONGO = process.env.MONGO_URL;

async function main() {
    await mongoose.connect(MONGO);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data=initData.data.map((obj)=>({...obj,owner:"6a9fab19e8405fe04d8464f1"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized successfully");
};

main()
    .then(async () => {
        console.log("Database is Connected");

        await initDB();

        await mongoose.connection.close();
        console.log("Database connection closed");
    })
    .catch((err) => {
        console.error("Database initialization failed:");
        console.error(err);
        process.exit(1);
    });
