const path = require("path");
const dotenv = require("dotenv");

const result = dotenv.config({
    path: path.join(__dirname, "../.env")
});

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");

const MONGO = process.env.MONGO_URL;

async function main() {
    await mongoose.connect(MONGO);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6a9fc0a9082081519e67aa59"}));
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
