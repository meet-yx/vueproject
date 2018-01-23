/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const express = require("express");
const replyRoute = express.Router();
const replyControl = require("../controller/replyController.js");


replyRoute.post("/videoCommentList.do",replyControl.videoCommentAjax);
replyRoute.post("/videoDelete.do",replyControl.videoDelete);
replyRoute.post("/videoCommentNumber.do",replyControl.videoCommentNumber);//获取总页数


replyRoute.post("/replyList.do",replyControl.replyListAjax);
replyRoute.route("/replyUpdate.do").post(replyControl.replyUpdate);
replyRoute.route("/replyInfo").post(replyControl.replyInfo);
replyRoute.route("/addReply.do").post(replyControl.addReply);
replyRoute.post("/replyDelete.do",replyControl.replyDelete);
replyRoute.post("/replyListNum.do",replyControl.replyListNum);

module.exports = replyRoute;
