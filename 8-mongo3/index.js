//===============================================================================>>
const express = require('express');
const port = 8080;
const app = express();
const path = require("path");
app.set("views" ,path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
//===============================================================================>>


//===============================================================================>>
const mongoose = require('mongoose');

main()
.then(res=>{
    console.log("connected to the DB");
})
.catch(err=>{
    console.log(err);
});

async function main(){

    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

const Chat = require("./models/chat.js");

// let chat1 = new Chat({
//                             from:"neha",
//                             to:"priya",
//                             msg:"hello how are you",
//                             created_at:Date()
// });

// chat1.save()
// .then(res=>{ console.log(res);})
// .catch(err=>{ console.log(err);}); 


//===============================================================================>>


//===============================================================================>>

//index route
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", {chats});
    // res.send("working");
})

//===============================================================================>>




//===============================================================================>>
app.get("/",(req,res)=>{

    res.send("connection success");
})

app.listen(port , ()=>{

    console.log("server is listening on port 8080");
});

//===============================================================================>>