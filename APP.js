const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const Listing  = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");



port = 8080;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// Database connect 
const MONGO_URL = "mongodb://127.0.0.1:27017/rentwala";

main()
    .then(()=>{
    console.log("Database connected");
    }).catch((err)=>{
    console.log(err);
});


async function main() {
   await mongoose.connect(MONGO_URL);
//    console.log("Database connected");
}





// root page route 

app.get("/", (req, res) => {
    res.send("Root Page");
});

// app.get("/testlisting" , async (req, res) => {
//     let sampleListing = new Listing({
//         title: "my new villa",
//         description: "latur",
//         price: 1200,
//         location: "latur new spot",
//         country: "India"

//     });

//     await sampleListing.save(); 
//     res.send(sampleListing);
//     console.log("succesfull work listing");
// });


// all listings page route 
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { listings: allListings });
});

//new listing route
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

app.post("/listings", async (req, res) => {
    let newListing = new Listing(req.body);
    await newListing.save();
    res.redirect(`/listings/${newListing._id}`);
});

//show route

app.get("/listings/:id",  async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show", {listing});
});


// update route
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit", {listing});
});



app.put("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators: true, new: true});
    res.redirect(`/listings/${id}`);
});


// delete route
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
   let deletedListing =  await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
    res.redirect("/listings");
});


// port start on page 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
    