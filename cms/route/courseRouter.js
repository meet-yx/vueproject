/**
 * Created by zx on 2017/11/14.
 */
"use strict";

const express = require("express");
const courseRoute = express.Router();
const courseControl = require("../controller/courseController.js");


courseRoute.post("/courseList.do",courseControl.courseListAjax);
//userRoute.post("/userUpdate.do",userControl.userUpdate);
courseRoute.route("/courseUpdate.do").post(courseControl.courseUpdate);
courseRoute.route("/courseInfo").post(courseControl.courseInfo);
courseRoute.route("/addCourse.do").post(courseControl.addCourse);
courseRoute.post("/courseDelete.do",courseControl.courseDelete);
courseRoute.post("/courseListNum.do",courseControl.courseListNum);

courseRoute.post("/articleList.do",courseControl.articleListAjax);
courseRoute.post("/articleAdd.do",courseControl.articleAdd);
courseRoute.post("/articleDelete.do",courseControl.articleDelete);
courseRoute.post("/articleUpdate.do",courseControl.articleUpdate);
courseRoute.post("/articleListNum.do",courseControl.articleListNum);

module.exports = courseRoute;