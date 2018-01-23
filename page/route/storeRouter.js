/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const express=require("express");
const storeRoute=express.Router();
const storeController=require("../controller/storeController.js");

storeRoute.route("/cart.do").get(storeController.listCart);//显示购物车页面
storeRoute.route("/goods.do").get(storeController.listGoods);//显示商品页面
storeRoute.route("/storeGetGoodsNumber.do").post(storeController.getGoodsNumber);//获取商品数量
storeRoute.route("/storeGetAllGoodsType.do").post(storeController.getAllGoodsType);//获取商品所有类型
storeRoute.route("/storeDelete.do").post(storeController.deleteFromCart);//移除购物车。通过id改变其状态为0
storeRoute.route("/storeAdd.do").post(storeController.addGoodsToCart); //添加商品到购物车。
//viewRouter.route("/storeUpdate.do").post(storeRoute.changeCartNumber);改变购物车商品数量
storeRoute.route("/storeGoodsDetails.do").post(storeController.listGoodsDetails);//显示商品详情页
storeRoute.route("/storeAddGoodsNumber.do").post(storeController.addGoodsNumber);//商品详情页添加商品数量
storeRoute.route("/storeCollectGoods.do").post(storeController.collectGoods);//收藏商品
storeRoute.route("/storeBuyGoods.do").post(storeController.BuyGoods);//购买商品页面
storeRoute.route("/storeSetDefaultAddress.do").post(storeController.setDefaultAddress);//设为默认地址
storeRoute.route("/storeAddToOrderList.do").post(storeController.addToOrderList);//生成订单表
//订单管理
storeRoute.route("/orderList.do").get(storeController.orderList);     //所有订单信息
storeRoute.route("/orderState.do").post(storeController.orderState);     //选择订单信息
storeRoute.route("/orderDel.do").post(storeController.orderDel);     //删除订单信息
//商品收藏
storeRoute.route("/shopCollect.do").get(storeController.shopCollect);     //显示商品收藏列表
storeRoute.route("/shopCollectDel.do").post(storeController.shopCollectDel);     //取消商品收藏列表

module.exports=storeRoute;