 var pullUp = $(' <div id="pullUp"><span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多...</span></div>');
 $('#list').after(pullUp);
 $("div#pullUp").css({
 	display: "none"
 });
 //去除浏览器默认事件
 document.addEventListener('touchmove', function (e) {
 	e.preventDefault();
 }, false);
 //domready后绑定初始化事件
 document.addEventListener('DOMContentLoaded', loaded, false);
 var myScroll = null;

 function pullUpAction() {
 	pullUpEl.className = 'loading';
 	/*这里的超时调用是模拟网速设置的定时器*/
 	setTimeout(function () {
 		var ohtml = $("#list>li:first").clone();
 		$("#list").append(ohtml);

 		/*使用零秒的超时调用为了给浏览器一个重绘的时间*/
 		setTimeout(function () {
 			myScroll.refresh();
 		}, 0)
 	}, 2000);
 }
 /*页面初始化立即加载函数*/
 function loaded() {
 	pullUpEl = document.getElementById('pullUp');
 	pullUpH = pullUpEl.offsetHeight;
 	myScroll = new iScroll('mainBox', {
 		vScrollbar: false,
 		onScrollStart: function () {
 			myScroll.refresh();
 		},
 		onScrollLimit: function () {},
 		onRefresh: function () {
 			if (pullUpEl.className.match('loading')) {
 				pullUpEl.className = '';
 				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
 			}
 		},
 		onScrollMove: function () {
 			if ($("#title")) {
 				if (-(this.y) / 40 > 3.15) {
 					$("#title").show();
 				} else {
 					$("#title").hide();
 					$(".noneActiveNav").css("visibility", "hidden");
 				}
 			}
 			if (this.pointY <= 0) {
 				this.scrollTo(this.maxScrollY, this.maxScrollY, 400);
 			}
 			if (this.y < (this.maxScrollY) && !pullUpEl.className.match('flip')) {
 				$("div#pullUp").css({
 					display: "block"
 				});
 				pullUpEl.className = 'flip';
 				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
 			}
 		},
 		onScrollEnd: function () {
 			/*列表记忆*/

 			/*if (isList) {
 				var page_Href = window.location.href;
 				var pageTop = $("#list").offset().top;
 				var pageHTML = $("#list").html();
 				window.sessionStorage.setItem("pageHref", page_Href);
 				window.sessionStorage.setItem("pageHTML", pageHTML);
 				window.sessionStorage.setItem("pageTop", pageTop);
 			}*/
 			if (pullUpEl.className.match('flip')) {
 				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
 				pullUpAction();
 			}
 		}
 	});
 	var pageHREF = window.location.href;
 	var pageHref1 = window.sessionStorage.getItem("pageHref");
 	var pageTop1 = window.sessionStorage.getItem("pageTop");
 	var pageHTML1 = window.sessionStorage.getItem("pageHTML");

 	if (pageHREF === pageHref1) {
 		$("#list").html(pageHTML1);
 		myScroll.refresh();
 		myScroll.scrollTo(0, pageTop1, 0);
 	}

 }
 window.myScroll = myScroll;