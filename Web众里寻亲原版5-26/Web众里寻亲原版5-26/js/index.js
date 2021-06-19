// 背景音乐
let bgAudio = document.getElementById('bgAudio');
// 背景音乐时间
let bgTime;
// 返回待机页面时间
let backTime = 1800000;
// 按钮音效
let btnAutio = document.getElementById('btnAudio');
//返回待机定时器
let timer;

// 监听键盘Esc键退出应用
$("html").keyup(function (e){
    if (e.which === 27) {
        CsszUtils.quit();
    }
});

// 页面跳转动画
function pageJump(item,target,date){
    date = date || '';
    window.location.href = `${target}${date}`;
}

// 页面点击清除3分钟定时归零
$('body').click(function () {
    clearTimeout(timer);
    timer = setTimeout(function() {
        pageJump('.main','../index.html')
    }, backTime);
})
// 定时超过3分钟返回待机页面
timer = setTimeout(function() {
    pageJump('.main','../index.html')
}, backTime);

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

