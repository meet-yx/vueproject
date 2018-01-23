/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const express = require("express");
const userRoute = express.Router();
const userControl = require("../controller/userController.js");

userRoute.post("/login.do",userControl.login);
userRoute.post("/userList.do",userControl.userListAjax);
userRoute.post("/userAdd.do",userControl.userAdd);
userRoute.post("/userDelete.do",userControl.userDelete);
userRoute.post("/userListNum.do",userControl.userListNum);


module.exports = userRoute;
