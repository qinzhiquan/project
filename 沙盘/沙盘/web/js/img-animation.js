'use strict';
/* 图片动画库类
 * @constructor
 */
function ImgAnimation(ele, speed, index){
	this.ele = ele;
	this.intervalId;
	this.speed = speed;
	this.index = index || 1;
	this.maxIndex = this.ele.attr("data-length");
	var pathArray = this.ele.attr("src").split('\/');
	pathArray[pathArray.length - 1] = "";
	this.url = pathArray.join('\/');

	var defaultPath = this.ele.attr("src");
	this.imgFormat = defaultPath.slice(defaultPath.lastIndexOf('.'));
}
 
 /* 
 * 播放图片
 * @frame 当参数为数组时播放动画，为数字时只显示图片，没有动画
 */
ImgAnimation.prototype.play = function(){
	var self = this;
	this.intervalId = setInterval(function (){
		self.index++;
		if (self.index > self.maxIndex) {
		
			self.index = 1;
		}
		self.ele.attr("src", self.url + self.index + self.imgFormat);
	}, self.speed);
}

 /* 
 * 停止播放图片
 */
ImgAnimation.prototype.stop = function(){
	window.clearInterval(this.intervalId);
}

/* 图片背景动画库类
 * @constructor
 */
function BgAnimation(ele, speed, index){
	this.ele = ele;
	this.intervalId;
	this.speed = speed;
	this.index = index || 1;
	this.url = this.ele.attr("data-path");
	this.maxIndex = this.ele.attr("data-length");
	this.imgFormat = this.ele.attr("data-format");
}
 
 /* 
 * 播放背景图片
 * @frame 当参数为数组时播放动画，为数字时只显示图片，没有动画
 */
BgAnimation.prototype.playBg = function(){
	var self = this;
	this.intervalId = setInterval(function (){
		self.index++;
		if (self.index > self.maxIndex) {
		
			self.index = 1;
		}
		self.ele.attr("src", self.url + self.index + self.imgFormat);
		
		var path = self.url + self.index + self.imgFormat;
        self.ele.css("background-image","url(" + path + ")").css(" background-repeat","no-repeat").css('background-size','100% 100%');
	}, self.speed);
}

 /* 
 * 停止播放背景图片
 */
BgAnimation.prototype.stopBg = function(){
	window.clearInterval(this.intervalId);
}