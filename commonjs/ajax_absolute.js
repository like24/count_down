var current_page_href = window.location.href;
var get_href = window.sessionStorage.getItem("current_page_href");
if (current_page_href === get_href) {
	var listHtml = window.sessionStorage.getItem("list_Html");
	$("#list").html(listHtml);
	var Top = window.sessionStorage.getItem("TOP");
	myScroll.scrollTo(0, Top, 0);
	pageindex = window.sessionStorage.getItem("pageindex");
}
window.onunload = onbeforeunload_handler;

function onbeforeunload_handler() {
	var current_page_href = window.location.href;
	window.sessionStorage.setItem("current_page_href", current_page_href);
	var list_Html = $("#list").html();
	window.sessionStorage.setItem("list_Html", list_Html);
	window.sessionStorage.setItem("pageindex", pageindex);
	window.sessionStorage.setItem("TOP", myScroll.y)
}