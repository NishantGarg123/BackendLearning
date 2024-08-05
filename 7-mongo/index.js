//======================================================================================>>
//creating the connection with our mongodb. 
const mongoose =require('mongoose');

main()
.then(res=>{ console.log("connection successful");})
.catch(err=>{ console.log(err);});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}
//======================================================================================>>]

//======================================================================================>>
//(schema)creating schema of our documents that will follow by collection

    const bookSchema = new mongoose.Schema({
        title:{
            type:String,
            required:true       //require true define that now it can not we null(similar to the sql not noll)
        },
        author:{
            type:String
        },
        price:{
            type:Number,
            min:[1,"price is too low for amazon products"]      //2nd message in array will display in error when condition not satisfy
        },
        discount:{
            type:Number,
            default:0
        },
        // category:{
        //     type:String,
        //     enum: ["fiction" , "non-fiction"]           //enum define that we can enter the value that are in the given arry.
        // }
        genre:[String]
    });
//======================================================================================>>

//======================================================================================>>
//(modeling)
const Book = mongoose.model("Book",bookSchema);
//======================================================================================>>


//======================================================================================>>
//(insert)
    //1.
        // const Book1 = new Book({
        //     title:"mathmatics XII",
        //     author:"RD Sharma",
        //     price:1200
        // });

        // Book1.save()
        // .then(res=>{   console.log(res); })
        // .catch(err=>{  console.log(err); });

   //2.this code will give error because we have require into the title field.
        // const Book1 = new Book({
        //     author:"RD Sharma",
        //     price:1200
        // });

        // Book1.save()
        // .then(res=>{   console.log(res); })
        // .catch(err=>{  console.log(err); });

    //3. 
        // const Book1 = new Book({
        //     title:"mathmatics VII",
        //     price:1200
        // });

        // Book1.save()
        // .then(res=>{   console.log(res); })
        // .catch(err=>{  console.log(err); });

    //4.Give error due to the constraints of price type tring
        // const Book1 = new Book({
        //     author:"nishant",
        //     title:"generation based ai tols uses",
        //     price:"abc"
        // });

        // Book1.save()
        // .then(res=>{   console.log(res); })
        // .catch(err=>{  console.log(err); });

    //5.it is not give error because we have passed a string but it is parseable to the number.
        // const Book1 = new Book({
        //     author:"mavel v3",
        //     title:"cartoons network s3",
        //     price:"2",
        //     // category:"comics"
        //     genre:["comics" ,"superheroes" ,"fiction"]
        // });

        // Book1.save()
        // .then(res=>{   console.log(res); })
        // .catch(err=>{  console.log(err); });


//======================================================================================>>


//======================================================================================>>
//update and follow the constraints of the schema
        Book.findByIdAndUpdate("66b078194e14b3a5c27fce06",{price:-400},{runValidators:true},{new:true})     //2nd argument is define that if we update the value then also our constraints(validators) apply.
        .then(res=>{ console.log(res);})
        .catch(err=>{ console.log(err.errors.price.properties.message);});

//======================================================================================>>