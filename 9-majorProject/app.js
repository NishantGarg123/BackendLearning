const express = require('express');
const app =  express();
const port = 8080;
const mongoose = require('mongoose');
const ejs = require('ejs');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");

// ########################################################################################
//models requirements
const Listing = require("./models/listing.js");
// ########################################################################################

// ########################################################################################
//ejs setup

const path = require('path');
app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"view"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
// ########################################################################################

// ===================================================================>>
//mongo connections
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
.then(result=>{  console.log("connected to the DB");  })
.catch(err=>{ console.log(err); });
async function main() {
    
    await mongoose.connect(MONGO_URL);
}
// ===================================================================>>

// ===================================================================>>
// default route
app.get("/",(req , res )=>{ 
    res.send("working correctly");
});
// ===================================================================>>


// ===================================================================>>
//index route
app.get("/listings",async(req , res)=>{

    const  allListings=await Listing.find();
    res.render("listings/index.ejs" , {allListings});    
});
// ===================================================================>>

// ===================================================================>>
//new route
app.get("/listings/new",(req , res)=>{
    res.render("listings/new.ejs");
});

// ===================================================================>>

// ===================================================================>>
//(show) route
app.get("/listings/:id",async(req , res)=>{

    let {id} = req.params;
    const listing =   await Listing.findById(id)
       res.render("listings/show.ejs",{listing});
     
    
});

// ===================================================================>>


// ===================================================================>>
//create route
app.post("/listings",async (req ,res)=>{

    // const {title ,description ,image ,price ,location} = req.body;
    let listing = req.body.listing;
    console.log(listing);
    const newlisting =  await new Listing(listing);

    newlisting.save()
    .then(res.redirect("/listings"))
    .catch(err=>{ res.render("error.ejs",{err});});

});
// ===================================================================>>


// ===================================================================>>
//edit route
app.get("/listings/:id/edit",async(req ,res )=>{
    let {id} = req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//update route
app.put("/listings/:id",async (req , res)=>{

    let {id} = req.params;
    let listing = req.body.listing;
    await Listing.findByIdAndUpdate(id,{...listing});
    res.redirect(`/listings/${id}`);
});
// ===================================================================>>



// ===================================================================>>
//delete route
app.delete("/listings/:id",async (req , res )=>{

        let {id} =req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect("/listings");
});

// ===================================================================>>

app.listen(port , ()=>{

    console.log(`listening on the port ${port}`);
});