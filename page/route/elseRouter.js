/**
 * Created by Administrator on 2017/11/14 0014.
 */
"use strict";
const express=require("express");
const elseRoute=express.Router();
const elseController=require("../controller/elseController.js");

elseRoute.route("/aboutPage.do").get(elseController.aboutPage);   //专家推荐
module.exports=elseRoute;