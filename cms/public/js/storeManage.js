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
let imgSrc;
function dataJoin(obj) {
    $("#tbody").html("");
    //console.log(obj)
    for (let i = 0; i < obj.length; i++) {
        let state,state1,type,color;
        let createTime = new Date(obj[i].DATE).toLocaleString();
        if(obj[i].State==1){
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
                                    <td>${obj[i].NAME}</td>
                                    <td>${obj[i].TYPE}</td>
                                    <td>${obj[i].Price}</td>
                                    <td>${obj[i].STORAGE}</td>
                                    <td>${obj[i].collectNum}</td>
                                    <td>${obj[i].userName}</td>

                                    <td>${createTime}</td>
                                    <td>${state}</td>
                                    <td>
                                       <!--<span myid="<%=e.id%>">修改</span>-->
                                       <!--<span class="delBtn" stateCode="<%=e.state%>">-->
                                          <button class="editBtn btn btn-info" myid="${obj[i].Id}" data-target="#myModal0" data-toggle="modal">修改</button>
                                          <button class="delBtn btn ${color}" myid="${obj[i].Id}" stateCode="${obj[i].State}">${state1}</button>
                                     </td>
                            </tr>`;
        $("#tbody").append(str);
    }
}
//列表
function reload() {
    //console.log(1)
    let name=  $("#goodsName").val();
    let storage=  $("#goodsStorage").val();
    let state=  $("#goodsState").val();
    let param = "currentPage="+currentPage+"&pageSize="+pageSize+"&name="+name+"&storage="+storage+"&state="+state;
    ajax("post","/storeList.do",param,function(data){
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
    let name=  $("#goodsName").val();
    let storage=  $("#goodsStorage").val();
    let state=  $("#goodsState").val();
    let param = "name="+name+"&storage="+storage+"&state="+state;
    ajax("post","/storeListNum.do",param,function(data){
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
    reload();
    getTotalPage();
});

//更改状态(删除当前用户(不让该用户登录))
$("#tbody").on("click",".delBtn",function(){
    let did=$(this).attr("myid");
    let state=$(this).attr("stateCode");
    console.log("state",state);
    console.log("id",did);
    state=state==1?0:1;
    let param = "id=" + did+"&state="+state;
    //console.log(param)
    ajax("post","/storeDelete.do",param,function(data){
        console.log(data);
        let obj = JSON.parse(data).data;
        if(obj.affectedRows>0){
            reload();
        }else{
            alert("错误");
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
//点击添加按钮获取商品类型和获取商品颜色
$("#addBtn").click(function() {
    ajax("get","/getStoreTypeOrColor",null,function(data){
        let obj=JSON.parse(data).data;
        console.log(obj);
        $("#goodsType1").html("");
        $("#colorGroup").html("");
        let str="";//获取商品类型
        let str1="";//获取商品颜色
        for(var i=0;i<obj.length;i++){
            if(obj[i].TYPE=="商品类型"){
                str+="<option value='"+obj[i].id+"'>"+obj[i].NAME+"</option>";
            }else if(obj[i].TYPE=="颜色"){
                console.log(obj[i].TYPE);
                str1+="<input type='checkbox' class='white' name='color' value='"+obj[i].id+"'/>"+obj[i].NAME+"&ensp;&ensp;&ensp;";
            }
        }
        $("#goodsType1").append(str);
        $("#colorGroup").append(str1);
    })
});


//点击保存按钮添加商品信息
$("#saveBtn").click(function(){
    let name=$("#goodsName1").val();
    let price=$("#goodsPrice1").val();
    let storage=$("#goodsStorage1").val();
    let img=$("#goodsImg1").val();
    let des=$("#goodsDes1").val();
    let type=$("#goodsType1").val();
    let getColor=document.getElementsByName("color");
    let check_val=[];
    for(var i in getColor){
        if(getColor[i].checked){
            check_val.push(getColor[i].value);
        }
    }
    let param="name="+name+"&price="+price+"&storage="+storage+"&img="+img+"&des="+des+
        "&type="+type+"&color="+check_val;
    console.log("addStore",param);
    ajax("post","/storeAdd.do",param,function(data){
        console.log(data+"add in");
        if(data=="添加成功"){
            reload();
            $("#myModal11").modal("hide");
        }else{
            alert(data);
        }
    });
    uploadShowImg();
    //$("#goodsName1").val('');
    //$("#goodsPrice1").val('');
    //$("#goodsStorage1").val('');
    //$("#goodsImg1").val('');
    //$("#goodsDes1").val('');
    //$("#goodsType1").val('');
    //$("#goodsShowImg").html('');
});
//添加商品类别
$("#addGoodsTypeBtn").click(function(){
    let name=$("#goodsTypeName").val();
    let type=$("#goodsType").val();
    let param="name="+name+"&type="+type;
    if(name==''||type==''){
        $(".message").html("商品信息不能为空");
    }else{
        ajax("post","/addType.do",param,function(data){
            if(data=="添加成功"){
                $("#myModal12").modal("hide");
                alert(data);

            }else{
                alert(data);
            }
        })
    }
});
let colorArr=[];
let getType;
let j=0;
//获取修改商品信息
$("#tbody").on("click",".editBtn",function(){
    ajax("get","/getStoreTypeOrColor",null,function(data){
        let obj=JSON.parse(data).data;
        console.log(obj);
        $("#updateType").html("");
        $("#updateColor").html("");
        let str="";//获取商品类型
        let str1="";//获取商品颜色
        for(var i=0;i<obj.length;i++){
            //console.log(i==getType);
            if(obj[i].TYPE=="商品类型"){
                if(i==getType){
                    str+="<option values='"+getType+"' selected>"+obj[i].NAME+"</option>";
                }else{
                    str+="<option value='"+obj[i].id+"'>"+obj[i].NAME+"</option>";
                }
            }else if(obj[i].TYPE=="颜色"){
                str1 += "<input type='checkbox' class='white colorbox' name='color' value='" + obj[i].id + "'/>" + obj[i].NAME + "&ensp;&ensp;&ensp;";
            }
        }
        $("#updateType").append(str);
        $("#updateColor").append(str1);
        console.log("ajax2 in"+colorArr.length);
    });
    updateid=$(this).attr("myid");
    console.log(updateid);
    let param="id="+updateid;
    ajax("post","/storeInfo.do",param,function(data){
        let obj=JSON.parse(data).data;
        console.log("path:",obj);
        $("#updateName").val(obj[0].NAME);
        $("#updatePrice").val(obj[0].Price);
        $("#updateStarage").val(obj[0].STORAGE);
        //$("#updateThumbnail").val(obj[0].Thumbnail);
        //$("#updateDes").val(obj[0].description);
        //$("#updateType").val(obj[0].TYPE);
        getType=parseInt(obj[0].TYPE);
        console.log("getType",getType);
        //将取到的colorid进行字符串分割循环遍历
        let colors=obj[0].colorid;
        colorArr= colors.split(",");
        console.log(colorArr);
        for(let i = 0; i<$(".colorbox").length;i++){
            $(".colorbox")[i].checked="";
        }
        for(let i = 1; i<colorArr.length-1;i++){
            for(let j =0; j<$(".colorbox").length;j++){
                if($(".colorbox")[j].value==colorArr[i]){
                    $(".colorbox")[j].checked="checked"
                }
            }
        }
    });

});

//修改信息
$("#updateBtn").click(function(){
    let arr=[];
    let name=$("#updateName").val();
    let price=$("#updatePrice").val();
    let storage=$("#updateStarage").val();
    let Thumbnail=$("#updateThumbnail").val();
    let description=$("#updateDes").val();
    let type=$("#updateType").val();
    console.log("length",$(".colorbox").length);
    for(let i=0;i<$(".colorbox").length;i++){
        if($(".colorbox")[i].checked){
            arr.push($(".colorbox")[i].value);
        }
    }
    let param="id="+updateid+"&name="+name+"&price="+price+"&storage="+storage+"&Thumbnail="+Thumbnail+
        "&description="+description+"&type="+type+"&color="+arr;
    ajax("post","/storeUpdateInfo.do",param,function(data){
        if(data=="修改成功"){
            alert("修改成功");
            reload();
            $("#myModal0").modal("hide");
        }else{
            alert("修改失败");
        }
    })
});
//上传图片
let txtFile=$("#txtFile");
$("#btnUpload").click(function(){
    txtFile.click();
});
txtFile.change(function(){
    console.log(11);
    imgSrc='';
});

function uploadShowImg(){
    var httpRequest;
    if(window.XMLHttpRequest){
        httpRequest=new XMLHttpRequest();
    }else{
        httpRequest=new ActiveXObject();
    }
    httpRequest.open("post","/uploadStoreShowImg.do");
    httpRequest.onreadystatechange=function(){
        if(httpRequest.readyState==4&&httpRequest.status==200){
            var json=JSON.parse(httpRequest.responseText);
            console.log(json.length);
           /* for(var i=0;i<json.length;i++){
                //console.log(json[i]);
                document.getElementById("goodsShowImg").innerHTML+="<img src='"+json[i].url+"'/>";

            }*/
        }
    };
    let form=document.getElementById("form1");
    let formData= new FormData(form);
    console.log(formData);
    httpRequest.send(formData);//发送信息
}

function xmTanUploadImg(obj) {
    var fl=obj.files.length;
    for(var i=0;i<fl;i++){
        var file=obj.files[i];
        var reader = new FileReader();

        //读取文件过程方法
        reader.onloadstart = function (e) {
            console.log("开始读取....");
        };
        reader.onprogress = function (e) {
            console.log("正在读取中....");
        };
        reader.onabort = function (e) {
            console.log("中断读取....");
        };
        reader.onerror = function (e) {
            console.log("读取异常....");
        };
        reader.onload = function (e) {
            console.log("成功读取....");
            var imgstr='<img style="width:100px;height:100px;" src="'+e.target.result+'"/>';
            //console.log(e.target.result);
            var oimgbox=document.getElementById("goodsShowImg");
            var ndiv=document.createElement("div");
            ndiv.innerHTML=imgstr;
            ndiv.className="img-div";
            oimgbox.appendChild(ndiv);
            console.log(" in data");
        };
        reader.readAsDataURL(file);
    }
}




