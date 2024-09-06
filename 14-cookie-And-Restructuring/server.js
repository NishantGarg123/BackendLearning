const express = require('express');
const app = express();


// Require the Restructred 
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

// 5 -cookie parser
const cookieParser = require('cookie-parser');      //we have to install (npm i cookie-parser)
app.use(cookieParser("secretcode"));

// 6- signed cookie (we have pass secretcode in cookie parser method)
app.get("/signedcookie" , (req , res)=>{
    res.cookie("made-in" , "India" , {signed:true});
    res.send("signed cookie set");
});

// 7 - Verify (Accessing) the Signed  cookie.
app.get("/verify" , (req , res)=>{
    console.log(req.signedCookies);
    res.send("verified")    ;
});

//2 -sending cookies
app.get("/cookies" , (req , res)=>{
    res.cookie("Greet" , "Hello");
    res.cookie("country" , "India");
    res.cookie("Color" , "3-color");
    res.send("sent you some cookies");

});

// 3 -geting cookie (whole object of cookie)
app.get("/" , (req , res )=>{
    console.dir(req.cookies);
    res.send("root");
});

// 4 -geting cookie individual value of cookie
app.get("/greet" , (req , res)=>{
    let {Greet ="Good morning"} = req.cookies;
    res.send( `Hi ${Greet} ` );
})


// 1 - Restructuring the user and the post
app.use("/uesrs" , users);
app.use("/posts" , posts);

app.listen(3000 , ()=>{
    console.log("server is launch"); 
});