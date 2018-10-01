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
    }
  });

const fileFilter = function (req, file, callback) {
    console.log(path.extname(file.originalname));
    if (path.extname(file.originalname) === '.png' || path.extname(file.originalname) === '.jpg' || path.extname(file.originalname) === '.jpeg') {
        return callback(null, true)
    }
    callback(null, false);
}

const upload = multer({ storage, fileFilter });
module.exports = upload;