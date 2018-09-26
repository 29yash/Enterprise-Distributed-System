var express = require("express");
var router = express.Router();
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './photos');
    },
    filename: (req, file, callback) => {
        const newFilename =  uuidv4() + path.extname(file.originalname);
        callback(null, newFilename);
    },
  });
const upload = multer({ storage });
router.post('/uploadImage', upload.single('requestPhoto'), (req, res) => {
    let response = {};
    response['success'] = true;
    response['message'] = "Image uploaded successfully";
    response['url'] = "http://localhost:8080/photos/" + req.file.filename;
    res.status(200).send(response);
});
module.exports = router;
