/**
 * Created by Administrator on 2017/11/14 0014.
 */
"use strict";
const userModal=require("../modal/userModel.js");

module.exports={
    //登陆
    userLogin(req,res){
    "use strict";
    let userName = req.body.name;
    let pwd = req.body.pwd;
    userModal.loginUser(userName,pwd).then(function(data){
        if(data.code==1){
            req.session.userInfo = data.data;
            res.send({code:200,data:data.data});
        }
            res.send({code:400});
        ////0: // 账号不存在 1 ://登录成功 2://密码不正确
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
},
    //注册
    userRegister(req,res){
    "use strict";
    var userName=req.body.userName;
    var pwd=req.body.pwd;
    userModal.register(userName,pwd).then(function (data) {
        console.log(data);
    }).catch(function(err){
        console.log(err.message);
    })
},
    //验证用户名是否重复
    userRegisterTest(req,res){
    "use strict";
    var userName=req.body.name;
    userModal.registerTest(userName).then(function (data) {
        console.log(data[0].num)
        res.send(data[0])
    }).catch(function(err){
        console.log(err.message);
    })
},
    //修改
    userForgetPwd(req,res){
    "use strict";
    var userName=req.body.name;
    var userpwd=req.body.pwd;
    userModal.forgetPwd(userpwd,userName).then(function (data) {
        res.send(data)
        console.log(data);
    }).catch(function(err){
        console.log(err.message);
    })
},
    successIndex(req,res){
    console.log(req.session.userInfo)
    let name = req.session.userInfo.userName;
    res.render('successIndex',{"name":name});
},
    Index(req,res){
    res.render('index');
},
    listFirstPage(req,res){
    var userInfo;
    var count ;
    var jobList;
    userModal.getuserPageBySearch(-1,-1,null,1).then(function(data){//第一页显示的数据
        userInfo = data;

    }).then(function(){
        userModal.getuserCount().then(function(data){//员工总数，用于分页
            console.log(data);
            count = data;
        })}
    ).then(function() {
        jobModal.getAllJob().then(function (data) { //所有的岗位数据
            jobList = data;
            let username = req.session.userInfo.userUser;
            console.log(userInfo);
            console.log(count);
            res.render("userList", {"user": userInfo, "job": jobList, "count": count, "name": username});
        }).catch(function (err) {
            console.log(err);
            res.send(err);
        });
    });



},

    //个人信息管理——显示个人信息
    userList(req,res){
        "use strict";
        userModal.userList().then(function(data){
            res.json({code:200,data:data});
            //console.log(data);
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        });
    },
    //个人信息管理——修改个人信息
    userUpdate(req,res){
        "use strict";
        let id=req.body.id;   //获取修改id
        let userName=req.body.userName;
        let tel=req.body.txtPhone;
        let email=req.body.email;
        let headSrc=req.body.headSrc;
        userModal.userUpdate(id,userName,tel,email,headSrc).then(function(data){
            res.json({code:200,data:data});
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        });
    },
    //地址管理——显示地址信息
    addressList(req,res){
        "use strict";
        userModal.addressList().then(function(data){
            res.json({code:200,data:data});
            //console.log(data);
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        });
    },
    //地址管理——删除地址信息
    addressDel(req,res){
        "use strict";
        let delId=req.body.delId;   //获取需要删除的id
        userModal.addressDel(delId).then(function(data){
            res.json({code:200,data:data});
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        });
    },
    //地址管理——修改地址信息
    addressUpdate(req,res){
        "use strict";
        let id=req.body.id;   //获取修改id
        let name=req.body.name;
        let tel=req.body.txtPhone;
        let province=req.body.province;
        let city=req.body.city;
        let Address=req.body.Address;
        userModal.addressUpdate(id,name,tel,province,city,Address).then(function(data){
            res.json({code:200,data:data});
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        });
    },
    //地址管理——新增地址信息
    addressAdd(req,res){
        "use strict";
        let userid=req.body.userid;
        let name=req.body.name;
        let tel=req.body.tel;
        let province=req.body.province;
        let city=req.body.city;
        let Address=req.body.Address;
        let defaultAddress=req.body.defaultAddress;
        let Date=req.body.Date;
        let State=req.body.State;
        userModal.addressAdd(userid,name,tel,province,city,Address,defaultAddress,Date,State)
            .then(function(data){
            res.json({code:200,data:data})
        }).catch(function(err){
            console.log(err);
            res.send({code:500})
        })
    }
};