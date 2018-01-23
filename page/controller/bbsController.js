/**
 * Created by Administrator on 2017/11/15 0015.
 */
"use strict";
const bbsModal=require("../modal/bbsModel.js");

module.exports= {
    //妈妈交流首页
    chattype(req,res){
        let chattypeInfo;
        let chatTitleThumInfo;
        bbsModal.chattype().then(function(data){   //妈妈交流类型

            chattypeInfo=data;
        }).then(function(){
            bbsModal.chatTitleContent().then(function(data){  //妈妈交流标题和缩略图
                chatTitleThumInfo=data;
                console.log(data)
                res.json({"chattype":chattypeInfo,"chatTitleThum":chatTitleThumInfo});
            })}).catch(function(err){
            console.log(err);
            res.send({code:500});
        })
    },
    //妈妈提问页
    askquestion(req,res){
        let communTheme;    //主题分类
        let chattypeInfo;   //交流类型
        let Issuearguments;  //发帖内容
        let type=req.body.type;   //交流类型
        let Issuesubject=req.body.Issuesubject;   //交流主题
        let IssueTitle=req.body.IssueTitle;   //发布主题
        let IssueContent=req.body.IssueContent;   //发布内容
        // console.log(req.body)
        bbsModal.addIssueContent(type,Issuesubject,IssueTitle,IssueContent).then(function(data){    //添加发帖内容
            Issuearguments=data;
        }).then(function(){
            bbsModal.communTheme().then(function(data){    //交流主题
                communTheme=data;
            })
        }).then(function(){
            bbsModal.chattype().then(function(data){   //交流类型
                chattypeInfo=data;
                res.json({"Issuearguments":Issuearguments,"communTheme":communTheme,"chattype":chattypeInfo});
            })
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        })
    },
    invitatReply(req,res){
        let userInfo;
        let relaytotal;
        bbsModal.landlordIno().then(function(data){    //楼主发帖信息
            userInfo=data;
        }).then(function(){
            bbsModal.relaytotal().then(function(data){  //回复总数
                relaytotal=data;
                res.json({"userInfo":userInfo,"relaytotal":relaytotal});
            })
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        })
    },
    //文章内容
    ArticleContent(req,res){
        let ArticleContent;
        let relaytotal;
        let userInfor;
        let replayInfor;
        bbsModal.ArticleContent().then(function(data){    //帖子内容
            ArticleContent=data;
        }).then(function(){
            bbsModal.relaytotal().then(function(data){   //回复总数
                relaytotal=data;
            })
        }).then(function(){
            bbsModal.userInfor().then(function(data){   //用户信息
                userInfor=data;
            })
        }).then(function(){
            bbsModal.replayInfor().then(function(data){  //帖子回复内容
                replayInfor=data;
                res.json({"ArticleContent":ArticleContent,"relaytotal":relaytotal,"userInfor":userInfor,"replayInfor":replayInfor});
            })
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        })
    },
    replyDelete(req,res){
        bbsModal.replyDelete().then(function (data) {
            res.json({"data": data})
        }).catch(function (err) {
            console.log(err);
            res.send({code: 500});
        })
    },

    //我的帖子——显示我的帖子列表
    MomChatList(req, res){
        "use strict";
        bbsModal.MomChatList().then(function (data) {
            res.json({code: 200, data: data})
        }).catch(function (err) {
            res.send({code: 500})
        })
    },
    //我的帖子——删除我的帖子
    MomChatListDel(req,res){
        "use strict";
        let delId=req.body.delId;  //获取需要删除的id
        bbsModal.MomChatListDel(delId).then(function (data) {
            res.json({code: 200, data: data})
        }).catch(function (err) {
            res.send({code: 500})
        })
    },
    //我的回复——显示我的回复信息列表
    replyList(req, res){
        "use strict";
        bbsModal.replyList().then(function (data) {
            res.json({code: 200, data: data})
        }).catch(function (err) {
            res.send({code: 500})
        })
    },
    //我的回复——删除我的回复信息
    replyListDel(req,res){
        "use strict";
        let delId=req.body.delId;  //获取需要删除的id
        bbsModal.replyListDel(delId).then(function (data) {
            res.json({code: 200, data: data})
        }).catch(function (err) {
            res.send({code: 500})
        })
    }
};