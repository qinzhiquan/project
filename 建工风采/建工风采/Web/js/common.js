var timeoutId;

/**
 * 打开特效页面
 * @param {Object} page
 * @param {Object} callBack
 */
function openPage(page, callBack) {
	var html = ["<div class='_waitPage' id='_waitPage'>"];
	html.push("<iframe src='" + page + "' scrolling='no'></iframe><div>");
	$(document.body).append(html.join(''));
	callBack($('#_waitPage'));
}

/**
 * 关闭特效页面
 * @param {Object} callBack
 */
function closePage(callBack) {
	$('#_waitPage').remove();
	callBack($('#_waitPage'));
}

// 监听键盘Esc键退出应用
$("body").keyup(function (e){
	if (e.which === 27) {
		CsszUtils.quit();
	}
});

// 定时超过3分钟返回待机页面
function timesBack() {
	timeoutId = setTimeout(function() {
		window.location.href = "index.html";
	}, 180000);
}

// 页面淡出动效跳转
function fadeOutPage(eleId, page) {
	$("#" + eleId).fadeOut("slow", function (){
		window.location.href = page;
	})
}


function linkPage(eleId, page) {
	$("#" + eleId).animate({width: "0%"},"slow",function (){
		window.location.href = page;
	})
}

// 获取URL参数 
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		var para = decodeURI(r[2]);
		return para;
	} else {
		return '';
	}
}