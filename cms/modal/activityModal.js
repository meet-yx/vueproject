/**
 * Created by 饶江敏 on 2017/11/14.
 * 活动表
 */
"use strict";
const pool=require("./sqlPool.js");

module.exports={
    /*
     * 1、查询所有活动的信息
     * */
    //列表 ejs，ajax，查询
    activityList(id,name,hoster,createUser,state,pageSize,currentPage){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql="SELECT a.*,b.userName FROM activity AS a left JOIN USER AS b ON a.createuser=b.id where 1=1 ";
            if (id){//修改时传id就进入这里，查询出一条数据
                sql+=" and a.id = ? ";
                arr.push(id)
            }else{//从查询的input框获取值，如果没有写 或者没有选就为undefined 就不进入if
                if(name.length>0){
                    name = '%'+name+'%';
                    sql +=" and a.name like ?";
                    arr.push(name);
                }
                if(hoster.length>0){
                    hoster = '%'+hoster+'%';
                    sql +="and a.hoster like ?";
                    arr.push(hoster);
                }
                if(createUser.length>0){
                    createUser = '%'+createUser+'%';
                    sql +="and b.createUser like ?";
                    arr.push(createUser);
                }
                if(state.length>0){
                    sql +="and a.state like ?";
                    arr.push(state);
                }
                pageSize=parseInt(pageSize);
                let start =(currentPage-1)*pageSize;
                sql+=" order by a.id limit ?,?";
                arr.push(start);
                arr.push(pageSize);
            }
            console.log(sql);
            console.log(arr);
            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    getList(currentPage,pageSize){
    return new Promise(function(resolve,reject){
        let sql="SELECT a.*,b.userName FROM activity AS a left JOIN USER AS b ON a.createuser=b.id ORDER BY a.id LIMIT ?,?";
        let start=(currentPage-1)*pageSize;
        pool.query(sql,[start,parseInt(pageSize)]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        })
    })
},
/*
 * 2、增加活动
 * */
    getAdd(name,state,jointime,hoster,outorin,address,createtime,totalperson,startdate,enddate,userid){
    return new Promise(function(resolve,reject){
        let sql="insert into activity values(null,?,?,?,?,?,?,?,?,'fsf','fdgdf',?,2,?,?)";
        pool.query(sql,[name,jointime,startdate,address,enddate,parseInt(outorin),parseInt(totalperson),hoster,createtime,userid,parseInt(state)]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        })
    })
},
    /*
     * 3、修改指定活动
     * */
    getUpdate(id,name,state,totalperson,outorin,hoster,details,flowpath,address){
        return new Promise(function(resolve,reject){
            let sql="update activity set name=?,state=?,totalperson=?,hoster=?,details=?,flowpath=?,address=?,outorin=? where id=?";
            pool.query(sql,[name,state,totalperson,hoster,details,flowpath,address,outorin,id]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    /*
     * 4、查询指定活动
     * */
    getSearch(id,name,hoster,createUser,state){
        return new Promise(function(resolve,reject){
            let sql="select * from activity where 1=1 ";
            let arr=[];
            if(id.length>0){
                sql +="and id = ?";
                arr.push(id);
            }
            if(name.length>0){
                name = '%'+name+'%';
                sql +="and name like ?";
                arr.push(name);
            }
            if(hoster.length>0){
                hoster = '%'+hoster+'%';
                sql +="and hoster like ?";
                arr.push(hoster);
            }
            if(createUser.length>0){
                createUser = '%'+createUser+'%';
                sql +="and createUser like ?";
                arr.push(createUser);
            }
            if(state.length>0){
                state = '%'+state+'%';
                sql +="and state like ?";
                arr.push(state);
            }
            pool.query(sql,arr).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    /*
     * 5.根据id获取信息
     * */
    getInfo(id){
        return new Promise(function(resolve,reject){
           let sql=" SELECT a.*,b.userName FROM activity AS a left JOIN USER AS b ON a.createuser=b.id WHERE a.id=?";
            pool.query(sql,[id]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //删除信息（修改状态）
    getDel(id,state){
        return new Promise(function(resolve,reject){
            let sql="update activity set state=? where id=?";
            pool.query(sql,[state,id]).then(function(data){
                resolve(data);
                console.log(data+"data")
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //getUserId根据页面上的登录人用户名获取id
    getUserId(name){
        return new Promise(function(resolve,reject){
            let sql="select id from user where userName=?";
            pool.query(sql,[name]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    /*
    * 找出所有总条数
    * */
    getListPage(name,hoster,createUser,state){
        return new Promise(function(resolve,reject){
            let arr=[];
            let sql="select count(1) as num from activity where 1=1 ";
            //if(id.length>0){
            //    sql +=" and id like ? ";
            //    arr.push(id);
            //}
            if(name.length>0){
                name = '%'+name+'%';
                sql +=" and name like ? ";
                arr.push(name);
            }
            if(hoster.length>0){
                hoster = '%'+hoster+'%';
                sql +=" and hoster like ? ";
                arr.push(hoster);
            }
            if(createUser.length>0){
                createUser = '%'+createUser+'%';
                sql +=" and createuser like ? ";
                arr.push(createUser);
            }
            if(state.length>0){
                state = '%'+state+'%';
                sql +=" and state like ? ";
                arr.push(state);
            }
            pool.query(sql,arr).then(function(data){
                resolve(data);
                console.log(data);
            }).catch(function(err){
                reject(err);
            })
        })
    }
};