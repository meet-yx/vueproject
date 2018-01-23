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
    console.log("data",obj)
    $("#tbody").html("");
    //console.log(obj)
    for (let i = 0; i < obj.length; i++) {
        let state,state1,type,color;
        if(obj[i].orderstate==1){
            state="启用";
            state1="禁用";
            color="btn-danger";
        }else{
            state="禁用";
            state1="启用";
            color="btn-success";
        }
        let str = `<tr>
                                    <td>${obj[i].Id}</td>
                                    <td>${obj[i].orderState}</td>
                                    <td>${obj[i].courierNum}</td>
                                    <td>${obj[i].orderDate}</td>
                                    <td>${obj[i].userName}</td>
                                    <td>${obj[i].Address}</td>
                                    <td>${obj[i].payment}</td>
                                    <td>${obj[i].totalmoney}</td>
                                    <td>${state}</td>
                                    <td>
                                       <!--<span myid="<%=e.d%>">修改</span>-->
                                       <button class="editBtn btn btn-info" myid="${obj[i].Id}">修改</button>
                                        <button class="delBtn btn ${color}" myid="${obj[i].Id}" stateCode="${obj[i].orderstate}">${state1}</button>
                                     </td>
                            </tr>`;
        $("#tbody").append(str);
    }
}
//列表
function reload() {
    let id=  $("#txtid").val();
    let courierNum=  $("#txtcouierNum").val();
    let state=  $("#txtState").val();
    let param = "currentPage="+currentPage+"&pageSize="+pageSize+"&id="+id+"&courierNum="+courierNum+"&state="+state;
    ajax("post","/order/orderList.do",param,function(data){
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
    let orderName=  $("#txtorderName").val();
    let state=  $("#txtState").val();
    let param = "orderName="+orderName+"&state="+state;
    ajax("post","/order/orderListNum.do",param,function(data){
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
    let state=$(this).attr("StateCode");
    state=state==1?0:1;
    let param = "id=" + delid+"&state="+state;
    console.log(param)
    ajax("post","/order/orderDelete.do",param,function(data){
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
//     $("#txtAddorderName").val("");
//     $("#txtAddPwd").val("");
// });
// //新增
// $("#addUserBtn").click(function(){
//     let orderName = $("#txtAddorderName").val();
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


// 修改获取数据
$("#tbody").on("click",".editBtn",function(){
    var Id = $(this).attr("myid");
    $("#myModal0").modal();
    //显示对应的数据
    $.post('/order/orderList2.do',{"Id":Id},function(data){
        // let obj = JSON.parse(data);
        let obj2 = data.data;
        console.log(obj2)
        $("#Id").val(obj2[0].orderId);
        $("#courierNum").val(obj2[0].courierNum);
        $("#goodsName").val(obj2[0].goodsName);
        $("#Address").val(obj2[0].Address);
        $("#Tel").val(obj2[0].Tel);
        $("#addState").val(obj2[0].orderstate);
        $("#goodsTbody").html("");
        for (let i = 0; i < obj2.length; i++) {
            let str = `<tr>
                                    <td>${obj2[i].orderId}</td>
                                    <td>${obj2[i].goodsname}</td>
                                    <td>${obj2[i].num}</td>
                            </tr>`;
            //console.log(obj2)
            $("#goodsTbody").append(str);
        }})
});
//修改
$("#updateBtn").click(function(){
    var Id = $("#Id").val();
    var courierNum = $("#courierNum").val();
    var Address = $("#Address").val();
    var Tel = $("#Tel").val();
    var orderState = $("#addState").val();
    let param = "Id="+Id+"&courierNum="+courierNum+"&Address="+Address+"&Tel="+Tel+"&orderState="+orderState;
//传值
    $.post('/order/update.do',param,function(data){
   console.log(data)
        $("#myModal0").modal("hide");
        })
});