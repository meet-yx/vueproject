/**
 * Created by Administrator on 2017/11/16 0016.
 */
/**
 * Created by zx on 2017/11/15.
 */
"use strict";

var updateid;
var delid;
var currentPage = 1;//初始页面
var pageSize = 5;//每页数量
var totalPage;//总页数
var totalNum;//数据库总条数
function dataJoin(obj) {
    $("#tbody").html("");
    //console.log(obj)
    for (let i = 0; i < obj.length; i++) {
        let state,state1,type,color;
        let createTime = new Date(obj[i].DATE).toLocaleString()
        if(obj[i].state==1){
            state="启用";
            state1="禁用";
            color="btn-danger";
        }else{
            state="禁用";
            state1="启用";
            color="btn-success";
        }
        if(obj[i].Role==1){
            type="管理员"
        }else{
            type="普通用户"
        }
        let str = `<tr>
                                    <td>${obj[i].id}</td>
                                    <td>${obj[i].userName}</td>
                                    <td>${obj[i].realName}</td>
                                    <td>${obj[i].tel}</td>
                                    <td>${obj[i].email}</td>
                                    <td>${type}</td>
                                    <td>${createTime}</td>
                                    <td>${state}</td>
                                    <td>
                                      <button myid="<%=e.id%>" class="editBtn btn btn-info">修改</button>
                                      <button class="delBtn" stateCode="<%=e.state%>">
                                      <button class="editBtn btn btn-info" myid="${obj[i].id}">修改</button>
                                      <button class="delBtn btn ${color}" myid="${obj[i].id}" stateCode="${obj[i].state}">${state1}</button>
                                     </td>
                            </tr>`;
        $("#tbody").append(str);
    }
}
//列表
function reload() {
    //console.log(1)
    let userName=  $("#txtUserName").val();
    let realName=  $("#txtRealName").val();
    let state=  $("#txtState").val();
    let param = "currentPage="+currentPage+"&pageSize="+pageSize+"&userName="+userName+"&realName="+realName+"&state="+state;
    ajax("post","/user/userList.do",param,function(data){
        let obj = JSON.parse(data).data;
        dataJoin(obj);
    });
}
//根据总页数页面添加页数
function pageList(){
    $("#pageNum").html("");
    //console.log("页数",totalPage)
    for (let i = 1 ; i<=totalPage ;i++) {
        //console.log(1)
        $("#pageNum").append("<a onclick='pageChange("+i+")'>"+i+"</a>")
    }
}
//获取总页数
function getTotalPage() {
    let userName=  $("#txtUserName").val();
    let realName=  $("#txtRealName").val();
    let state=  $("#txtState").val();
    let param = "userName="+userName+"&realName="+realName+"&state="+state;
    ajax("post","/user/userListNum.do",param,function(data){
        let obj = JSON.parse(data).data;
        //console.log(obj)
        totalNum=obj[0].totleCount;
        totalPage = Math.ceil(totalNum/pageSize);
        //console.log(totalPage)
        //let str =
        pageList();
    });
}
$(function(){
    //reload();
    getTotalPage()
});

//查询
$("#searchBtn").click(function(){
    currentPage = 1;
    reload();
    getTotalPage();
});

//更改状态(删除当前用户(不让该用户登录))
$(document).on("click",".delBtn",function(){
    delid=$(this).attr("myid");
    let state=$(this).attr("stateCode");
    state=state==1?0:1;
    let param = "id=" + delid+"&state="+state;
    //console.log(param)
    ajax("post","/user/userDelete.do",param,function(data){
        console.log(data);
        let obj = JSON.parse(data).data;
        if(obj.affectedRows>0){
            reload();
        }else{
            alert("错误")
        }
    });
});
//点击新增让模态框复原
$("#addb").click(function(){
    $("#txtAddUserName").val("");
    $("#txtAddPwd").val("");
});
//新增
$("#addUserBtn").click(function(){
    let userName = $("#txtAddUserName").val();
    let pwd = $("#txtAddPwd").val();
    let state = $("#addState").val();
    let role = $("#addRole").val();
    let param = "userName="+userName+"&pwd="+pwd+"&state="+state+"&role="+role;
    ajax("post","/user/userAdd.do",param,function(data){
        console.log(data);
        let obj = JSON.parse(data).data;
        if(obj.affectedRows>0){
            $("#myModal0").modal("hide");
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

