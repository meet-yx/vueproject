/**
 * Created by yx on 2017/11/14 0014.
 */
const pool=require("../modal/sqlPool.js");
module.exports={
    //专家推荐列表
    specialist(req,res){
        "use strict";
        return new Promise(function (reslove, reject) {
            let sql = "select * from specialist where state=1";
            pool.query(sql,[]).then(function (data) {
                //console.log(data);
                reslove(data);
            }).catch(function (err) {
                reject(err);
            });
        })
    },
    //机构推荐列表
    agencyList(req, res){
        "use strict";
        return new Promise(function (reslove, reject) {
            let sql = "select * from Agency where state=1";
            pool.query(sql, []).then(function (data) {
                reslove(data);
            }).catch(function (err) {
                reject(err);
            });
        })
    }
};

