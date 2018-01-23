/**
 * Created by zx on 2017/11/14.
 */
"use strict";

const pool = require("./sqlPool.js");

module.exports = {
    //�б� ejs��ajax����ѯ
    storeList(id,name,storage,state,pageSize,currentPage){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql=`SELECT a.*,userName FROM goods AS a LEFT JOIN USER AS u ON a.createuser=u.id  where 1=1`;
            let sql1= `SELECT a.*,userName,d.name AS goosdType FROM goods AS a LEFT JOIN USER AS u ON a.createuser=u.id LEFT JOIN dictionary AS d ON a.TYPE=d.Value where 1=1`;
            if (id){//�޸�ʱ��id�ͽ��������ѯ��һ������
                sql+=" and a.id = ? ";
                arr.push(id)
            }else{//�Ӳ�ѯ��input���ȡֵ�����û��д ����û��ѡ��Ϊundefined �Ͳ�����if
                if(name){
                    name = "%"+name+"%";
                    sql+=" and a.NAME like ? ";
                    arr.push(name)
                }
                if(storage){
                    sql+=" and a.storage = ? ";
                    arr.push(storage)
                }
                if(state){
                    sql+=" and a.State = ? ";
                    state=parseInt(state);
                    arr.push(state)
                }
                //pageSize= pageSize?pageSize:db.pageSize;
                pageSize=parseInt(pageSize);
                let start =(currentPage-1)*pageSize;
                sql+=" order by a.id limit ?,?";
                arr.push(start);
                arr.push(pageSize);
            }
            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //��ȡ������
    storeListNum(name,storage,state){
        return new Promise((resolve,reject)=>{
            let arr=[];
            let sql = `select count(1) as totleCount from goods where 1=1 `;
            if(name){
                name = "%"+name+"%";
                sql+=" and NAME like ? ";
                arr.push(name)
            }
            if(storage){
                storage =parseInt(storage);
                sql+=" and storage like ? ";
                arr.push(storage)
            }
            if(state){
                sql+=" and state = ? ";
                arr.push(state)
            }
            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //�޸��û���״̬(��ɾ��)
    storeDelete(state,id){
        return new Promise ((resolve,reject)=>{
            let sql= `update goods set State = ? where id = ?`;
            pool.query(sql,[state,id]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //��ȡ��Ʒ���ͺ���ɫ
    getTypeOrColor(){
        return new Promise(function(resolve,reject){
            let sql="SELECT DISTINCT id,TYPE,NAME FROM dictionary";
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //�����Ʒ��Ϣ
    getStoreAdd(name,price,storage,img,des,type,date,color,userId){
        return new Promise(function(resolve,reject){
            let sql="insert into goods values(null,?,?,?,12345,?,?,?,?,?,1,default)";
            pool.query(sql,[name,price,storage,img,des,type,color,date]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    },
    //�����ƷͼƬ
    getStoreImgAdd(GoodsId,imgSrc){
        return new Promise(function(resolve,reject){
            let sql=`insert into goodsimg values(null,?,?,default)`;
            pool.query(sql,[GoodsId,imgSrc]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //��ȡ���һ�����ݵ�ID
    getLastById(){
        return new Promise(function(resolve,reject){
            let sql=`select id from goods order by id desc limit 0,1`;
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //�����Ʒ���
    addType(type,typename,createUser,createtime){
        return new Promise(function(resolve,reject){
            let sql="insert into dictionary values(null,?,?,1,?,?,default)";
            pool.query(sql,[type,typename,parseInt(createUser),createtime]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    getGoodsById(id){
        return new Promise(function(resolve,reject){
            let sql="select * from goods where Id=?";
            pool.query(sql,[id]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //�޸���Ϣbyid
    updateInfo(id,name,price,storage,Thumbnail,description,type,color){
        return new Promise(function(resolve,reject){
            color=","+color+",";
            let sql=`update goods set NAME=?,Price=?,STORAGE=?,Thumbnail=?,description=?,TYPE=?,colorid=? where Id=?`;
            pool.query(sql,[name,parseInt(price),parseInt(storage),Thumbnail,description,type,color,parseInt(id)]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //ͨ��session����û������ҳ���Ӧ��id��
    userFind(userName){
        return new Promise(function(resolve,reject){
            let sql="select id from user where userName=?";
            pool.query(sql,[userName]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    }
};