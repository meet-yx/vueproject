/**
 * Created by 饶江敏 on 2017/11/14.
 */
"use strict";
const activityModal=require("../modal/activityModal.js");
module.exports={
    getListPage(req,res){
        //let id=req.body.id;
        let name=req.body.name;
        let hoster=req.body.hoster;
        let createUser=req.body.createUser;
        let state=req.body.state;
        activityModal.getListPage(name,hoster,createUser,state).then(function(data){
            res.json(data);
        }).catch(function(err){
            res.send(err);
        })
    },
    //查询、ejs
    activityList(req,res){
        let id=req.body.id;
        let name=req.body.name;
        let hoster=req.body.hoster;
        let createUser=req.body.createUser;
        let state=req.body.state;
        let currentPage=req.body.currentPage;
        let pageSize=req.body.pageSize;
        activityModal.activityList(id,name,hoster,createUser,state,pageSize,currentPage).then(function(data){
            res.send(data);
        }).catch(function(err){
            res.send(err);
        })
    },
    //修改信息
    getUpdate(req,res){
        let id=req.body.id;
        let name=req.body.name;
        let state=req.body.state;
        let totalperson=req.body.totalperson;
        let outorin=req.body.outorin;
        let hoster=req.body.hoster;
        let details=req.body.details;
        let flowpath=req.body.flowpath;
        let address=req.body.address;
        console.log(address);
        console.log(details);
        console.log(flowpath);
        //console.log(address);
        activityModal.getUpdate(id,name,state,totalperson,outorin,hoster,details,flowpath,address).then(function(data){
            res.send("修改成功");
        }).catch(function(err){
            res.send("修改失败")
        })
    },
    //添加信息
    getAdd(req,res){
        let name=req.body.name;
        let state=req.body.state;
        let jointime=req.body.jointime;
        let hoster=req.body.hoster;
        let outorin=req.body.door;
        let address=req.body.address;
        let createtime=new Date();
        let totalperson=req.body.totalperson;
        let startdate=req.body.startdate;
        let enddate=req.body.enddate;
        console.log(createtime);
        let id="zahngding";
        console.log("id",id);
        activityModal.getAdd(name,state,jointime,hoster,outorin,address,createtime,totalperson,startdate,enddate,id).then(function(data){
            res.send("添加成功");
        }).catch(function(err){
            res.send("添加失败");
        })
    },
    //获取用户名
    getUserId(req,res){
        console.log(req.session.userInfo);
        let userName=req.session.userInfo;
        activityModal.getUserId(userName).then(function(data){
            res.send(data);
        })
    },
    //删除信息（修改状态）
    getDel(req,res){
        let id=req.body.id;
        let state=req.body.state;
        activityModal.getDel(id,state).then(function(data){
            res.json(data);
        }).catch(function(err){
            res.send("删除失败");
        })
    },
    //查询信息
    getSearch(req,res){
        let id=req.body.id;
        let name=req.body.name;
        let hoster=req.body.hoster;
        let createUser=req.body.createUser;
        let state=req.body.state;
        let currentPage=req.body.currentPage;
        let pageSize=req.body.pageSize;
        activityModal.getSearch(id,name,hoster,createUser,state,currentPage,pageSize).then(function(data){
          res.json({"code":200,"data":data});
        }).catch(function(err){
            res.send(err);
        }).then(function(){//查找条数
            activityModal.getListPage().then(function(data){
                res.send(data);
            }).catch(function(err){
                res.send(err);
            })
        })
    },
    //根据id查出信息
    getInfoById(req,res){
        let id=req.body.id;
        console.log(id+"byId");
        activityModal.getInfo(id).then(function(data){
            console.log("cnotroller in",data)
            res.send(data);
        }).catch(function(err){
            res.send(err);
        })
    },

    getList(req,res){
        activityModal.getList(1,5).then(function(data){
            res.render("activityManage",{"code":200,"data":data});
            console.log("render",data)
        })
    },
    //addList(req,res){
    //    activityModal.getList(1,2).then(function(data){
    //        res.render("activityCreate",{"code":200});
    //    })
    //},
    getList1(req,res){
        let id=req.body.id;
        let name=req.body.name;
        let hoster=req.body.hoster;
        let createUser=req.body.createUser;
        let state=req.body.state;
        let currentPage=req.query.currentPage;
        let pageSize=req.query.pageSize;
        activityModal.getList(currentPage,pageSize).then(function(data){
            console.log(data);
            res.json({"code":200,"data":data});
        })
    }
};