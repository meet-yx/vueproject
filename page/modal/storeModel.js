/**
 * Created by Administrator on 2017/11/15 0015.
 */
/**
 * orderState 订单状态   1 待收货  2 未支付  0 已完成
 * payment 支付方式 	1-网上支付 2-货到付款
 * state  1-启用  0-禁用
 */
"use strict";
const pool=require("../modal/sqlPool.js");
module.exports= {
    //显示购物车页面
    listCart(userId){
        return new Promise((resolve,reject)=>{
            let sql="select g.name,g.price,g.Thumbnail,c.num "+
                "from goods as g join cart as c on g.id=c.id  where c.userId = ? and g.state = 1" ;
            //console.log(sql);
            pool.query(sql,[userId]).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //添加商品到购物车
    addGoodsToCart(userId,goodsId,num){
        return new Promise((resolve,reject)=>{
            let sql="insert into cart values(null,?,?,?,default,now())";
            pool.query(sql,[userId,goodsId,num]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //显示商品页面
    listGoods(pageSize,currentPage,type){
        return new Promise((resolve,reject)=>{
            pageSize = pageSize ||10;
            currentPage = currentPage || 1;
            let arr = [];
            let sql=`select * from goods where 1=1 `;
            if(type){
                sql+="and type = ? ";
                arr.push(type)
            }
            sql+="limit ?,?";
            let start= (currentPage-1)*pageSize;
            pageSize = parseInt(pageSize);
            arr.push(start,pageSize);
            pool.query(sql,arr).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            })
        })
    },
    //获取商品所有类型
    getAllGoodsType(){
        return new Promise((resolve,reject)=>{
            let sql="SELECT NAME,id FROM dictionary WHERE TYPE='商品类别'";
            pool.query(sql,[]).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            })
        })
    },
    //从购物车移除商品 改变状态为0禁用，默认可用  有参数根据id改变它的状态
    deleteFromCart(deleteId){//括号里的参数为deleteId
        return new Promise((resolve,reject)=>{
            let sql="update cart set state=0 where id=?";
            pool.query(sql,[deleteId]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //用户登录
    storeUserLogin(userName,pwd){
        return new Promise((resolve,reject)=>{
            let sql="select *from user where userName=? and pwd=? and state=1";
            pool.query(sql,[userName,pwd]).then((data)=>{
                resolve({code:200,data:data[0]})
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //根据用户名获取用户id
    userFind(userName){
        return new Promise((resolve,reject)=>{
            let sql="select id from user where userName=? ";
            pool.query(sql,[userName]).then((data)=>{
                resolve({code:200,data:data});
                //console.log(data);
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //获取商品总数
    getGoodsNumber(){
        return new Promise((resolve,reject)=>{
            let sql="select count(1) as num from goods ";
            pool.query(sql,[]).then((data)=>{
                console.log(data);
                resolve(data[0].num)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //显示商品详情页
    listGoodsDetails(goodsId){
        return new Promise((resolve,reject)=>{
            let sql=` SELECT g.NAME ,g.description,g.Price, (SELECT GROUP_CONCAT(d.name ) FROM dictionary AS d
                      WHERE  LOCATE(CONCAT(',',d.id,','), g.colorid)>0) AS c_name FROM goods AS g WHERE g.id=? `;
            pool.query(sql,[goodsId]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //收藏商品  收藏表0 商品收藏  1文章收藏  2课程收藏
    collectGoods(userId,goodsId,type){
        return new Promise((resolve,reject)=>{
            let sql=`insert into collect values(null,?,?,?,now(),default)`;
            pool.query(sql,[userId,goodsId,type]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //添加商品详情页里的商品数量
    addGoodsNumber(goodsId){
        return new Promise((resolve,reject)=>{
            let sql=`select storage from goods where id=?`;
            pool.query(sql,[goodsId]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },

    //购买商品页面
    BuyGoods(addressId,userId,goodsId){
        return new Promise((resolve,reject)=>{
            let sql=`SELECT g.name,g.description,a.province,a.city,
a.address,a.defaultAddress,gi.imgsrc FROM goods AS g JOIN address AS
a JOIN goodsimg AS gi ON g.id=? AND a.id=? and gi.goodsId=? `;
            pool.query(sql,[addressId,userId,goodsId]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //设置商品页面的地址为默认地址
    updateDefaultAddress(addressId,defaultAddress){
        return new Promise((resolve,reject)=>{
            let sql=`update address set defaultAddress=? where id=?`;
            pool.query(sql,[defaultAddress,addressId]).then((data)=>{
                resolve(data);
                //console.log(data);
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //设为默认地址  修改地址   地址表defaultAddress字段  0不默认，1默认
    setDefaultAddress(updateId,defaultAddress){
        return new Promise((resolve,reject)=>{
            let sql=`update address set defaultAddress=?`;
            pool.query(sql,[defaultAddress,updateId]).then((data)=>{
                resolve(data);
                //console.log(data);
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //生成订单
    addToOrderList(orderState,courierNum,userId,addressId,payment){
        return new Promise((resolve,reject)=>{
            let sql=`insert into orderList values(null,?,?,now(),?,?,default,?,100)`;
            pool.query(sql,[orderState,courierNum,userId,addressId,payment]).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err)
            })
        })
    },

//订单管理
    //显示所有订单信息
    orderList(){
        return new Promise(function (reslove, reject) {
            let sql = "select * from orderList where state=1";
            pool.query(sql, []).then(function (data) {
                reslove(data);
            }).catch(function (err) {
                reject(err);
            })
        })
    },
    //选择订单信息状态
    orderState(orderState){
        return new Promise(function (reslove, reject) {
            let sql = "select * from orderList where orderState=?";
            pool.query(sql, [orderState]).then(function (data) {
                reslove(data);
            }).catch(function (err) {
                reject(err);
            })
        })
    },
    //删除订单信息
    orderDel(delId){
        return new Promise(function(reslove,reject){
            let sql="update orderList set state=0 where id=?";
            pool.query(sql,[delId]).then(function(data){
                reslove(data)
            }).catch(function(err){
                reject(err)
            })
        })
    },
    //显示商品收藏列表
    shopCollect(){
        return new Promise(function (reslove, reject) {
            let sql = "SELECT Name  FROM collect,goods  " +
                "WHERE collect.type=1 AND collect.state=1 AND goods .state=1";
            pool.query(sql,[]).then(function (data) {
                reslove(data);
            }).catch(function (err) {
                reject(err);
            })
        })
    },
    //取消商品收藏列表
    shopCollectDel(delId){
        return new Promise(function(reslove,reject){
            let sql="update collect set state=0 where id=?";
            pool.query(sql,[delId]).then(function(data){
                reslove(data)
            }).catch(function(err){
                reject(err)
            })
        })
    }
};