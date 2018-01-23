/**
 * Created by Administrator on 2017/11/15 0015.
 */
/**
 * State状态     0 禁用 	 	 1 可用
 * Type 收藏类型  0商品收藏  1文章收藏  2课程收藏
 */
"use strict";
const pool=require("../modal/sqlPool.js");
module.exports={
    getAllCourse(stageId){
        "use strict";
        //返回一个promise对象
        return new Promise(function (resolve, reject) {
            // let sql = "select * from videoComment as a join  videoCourse as b on b.id=a.id " ;
            let sql = "select * from videoCourse where stageId=? ";
            pool.query(sql, [stageId]).then(function (data) {   //pool.query返回的是一个promise对象，所以可以使用then
                //成功执行执行的方法
                resolve(data);
                // console.log(data)
            }).catch(function (err) {
                reject(err);
            });
        });
    },
    //  分页
    gettalcount(page,stageId){
        "use strict";
        return new Promise(function (resolve, reject) {
            let sql = "select count(1) as talcount from videocourse where StageId =?";
            pool.query(sql,[page,stageId]).then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            })
        });
    },
    getcoursepArticle(id){
        "use strict";
        return new Promise(function(resolve,reject){
            let sql ="select * from Article where id=? ";
            pool.query(sql,[id]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    getcoursepArticl(tit){
        "use strict";
        return new Promise(function(resolve,reject){
            let sql="select * from Article where id=? ";
            pool.query(sql,[tit]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    coursMusick(tit){
        "use strict";
        return new Promise(function(resolve,reject){
            let sql="select * from musiclist ";
            pool.query(sql,[tit]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    coursArticlek(pok){
        "use strict";
        return new Promise(function(resolve,reject){
            let sql="select * from  Article where id=?";
            pool.query(sql,[pok]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    getArticl(){
        return new Promise((resolv,reject)=>{
            let sql= "select * from article limit 2";
            pool.query(sql,[],(err,data)=>{
                if(err)
                {
                    reject(err)
                }else{
                    resolv(data)
                }
            })
        })
    },
    gettypecourse(sql,param){
        return new Promise((resolve,reject)=>{
            pool.query(sql,param,(err,data)=>{
                if(err)
                {
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    articKolol(sql,param){//param 是数组的变量名 是传过来的实际参数
        return new Promise((resolve,reject)=>{
            pool.query(sql,param,(err,data)=>{
                if(err){reject(err)}else{resolve(data)}
            })
        })
    },
    articMou(){
        "use strict";
        return new Promise((resolve,reject)=>{
            let sql = "select count(*) as atcount from Article";
            pool.query(sql,[]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },

    //显示文章收藏列表
    articleCollect(){
        return new Promise(function (reslove, reject) {
            let sql = "SELECT title  FROM collect,Article " +
                "WHERE collect.type=1 AND collect.state=1 AND Article.state=1";
            pool.query(sql, []).then(function (data) {
                reslove(data);
            }).catch(function (err) {
                reject(err);
            })
        })
    },
    //取消文章收藏列表
    articleCollectDel(delId){
        return new Promise(function(reslove,reject){
            let sql="update collect set state=0 where id=?";
            pool.query(sql,[delId]).then(function(data){
                reslove(data)
            }).catch(function(err){
                reject(err)
            })
        })
    },
    //显示课程收藏列表
    courseCollect(){
        return new Promise(function (reslove, reject) {
            let sql = "SELECT courseName  FROM collect,videoCourse " +
                "WHERE collect.type=1 AND collect.state=1 AND videoCourse.state=1";
            pool.query(sql, []).then(function (data) {
                reslove(data);
            }).catch(function (err) {
                reject(err);
            })
        })
    },
    //取消课程收藏列表
    courseCollectDel(delId){
        return new Promise(function(reslove,reject){
            let sql="update collect set state=0 where id=?";
            pool.query(sql,[delId]).then(function(data){
                reslove(data)
            }).catch(function(err){
                reject(err)
            })
        })
    }
};