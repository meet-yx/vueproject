/**
 * Created by Administrator on 2017/11/16 0016.
 */
/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const express = require("express");
const agencyRoute = express.Router();
const agencyControl = require("../controller/agencyController.js");

agencyRoute.post("/agencyList.do",agencyControl.agencyListAjax);
agencyRoute.post("/agencyUpdate.do",agencyControl.agencyUpdate);
agencyRoute.post("/agencyDelete.do",agencyControl.agencyDelete);
agencyRoute.post("/agencyListNum.do",agencyControl.agencyListNum);


module.exports = agencyRoute;
