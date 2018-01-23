/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const express = require("express");
const bbsRoute = express.Router();
const bbsControl = require("../controller/bbsController.js");

bbsRoute.post("/bbsList.do",bbsControl.bbsListAjax);
bbsRoute.post("/bbsDelete.do",bbsControl.bbsDelete);
bbsRoute.post("/bbsListNum.do",bbsControl.bbsListNum);
module.exports =bbsRoute;
