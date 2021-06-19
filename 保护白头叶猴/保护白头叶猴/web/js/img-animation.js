'use strict';
/* 帧动画库类
 * @constructor
 */
function ImgAnimation(ele, speed, index){
	this.ele = ele;
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
	setInterval(function (){
		self.index++;
		if (self.index > self.maxIndex) {
		
			self.index = 1;
		}
		self.ele.attr("src", self.url + self.index + self.imgFormat);
	}, self.speed);
}