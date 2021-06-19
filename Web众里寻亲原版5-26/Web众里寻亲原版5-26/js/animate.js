// 页面定时ID
var timeoutId;
/*
* 页面开场动画
*/
$('.main').animate({'opacity':1},1000);

function pageJump(item,target,date){
    date = date || '';
    window.location.href = `${target}${date}`;
}

// 监听键盘Esc键退出应用
$("html").keyup(function (e){
    if (e.which === 27) {
        CsszUtils.quit();
    }
});

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

// 定时超过3分钟返回待机页面
function timesBack() {
	timeoutId = setTimeout(function() {
		pageJump('.main','../index.html');
	}, 1800000);
}
// 触摸页面清空定时返回并重新计时
$('body').click(function () {
	window.clearTimeout(timeoutId);
	timesBack();
});


