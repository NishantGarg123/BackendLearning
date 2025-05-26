const mongoose = require('mongoose');

const Chat = require("./models/chat.js");

main()
.then(res=>{ console.log("connection success");})
.catch(err=>{ console.log(err);});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp") ;
}


let allChats =[
    {
        
        from:"neha",
        to:"priya",
        msg:"hello how are you",
        created_at:Date()
    },
    {
        
        from:"rahul",
        to:"self",
        msg:"hello how are you",
        created_at:Date()
    },
    {
        
        from:"sumit",
        to:"pati",
        msg:"hello how are you",
        created_at:Date()
    },
    {
        
        from:"gauri",
        to:"priya",
        msg:"hello how are you",
        created_at:Date()
    },
    {
        
        from:"nishant",
        to:"priya",
        msg:"hello how are you",
        created_at:Date()
    }
];


Chat.insertMany(allChats);