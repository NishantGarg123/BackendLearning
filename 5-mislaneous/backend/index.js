const express = require("express");
const app = express();

const port =8080;

app.listen(port , ()=>{
    console.log(`listening at the port ${port}`);
});

//===================================================================>>
    //this code is used to encode our post data.
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//===================================================================>>

app.get("/register" ,(req, res)=>{
    // res.send("Standard get Request");
    let {user , pass} = req.body;
    res.send(`welcome ${user}`);
});

app.post("/register" ,(req, res)=>{
    // res.send("Standard get Request");
    let {user , pass} = req.body;
    res.send(`welcome ${user}`);
});