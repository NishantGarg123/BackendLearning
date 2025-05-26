const express = require('express')
const router = express.Router();


router.get("/" , (req , res) =>{

    res.send("GEt users");
})

router.get("/:id" , (req , res) =>{

    res.send("show users");
})



router.post("/" , (req , res) =>{

    res.send("post for users");
})


router.delete("/:id" , (req , res) =>{

    res.send("delete for users");
})


router.put("/:id" , (req , res) =>{

    res.send("update for users");
})

module.exports = router;