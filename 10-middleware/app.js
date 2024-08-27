const express = require('express');
const app = express();
const port = 8080;

// ===============================================================================>>
//middleware (our 1st middle ware) and use of next
// app.use((req , res , next)=>{
//     console.log("Hi , i am 1st middleware");
//     next();
// });

// app.use((req , res , next)=>{

//     console.log("Hi ,i am 2nd middleware ");
//     next();
// });

// app.get("/random",(req , res )=>{
//     res.send("this is a random page");
// })


// app.get("/",(req , res )=>{
//     res.send("working");
// })
// ===============================================================================>>


// ===============================================================================>>
//utility middle ware (Logger)

//logger - morgan
// app.use((req , res , next)=>{
//     console.log("Hi ,i am 1st middleware ");
//     req.time = new Date(Date.now());
//     console.log(req.method , req.hostname , req.path , req.time);
//     next();
// });

// app.get("/random",(req , res )=>{
//     res.send("this is a random page");
// })


// app.get("/",(req , res )=>{
//     res.send("working");
// })

// //404
// app.use((req , res )=>{
// res.send("page not found");
// res.status(404).send("page not found");

// });
// ===============================================================================>>

// ===============================================================================>>
//api token
// app.use("/api",(req , res ,next)=>{

//     let {token} = req.query;
//     if(token === "giveaccess")
//     {
//         next();
//     }
//     res.send("Access denied");
// });

// app.use("/api",(req , res )=>{
//     res.send("data");
// });

// ===============================================================================>>


// ===============================================================================>>
//error handling



// ===============================================================================>>


// ===============================================================================>>
//multiple middle ware
// const checkToken = (req , res , next )=>{

//     let {token} = req.query;
//     if(token === "giveaccess")
//     {
//         next();
//     }
//     res.send("Access denied");
// };

// app.use("/api", checkToken ,(req , res )=>{
//     res.send("data");
// });

// ===============================================================================>>


// ===============================================================================>>
//error handling middle ware
app.get("/err",(req , res)=>{
    abcd = abcd
});

app.use((err , req , res , next)=>{
console.log("----------ERROR---------");
//next();                                         //-> if we are simply call to the next then it found to the non errored handling path and execute
next(err);                                   //-> if we pass err in parameter then it will call to the default express handler

});

app.use((req , res)=>{
    res.status(404).send("page not found");
});
// ===============================================================================>>



app.listen(port,()=>{
    console.log("listening on the post 8080");
})
