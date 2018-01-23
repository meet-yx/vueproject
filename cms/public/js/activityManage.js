/**
 * Created by Administrator on 2017/11/20.
 */
//"use strict";
//var pageSize = 5;
//var currentPage =1;
//var totalPage ;//总页数
//var total;//总条数
////请求数据的总页数
//$(function(){
//    ajax("get","/activityListPage.do",null,function(data){
//        var jsonObj = JSON.parse(data);
//        total = parseInt(jsonObj[0].num);
//        console.log("num="+total);
//        totalPage = Math.ceil(total/pageSize);
//        $("#divPage").html('');
//        for(var i=1;i<=totalPage;i++){
//            $("#divPage").append("<a onclick='listPage("+i+")'>"+i+"</a>");
//        }
//    });
//});
////请求总条数
//function getCount(){
//    $("#divPage").html('');
//    for(var i=1;i<=totalPage;i++){
//        $("#divPage").append("<a onclick='listPage("+i+")'>"+i+"</a>");
//    }
//}
//function outHtml(obj){
//    var state,state1;
//    $("#tableList").html(''); //清空原来的数据
//    var str="";
//    var createTime=new Date();
//    for(var i in obj){
//        if(obj[i].state==1){
//            state="启用";
//            state1="禁用";
//        }else{
//            state="禁用";
//            state1="启用";
//        }
//        str=`<tr>
//                                    <td>${obj[i].id}</td>
//                                    <td>${obj[i].name}</td>
//                                    <td>${obj[i].hoster}</td>
//                                    <td>${obj[i].outorin}</td>
//                                    <td>${obj[i].totalperson}</td>
//                                    <td>${obj[i].createuser}</td>
//                                    <td>${obj[i].createuser}</td>
//
//                                    <td>${createTime}</td>
//                                    <td>${state}</td>
//                                    <td>
//
//                    <button class="editBtn btn" myid="${obj[i].Id}" data-target="#myModal0" data-toggle="modal">修改</button>
//                    <button class="delBtn btn" myid="${obj[i].Id}" stateCode="${obj[i].State}">${state1}</button>
//                    </td>
//                    </tr>`;
//        $("#tableList").append(str);
//    }
//
//}
//function show(data) {
////        console.log(data);
//    var jsonObj = JSON.parse(data).data;
//    outHtml(jsonObj);
//}
//function list(){
//    console.log(11);
//    var param ="id="+$("#queryNo").val()+"&name="+$("#queryName").val()+"&hoster="+$("#queryHoster").val()+
//        "&createUser="+$("#queryCreateUser").val()+"&state="+$("#queryState").val()+
//        "&pageSize="+pageSize+"&currentPage="+currentPage;
//    ajax("get","/activityList.do",param,show)
//}
//function listPage(page){
//    currentPage = page;
//    list();
//}
////    下一页
//$("#btnNext").click(function(){
//    currentPage++;
//    list();
//});
////    上一页
//$("#btnPrev").click(function(){
//    currentPage--;
//    if(currentPage==0){
//        currentPage=1;
//    }
//    list();
//});

////    查询数据
//$("#queryBtn").click(function(){
//    var param="id="+$("#queryNo").val()+"&name="+$("#queryName").val()+"&hoster="+$("#queryHoster").val()+
//        "&createUser="+$("#queryCreateUser").val()+"&state="+$("#queryState").val()+
//        "&currentPage="+currentPage+"&pageSize="+pageSize;
//    ajax("post","/activitySearch.do",param,function(data){
//        console.log("查询到的数据",data);
//        show(data);
//    })
//
//});

/*================================================================================*/
"use strict";

