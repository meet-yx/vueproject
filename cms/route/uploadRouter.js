/**
 * Created by zx on 2017/11/17.
 */
"use strict";
const express = require("express");
const uploadRouter = express.Router();



//图片上传
uploadRouter.post("/uploadImg.do",function(req,res){
    var fname = req.files.imgFile.path.replace("public\\upload\\", "").replace("public/upload/", "");
    //console.log(fname)
    var info = {
        "error": 0,
        "url": "/upload/"+fname
    };
    res.send(info);
});

module.exports = uploadRouter;

