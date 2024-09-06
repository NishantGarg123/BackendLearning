
const mongoose = require('mongoose');

main()
.then(result =>{ console.log("DB connected successfully"); })
.catch(err=> console.log(err));


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
};


const userSchema = new mongoose.Schema({

    userName:String,
    email:String
});

const User = mongoose.model("User" , userSchema);


const postSchema = new mongoose.Schema({
    content:String,
    likes:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
});


const Post = mongoose.model("Post" , postSchema);

const addData = async()=>{

    let user1 = new User(
        {
            userName:"nishant Garg",
            email:"gagracsnishant@gmail.com",
    });

    let post1 = new Post({
        content:"Hello World !",
        likes:"9",
    });

    post1.user = user1;

    let saved_user = await user1.save();
    let saved_post = await post1.save();
    console.log(saved_user);
    console.log(saved_post);;
}

// addData();


// ========================================>>>

//print the value

const getData = async()=>{

    let res = await Post.find({}).populate("user");
    // let res = await Post.find({});
    console.log(res);
};

getData();