const express = require('express');
const router = express.Router();

router.get("/" , (req , res) =>{

    res.send("GEt post");
})

router.get("/:id" , (req , res) =>{

    res.send("show users");
})



router.post("/" , (req , res) =>{

    res.send("post for posts");
})


router.delete("/:id" , (req , res) =>{

    res.send("delete for posts");
})


router.put("/:id" , (req , res) =>{

    res.send("update for posts");
})


module.exports = router;
