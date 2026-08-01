const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../model/listing.js");

const MONGO = process.env.MONGO_URL;

async function main() {
    await mongoose.connect(MONGO);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
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
