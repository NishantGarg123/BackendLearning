const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require('../schema.js');
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");   

// ===============================================================================================>>>
//here we have use the joi package that is requirde into this package(listing.validate ->will validate the full listing which is coming from the req body)
const validateReview = (req , res , next)=>{
    let {error}= reviewSchema.validate(req.body);
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
// ===============================================================================================>>>



// #############################################################################################################

// All route of Review

        //post review route
        router.post("/" ,validateReview ,wrapAsync(async(req , res , next)=>{

            let {id} = req.params;
            const  review = req.body.review;
            const newReview = new Review( {...review });
            const selectedListing = await Listing.findById(id);
            selectedListing.reviews.push(newReview);            
            await newReview.save();
            await selectedListing.save();  
            req.flash("success" , "New Review is Created !");          
            res.redirect(`/listings/${selectedListing._id}`);
        }));

        // Delete Review route
        router.delete("/:reviewId" , wrapAsync(async(req , res , next )=>{

                let { id , reviewId } = req.params;
                await Listing.findByIdAndUpdate(id , {$pull:{reviews: reviewId}});
                await Review.findByIdAndDelete(reviewId);
                req.flash("success" , "Review is Deleted !");
                res.redirect(`/listings/${id}`);
            }));

module.exports = router;
// #############################################################################################################
