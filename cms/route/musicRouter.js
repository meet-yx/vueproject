/**
 * Created by Administrator on 2017/11/16 0016.
 */
"use strict";
const express = require("express");
const musicRoute = express.Router();
const musicControl = require("../controller/musicController.js");

//音乐管理
   //音乐列表和歌单列表
musicRoute.route("/musiclist.do").post(musicControl.musicListAjax);   //显示列表
musicRoute.post("/musicListNum.do",musicControl.musicListNum);//列表分页查询
musicRoute.route("/del.do").post(musicControl.del);   //删除列表

module .exports=musicRoute;

