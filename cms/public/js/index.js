/**
 * Created by Administrator on 2017/9/29 0029.
 */

//页面改变大小事件
window.onresize = function(){
    asynconresize();
};

window.onload = function(){
    asynconresize();
};

var asynconresize=function(){
    var height = parseInt($(window).height());
    $(".iframeBlock").css("height",height + "px");
    $(".nav_slide").css("height",height +10+ "px");
    $(".nav_bar").css("height",height +10+ "px");
    if($(window).width() < 992){
        $(".iframeBlock").css("width","100%");
    }else{
            $(".iframeBlock").css("width","80%");
            $(".nav_slide").css({"width":"20%","display":"inline_block"});
    }
};


//下拉菜单
$(".nav li").click(function(){
    $(".nav .fa-angle-right").each(function(index,element){
        $(element).css("opacity",0);
        $(element).parents("li").css("background-color","transparent");
    });
    $(this).css("background-color","rgba(79,64,61,1)");
    $(this).find(".normalAngle").animate({
        "opacity":1
    },100);
});

$(".fa-pencil").parent().click(function(){
    var length = $(".secondNav li").length;
    var height = parseInt($(this).css("height"));
    if(height === 60 ) {
        $(".downAngle").css("transform","rotate(90deg)");
        $(this).css("height", 60 + parseInt(length) * 50 + "px");
    }else{
        $(".downAngle").css("transform","rotate(0deg)");
        $(this).css("height", "60px");
    }
});

$(".secondNav li").click(function(){
    var e = window.event || arguments[0];
    $(this).parent().find(".fa-angle-right").each(function(index,element){
        $(element).css("opacity",0);
        $(element).parents("li").css("background-color","transparent");
    });
    $(this).find(".fa-angle-right").animate({
        "opacity":1
    },100);
    $(this).css("background-color","rgba(0,0,0,0.4)");
    e.stopPropagation();
    // return false;
});

//收缩框
$(".switch").click(function(){
    if($(window).width() >= 992) {
        if (parseInt($(".nav_slide").css("width")) !== 0) {
            $(".nav_slide").animate({
                    "width": "0"
                }
            );
            $(".iframeBlock").animate({
                "width": "100%"
            })
        } else {
            $(".nav_slide").animate({
                    "width": "20%"
                }
            );
            $(".iframeBlock").animate({
                "width": "80%"
            })
        }
    }else{
        $(".nav_bar").fadeIn();
        $("body").css("overflow","auto");
    }
});

$(".nav_bar .fa-close").click(function(){
    $(".nav_bar").fadeOut();
    $("body").css("overflow","hidden");
});

$(".nav_bar li").click(function(){
    console.log("点击对象"+$(this).find("ul").attr("class"));
    if($(this).find("ul").attr("class") !== "secondNav") {
        $(".nav_bar").fadeOut();
        $("body").css("overflow","hidden");
    }
});

//个人中心
$(".userBlock").click(function(){
    if($(".userDetail").is(":visible")){
        $(".userDetail").fadeOut();
    }else{
        $(".userDetail").fadeIn();
    }
});

$(".userDetail").mouseleave(function(){
    console.log("out");
    $(this).fadeOut();
});