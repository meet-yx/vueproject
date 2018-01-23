/**
 * Created by Administrator on 2017/11/14 0014.
 */
"use strict";
const storeModal=require("../modal/storeModel.js");
module.exports={
    //显示购物车页面
    listCart(req,res){
        let userName = req.query.userName;
        storeModal.listCart(userName).then((data)=>{
            res.json({code:200,data:data});
        }).catch((err)=>{
            console.log(err);
            res.send({code:500})
        })
    },
    //显示商品页面
    listGoods(req,res){
        let pageSize=req.query.pageSize;//每页的数量
        let currentPage=req.query.currentPage;//当前是第几页
        let type=req.query.type;//
        storeModal.listGoods(pageSize,currentPage,type).then((data)=>{
            res.json({code:200,data:data})
        }).catch((err)=>{
            res.send({code:500})
        })
    },
    //获取商品的所有类型
    getAllGoodsType(req,res){
        storeModal.getAllGoodsType().then((data)=>{
            res.json({code:200,data:data})
        }).catch((err)=>{
            res.send({code:500})
        })
    },
    //获取商品数量
    getGoodsNumber(req,res){
        let goodsNumber;
        storeModal.getGoodsNumber().then((data)=>{
            res.json({code:200,data:data});
            //console.log(data);
            //goodsNumber = data返回的是对象
            goodsNumber = data;
            console.log(goodsNumber);
        }).catch((err)=>{
            console.log(err);
            res.send({code:500})
        })
    },
    //商品移除购物车  改变状态为0禁用，默认为1可用
    deleteFromCart(req,res){
        //通过id去改变它的状态
        let deleteId=req.body.deleteId;
        //console.log(deleteId);
        storeModal.deleteFromCart(deleteId).then((data)=>{
            res.json({code:200,data:data})
        }).then(()=>{
            storeModal.storeUserLogin().then((data)=>{
                let userName=req.session.userInfo.userName;
                res.render("cart",{name:userName})
            })
        }).catch((err)=>{
            console.log(err);
            res.send({code:500})
        })
    },
    //添加商品到购物车。
    addGoodsToCart(req,res){
        let userId=req.body.userId;
        let goodsId=req.body.goodsId;
        let num=req.body.num;
        storeModal.addGoodsToCart(userId,goodsId,num)
            .then((data)=>{
                res.json({code:200,data:data})
            }).catch((err)=>{
            console.log(err);
            res.send({code:500})
        })
    },
    //显示商品详情页
    listGoodsDetails(req,res){
        let goodsId=req.body.goodsId;
        //let userId=req.body.userId;
        storeModal.listGoodsDetails(goodsId).then((data)=>{
            res.json({code:200,data:data})
        }).catch((err)=>{
            console.log(err);
            res.send({code:500})
        })
    },
    //添加商品详情页里的商品数量
    addGoodsNumber(req,res){
        let userId, storage;
        //let userName = req.session.userInfo.userName;
        let userName = req.body.userName;
        let goodsId=req.body.goodsId;
        storeModal.userFind(userName).then((idData)=>{
            userId= idData.data[0].id;
            //console.log(userId);
        }).then(()=>{
            storeModal.addGoodsNumber(goodsId).then((data)=>{
                res.json({code:200,data:data,userId:userId});
                storage=data[0].storage;
                console.log(storage);
            })
        }).catch((err)=>{
            console.log(err);
            res.send({code:500})
        })
    },
    //收藏商品
    collectGoods(req,res){
        let userId;
        //let userName = req.session.userInfo.userName;
        let userName = req.body.userName;
        let goodsId=req.body.goodsId;
        let type=req.body.type;
        storeModal.userFind(userName).then((idData)=>{
            userId= idData.data[0].id;
            console.log(userId);
        }).then(()=>{
            storeModal.collectGoods(userId,goodsId,type).then((data)=>{
                res.json({code:200,data:data,userId:userId})
            })
        }).catch((err)=>{
            console.log(err);
            res.send({code:500})
        })
    },

    //设置默认地址  修改所有的地址为非默认  defaultAddress字段  0不为默认   1为默认
    setDefaultAddress(req,res){
        let userId;
        let userName=req.body.userName;//当前用户操作
        let updateId=req.body.updateId;//获取地址表的id  根据id修改信息
        //let updateName=req.body.updateName;//修改地址表里的名字
        //let tel=req.body.tel;//修改地址表里的电话号码
        //let province=req.body.province;//地址表字段省  下拉框获取
        //let city=req.body.city;//地址表字段市  下拉框获取
        //let address=req.body.address; //填写详细地址
        let defaultAddress=req.body.defaultAddress;//下拉选择框选择默认1或不默认0
        storeModal.userFind(userName)
            .then((idData)=>{
                userId= idData.data[0].id;
                console.log(userId);
            })
            .then(()=>{
                storeModal.setDefaultAddress(updateId,defaultAddress)
                    .then((data)=>{
                        res.json({code:200,data:data})
                    })
            }).catch((err)=>{
            console.log(err);
            res.send({code:500})
        })
    },
    //购买商品页面
    BuyGoods(req,res){
        let goodsId=req.body.goodsId;
        let addressId=req.body.addressId;
        let userId, addressState;
        //let userName = req.session.userInfo.userName;
        let userName = req.body.userName;
        let defaultAddress=req.body.defaultAddress;
        storeModal.userFind(userName).then((idData)=>{
            userId= idData.data[0].id;
        }).then(()=>{
            storeModal.updateDefaultAddress(addressId,defaultAddress).then((data)=>{ //在购买商品页面 将显示的地址设为默认
                //console.log(data.affectedRows);
                if(data.affectedRows>0){
                    addressState=defaultAddress;
                    console.log(addressState);
                }
            })
        }).then(()=>{
            storeModal.BuyGoods(addressId,userId,goodsId).then((data)=>{
                res.json({code:200,data:data,addressState:addressState})
            })
        }).catch((err)=>{
            console.log(err);
            res.send({code:500})
        })
    },
    //生成订单
    addToOrderList(req,res){
        let orderState=req.body.orderState;
        let courierNum=req.body.courierNum;
        let userId=req.body.userId;
        let addressId=req.body.addressId;
        let payment=req.body.payment;
        storeModal.addToOrderList(orderState,courierNum,userId,addressId,payment).then((data)=>{
            res.json({code:200,data:data})
        }).catch((err)=>{
            console.log(err);
            res.send({code:500})
        })
    },

    //订单管理——显示订单信息
    orderList(req,res){
        "use strict";
        storeModal.orderList().then(function(data){
            res.json({code:200,data:data});
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        });
    },
    //订单管理——选择订单信息状态
    orderState(req,res){
        "use strict";
        let orderState=req.body.orderState;
        storeModal.orderState(orderState).then(function(data){
            res.json({code:200,data:data});
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        });
    },
    //订单管理——删除订单信息
    orderDel(req,res){
        "use strict";
        let delId=req.body.delId;   //获取需要删除的id
        storeModal.orderDel(delId).then(function(data){
            res.json({code:200,data:data});
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        });
    },
    //商品收藏——显示商品收藏列表
    shopCollect(req,res){
        "use strict";
        storeModal.shopCollect().then(function(data){
            res.json({code:200,data:data})
        }).catch(function(err){
            res.send({code:500})
        })
    },
    //商品收藏——取消商品收藏
    shopCollectDel(req,res){
        "use strict";
        let delId=req.body.delId;   //获取需要删除的id
        storeModal.shopCollectDel(delId).then(function(data){
            res.json({code:200,data:data});
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        });
    }
};
