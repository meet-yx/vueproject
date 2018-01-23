/**
 * Created by zx on 2017/11/15.
 */
"use strict";

var delid;
var currentPage = 1;//初始页面
var pageSize = 2;//每页数量
var totalPage;//总页数
var totalNum;//数据库总条数

function dataJoin(obj) {
    $("#tbody").html("");
    console.log(obj);
    for (let i = 0; i < obj.length; i++) {
        let state,state1,color;
        let createTime = new Date(obj[i].DATE).toLocaleString();
        if(obj[i].state==1){
            state="启用";
            state1="禁用";
            color="btn-danger";
        }else{
            state="禁用";
            state1="启用";
            color="btn-success";
        }
        let str = `<tr>
                                    <td>${obj[i].id}</td>
                                    <td>${obj[i].userName}</td>
                                    <td>${obj[i].courseName}</td>
                                    <td>${obj[i].content}</td>
                                    <td>${obj[i].praise}</td>
                                    <td>${createTime}</td>
                                    <td>${state}</td>
                                    <td>
                                           <button class="delBtn btn ${color}" myid="${obj[i].id}" stateCode="${obj[i].state}">${state1}</button>
                                     </td>
                            </tr>`;
        $("#tbody").append(str);
    }
}
//列表
function reload() {
    let userName=  $("#txtUserName").val();
    let state=  $("#txtState").val();
    let param = "userName="+userName+"&currentPage="+currentPage+"&pageSize="+pageSize+"&state="+state;
    console.log(param);
    ajax("post","/comment/videoCommentList.do",param,function(data){
        console.log(data);
        let obj = JSON.parse(data).data;
        console.log(obj);
        dataJoin(obj);
    });
}
//根据总页数页面添加页数
function pageList(){
    $("#pageNum").html("");
    //console.log("页数",totalPage)
    for (let i = 1 ; i<=totalPage ;i++) {
        $("#pageNum").append("<a onclick='pageChange("+i+")'>"+i+"</a>")
    }
}
//获取总页数
function getTotalPage() {
    let userName=  $("#txtUserName").val();
    let state=  $("#txtState").val();
    let param = "userName="+userName+"&state="+state;
    ajax("post","/comment/videoCommentNumber.do",param,function(data){
        //console.log(data);
        let obj = JSON.parse(data).data;
        totalNum=obj[0].totalCount;
        //console.log(totalNum);
        totalPage = Math.ceil(totalNum/pageSize);
        pageList();
    });
}

$(function(){
    //reload();
    getTotalPage()
});

//查询
$("#searchBtn").click(function(){
    currentPage=1;
    reload();
    getTotalPage();
});

//更改状态(删除当前用户(不让该用户登录))
$(document).on("click",".delBtn",function(){
    delid=$(this).attr("myid");
    let state=$(this).attr("stateCode");
    state=state==1?0:1;
    let param = "id=" + delid+"&state="+state;
   console.log(param);
    ajax("post","/comment/videoDelete.do",param,function(data){
        let obj = JSON.parse(data).data;
        if(obj.affectedRows>0){
            console.log(obj);
            reload();
        }else{
            alert("错误")
        }
    });
});

//点击页码翻页
function pageChange(page) {
    currentPage = page;
    reload()
}
//点击上一页翻页
$("#prev").click(function(){
    if (currentPage>1){
        currentPage--;
        reload();
    }
});
//点击下一页翻页
$("#next").click(function(){
    if (currentPage<totalPage){
        currentPage++;
        reload();
    }
});







//添加
/*$("#saveBtn").click(function(){
 var param="courseName="+$("#classNo").val()+"&stageId="+$("#className").val()+"&courseDes="+$("#classStatus").val()+"&videoSrc="+
 $("#classNames").val()+"&praise="+$("#zanClass").val()+"&collect="+$("#classMon").val()+
 "&DATE="+$("#classNom").val()+"&createuser="+$("#startDay").val()+
 "&state="+$("#classkom").val();
 ajax("post","/course/addCourse.do",param,function(data){
 //console.log("add in");
 console.log($('#saveBtn').data());
 if(data=="添加成功"){
 $(function(){
 reload();
 getTotalPage()
 });
 $("#classNo").val("");
 $("#className").val("");
 $("#classStatus").val("");
 $("#classNames").val("");
 $("#zanClass").val("");
 $("#classMon").val("");
 $("#classNom").val("");
 $("#startDay").val("");
 $("#classkom").val("");
 }
 });
 });*/
//获取数据
/*$(document).on("click",".editBtn",function(){
    let id=$(this).attr("myid");
    var param="id="+id;
    delid=id;
    console.log('delid',delid);
    $.post('/course/courseInfo',param,function(data){
        console.log(data);
        id=data[0].id;
        $("#activityDoor").val(data[0].courseName);
        if(data[0].state==1){
            $("#classKmoon").val(1);
        }else{
            $("#classKmoon").val(0);
        }
        $("#activityName").val(data[0].stageId);
        $("#activityState").val(data[0].courseDes);
        $("#activityTotal").val(data[0].videoSrc);
        $("#createDate").val(data[0].praise);
        $("#createUser").val(data[0].collect);
        $("#activityhoster").val(data[0].DATE);
        $("#startData").val(data[0].createuser);
    },"json");
});*/
//    修改信息
/*$("#updateBtn").click(function(){
    //console.log("id"+acid);
    //console.log("ddd="+$("#activityDoor").val());
    var param="id="+delid+"&courseName="+$("#activityDoor").val()+"&stageId="+$("#activityName").val()+
        "&courseDes="+$("#activityState").val()+"&videoSrc="+$("#activityTotal").val()+
        "&praise="+$("#createDate").val()+"&collect="+$("#createUser").val()+
        "&DATE="+$("#activityhoster").val()+"&createuser="+$("#startData").val()+"&state="+$("#classKmoon").val();
    ajax("post","/course/courseUpdate.do",param,function(data){
        //console.log(data);
        if(data=="修改成功"){
            reload();
        }
    });
    $("#myModal11").modal("hide");
});*/







