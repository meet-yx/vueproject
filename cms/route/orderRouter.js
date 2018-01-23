/**
 * Created by Administrator on 2017/11/16 0016.
 */
/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const express = require("express");
const orderRoute = express.Router();
const orderControl = require("../controller/orderController.js");

orderRoute.post("/orderList.do",orderControl.orderListAjax);
orderRoute.post("/orderList2.do",orderControl.orderListAjax2);
orderRoute.post("/update.do",orderControl.update);
// orderRoute.post("/orderAdd.do",orderControl.orderAdd);
orderRoute.post("/orderDelete.do",orderControl.orderDelete);
orderRoute.post("/orderListNum.do",orderControl.orderListNum);


module.exports = orderRoute;
