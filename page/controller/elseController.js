/**
 * Created by yx on 2017/11/14 0014.
 */
"use strict";
const elseModel=require("../modal/elseModel.js");

module.exports={
    aboutPage(req,res){
        "use strict";
        let specialist;   //专家推荐
        let agencyList;   //机构推荐
        elseModel.specialist().then(function(data){
            specialist=data;
        }).then(function() {
            elseModel.agencyList().then(function (data) {    //机构推荐
                agencyList=data;
                res.json({code: 200, specialist: specialist,agencyList:agencyList});
            })
        }).catch(function (err) {
            console.log(err);
            res.send({code: 500});
        });
    }
};



