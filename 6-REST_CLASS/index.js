const express = require("express")
const app = express();
const port = 8080;
const path =require("path");

app.use(express.urlencoded({extended:true}));
app.set("views engine" ,"ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname , "public")));


//===============================================================================================>>

    //to create the unic user id we use the uuid package of npm(express)
    const {v4 : uuidv4} = require('uuid');
    


//===============================================================================================>>


//===============================================================================================>>

    //to create the patch and put request we have install the method-override package.(Now lets require it)

    const MethodOverride = require("method-override");
    app.use(MethodOverride('_method'));

//===============================================================================================>>



//===============================================================================================>>

let posts = [

    {
        id:uuidv4(),
        username :"Nishantwebber",
        content :"I love Logical coding"
    },
    {
        id:uuidv4(),
        username:"Parash Garg",
        content:"Study more"
    },
    {
        id:uuidv4(),
        username:"Krishna chaturvedi",
        content:"Give more content and logic"
    }
];


app.get("/posts", (req , res)=>{

    // res.send("server working well");
    res.render("index.ejs",{posts});
});


app.get("/posts/new", (req , res)=>{

    res.render("new.ejs");
});


app.post("/posts", (req , res)=>{
    let  id= uuidv4();
    let {username , content } = req.body;
    posts.push({id,username , content});
    res.redirect("/posts");   
});

app.get("/posts/:id" , (req ,res)=>{

    let {id} =req.params;
    // console.log(id);
    let post = posts.find((p) => p.id === id  );
    // console.log(post);
    
    if(post)
    {
        res.render("show.ejs", {post});
    }
    else
    {
         res.send(` ${id} "id is not exist"`);
    }
     
});

app.get("/posts/:id/edit" , (req , res )=>{

    let {id} = req.params;
    let post = posts.find((p) => p.id === id  );
    res.render("edit.ejs",{post});
});

//===============================================================================================>>
    //use to update the post
app.patch("/posts/:id",(req , res )=>{

    let {id} = req.params;
    let newcontent = req.body.content;
    console.log(newcontent);
    let post = posts.find((p) => p.id === id  );
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");
});
//===============================================================================================>>


//===============================================================================================>>
    //use to delete the post
    app.delete("/posts/:id" , (req, res)=>{

        let {id} = req.params;
        let post = posts.find((p) => p.id === id  );
        console.log(post);
        posts = posts.filter((p)=> id != p.id);
        res.redirect("/posts");

    });

//===============================================================================================>>


//===============================================================================================>>

app.listen(port ,()=>{

        console.log(`Listening on the port ${port}`);
});
