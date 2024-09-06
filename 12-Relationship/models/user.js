//one to few implementation

const mongoose = require('mongoose');

main()
.then(result =>{ console.log("DB connected successfully"); })
.catch(err=> console.log(err));


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}


const userSchema = new mongoose.Schema({

    username:String,
    address:[
        { 
            _id:false,
            location:String,
            city:String,

        },
    ],
});


const User = mongoose.model("User",userSchema);

const addUser = async()=>{

    const user1 = new User({

        username:"nishant garg",
        address:[
            {
                location:"radhika bihar",
                city:"mathura",
            },
        ],
    });
    
    user1.address.push({location:"radhika bihar face 2" , city:"mathura"});

    let result = await user1.save();
    console.log(result);
    
}

addUser();

// const express = require('express');

// const app = express();
// const port =8080;

// app.listen(port , ()=>{

//     console.log(`server runing on the ${port}`);
    
// })