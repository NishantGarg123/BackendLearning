const express = require("express");

const app = express();
// console.dir(app);

let port = 8080;

app.listen(port, ()=>{

    console.log(`app is listening on port ${port}`);
});


//=================================================================================================================================================>>
    //1. In this if any route give request it will receive


// app.use((req , res)=>{                                        // in the response we can send the text,object,array,html ETC.
//     console.log("request received");
//     code1 = "This is the first response";
    
//     code2 = { "name": "nishant",
//               "age" :  20};
            
//     code3 = "<h1>Fruits</h1><ul><li>Mango</li>Orange<li></li></ul>"
//     res.send(code3);
// });

//=================================================================================================================================================>>

//=================================================================================================================================================>>
    //2. in this we have specify a particular route for a particular path

// app.get("/", (req , res)=>{
//     res.send("you connected to  root path");
// });

// app.get("/search", (req , res)=>{
//     res.send("you connected to the search path");
// });

// app.get("/help", (req , res)=>{
//     res.send("you connected to the help path");
// });

// app.get("/contact", (req , res)=>{
//     res.send("you connected to the contact path");
// });

// app.get("*", (req , res)=>{
//     res.send("This path does not Exist");
// });

// app.post("/",(req , res)=>{
//     res.send("You send a post request to a root");
// });
//=================================================================================================================================================>>

//=================================================================================================================================================>>

    //4. In above we will not decide manually Route for every user on the social media.
        //Therefor with the help of this method we can generalized it.
app.get("/", (req , res)=>{
     res.send("you connected to  root path");
    });
    
app.get("/:username/:id",(req, res)=>{

        let {username , id} = req.params;
        res.send(`Welcome to the page of @${username}`);
});
//=================================================================================================================================================>>

//=================================================================================================================================================>>

    app.get("/search" , (req ,res)=>{
            let {q} = req.query;
            res.send(`This is the Query Result:${q}`);
    });
//=================================================================================================================================================>>

