var express = require("express");
var router = express.Router();

router.get("/",function(req,res,next) {
    res.send("hi hi api is working naja");
});
router.post("/",function(req,res,next) {
    console.log(req.body)
    res.send("hi hi api is working naja");
});


module.exports = router ;