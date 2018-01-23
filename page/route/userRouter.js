/**
 * Created by zx on 2017/11/14.
 * update by yx on 2017/11/14
 */
"use strict";
const express=require("express");
const userRoute=express.Router();
const userController=require("../controller/userController.js");

//登陆
userRoute.route("/login.do").post(userController.userLogin);
//注册
userRoute.route("/register.do").post(userController.userRegister);
//验证用户名是否重复
userRoute.route("/registerTest.do").post(userController.userRegisterTest);
//忘记密码修改密码
userRoute.route("/forgetPwd.do").post(userController.userForgetPwd);

//个人信息管理
userRoute.route("/userList.do").get(userController.userList);     //显示个人信息
userRoute.route("/userUpdate.do").post(userController.userUpdate);     //修改个人信息

//地址管理
userRoute.route("/addressList.do").get(userController.addressList);     //显示地址信息
userRoute.route("/addressDel.do").post(userController.addressDel);     //删除地址信息
userRoute.route("/addressUpdate.do").post(userController.addressUpdate);     //修改地址信息
userRoute.route("/addressAdd.do").post(userController.addressAdd);     //新增地址信息

module.exports=userRoute;
