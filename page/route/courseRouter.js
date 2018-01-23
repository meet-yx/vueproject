/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const express=require("express");
const courseRoute=express.Router();
const courseController=require("../controller/courseController.js");

courseRoute.route("/coursBaby.do").post(courseController.coursBaby);//音乐文章
courseRoute.route("/coursepArticle.do").post(courseController.coursepArticle); //婴儿到学前文章
courseRoute.route("/coursep.do").post(courseController.coursep); //婴儿到学前视频
courseRoute.route("/courpage.do").post(courseController.courpage); //婴儿到学前分页
courseRoute.route("/coursMusic.do").post(courseController.coursMusic);// 音乐
courseRoute.route("/articKol.do").post(courseController.articKol);//���·�ҳ
courseRoute.route("/coursArticle.do").post(courseController.coursArticle);////文章详情

//文章收藏
courseRoute.route("/articleCollect.do").get(courseController.articleCollect);//显示文章收藏列表
courseRoute.route("/articleCollectDel.do").post(courseController.articleCollectDel);//取消文章收藏列表

//课程收藏
courseRoute.route("/courseCollect.do").get(courseController.courseCollect);//显示课程收藏列表
courseRoute.route("/courseCollectDel.do").post(courseController.courseCollectDel);//取消课程收藏列表

module.exports=courseRoute;
