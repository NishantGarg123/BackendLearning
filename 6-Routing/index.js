
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
    app.get("/user/:id/edit" , (req ,res)=>{
        try
        {
           let {id} = req.params;
           let q= `SELECT * FROM user WHERE id ='${id}'`;
           connection.query(q, (err , result)=>{
                   if(err) throw err;
                //    console.log(result);
                   let user_data = result[0];
                   res.render("edit.ejs" , {user_data});
           });
        }
        catch(err)
        {
           res.send("Some Error Occure in dataBase");
        }
               
          
       });
       
    //Update (Modification) in database
    
    const MethodOverride = require("method-override");      // install using (npm i method-override) so that we can convert our post request to patch request.
    app.use(MethodOverride('_method'));
    app.use(express.urlencoded({extended: true}));      //to encode our data coming from the form
    
    app.patch("/user/:id" , (req , res)=>{       
        
        let {id} = req.params;
        let {username:new_username , password:form_pass} = req.body;
        let q = `SELECT * FROM user WHERE id ='${id}'`;
        try
        {           
            connection.query(q , (err,result)=>{
                if(err) throw err;
                let user = result[0];
                {
                    if(form_pass != user.password)
                    {
                            res.send("Wrong Password");
                    }
                    else
                    {
                        let q = `UPDATE user SET username ='${new_username}' WHERE id='${id}'` ;
                        connection.query(q , (err , result)=>{
                            if(err) throw err;
                            // console.log(result);
                            res.redirect("/user");
                            
                        });
                    }
                }       
            });
        }
        catch(err)
        {
            res.send(err);
        }       
    });

    


    app.listen(port ,()=>{

        console.log(`App is Runing on ${port} port`);
    });

//==========================================================================>
    