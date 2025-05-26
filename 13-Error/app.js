const express = require('express');
const app = express();
const port = 8080;
const ExpressError = require("./ExpressError");



// ===============================================================================>>
const checkToken = (req , res , next )=>{

    let {token} = req.query;
    if(token === "giveaccess")
    {
        next();
    }
    throw new ExpressError(401 , "Access Denied");
    
};

app.use("/api", checkToken ,(req , res )=>{
    res.send("data");
});
// ===============================================================================>>


// ===============================================================================>>
//error handling middle ware
app.get("/err",(req , res)=>{
    abcd = abcd
});


//Activity
app.get("/admin" ,(req , res)=>{

    throw new ExpressError(403 , "Access to admin is forbidden");
})


// ===============================================================================>>
//error handling middle
app.use((err , req , res , next)=>{
    let {status = 500 , message ="Some Error Occured" } = err;
    res.status(status).send(message);
});


// app.use((req , res)=>{
//     res.status(404).send("page not found");
// });
// ===============================================================================>>



// ===============================================================================>>
//Go in mongo3 to see the wrap Error.

//code of the mongo3

// function asyncwrap(fn)
// {
//     return function(req , res , next){
//         fn(req , res , next).catch((err)=> next(err));
//     }
// }
// app.get("/chats/:id",asyncwrap( async(req , res)=>{

//     let {id} = req.params;
//     let chat = await Chat.findById(id);
    
//         if(!chat)
//             {
//                 next(new ExpressError(404 , "Page not found"));  // in async function automatic next is not support hence we have to use explicitaly
//             }
//             res.render("edit.ejs",{chat});
// }));

// ===============================================================================>>

app.listen(port,()=>{
    console.log("listening on the post 8080");
})
