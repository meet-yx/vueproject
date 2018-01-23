/**
 * Created by zx on 2017/11/14.
 */
"use strict";


const myexpress = require("express");
const myRoute = myexpress.Router();
const userControl = require("../controller/userController.js");
const courseControl = require("../controller/courseController.js");
const musicControl = require("../controller/musicController.js");
const orderControl = require("../controller/orderController.js");
const agencyControl = require("../controller/agencyController.js");
const replyControl = require("../controller/replyController.js");
const bbsControl = require("../controller/bbsController.js");
const activityContorller = require("../controller/activityController.js");

myRoute.route("/courseList.html").get(courseControl.courseList);
myRoute.route("/replyList.html").get(replyControl.replyList);
myRoute.route("/userList.html").get(userControl.userList);
myRoute.route("/articleList.html").get(courseControl.articleList);
myRoute.route("/articleEdit.html/:id").get(courseControl.articleEdit);
myRoute.route("/musicList.html").get(musicControl.musicList);
myRoute.route("/agencyList.html").get(agencyControl.agencyList);
myRoute.route("/orderList.html").get(orderControl.orderList);
myRoute.route("/videoCommentList.html").get(replyControl.videoComment);
myRoute.route("/bbsList.html").get(bbsControl.bbsList);
myRoute.route("/activityManage.html").get(activityContorller.getList);
myRoute.route("/index.html").get(userControl.index);


module.exports = myRoute;