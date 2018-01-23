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
$(function(){
    //reload();
    musicGetTotalPage();
    songGetTotalPage()
});
//更改状态(删除当前用户(不让该用户登录))
$(document).on("click",".music-delBtn",function(){
    delid=$(this).attr("myid");
    let state=$(this).attr("stateCode");
   state = state==1 ?0:1;
    let param = "id=" + delid+"&state="+state;
    //console.log(param)
    ajax("post","/music/del.do",param,function(data){
        let obj = JSON.parse(data).data;
        console.log(data);
        if(obj.affectedRows>0){
            musicReload();
        }else{
            alert("错误")
        }
    });
});
$(document).on("click",".song-delBtn",function(){
    delid=$(this).attr("myid");
    let state=$(this).attr("stateCode");
    state=state==1?0:1;
    let param = "id=" + delid+"&state="+state;
    ajax("post","/music/del.do",param,function(data){
        let obj = JSON.parse(data).song;
        songReload();
        if(obj.affectedRows>0){
            songReload();
        }else{
            alert("错误")
        }
    });
});
//点击新增让模态框复原
$("#music-addb").click(function(){
    $("#music-txtAddUserName").val("");
    $("#music-txtAddPwd").val("");
});
//上传音乐
$(".musicAddBtn").click(function(){
    location.href="uploadMusic.html";
    //ajax("post","/music/upload.do",[],function(data){
    //    console.log(data);
    //    let obj = JSON.parse(data).data;
    //    if(obj.affectedRows>0){
    //        $("#myModal0").modal("hide");
    //        reload();
    //    }else{
    //        alert("错误")
    //    }
    //});
});
$(".songAddBtn").click(function(){
    location.href="uploadSong.html"
});

/*===========================音乐列表============================*/
function musicDataJoin(obj) {
    $("#music-tbody").html("");
    //console.log(obj)
    for (let i = 0; i < obj.length; i++) {
        let state,state1,type,color;
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
                       <td>${obj[i].musicName}</td>
                       <td>${obj[i].createUser}</td>
                       <td>${obj[i].DATE}</td>
                       <td>${state}</td>
                       <td>
                             <button class="music-delBtn btn ${color}" myid="${obj[i].id}" stateCode="${obj[i].state}">${state1}</button>
                       </td>
                   </tr>`;
        $("#music-tbody").append(str);
    }
}
//列表
function musicReload() {
    //console.log(1)
    let musicName=  $("#music-txtUserName").val();
    let createUser=  $("#music-txtRealName").val();
    let state=  $("#music-txtState").val();
    let param = "currentPage="+currentPage+"&pageSize="+pageSize+"&musicName="+musicName+"&createUser="+createUser+"&state="+state;
    ajax("post","/music/musicList.do",param,function(data){
        let obj = JSON.parse(data).music;
        musicDataJoin(obj);
    });
}
//根据总页数页面添加页数
function musicPageList(){
    $("#music-pageNum").html("");
    //console.log("页数",totalPage)
    for (let i = 1 ; i<=totalPage ;i++) {
        $("#music-pageNum").append("<a onclick='musicPageChange("+i+")'>"+i+"</a>")
    }
}
//获取总页数
function musicGetTotalPage() {
    let musicName=  $("#music-txtUserName").val();
    let createUser=  $("#music-txtRealName").val();
    let state=  $("#music-txtState").val();
    let param = "musicName="+musicName+"&createUser="+createUser+"&state="+state;
    ajax("post","/music/musicListNum.do",param,function(data){
        let obj = JSON.parse(data).music;
        totalNum=obj[0].totleCount;
        totalPage = Math.ceil(totalNum/pageSize);
        musicPageList();
    });
}
//查询
$("#music-searchBtn").click(function(){
    currentPage = 1;
    musicReload();
    musicGetTotalPage();
});
//点击页码翻页
function musicPageChange(page) {
    currentPage = page;
    musicReload()
}
//点击上一页翻页
$("#music-prev").click(function(){
    if (currentPage>1){
        currentPage--;
        musicReload();
    }
});
//点击下一页翻页
$("#music-next").click(function(){
    if (currentPage<totalPage){
        currentPage++;
        musicReload();
    }
});

/*==============================歌单列表==============================*/
function songDataJoin(obj) {
    $("#song-tbody").html("");
    //console.log(obj)
    for (let i = 0; i < obj.length; i++) {
        let state,state1,type,color;
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
                       <td>${obj[i].musicName}</td>
                       <td>${obj[i].createUser}</td>
                       <td>${obj[i].DATE}</td>
                       <td>${state}</td>
                       <td>
                             <button class="song-delBtn btn ${color}" myid="${obj[i].id}" stateCode="${obj[i].state}">${state1}</button>
                       </td>
                   </tr>`;
        $("#song-tbody").append(str);
    }
}
//列表
function songReload() {
    //console.log(1)
    let musicName=  $("#song-txtUserName").val();
    let createUser=  $("#song-txtRealName").val();
    let state=  $("#song-txtState").val();
    let param = "currentPage="+currentPage+"&pageSize="+pageSize+"&musicName="+musicName+"&createUser="+createUser+"&state="+state;
    ajax("post","/music/musicList.do",param,function(data){
        let obj = JSON.parse(data).song;
        songDataJoin(obj);
    });
}
//根据总页数页面添加页数
function songPageList(){
    $("#song-pageNum").html("");
    //console.log("页数",totalPage)
    for (let i = 1 ; i<=totalPage ;i++) {
        $("#song-pageNum").append("<a onclick='songPageChange("+i+")'>"+i+"</a>")
    }
}
//获取总页数
function songGetTotalPage() {
    let musicName=  $("#song-txtUserName").val();
    let createUser=  $("#song-txtRealName").val();
    let state=  $("#song-txtState").val();
    let param = "musicName="+musicName+"&createUser="+createUser+"&state="+state;
    ajax("post","/music/musicListNum.do",param,function(data){
        let obj = JSON.parse(data).song;
        totalNum=obj[0].totleCount;
        totalPage = Math.ceil(totalNum/pageSize);
        songPageList();
    });
}
//查询
$("#song-searchBtn").click(function(){
    currentPage = 1;
    songReload();
    songGetTotalPage();
});
//点击页码翻页
function songPageChange(page) {
    currentPage = page;
    songReload()
}
//点击上一页翻页
$("#song-prev").click(function(){
    if (currentPage>1){
        currentPage--;
        songReload();
    }
});
//点击下一页翻页
$("#song-next").click(function(){
    if (currentPage<totalPage){
        currentPage++;
        songReload();
    }
});