/**
 * Created by zx on 2017/11/14.
 */
"use strict";

const pool = require("./sqlPool.js");


module.exports = {
    //视频评论列表
    videoComment(id,userName,state,pageSize,currentPage){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `
SELECT b.id,a.userName,c.courseName,b.content,b.praise,b.LEVEL,b.DATE,b.state
  FROM USER AS a JOIN videocomment AS b JOIN videocourse
 AS c ON a.id=b.userId AND b.courseId=c.id where 1=1 `;
            if (id){
                sql+=" and b.id = ? ";
                arr.push(id)
            }else{
                if(userName){
                    userName = "%"+userName+"%";
                    sql+=" and a.userName like ? ";
                    arr.push(userName)
                }
                if(state){
                    sql+=" and b.state = ? ";
                    arr.push(state)
                }
                pageSize=parseInt(pageSize);
                let start =(currentPage-1)*pageSize;
                sql+=" order by b.id limit ?,?";
                arr.push(start);
                arr.push(pageSize);
            }
            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //删除视频评论
    videoDelete(state,id){
        return new Promise ((resolve,reject)=>{
            let sql= `update videoComment set state = ? where id = ?`;
            pool.query(sql,[state,id]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                console.log(err);
                reject(err)
            })
        })
    },
    //获取总条数
    videoCommentNumber(userName,state){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `select count(1) as totalCount,u.userName from videoComment
                       as v join user as u on v.userId=u.id where 1=1 `;
            if(userName){
                userName = "%"+userName+"%";
                sql+=" and u.userName like ? ";
                arr.push(userName)
            }
            if(state){
                sql+=" and v.state = ? ";
                arr.push(state)
            }
            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //列表 ejs，ajax，查询
    replyList(id,courseName,state,pageSize,currentPage){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `SELECT v.id,u.userName,v.content,v.praise,v.LEVEL,v.DATE,v.state
                   FROM USER AS u JOIN Reply AS v
                   ON u.id=v.userId
                      WHERE 1=1`;
            if (id){//修改时传id就进入这里，查询出一条数据
                sql+=" and v.id = ? ";
                arr.push(id)
            }else{//从查询的input框获取值，如果没有写 或者没有选就为undefined 就不进入if
                if(courseName){
                    courseName = "%"+courseName+"%";
                    sql+=" and u.userName like ? ";
                    arr.push(courseName)
                }
                if(state){
                    sql+=" and v.state = ? ";
                    arr.push(state)
                }
                //pageSize= pageSize?pageSize:db.pageSize;
                pageSize=parseInt(pageSize);
                let start =(currentPage-1)*pageSize;
                sql+=" order by v.id limit ?,?";
                arr.push(start);
                arr.push(pageSize);
            }
            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //获取总条数
    replyListNum(courseName,state){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `select count(1) as totleCount from reply where 1=1 `;
            if(courseName){
                courseName = "%"+courseName+"%";
                sql+=" and userId =(SELECT u.id FROM USER AS u WHERE u.userName LIKE ? ) ";
                arr.push(courseName)
            }
            if(state){
                sql+=" and state = ? ";
                arr.push(state)
            }
            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //修改用户的状态(假删除)
    replyDelete(state,id){
        return new Promise ((resolve,reject)=>{
            let sql= `update reply set state = ? where id = ?`;
            pool.query(sql,[state,id]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //添加
    //addReply(userId,content,praise,LEVEL,state){
    //     return new Promise(function(resolve,reject){
    //         let sql="insert into reply(id,userId,content,praise,LEVEL,DATE,state) values(null,?,?,?,?,?,?)";
    //         //console.log(sql);
    //         let createTime = new Date();
    //         //console.log(createuser);,
    //        pool.query(sql,[userId,content,praise,LEVEL,createTime,state]).then(function(data){
    //             resolve(data);
    //         }).catch(function(err){
    //             reject(err);
    //         })
    //     })
    // },
    /*
     * 5.根据id获取信息
     * */
    replyInfo(id){
        return new Promise(function(resolve,reject){
            let sql=" select * from reply where id=?";
            pool.query(sql,[id]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //根据用户名获取用户id
    userFind(userName){
        return new Promise((resolve,reject)=>{
            let sql="select id from user where userName=? ";
            pool.query(sql,[userName]).then((data)=>{
                resolve({code:200,data:data});
                //console.log(data);
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    /*
     * 3、修改指定活动
     * */
    replyUpdate(id,userId,content,praise,LEVEL,DATE,state){
        return new Promise(function(resolve,reject){
            let createTime = new Date();
            let sql="update reply set userId=?,content=?,praise=?,LEVEL=?,DATE=?,state=? where id=?";
            pool.query(sql,[userId,content,praise,LEVEL,createTime,state,id]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    }
};