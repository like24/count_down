;
(function ($) {
    /*弹出框调用，需要配置如下参数
				dialog({
                    /*wrapper为配置的最大盒子，最好写成.wrapper,
                    id是创建的弹出框的id名，我这有四个，是固定死的，也可以配置其他的，但还另需要写样式，这四个固定的可任意配置
                    四个id(share代表的是分享弹出框，over代表的是试看结束，noshop代表的是未购买，shopping代表的是购买成功)
                    mask是打黑色背景，true或false
                    close是关闭按钮，true或false
                    btnleft和btnleft是按钮，填写按钮的提示文字
                    title1是文本文字，
                    title2也是
                    bhtml是一个已购买视频，多少秒钟到视频播放页面
                    spanhtml是一个试看结束之后，可以配置的重新观看
                    bodytap是点击空白区域，可以使弹出框关闭
                    time是设置一个定时器关闭弹出框的数值型
                    shikan:function(){
                        试看是点击试看的按钮执行回掉
                    }
                    goumai:function(){
                        购买时点击购买的时候执行回掉
                    }
                    successImg是正确的时候的图片
                    errorImg是错误的是图片
                    again是重新试看函数
                    wrapper:".wrapper",
                    id:"over",
                    title1:"试看已结束",
                    title2:"购买课程可观看完整版视频，或",
                    spanhtml:"重新观看",
                    img:"success",
                    bodytap:true,
                    successImg:true
                  
                });
    */

    /*
    function share (){
           分享
        	dialog({
                       wrapper:".wrapper",
                        id:"share",
                        close:true,
                        title1:"点击屏幕右上角“...”",
                        title2:"选择分享给朋友或分享到朋友圈",
                        mask:true,
                        time:2500
                        
                    });
    }





       购买成功
       function shopping (){
        dialog({
                wrapper:".wrapper",
                id:"shopping",
                close:true,
                title1:"购买成功",
                title2:"后自动跳转到视频播放页面...",
                mask:true,
                time:2500,
                successImg:true,
                bhtml:3//多少秒后跳到播放页面
        })
    }


    functio over(){
       试看结束
        dialog({
            wrapper:".wrapper",
            id:"over",
            title1:"尊敬的用户，试看已结束 ",
            title2:"购买视频可观看完整视频或",
            spanhtml:"重新试看",
            errorImg:true,
            again:function(){

              重新试看逻辑
            }
                
        })
    }




    未购买和确定发送是一样的，都是调用这个函数，按钮的顺序也是一样
        function noshop(){
        
            dialog({
            
                     wrapper:".wrapper",
                    id:"noshop",
                    close:true,
                    title1:"点击屏幕右上角“...”",
                    btnleft:"购买",
                    btnright:"试看",
                    mask:true,
                    goumai:function(){
                        alert("购买")
                    },
                    shikan:function(){
                        alert("试看")
                }
            })
        }

    */
    /*
        function teachlog(){
             dialog({
                    wrapper:".wrapper",
                    id:"teach",
                    mask:true,
                    导师图像
                    teachImg:"../images/question_shasha.jpg",
                    标题
                    h:"莎莎",
                    导师简介
                    title1:"资深产管运营导师",
                    导师介绍
                    title2:"10年的火鸟工作经验10年的火鸟工作经验10年的火鸟工作经验10年的火鸟工作经验10年的火鸟工作经验10年的火鸟工作经验10年的火鸟工作经验10年的火鸟工作经验10年的火鸟工作经验10年的火鸟工作经验10年的火鸟工作经验10年的火鸟工作经验10年的火鸟工作经验10年的火鸟工作经验10年的火鸟工作经验10年的火鸟工作经验10年 ",
                    radiusBox:true,
                    close:true,
                    btnleft:"关注",
                    btnright:"个人主页",
                    focus这个值是判断现在是否为关注状态
                    focus:false,
                    goumai:function(){
                        关注事件
                    },
                    shikan:function(){
                        window.location.href='';
                }
                
        })
        }
        function two_dimension_code(){
            dialog({
                    wrapper:".wrapper",
                    mask:true,
                    id:"two_dimension_code",
                    h:"沙沙",
                    title1:"快点放是客房及谁开的房间快点放假开始的减肥考多少积分",
                    title2:"扫一扫上面的二维码图案，加我微信",
                    two_dimension_img:"../images/two_dimension_code.jpg",
                    two_dimension:"../images/two_dimension.jpg",
                    bodytap:true
                })
        }
        */
    /*创建mask*/
    function creatMask(obj) {
        masking = $("<div class='masking'></div>");
        $(obj.wrapper).append(masking);
    }
    /*dialog开始*/
    function dialog(obj) {
        /*创建mask*/
        if (obj.mask) {
            creatMask(obj);
        }
        /*创建大盒子*/
        if ($("#" + obj.id).length == 0) {

            divBox = $("<div></div>");
            divBox.attr("id", obj.id);
            if (obj.id == "over") {
                $(".audio_video").append(divBox);
            } else {
                $(obj.wrapper).append(divBox);
            }

            /*创建close关闭按钮*/
            if (obj.close) {
                var closeBox = $("<span class='close'></span>");
                divBox.append(closeBox);
                closeBox.on("click", function (e) {

                    closebtn(obj);


                })
            }
            /*创建图片*/
            if (obj.successImg) {
                var imgDiv = $("<div class='successImg'></div>");
                divBox.append(imgDiv);
            }
            /*导师图片*/
            if (obj.teachImg) {
                var Img = $("<img src=" + obj.teachImg + ">");
                divBox.append(Img);
            }
            /*二维码图片*/
            if (obj.two_dimension_img) {
                var Img = $("<img src=" + obj.two_dimension_img + " class='two_dimension_img'>");
                divBox.append(Img);
            }
            if (obj.two_dimension) {
                var Img1 = $("<img src=" + obj.two_dimension + " class='two_dimension'>");
                divBox.append(Img1);
            }
            if (obj.radiusBox) {
                var radiusBox = $("<div class='radiusBox'></div>");
                divBox.append(radiusBox);
            }
            if (obj.errorImg) {
                var imgDiv = $("<div class='errorImg'></div>");
                divBox.append(imgDiv);
            }
            if (obj.bodytap) {
                $(".masking").on("click", function () {
                    closebtn();
                })
            }
            /*title的插入*/
            if (obj.h) {
                var hOne1 = $("<h1>" + obj.h + "</h1>");
                divBox.append(hOne1);
            }
            if (obj.title1) {
                var pOne1 = $("<p class='title1'>" + obj.title1 + "</p>");
                divBox.append(pOne1);
            }

            if (obj.title2) {
                var pOne2 = $("<p class='title2'>" + obj.title2 + "</p>");
                divBox.append(pOne2);
                if (obj.bhtml) {
                    var i = obj.bhtml;
                    var bhtml = $("<b>0" + obj.bhtml + "秒</b>");
                    pOne2.prepend(bhtml);
                    var timer = setInterval(function () {
                        i--;
                        if (i == 0) {
                            closebtn(obj);
                            clearInterval(timer);
                            obj.autoPlay();
                        } else {
                            bhtml.html("<b>0" + i + "秒</b>");

                        }
                    }, 1000)
                }
                if (obj.spanhtml) {
                    var spanhtml = $("<span class='spanhtml'>" + obj.spanhtml + "</span>");
                    pOne2.append(spanhtml);
                    if (obj.again) {
                        $(".spanhtml").on("click", function () {
                            obj.again();
                        })
                    }
                }
            }

            /*title添加到弹框中*/

            /*试看购买按钮的创建*/
            if (obj.btnleft) {
                var btnleft = $("<button class='btnleft'>" + obj.btnleft + "</button>");
                /*这里是判断是否为关注状态*/

                divBox.append(btnleft);
                if (obj.focus) {
                    btnleft.css("background", "#9c9c9c");

                } else {
                    btnleft.on("click", function () {
                        if (obj.goumai) {
                            obj.goumai();
                        }
                    })
                }

            }
            if (obj.btnright) {
                var btnright = $("<button class='btnright'>" + obj.btnright + "</button>");
                divBox.append(btnright);
                btnright.on("tap", function () {
                    if (obj.shikan) {
                        obj.shikan();
                    }
                })
            }
            /*定时关闭*/
            if (obj.time) {
                setTimeout(function () {
                    closebtn(obj);
                }, obj.time)
            }

            /*点击空白区域关闭弹出框*/
            if (obj.bodytap) {
                $(".masking").on("click", function () {
                    closebtn(obj);
                })
            }
        }

    }

    /*关闭按钮功能编写*/
    function closebtn(obj) {
        /*如果有mask则删除*/
        if (obj.mask) {
            $(".masking").remove();
        }
        /*删除弹出框*/
        $("#" + obj.id).remove();
    }

    function removeBox() {
        $("#share").remove();
        $("#over").remove();
        $("#noshop").remove();
        $("#shopping").remove();
        $("#teachlog").remove();
        $(".masking").remove();
    }
    window.dialog = dialog;
    window.removeBox = removeBox;
})(Zepto);