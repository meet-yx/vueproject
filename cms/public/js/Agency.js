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
                                    <td>${obj[i].NAME}</td>
                                    <td>${obj[i].img}</td>
                                   <td>${obj[i].userName}</td>
                                    <td>${createTime}</td>
                                    <td>${state}</td>
                                    <td>
                                       <!--<span myid="<%=e.id%>">修改</span>-->
                                        <button class="editBtn btn btn-info" myid="${obj[i].id}">修改</button>
                                          <button  myid="${obj[i].id}" class="delBtn btn ${color}" stateCode="${obj[i].state}">${state1}</button>
                                     </td>
                            </tr>`;
        $("#tbody").append(str);
    }
}
//列表
function reload() {
    //console.log(1)
    let agencyName=  $("#txtAgencyName").val();
    let state=  $("#txtState").val();
    let param = "currentPage="+currentPage+"&pageSize="+pageSize+"&agencyName="+agencyName+"&state="+state;
    ajax("post","/agency/agencyList.do",param,function(data){
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
    let agencyName=  $("#txtAgencyName").val();
    let state=  $("#txtState").val();
    let param = "agencyName="+agencyName+"&state="+state;
    ajax("post","/agency/agencyListNum.do",param,function(data){
        let obj = JSON.parse(data).data;
        totalNum=obj[0].totleCount;
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
    currentPage = 1;
    reload();
    getTotalPage();
});

//更改状态(删除当前用户)
$(document).on("click",".delBtn",function(){
    delid=$(this).attr("myid");
    let state=$(this).attr("stateCode");
    state=state==1?0:1;
    let param = "id=" + delid+"&state="+state;
    //console.log(param)
    ajax("post","/agency/agencyDelete.do",param,function(data){
        console.log(data);
        let obj = JSON.parse(data).data;
        if(obj.affectedRows>0){
            reload();
        }else{
            // alert("错误")
        }
    });
});
// //点击新增让模态框复原
// $("#addb").click(function(){
//     $("#txtAddAgencyName").val("");
//     $("#txtAddPwd").val("");
// });
// //新增
// $("#addUserBtn").click(function(){
//     let AgencyName = $("#txtAddAgencyName").val();
//     let pwd = $("#txtAddPwd").val();
//     let state = $("#addState").val();
//     let role = $("#addRole").val();
//     let param = "userName="+userName+"&pwd="+pwd+"&state="+state+"&role="+role;
//     ajax("post","/user/userAdd.do",param,function(data){
//         console.log(data);
//         let obj = JSON.parse(data).data;
//         if(obj.affectedRows>0){
//             $("#myModal0").modal("hide");
//             reload();
//         }else{
//             alert("错误")
//         }
//     });
// });


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


//修改
$("#tbody").on("click",".editBtn",function(){
    var id = $(this).attr("myid");
    $("#myModal0").modal();
    //显示对应的数据
    $.post('/agency/agencyList.do',{"id":id},function(data){
        // let obj = JSON.parse(data);
        let obj = data.data;
        console.log(obj)
        $("#txtAddAgencyName").val(obj[0].NAME);
        $("#addState").val(obj[0].state);
        $("#agencyId").val(obj[0].id);
    });

});

//修改Agency.js
$("#addAgencyBtn").click(function(){
    let txtAddAgencyName = $("#txtAddAgencyName").val();
    let txtAddPwd = $("#txtAddPwd").val();
    let addState = $("#addState").val();
    let id = $("#agencyId").val();
    let param = "txtAddAgencyName="+txtAddAgencyName+"&txtAddPwd="+txtAddPwd+"&state="+addState+"&id="+id;
    ajax("post","/agency/agencyUpdate.do",param,function(data){
    let obj = JSON.parse(data).data;
    if(obj.affectedRows>0){
        $("#myModal0").modal("hide");
        reload();
    }else{
        alert("错误")
    }
})
})


