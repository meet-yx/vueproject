/**
 * Created by zx on 2017/11/14.
 */
"use strict";

const pool = require("./sqlPool.js");

module.exports = {
    articleList(id,title,author,state,pageSize,currentPage){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `SELECT a.*,u.username FROM article AS a LEFT JOIN USER AS u ON u.id=a.createuser  where 1=1`;
            if (id){//修改时传id就进入这里，查询出一条数据
                sql+=" and a.id = ? ";
                arr.push(id)
            }else{//从查询的input框获取值，如果没有写 或者没有选就为undefined 就不进入if
                if(title){
                    title = "%"+title+"%";
                    sql+=" and a.title like ? ";
                    arr.push(title)
                }
                if(author){
                    author = "%"+author+"%";
                    sql+=" and a.author like ? ";
                    arr.push(author)
                }
                if(state){
                    sql+=" and a.state = ? ";
                    arr.push(state)
                }
                //pageSize= pageSize?pageSize:db.pageSize;
                pageSize=parseInt(pageSize);
                let start =(currentPage-1)*pageSize;
                sql+=" order by id limit ?,?";
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
    articleListNum(title,author,state){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `select count(1) as totleCount from article where 1=1 `;
            if(title){
                title = "%"+title+"%";
                sql+=" and title like ? ";
                arr.push(title)
            }
            if(author){
                author = "%"+author+"%";
                sql+=" and author like ? ";
                arr.push(author)
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
    articleDelete(state,id){
        return new Promise ((resolve,reject)=>{
            let sql= `update article set state = ? where id = ?`;
            pool.query(sql,[state,id]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //新增
    articleAdd(title,author,path,content,userId){
        return new Promise ((resolve,reject)=>{
            let sql= `INSERT INTO article VALUES (NULL,?,?,?,0,0,?,?,NOW(),DEFAULT)`;
            pool.query(sql,[title,content,author,path,userId]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //通过session存的用户名 查询当前用户的用户id
    userFind(userName){
        return new Promise(function(resolve,reject){
            let sql ="select id from user where userName = ?";
            pool.query(sql,[userName]).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err)
            })
        });
    },
    //修改
    articleUpdate(title,author,htmlStr,id){
        return new Promise ((resolve,reject)=>{
            let sql= `update article set title = ? , author= ? , content = ? where id = ?`;
            pool.query(sql,[title,author,htmlStr,id]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //列表 ejs，ajax，查询
    courseList(id,courseName,createUser,state,pageSize,currentPage){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `SELECT v.id,v.courseName,c.stageName,v.courseDes,v.videoSrc,v.praise,v.collect,v.thumbnail,v.DATE,v.state,v.createuser
                   FROM videocourse AS v JOIN coursestage AS c
               ON v.stageId=c.id
                      WHERE 1=1 `;
            if (id){//修改时传id就进入这里，查询出一条数据
                sql+=" and v.id = ? ";
                arr.push(id)
            }else{//从查询的input框获取值，如果没有写 或者没有选就为undefined 就不进入if
                if(courseName){
                    courseName = "%"+courseName+"%";
                    sql+=" and v.courseName like ? ";
                    arr.push(courseName)
                }
                if(createUser){
                    createUser = "%"+createUser+"%";
                    sql+=" and v.createuser like ? ";
                    arr.push(createUser)
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
    courseListNum(courseName,createUser,state){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `select count(1) as totleCount from videocourse where 1=1 `;
            if(courseName){
                courseName = "%"+courseName+"%";
                sql+=" and courseName like ? ";
                arr.push(courseName)
            }
            if(createUser){
                createUser = "%"+createUser+"%";
                //sql+=" and createuser =(SELECT u.id FROM USER AS u WHERE u.userName LIKE ? ) ";
                sql+=" and createuser like ? ";
                console.log(sql)
                arr.push(createUser)
            }
            if(state){
                sql+=" and state = ? ";
                arr.push(state)
            }
            //console.log(sql)
            //console.log("zongtiao",arr)
            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //修改用户的状态(假删除)
    courseDelete(state,id){
        return new Promise ((resolve,reject)=>{
            let sql= `update videoCourse set state = ? where id = ?`;
            pool.query(sql,[state,id]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //添加
    addCourse(courseName,stageId,courseDes,videoSrc,praise,collect,createuser,state){
        return new Promise(function(resolve,reject){
            let sql="insert into videoCourse(id,courseName,stageId,courseDes,videoSrc,praise,collect,DATE,createuser,state) values(null,?,?,?,?,?,?,?,?,?)";
            //console.log(sql);
            let createTime = new Date();
            //console.log(createuser);
            pool.query(sql,[courseName,stageId,courseDes,videoSrc,praise,collect,createTime,createuser,state]).then(function(data){
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
     * 5.根据id获取信息
     * */
    courseInfo(id){
        return new Promise(function(resolve,reject){
            let sql="select a.*,b.stagename,c.username from videoCourse as a left join coursestage as b on a.id = b.id left join USER as c on a.id = c.id  where a.id=?";
            pool.query(sql,[id]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    /*
     * 3、修改指定活动
     * */
    courseUpdate(id,courseName,stageName,courseDes,videoSrc,praise,collect,DATE,userName){
        return new Promise(function(resolve,reject){
            let createTime = new Date();
            //console.log(stageName);
            let sql="UPDATE USER AS u JOIN coursestage AS c JOIN videocourse AS v  ON u.id=v.id AND c.id=v.id  SET v.courseName=?,c.stageName=?,v.courseDes=?,v.videoSrc=?,v.praise=?,v.collect=?,v.DATE=?,u.userName=? WHERE c.id=? ";
            pool.query(sql,[courseName,stageName,courseDes,videoSrc,praise,collect,DATE,userName,id]).then(function(data){
                //console.log(createTime);
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    }
};