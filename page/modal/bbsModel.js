/**
 * Created by Administrator on 2017/11/15 0015.
 */
"use strict";
const pool=require("../modal/sqlPool.js");
module.exports={
    //妈妈交流类型
    chattype(){
        return new Promise(function (resolve, reject) {
            let sql = "SELECT (SELECT NAME FROM dictionary AS d WHERE d.id = m.type ) AS chatTYPE FROM  momchat AS m WHERE state=1;";
            pool.query(sql,[]).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
        })
    },
    //妈妈交流标题和缩略图
    chatTitleContent(){
        return new Promise(function (resolve, reject) {
            let sql = "select title,Thumbnail from MomChat where state=1";
            pool.query(sql, []).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
        })
    },
    //交流主题
    communTheme(){
        return new Promise(function(resolve,reject){
            let sql ="SELECT (SELECT NAME FROM dictionary AS d WHERE d.id = m.theme ) AS theme FROM  momchat AS m WHERE state=1";
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //添加发帖内容
    addIssueContent(id ,title ,content,userid,praise,theme,Thumbnail,TYPE,DATA,state){
        return new Promise(function(resolve,reject){
            let sql ="insert into MomChat values(null,?,?,?,?,?,?,?,?,?)";
            pool.query(sql,[id ,title ,content,userid,praise,theme,Thumbnail,TYPE,DATA,state]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //楼主发帖信息
    landlordIno(){
        return new Promise(function(resolve,reject){
            let sql="SELECT *,(SELECT NAME FROM dictionary AS d WHERE d.id = m.theme ) AS theme,(SELECT NAME FROM dictionary AS d WHERE d.id = m.type ) AS TYPE FROM  momchat AS m LEFT JOIN USER AS u ON m.userid=u.id;";
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //总回复数
    relaytotal(){
        return new Promise(function(resolve,reject){
            let sql="SELECT COUNT(invitatid) AS replaytotal FROM reply where state=1;";
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //文章内容
    ArticleContent(){
        return new Promise(function(resolve,reject){
            let sql="select * from MomChat where state=1";
            pool.query(sql,[]).then(function (data) {
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //用户信息
    userInfor(){
        return new Promise(function(resolve,reject){
            let sql="select * from user where state=1";
            pool.query(sql,[]).then(function (data) {
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //回复内容
    replayInfor(){
        return new Promise(function(resolve,reject){
            let sql="select * from reply where state=1";
            pool.query(sql,[]).then(function (data) {
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //删除回复
    replyDelete(){
        return new Promise(function(resolve,reject){
            let sql="update reply set state=0";
            pool.query(sql,[]).then(function (data) {
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },

    //显示我的帖子列表
    MomChatList(){
        return new Promise(function (reslove, reject) {
            let sql = "select * from MomChat where state=1";
            pool.query(sql, []).then(function (data) {
                reslove(data);
            }).catch(function (err) {
                reject(err);
            })
        })
    },
    //删除我的帖子
    MomChatListDel(delId){
        return new Promise(function(reslove,reject){
            let sql="update MomChat set state=0 where id=?";
            pool.query(sql,[delId]).then(function(data){
                reslove(data)
            }).catch(function(err){
                reject(err)
            })
        })
    },
    //显示我的回复信息列表
    replyList(){
        return new Promise(function(reslove,reject){
            let sql="select * from Reply";
            pool.query(sql,[]).then(function(data){
                reslove(data)
            }).catch(function(err){
                reject(err)
            })
        })
    },
    //删除我的回复信息列表
    replyListDel(delId){
        return new Promise(function(reslove,reject){
            let sql="update Reply set state=0 where id=?";
            pool.query(sql,[delId]).then(function(data){
                reslove(data)
            }).catch(function(err){
                reject(err)
            })
        })
    }
};
