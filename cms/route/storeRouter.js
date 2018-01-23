/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const express = require("express");
const storeRoute = express.Router();
const storeControl = require("../controller/storeController.js");

storeRoute.post("/storeList.do",storeControl.storeListAjax);
storeRoute.get("/getStoreTypeOrColor",storeControl.getTypeOrColor);
storeRoute.post("/storeAdd.do",storeControl.getStoreAdd);
storeRoute.post("/addType.do",storeControl.addType);
storeRoute.post("/storeUpdateInfo.do",storeControl.updateInfo);
storeRoute.post("/storeInfo.do",storeControl.getGoodsById);
storeRoute.post("/storeDelete.do",storeControl.storeDelete);
storeRoute.post("/storeListNum.do",storeControl.storeListNum);
storeRoute.get("/storeManage.html",storeControl.storeList);
storeRoute.post("/uploadStoreShowImg.do",storeControl.uploadStoreShowImg);

module.exports = storeRoute;
