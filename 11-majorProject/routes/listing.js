const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema } = require('../schema.js');
const Listing = require("../models/listing.js");   
const methodOverride = require('method-override');
const {isLoggedIn} = require("../middleware.js");
// ===================================================================>>
//here we have use the joi package that is requirde into this package(listing.validate ->will validate the full listing which is coming from the req body)
const validateListing = (req , res , next)=>{
    let {error}= listingSchema.validate(req.body);
                    // console.log(result);
                    if(error)
                    {
                        let errMsg = error.details.map((el)=> el.message).join(",");
                        throw new ExpressError(400 , errMsg);
                    }
                    else
                    {
                        next();
                    }
}
// ===================================================================>>


// ===================================================================>>
                //index route
                router.get("/",wrapAsync( async(req , res)=>{
                    const  allListings=await Listing.find();
                    res.render("listings/index.ejs" , {allListings});    
                }));
                
                //new route
                router.get("/new",isLoggedIn , (req , res)=>{               
                    res.render("listings/new.ejs");
                });

                //(show) route
                router.get("/:id",wrapAsync( async(req , res , next)=>{
                    // console.log("show route");
                    let {id} = req.params;
                    const listing =   await Listing.findById(id).populate("reviews");
                    if(!listing){
                        req.flash("error" , "Listing you requested does not existed !");
                        res.redirect("/listings");
                    }
                    res.render("listings/show.ejs",{listing});

                }));

                //create route
                router.post("/",isLoggedIn , validateListing,wrapAsync( async (req ,res, next)=>{
                    // const {title ,description ,image ,price ,location} = req.body;
                    console.log("create route");
                    let listing = req.body.Listing;
                    console.log(listing);
                    const newlisting =  await new Listing(listing);
                    await newlisting.save();
                    req.flash("success" , "New Listing is Created !");
                    res.redirect("/listings");  
            
                }));
                
                //edit route
                router.get("/:id/edit",isLoggedIn , wrapAsync( async(req ,res , next)=>{
                    console.log("edit route");
                    let {id} = req.params;
                    const listing= await Listing.findById(id);
                    if(!listing){
                        req.flash("error" , "Listing you requested does not existed !");
                        res.redirect("/listings");
                    }
                    console.log(listing);                    
                    res.render("listings/edit.ejs",{listing});
                }));

                //update route
                router.put("/:id",isLoggedIn , validateListing,wrapAsync( async (req , res , next)=>{
                    console.log("update route");
                    let {id} = req.params;
                    let listing = req.body.Listing;
                    await Listing.findByIdAndUpdate(id,{...listing});
                    req.flash("success" , " Listing Updated !");
                    res.redirect(`/listings/${id}`);
                }));
                
                //delete route
                router.delete("/:id", isLoggedIn  , wrapAsync( async (req , res )=>{
                    console.log("delete route");
                        let {id} =req.params;
                        await Listing.findByIdAndDelete(id);
                        req.flash("success" , " Listing Deleted !");
                        res.redirect("/listings");
                }));

// ===================================================================>>

module.exports = router;