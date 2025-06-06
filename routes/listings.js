const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");

// all listings page route 
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { listings: allListings });
});

//new listing route
router.get("/new", (req, res) => {
    res.render("listings/new");
});

router.post("/", async (req, res, next) => {
    try {
        if (!req.body.listing) {
            throw new Error("No listing data provided");
        }
        let newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect(`/listings/${newListing._id}`);
    } catch (e) {
        console.log("Error creating listing:", e);
        next(e);
    }
});

//show route
router.get("/:id", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show", {listing});
});

// update route
router.get("/:id/edit", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit", {listing});
});

router.put("/:id", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators: true, new: true});
    res.redirect(`/listings/${id}`);
});

// delete route
router.delete("/:id", async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

module.exports = router;








