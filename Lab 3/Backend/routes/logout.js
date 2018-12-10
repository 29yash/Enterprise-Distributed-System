var express = require("express");
var router = express.Router();

router.delete("/logout",function(req,res){
    let response= {};
    req.logout();
    response['success'] = true;
    response['message'] = "User Logged out successfully";
    res.status(200).send(response);
});

module.exports = router;