var updateid;
var delid;
var currentPage = 1;//初始页面
var pageSize = 5;//每页数量
var totalPage;//总页数
var totalNum;//数据库总条数
let imgSrc;
function dataJoin(obj) {
    $("#tbody").html("");
    //console.log(obj,"obj");
    for (let i = 0; i < obj.length; i++) {
        let state,state1,door,door1,type,color;
        let createTime = new Date(obj[i].createtime).toLocaleString();
        if(obj[i].state==1){
            state="启用";
            state1="禁用";
            color="btn-danger";
        }else{
            state="禁用";
            state1="启用";
            color="btn-success";
        }
        if(obj[i].outorin==1){
            door="室外";
            door1="室内";
        }else{
            door="室内";
            door1="室外";
        }
        let str=`<tr>
                                    <td>${obj[i].id}</td>
                                    <td>${obj[i].name}</td>
                                    <td>${obj[i].hoster}</td>
                                    <td>${door}</td>
                                    <td>${obj[i].totalperson}</td>
                                    <td>${obj[i].createuser}</td>
                                    <td>${obj[i].userName}</td>

                                    <td>${createTime}</td>
                                    <td>${state}</td>
                                    <td>

                    <button type="button" class="update btn btn-info" myid="${obj[i].id}" data-target="#myModal0" data-toggle="modal">修改</button>
                    <button type="button" class="delBtn btn ${color}" myid="${obj[i].id}" stateCode="${obj[i].state}">${state1}</button>
                    </td>
                    </tr>`;
        $("#tbody").append(str);
    }
}
//列表
function reload() {
    let name=  $("#queryName").val();
    let hoster=  $("#queryHoster").val();
    let createUser=  $("#queryCreateUser").val();
    let state=  $("#queryState").val();
    console.log("currentPage",currentPage);
    console.log("pageSize",pageSize);
    let param ="name="+name+"&hoster="+hoster+"&createUser="+createUser+
        "&state="+state+"&currentPage="+currentPage+"&pageSize="+pageSize;
    ajax("post","/activity/activityList.do",param,function(data){
        let obj = JSON.parse(data);
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
    //let id=  $("#queryNo").val();
    let name=  $("#queryName").val();
    let hoster=  $("#queryHoster").val();
    let createUser=  $("#queryCreateUser").val();
    let state=  $("#queryState").val();
    let param ="name="+name+"&hoster="+hoster+"&createUser="+createUser+
        "&state="+state;
    ajax("post","/activity/activityListNum.do",param,function(data){
        let obj = JSON.parse(data);
        console.log(obj);
        totalNum=obj[0].num;
        console.log(totalNum);
        totalPage = Math.ceil(totalNum/pageSize);
        pageList();
    });
}
$(function(){
    getTotalPage();
});
//查询
$("#searchBtn").click(function(){
    reload();
    getTotalPage();
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

//   获取数据byid
var acid;
$("#tbody").on("click",".update",function(){
    var id = $(this).attr("myid");
    var param="id="+id;
    acid=id;
    console.log(acid+"acid");
    $.post('/activity/activityInfo',param,function(data){
        console.log(data);
        id=data[0].id;
        if(data[0].outorin==1){
            $("#activityDoor").val(1);
        }else{
            $("#activityDoor").val(0);
        }
        console.log(data[0].name);
        $("#activityName").val(data[0].name);
        if(data[0].state==1){
            $("#activityState").val(1);
        }else{
            $("#activityState").val(0);
        }
        $("#activityTotal").val(data[0].totalperson);
        $("#createDate").html(data[0].createtime);
        $("#createUser").val(data[0].userName);
        $("#activityhoster").val(data[0].hoster);
        $("#activityDes").val(data[0].details);
        $("#activityImg").val(data[0].flowpath);
        $("#activityAddress").val(data[0].address);
    },"json");
});
//    修改信息
$("#updateBtn").click(function(){
    console.log("id"+acid);
    console.log("ddd",$("#activityDoor").val());
    var param="id="+acid+"&outorin="+$("#activityDoor").val()+"&name="+$("#activityName").val()+
        "&state="+$("#activityState").val()+"&totalperson="+$("#activityTotal").val()+
        "&hoster="+$("#activityhoster").val()+"&details="+$("#activityDes").val()+
        "&flowpath="+$("#activityImg").val()+"&address="+$("#activityAddress").val();
        console.log(param);
    ajax("post","/activity/activityUpdate.do",param,function(data){
        console.log(data);
        if(data=="修改成功"){
            reload();
        }else{
            alert(data);
        }
    });
    $("#myModal0").modal("hide");
});
//删除信息（修改状态）
$("#tbody").on("click",".delBtn",function(){
    let id=$(this).attr("myid");
    let state=$(this).attr("stateCode");
    state=state==1?0:1;
    let param="id="+id+"&state="+state;
    console.log(param);
    ajax("post","/activity/activityUpdateByState.do",param,function(data){
        let obj = JSON.parse(data);
        console.log(obj);
        if(obj.affectedRows>0){
            reload();
        }else{
            alert("错误");
        }
    })
});
$("#saveBtn").click(function(){
    console.log(typeof $("#jointime").val());
    var param="name="+$("#name").val()+"&totalperson="+$("#totalperson").val()+"&state="+$("#state").val()+"&jointime="+
        $("#jointime").val()+"&hoster="+$("#hoster").val()+"&door="+$("#door").val()+
        "&address="+$("#address").val()+"&startdate="+$("#startdate").val()+
        "&enddate="+$("#enddate").val();
    ajax("post","/activity/activityAdd.do",param,function(data){
        if(data=="添加成功"){
            $("#myModal11").modal("hide");
            reload();
        }else{
            $(".message").html("填写信息不能为空");
        }
    })

});