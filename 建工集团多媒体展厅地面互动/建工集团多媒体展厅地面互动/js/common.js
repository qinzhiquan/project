// 
var timeoutId;

/**
 * 打开特效页面
 * @param {Object} page
 * @param {Object} callBack
 */
function openPage(page, animation, callBack) {
	if ($('#_waitPage').attr("id")) {
		$('#_waitPage').remove();
	}
	var style = animation ? "style='display:none'" : "";
	var html = ["<div class='_waitPage' id='_waitPage' " + style + ">"];
	html.push("<iframe src='" + page + "' scrolling='no'></iframe><div>");
	$(document.body).append(html.join(''));
	if (animation) {
		callBack($('#_waitPage'));
	}
}

/**
 * 关闭特效页面
 * @param {Object} callBack
 */
function closePage(animation, callBack) {
	callBack($('#_waitPage'));
}

/**
 * 关闭子页面特效页面
 * @param {Object} callBack
 */
function closeChildPage(animation, callBack) {
	parent.closePage(animation, callBack);
}

/**
 * 调用远程js函数
 * @param {Object} method 
 * @param {Object} params
 */
function remotJs(method, params) {
	CsszUtils.sendUdp("1," + method + "," + params);
	/*
	if (!method) {
		return ;
	}
	
	var args = [method];
	if (params) {
		args.push(params);
	}
	$.get(showAddrr + "/?command=1," + args.join(","));
	*/
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
		closeChildPage(false, function(e) {
			e.remove();
		});
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

/// <summary>
/// 获取指定文件夹的文件
/// </summary>
/// <param name="folder"></param>
/// <returns></returns>
// 获取这个文件夹下的数据
// CsszUtils.getFile(string folder)


/// <summary>
/// base64数据转成图片
/// </summary>
/// <param name="folder">保存的目录</param>
/// <param name="data">图片数据</param>
// 保存数据
// CsszUtils.base64ToImageFile(string folder, string data)  
// string folder 文件夹名称
// string data 逗号后面的数据
