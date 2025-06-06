const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({   

    

    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
   
});

module.exports = mongoose.model("Review", listingSchema);