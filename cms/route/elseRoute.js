/**
 * Created by Mr.Zzy on 2017/11/14.
 */
const express=require("express");
const elseRoute=express.Router();
const elseControl=require("../controller/elseController.js");
elseRoute.get("/getList.do",elseControl.getList1);
elseRoute.get("/specialist.html",elseControl.getList);
elseRoute.post("/pageLet.do",elseControl.getNumber); //分页 查询路径
elseRoute.post("/xinZen.do",elseControl.getXin);//添加新增
elseRoute.post("/startstate",elseControl.statestate)// 启用  禁用
elseRoute.post("/getSpecial",elseControl.getSpecial)
elseRoute.post("/updateSpectial",elseControl.updateSpectial)

module .exports=elseRoute;