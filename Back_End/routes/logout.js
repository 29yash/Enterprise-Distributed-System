var express = require("express");
var router = express.Router();

router.post("/logout",function(req,res){
    let response= {};
    response['success'] = true;
    response['message'] = "User Logged out successfully";
    res.clearCookie("HomeawayAuth");
    res.status(200).send(response);
});

module.exports = router;