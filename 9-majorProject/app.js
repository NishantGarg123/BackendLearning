const express = require('express');
const app =  express();
const port = 8080;
const mongoose = require('mongoose');
const ejs = require('ejs');

const Listing = require("./models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(result=>{  console.log("connected to the DB");  })
.catch(err=>{ console.log(err); });


async function main() {
    
    await mongoose.connect(MONGO_URL);
}



app.get("/",(req , res )=>{ 
    res.send("working correctly");});



app.get("/testListing",async(req , res )=>{ 
    const sampleListing = new Listing({

            title:"My new Villa",
           description:"My new beach",
           price:1200,
           lacation:"Caneda",
           country:"India"
         });

         await sampleListing.save();
         console.log("sample saved")
         res.send("Successfully saved");
});


app.listen(port , ()=>{

    console.log(`listening on the port ${port}`);
});