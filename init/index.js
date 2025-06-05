const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");





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


const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data inserted");
}

initDB();