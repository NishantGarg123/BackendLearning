//===============================================================================>>
const express = require('express');
const port = 8080;
const app = express();
const path = require("path");
app.set("views" ,path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));

const ExpressError = require('./ExpressError.js');
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

    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
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

function asyncwrap(fn)
{
    return function(req , res , next){
        fn(req , res , next).catch((err)=> next(err));
    }
}

//===============================================================================>>

//root route
app.get("/",(req,res)=>{

    res.send("connection success");
})


//index route
app.get("/chats",asyncwrap(async (req,res)=>{
   
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
    // res.send("working") );
    
}));

//render the page to add new chat

app.get("/chats/new",(req , res)=>{
        res.render("new.ejs");
});

//adding the chat into thhe database
app.use(express.urlencoded({extended: true}));      //use to parse the coming data into the url in the form of post
app.post("/chats",(req , res)=>{
    try{
        let {from , to , msg} = req.body;
        res.redirect("/chats");
        const newChat = new Chat( {from:from , to:to , msg:msg , created_at:new Date()} );
        newChat.save()
        .then(res=>{ console.log(res);})
        .catch(err=>{ console.log(err);});
    }
    catch(err)
    {
        next(err);
    }
    
});

//show route
app.get("/chats/:id",asyncwrap( async(req , res)=>{

    let {id} = req.params;
    let chat = await Chat.findById(id);
    
        if(!chat)
            {
                next(new ExpressError(404 , "Page not found"));  // in async function automatic next is not support hence we have to use explicitaly
            }
            res.render("edit.ejs",{chat});
}));

//edit route
app.get("/chats/:id/edit",asyncwrap( async (req , res )=>{

    const {id} = req.params;
    const chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
}));

//edit the chats into the database
const MethodOverride = require("method-override");      // install using (npm i method-override) so that we can convert our post request to patch request.
app.use(MethodOverride('_method'));

app.patch("/chats/:id" , (req , res)=>{

    const {id}= req.params;
    const {msg } = req.body;
    Chat.findByIdAndUpdate(id ,{ msg:msg} , {new: true})
    .then( result=>{ console.log(result);})
    .catch(err=>{ console.log(err);});
    res.redirect("/chats");
});

//delete route
app.get("/chats/:id/delete", (req , res)=>{

    const {id} = req.params;
    res.render("delete.ejs",{id});
});

//delete from the DB
app.delete("/chats/:id" , (req , res )=>{

        const {id} = req.params;
       Chat.deleteOne({_id:`${id}`});
      
        res.redirect("/chats");
    // res.send(id);

});
//===============================================================================>>



//===============================================================================>>
//Error handling middlesware
app.use((err , req , res , next)=>{

    let {status = 500, message = "Some error occured"} = err;
    res.status(status).send(message);
});

//===============================================================================>>



//===============================================================================>>

app.listen(port , ()=>{

    console.log("server is listening on port 8080");
});

//===============================================================================>>