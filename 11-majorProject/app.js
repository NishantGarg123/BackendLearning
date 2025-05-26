const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const ejs = require('ejs');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");

const listingsRouter = require('./routes/listing.js');
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const ExpressError = require("./utils/ExpressError.js");

//session related
const session = require("express-session");
const flash = require('connect-flash');

//passport related
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// ########################################################################################
//ejs setup
const path = require('path');
const { wrap } = require('module');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// ########################################################################################

// ===================================================================>>
//mongo connections
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
    .then(result => { console.log("connected to the DB"); })
    .catch(err => { console.log(err); });
async function main() {

    await mongoose.connect(MONGO_URL);
}
// ===================================================================>




    const sessionOption ={
        secret:"mysupersecretcode",
        resave:false,
        saveUninitialized:true,
        cookie:{
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
            maxAge : 7 * 24 * 60 * 60 * 1000,
            httpOnly:true
        }
    }
    app.use(session(sessionOption));

    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());


    app.use((req , res , next)=>{
        res.locals.success = req.flash("success");
        res.locals.error = req.flash("error");
        res.locals.currUser = req.user;
        next();
    })

    // ===================================================================>>
//all routes of listig

// default route
app.get("/", (req, res) => {
    res.send("working correctly");
});

// app.get("/demo" , async(req , res )=>{

//     let fakeUser = new User({
//         email:"student123@gmail.com",
//         username:"nishant123 garg",
//     });
//     const registerUser = await User.register(fakeUser , "helloworld");
//     res.send(registerUser);
// })


app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// ======================================================================>>

// ===================================================================>>
//middleware
app.all("*", (req, res, next) => {

    next(new ExpressError(404, "Page Not "));
});

app.use((err, req, res, next) => {

    let { statusCode = 500, message = "Some thing went wrong" } = err;
    res.render("error.ejs", { err });
    // res.status(statusCode).send(message);
});
// ===================================================================>>

app.listen(port, () => {

    console.log(`listening on the port ${port}`);
});
