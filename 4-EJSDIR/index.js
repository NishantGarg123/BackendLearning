

// ====================================================================>>
    //This code help us to render the our page on to the server.
        const express = require("express");
        const app = express();


        const port =8080;
        app.listen(port ,()=>{
            console.log("Listening on port 8080");
        });

// ====================================================================>>
    //Here we are setting our template to EJS that are going to render (EJS automatically require by express hence not need to require.)
        app.set("view engine","ejs");


// ====================================================================>>
    //This code is used so that we can render and access our server code any where from the local machine
        const path = require("path");
        app.set("views" , path.join(__dirname,"/views"));

// ====================================================================>>

// ====================================================================>>
    //This code used to display(Render) the Root page on the local machine.
        app.get("/" , (req , res)=>{
            res.render("home.ejs");
        });

// ====================================================================>>

// ====================================================================>>
        //This  code used so that we can add our js and css code into the render template
       // app.use(express.static("public"));      //As the ejs file defaultly read from the view folder similarly Static css and js file read from the public folder.
        app.use(express.static(path.join(__dirname,"public")));     //This code modified by above so that we can run server from the another directory.
// ====================================================================>>

// ====================================================================>>
    //This code used to display the random dice value.
        app.get("/rolldice" , (req , res)=>{

            let num =Math.floor(Math.random()*6)+1;
            res.render("rolldice.ejs" , {diceVal :num});

        });
// ====================================================================>>

// ====================================================================>>
        //creating the instagram template and //Working with the our instagram data (data.json)
           app.get("/ig/:username" , (req ,res)=>{

            let {username} = req.params;
            const instaData = require("./data.json");           
            let data= instaData[username];
            if( data)
            {
                res.render("instagram.ejs" , {data});
            }
            else{

                res.render("error.ejs" );
            }
            
            });

// ====================================================================>>

// ====================================================================>>
    
   
// ====================================================================>>

