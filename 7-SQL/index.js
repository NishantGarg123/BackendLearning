
//==========================================================================>
const { faker, tr } = require('@faker-js/faker');
// const getRandomUser= ()=> {
//   return {
//     userId: faker.datatype.uuid(),
//     username: faker.internet.userName(),
//     email: faker.internet.email(),
//     password: faker.internet.password()
//   //   avatar: faker.image.avatar(),
//   //   birthdate: faker.date.birthdate(),
//   //   registeredAt: faker.date.past(),
//   };
// }
//==========================================================================>}


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
    //How to use (Execute the query) after the connection has been Establish.

  //first query
        // let q = "SHOW TABLES";

  //second query
      // let q = "INSERT INTO user (id , username , email , password) VALUES (?),(?)";
      // let users =[ ['12345f' , "abc_namef" , "abcde@gamil.comf" , "abcf"],
      //              ['12345d' , "abc_named" , "abcde@gamil.comd" , "abcd"]];

  //Inserting data in bulk
        const getRandomUser= ()=> {
            return [
              faker.datatype.uuid(),
              faker.internet.userName(),
              faker.internet.email(),
              faker.internet.password()
            ];
          }
          
        let data = [];
        for(let i=0 ; i<100 ; i++)
        {
          data.push(getRandomUser());
        }

        let q = `INSERT INTO user (id , username , email , password) VALUES ?`;

try{

        connection.query(q ,[data], (err , result)=>{
        if(err) throw err;
        console.
        log(result);
        
        });
}
catch(err){
    console.log(err);
}
connection.end();

//==========================================================================>