/**
 * Created by Administrator on 2017/11/15 0015.
 */
"use strict";
const courseModal=require("../modal/courseModel.js");
module.exports={
    //婴儿到学前视频
    coursep(req,res){
        let stageId=req.body.stageId;
        courseModal.getAllCourse(stageId).then(function(data){
            res.json({code:200,data:data});
            //console.log(data)
        }).catch(function(err){
            //console.log(err);
            res.send({code:500});
        });
    },
    //婴儿到学前文章
    coursepArticle(req,res){
        var tot=req.params.tot;
        courseModal.getcoursepArticle(tot).then(function(data){
            res.json({code:200,data:data});
        }).catch(function(err){
            console.log(err);
            res.send({code:500})
        })
    },
    ////婴儿到学前分页
    courpage(req,res){
        let stageId=req.body.stageId;
        let page=req.params.type;
        var typeCourse={};//空对象定义每个函数的属性
        courseModal.gettalcount(page,stageId).then(function(data){
            console.log("总条数为",data) ;//写出每个的总条数
            typeCourse.page=Math.ceil(data[0].talcount/6)//得到总页面
            courseModal.getArticl().then((data)=>{
                typeCourse.article=data;   // 文章数据2
                mysqlconfig.gettypecourse("select * from videocourse limit ?,?",[0,6]).then((data)=>{
                    typeCourse.typeCource=data;  //  每页显示6
                    res.send(typeCourse)
                }).catch(function(err){
                    console.log(err);
                    res.send({code:500})
                })
            }).catch((err)=>{
                console.log(err.message)
            });
        }).catch(function(err){
            // console.log(err);
            res.send({code:500})
        })
    },
    articKol(req,res){
        var typeArticle={};
        courseModal.articMou().then((data)=>{
            typeArticle.page=Math.ceil(data[0].atcount/6);
            courseModal.articKolol("select * from Article limit ?,?",[0,6]).then((data)=>{
                typeArticle.article=data;
                res.json({code:200,data:typeArticle});
            }).catch(function(err){
                console.log(err);
                res.send({code:500})
            }).catch(function(err){
                console.log(err);
                res.send({code:500})
            })
        });
    },

    //音乐文章
    coursBaby(req,res){
        let tit = req.body.id;
        courseModal.getcoursepArticl(tit).then(function (data) {
            res.json({code:200,data:data});
        }).catch(function(err){
            console.log(err);
            res.send({code:500})
        })
    },
    //音乐
    coursMusic(req,res){
        var misc=req.params.tit;
        //let tit=req.body.type;
        courseModal.coursMusick(misc).then(function(data){
            res.json({code:200,data:data})
        }).catch(function(err){
            console.log(err);
            res.send({code:500})
        })
    },
    //文章详情
    coursArticle(req,res){
        let pok=req.body.id;
        "use strict";
        courseModal.coursArticlek(pok).then(function(data){
            res.json({code:200,data:data});
        }).catch(function(err){
            console.log(err);
            res.send({code:500})
        })
    },

    //文章收藏——显示文章收藏列表
    articleCollect(req,res){
        "use strict";
        courseModal.articleCollect().then(function(data){
            res.json({code:200,data:data})
        }).catch(function(err){
            res.send({code:500})
        })
    },
    //文章收藏——取消文章收藏
    articleCollectDel(req,res){
        "use strict";
        let delId=req.body.delId;   //获取需要删除的id
        courseModal.articleCollectDel(delId).then(function(data){
            res.json({code:200,data:data});
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        });
    },
    //课程收藏——显示文章收藏列表
    courseCollect(req,res){
        "use strict";
        courseModal.courseCollect().then(function(data){
            res.json({code:200,data:data})
        }).catch(function(err){
            res.send({code:500})
        })
    },
    //课程收藏——取消文章收藏
    courseCollectDel(req,res){
        "use strict";
        let delId=req.body.delId;   //获取需要删除的id
        courseModal.courseCollectDel(delId).then(function(data){
            res.json({code:200,data:data});
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        });
    }
};
