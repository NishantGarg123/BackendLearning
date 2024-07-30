
//==========================================================================>

const express = require('express');
const app = express();
const port = 8080;
//==========================================================================>

//==========================================================================>
    // const path = require("path");
    app.set("view engine" , "ejs");
    // app.set("views",path.join(__dirname,"/views"));
    
//==========================================================================>


//==========================================================================>
    const { faker, tr } = require('@faker-js/faker');
//==========================================================================>


//==========================================================================>
    //  requiring the mysql after installing the package mysql2
    const mysql = require('mysql2');
//==========================================================================>


//==========================================================================>
    // Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'nishant@NG',
  });

//==========================================================================>


//==========================================================================>

    //home route
    app.get("/" ,(req , res)=>{
        let q = `SELECT count(*) FROM user`;
        try{
            connection.query(q ,(err , result)=>{
            if(err) throw err;
            let count = result[0]['count(*)'];
            res.render("home.ejs",{count});
            });
          }
        catch(err)
        {
            console.log(err);
            res.send("Some Error Ocure in Database");
        }
    });

    //show route
    app.get("/user" , (req , res)=>{
    // res.send("success");
        const q = `SELECT * FROM user`;
        try{
            connection.query(q ,(err , result)=>{
            if(err) throw err;
                // console.log(result);
                res.render("showuser.ejs",{result});
                // res.send(result[0]);
            });
          }
        catch(err)
        {
            console.log(err);
            res.send("Some Error Ocure in Database");
        }

    });

    //Edit route
    app.get("/user/:id" , (req , res)=>{

       
        try
        {
            let {id} = req.params;
            let q= `SELECT * FROM user WHERE id = '${id}'`;
            connection.query(q, (err , res)=>{
                    if(err) throw err;
                    console.log(res);
                    res.send("Welcome");
                    // res.render("edit.ejs" , {id});
            });
        }
        catch(err)
        {
            res.send("Some Error Occure in dataBase");
        }       
    });

    app.listen(port ,()=>{

        console.log(`App is Runing on ${port} port`);
    });

//==========================================================================>
    