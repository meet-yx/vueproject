/**
 * Created by 饶江敏 on 2017/11/14.
 */
"use strict";
const myexpress = require("express");
const activityRoute = myexpress.Router();
const activityContorller=require("../controller/activityController.js");
//activityRoute.route("/activityList.do").get(activityContorller.getList1);
activityRoute.route("/activityList.do").post(activityContorller.activityList);
activityRoute.route("/activityInfo").post(activityContorller.getInfoById);
activityRoute.route("/activityAdd.do").post(activityContorller.getAdd);
activityRoute.route("/activityUpdateByState.do").post(activityContorller.getDel);
activityRoute.route("/activityUpdate.do").post(activityContorller.getUpdate);
activityRoute.route("/activitySearch.do").post(activityContorller.getSearch);
activityRoute.route("/activityListNum.do").post(activityContorller.getListPage);
//activityRoute.route("/activityCreate.html").get(activityContorller.addList);
module.exports=activityRoute;
