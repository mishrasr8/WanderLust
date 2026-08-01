const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./model/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


// ================= DATABASE =================

async function main() {
    await mongoose.connect(MONGO_URL);
}


// ================= ROUTES =================

// Root Route
app.get("/", (req, res) => {
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/home.ejs",{listing});
});


// Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
});


// New Route
app.get("/listings/new", (req, res) => {
    res.render("./listings/new.ejs");
});


// Show Route
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    res.render("./listings/show.ejs", { listing });
});


// Create Route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);

    await newListing.save();

    res.redirect("/listings");
});


// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    res.render("./listings/edit.ejs", { listing });
});


// Update Route
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndUpdate(id, req.body.listing);

    res.redirect(`/listings/${id}`);
});


// Delete Route
app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    res.redirect("/listings");
});


// ================= START SERVER =================

main()
    .then(() => {
        console.log("Database is Connected");

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:");
        console.error(err);
        process.exit(1);
    });
