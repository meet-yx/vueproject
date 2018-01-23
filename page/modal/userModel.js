/**
 * Created by Administrator on 2017/11/14 0014.
 */
/**
 * State状态     0 禁用         1 可用
 * defaultAddress 是否为默认地址  0    不为默认 1 默认 （默认为1(新增地址为默认地址)）
 */
"use strict";
const pool = require("../modal/sqlPool.js");
module.exports = {

//8. loginuser , 员工登录
//0: // 账号不存在 1 ://登录成功 2://密码不正确
    loginUser(userName, pwd){
        "use strict";
        return new Promise(function (resolve, reject) {
            let sql = "select * from user where userName=? and state = 1 and role =0";
            pool.query(sql, [userName])
                .then(function (data) {
                    let result;
                    if (data.length > 0) {

                        if (data[0].pwd == pwd) {
                            result = 1; //登录成功
                        } else {
                            result = 2; //密码不正确
                        }
                    } else {
                        result = 0; // 账号不存在
                    }
                    if (result == 1)
                        resolve({code: result, data: data[0]});
                    else
                        resolve({code: result});
                }).catch(function (err) {
                reject(err);
            });
        });
    },
//员工注册
    register(userName, pwd){
        "use strict";
        return new Promise(function (resolve, reject) {
            let sql = "insert into user values(null,?,?,null,null,null,null,null,default,default)";
            pool.query(sql, [userName, pwd])
                .then(function (data) {
                    resolve(data);
                }).catch(function (err) {
                reject(err);
            });
        });
    },
//员工注册用户名是否重复
    registerTest(userName){
        "use strict";
        return new Promise(function (resolve, reject) {
            let sql = "SELECT COUNT(1) as num FROM USER WHERE ? IN (SELECT userName FROM USER);";
            pool.query(sql, [userName])
                .then(function (data) {
                    resolve(data);
                }).catch(function (err) {
                reject(err);
            });
        });
    },
//密码修改
    forgetPwd(userPwd, userName){
        "use strict";
        return new Promise(function (resolve, reject) {
            let sql = "UPDATE USER SET pwd=? WHERE userName=? and state = 1";
            pool.query(sql, [userPwd, userName])
                .then(function (data) {
                    resolve(data);
                }).catch(function (err) {
                reject(err);
            });
        });
    },

//个人信息管理
    //显示用户信息
    userList(){
        return new Promise(function (reslove, reject) {
            let sql = "select * from user where state=1";
            pool.query(sql, []).then(function (data) {
                reslove(data);
            }).catch(function (err) {
                reject(err);
            })
        })
    },
    //修改用户信息
    userUpdate(id, userid, name, tel, province, city, Address, defaultAddress, Date, State){
        return new Promise(function (reslove, reject) {
            let sql = "update address set userid=?,name=?,tel=?, province=? ,city=? ," +
                "Address=?,defaultAddress=? ,State=? where id=?";
            pool.query(sql, [id, userid, name, tel, province, city, Address, defaultAddress, Date, State])
                .then(function (data) {
                    reslove(data)
                }).catch(function (err) {
                reject(err)
            })
        })
    },
//地址管理
    //显示地址信息
    addressList(){
        return new Promise(function (reslove, reject) {
            let sql = "select * from Address where state=1";
            pool.query(sql, []).then(function (data) {
                reslove(data);
            }).catch(function (err) {
                reject(err);
            })
        })
    },
    //删除地址信息
    addressDel(delId){
        return new Promise(function (reslove, reject) {
            let sql = "update address set state=0 where id=?";
            pool.query(sql, [delId]).then(function (data) {
                reslove(data)
            }).catch(function (err) {
                reject(err)
            })
        })
    },
    //修改地址信息
    addressUpdate(id, userid, name, tel, province, city, Address, defaultAddress, Date, State){
        return new Promise(function (reslove, reject) {
            let sql = "update address set userid=?,name=?,tel=?, province=? ,city=? ," +
                "Address=?,defaultAddress=? ,State=? where id=?";
            pool.query(sql, [id, userid, name, tel, province, city, Address, defaultAddress, Date, State])
                .then(function (data) {
                    reslove(data)
                }).catch(function (err) {
                reject(err)
            })
        })
    },
    //新增地址信息
    addressAdd(userid, name, tel, province, city, Address, defaultAddress, Date, State){
        return new Promise(function (reslove, reject) {
            let sql = "insert into address values (null,?,?,?,?,?,?,?,?,now(),?)";
            pool.query(sql, [userid, name, tel, province, city, Address, defaultAddress, Date, State])
                .then(function (data) {
                    reslove(data)
                }).catch(function (err) {
                reject(err)
            })
        })
    }
};