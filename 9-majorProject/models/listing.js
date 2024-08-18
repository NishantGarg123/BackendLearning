const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({

    title:{
     type:String,
     require:true,
    },
    description:String,
    image:{
      type:String,
      set:(v)=> v === ""?"krishna.png" : v,
      default:"krishna.png"
    },
    price:Number,
    lacation:String,
    country:String
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;