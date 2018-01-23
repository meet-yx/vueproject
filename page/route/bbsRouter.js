/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const express=require("express");
const bbsRoute=express.Router();
const bbsController=require("../controller/bbsController");

bbsRoute.route("/chat.do").get(bbsController.chattype);   //妈妈交流类别接口
bbsRoute.route("/question.do").post(bbsController.askquestion);   //妈妈交流提问接口
bbsRoute.route("/invitat.do").get(bbsController.invitatReply);   //妈妈交流帖子接口
bbsRoute.route("/content.do").get(bbsController.ArticleContent);   //妈妈交流文章接口
bbsRoute.route("/delete.do").get(bbsController.replyDelete);   //删除回复信息内容

//我的帖子
bbsRoute.route("/MomChatList.do").get(bbsController.MomChatList);  //显示我的帖子列表
bbsRoute.route("/MomChatListDel.do").post(bbsController.MomChatListDel);  //删除我的帖子

//我的回复
bbsRoute.route("/replyList.do").get(bbsController.replyList);  //显示我的回复信息列表
bbsRoute.route("/replyListDel.do").post(bbsController.replyListDel);  //删除我的回复信息

module.exports=bbsRoute;
