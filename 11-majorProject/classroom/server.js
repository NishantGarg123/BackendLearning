const express = require('express');
const app = express();

const path = require('path');
app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"view"));


 // Require the Restructred 
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require('cookie-parser');      //we have to install (npm i cookie-parser)
app.use(cookieParser("secretcode"));


// ===============================================================================================================================>>>>>>>>>


// Require the express-session
const session = require("express-session");

// 6 - Connect-flash to show that task done or not as a flash once
const flash = require('connect-flash');     //we have need of cookies parser to use it
app.use(flash());

// 1-  Setting state in Express
const sessionOptions = {
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true
};
app.use(session(sessionOptions));

// 2-  send a response to check the session get setted or not
app.get("/test" ,(req , res )=>{
    res.send("test successfull!");
});

// 3- Activity so that we can create like statefull session (in this we count no. of requests).
app.get("/reqcount" , (req , res)=>{
    if(req.session.count)
    {
        req.session.count++;
    }
    else
    {
        req.session.count = 1;
    }
    res.send(`you send request ${req.session.count} times`);
});

// 4- Setting a new cookies name and accesssing in the different routr
app.get("/register" , (req , res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    console.log(req.session.name);   
    if(req.session.name === "anonymous")
    {
        req.flash("error", "user not register");    
    }else{
        req.flash("success", "user register successfully");
    }
    res.redirect("/hello");
})

// // 5 - Accessing the name to show the working of the session
// app.get("/hello" , (req , res)=>{
//     res.render("page.ejs" , {name:req.session.name , msg:req.flash("success")});
// });

// 7 - OR (5) -> (using locals varibles -> Directly accessible in ejs file ) Accessing the name to show the working of the session
//res.flash
// app.get("/hello" , (req , res)=>{
//     res.locals.successMsg = req.flash("success");
//     res.locals.errorMsg   = req.flash("error");
//     res.render("page.ejs" , {name:req.session.name});       // Now we can access the locals variables in our ejs file directly.
// })

// 8 - best way to use 7th  (Now we do not have need to access flash msg to show success/error ,
// we can access in any file by storing into the locals variable but it must be flash by redirected route.  )
app.use((req , res , next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg   = req.flash("error");
    next();
});
app.get("/hello" , (req , res)=>{
    res.render("page.ejs" , {name:req.session.name});       // Now we can access the locals variables in our ejs file directly.
});


// ===============================================================================================================================>>>>>>>>>
app.listen(3000 , ()=>{
    console.log("server is launch"); 
});

// ===============================================================================================================================>>>>>>>>>
//cookies and Restructuring concept 

// // 5 -cookie parser
// const cookieParser = require('cookie-parser');      //we have to install (npm i cookie-parser)
// app.use(cookieParser("secretcode"));

// // 6- signed cookie (we have pass secretcode in cookie parser method)
// app.get("/signedcookie" , (req , res)=>{
//     res.cookie("made-in" , "India" , {signed:true});
//     res.send("signed cookie set");
// });

// // 7 - Verify (Accessing) the Signed  cookie.
// app.get("/verify" , (req , res)=>{
//     console.log(req.signedCookies);
//     res.send("verified")    ;
// }); 

// //2 -sending cookies
// app.get("/cookies" , (req , res)=>{
//     res.cookie("Greet" , "Hello");
//     res.cookie("country" , "India");
//     res.cookie("Color" , "3-color");
//     res.send("sent you some cookies");

// });

// // 3 -geting cookie (whole object of cookie)
// app.get("/" , (req , res )=>{
//     console.dir(req.cookies);
//     res.send("root");
// });

// // 4 -geting cookie individual value of cookie
// app.get("/greet" , (req , res)=>{
//     let {Greet ="Good morning"} = req.cookies;
//     res.send( `Hi ${Greet} ` );
// })


// // 1 - Restructuring the user and the post
// app.use("/uesrs" , users);
// app.use("/posts" , posts);

// ===============================================================================================================================>>>>>>>>>