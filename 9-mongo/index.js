//======================================================================================>>
//creating the connection with our mongodb.                
        const mongoose = require('mongoose');

        main()
        .then((res)=>{
                console.log("connection successfull")  ;
            })
        .catch(err => console.log(err));

        async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        }

//======================================================================================>>


//======================================================================================>>
//(schema)creating schema of our documents that will follow by collection

        const userschema = new mongoose.Schema({

            name:String,
            email:String,
            age:Number
        });
//======================================================================================>>

//======================================================================================>>
//(model)defining the model OR (defining the collection name with the schema)

        const User = mongoose.model("User",userschema);

//======================================================================================>>


//======================================================================================>>
//(insert one)inserting the document with in the collection

        // const user1 = new User({name:"Nishant garg", email:"gargacsnishant@gmail.com",age:20})
        // const user2 = new User({name:"parash garg", email:"parashacs@gmail.com",age:15})
        // user1.save()
        // .then((result)=>{console.log(result);})
        // .catch((err)=>{console.log(err)});
        // user2.save()
        // .then((result)=>{console.log(result);})
        // .catch((err)=>{console.log(err)});

//======================================================================================>>


//======================================================================================>>
//(insert many) inserting multiple users at once
        // User.insertMany(
        // [
        //         {name:"parash" , email:"abc@gmail.com",age:15},
        //         {name:"shiv", email:"xyz@yahoo.in",age:20}
        // ]
        // )
        // .then((res)=>{console.log(res)})
        // .catch((err)=>{console.log(err)});

//======================================================================================>>


//======================================================================================>>
//(find)find method return the query that is the thenable query.

     
   // User.find({age:{$gte:15}})
        // .then(result=>{
        //         console.log(result[0].name);
        // })
        // .catch(err=>{
        //         console.log(err);
        // });
//         User.findOne({age:{$gt:15}})
//         .then(result=>{
//                 console.log(result);
//         })
//         .catch(err=>{
//                 console.log(err);
//         });

        // User.findById("66af8f34ea307759321a8874")
        // .then(result=>{
        //         console.log(result);
        // })
        // .catch(err=>{
        //         console.log(err);
        // });

        // User.findByIdAndDelete("66af8f34ea307759321a8874")
        // .then(result=>{
        //         console.log(result);
        // })
        // .catch(err=>{
        //         console.log(err);
        // });
//======================================================================================>>

//======================================================================================>>
//(update)

        // User.updateOne({name:"shiv"},{age:40})
        // .then(result=>{
        //         console.log(result);
        // })
        // .catch(err=>{
        //         console.log(err);
        // });

        // User.updateMany({name:"shiv"},{age:100})
        // .then(result=>{
        //         console.log(result);
        // })
        // .catch(err=>{
        //         console.log(err);
        // });

        // User.find().then(res=>{
        //         console.log(res);
        // })
        // .catch(err=>{
        //         console.log(err);
        // });

//======================================================================================>>

//======================================================================================>>
//update is give the info that how much modified but does not give the  updated document thats why we use update with find
//(find and update)
        // User.findOneAndUpdate({name:"parash"},{name:"parash agrawal"},{new:true})     //here true used so that it return the updated value rather then the old value
        // .then(result=>{
        //         console.log(result);
        // })
        // .catch(err=>{
        //         console.log(err);
        // });

        // User.findByIdAndUpdate("66b053e0565f5f95479386ac",{name:"krishna-chaturvedi"},{new:true})        //here true used so that it return the updated value rather then the old value
        // .then(result=>{
        //         console.log(result);
        // })
        // .catch(err=>{
        //         console.log(err);
        // });

//======================================================================================>>

//======================================================================================>>
//(delete)

        // User.deleteOne({name:"krishna-chaturvedi"})
        // .then(res=>{
        //         console.log(res);
        // })
        // .catch(err=>{
        //         console.log(err);
        // });

        // User.deleteMany({age:15})
        // .then(res=>{
        //         console.log(res);
        // })
        // .catch(err=>{
        //         console.log(err);
        // });
//======================================================================================>>


//======================================================================================>>
//deleteis give the info that how much modified but does not give the  deleted document thats why we use delete with find
//(find and delete)

        // User.findOneAndDelete({name:"parash garg"})
        // .then(res=>{
        //         console.log(res);
        // })
        // .catch(err=>{
        //         console.log(err);
        // });

        // User.findByIdAndDelete("66b064a99fd09d60c8f575c6",{name:"parash garg"})
        // .then(res=>{
        //         console.log(res);
        // })
        // .catch(err=>{
        //         console.log(err);
        // });

//======================================================================================>>


//======================================================================================>>
//(schema validation) Similar to the sql constraints we are going to define some constraints of our schema.

//======================================================================================>>