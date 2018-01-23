/**
 * Created by zx on 2017/10/27.
 */
"use strict";

function ajax(method,url,param,fn) {
    let httpRequest;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    } else {
        httpRequest = new ActiveXObject("Microwsoft.XMLHTTP");//ie7以下版本
    }
    if(method=="get"){
        httpRequest.open(method, url+"?"+param);
    }else if (method=="post") {
        httpRequest.open(method, url)
    }

    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            fn(httpRequest.responseText)
        }
    };
    if (method=="get") {
        httpRequest.send(null)
    }else if (method=="post") {
        httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        httpRequest.send(param);
    }
}