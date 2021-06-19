'use strict';

 /* 
    毛笔 笔刷 
 */
const Brush = function(options) {
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  options.width ? this.canvas.width = options.width : "";
  options.height ? this.canvas.height = options.height : "";
  this.ctx.fillStyle = "rgba(0,0,0,0.8)";
  const _this = this;
  
  this.bMax = options.max ? options.max : 20;
  this.bMin = options.min ? options.min : 10;
  this.bEnd = options.end ? options.end : 5;
  this.p = 0;
  this.l = this.bMax;
  this.arr = [];

  this.bindEvent();
  
  this.moveFlag = false;
  this.upof = {};
  this.radius = 0;
  this.has = [];
  this.lineMax = this.l;
  this.lineMin = this.bMin;
  this.linePressure = 1;
  this.smoothness = 80;

  this.imgs = options.imgs || "";
  this.img = new Image();
  this.img.src = "image/pen/pen2.png";
  // canvas相对body的位移
  this.canvas_offset = (function(obj){
    let parentOffsetLeft = document.getElementsByClassName('contextBox')[0].offsetLeft;
    var left = obj.offsetLeft - parentOffsetLeft + 130;
    var top = obj.offsetTop;
    while( obj.parentNode != document.body ){
      obj = obj.parentNode;
      left += obj.offsetLeft;
      top  += obj.offsetTop;
    }
    return { left: left, top: top };
  })(this.canvas);
  //this.img1 = document.getElementById('pen2');
  
}
// 改变笔画大小
Brush.prototype.changeSize = function(item){
  this.bMax = item[0];
  this.bMin = item[1];
  this.bEnd = item[2];
  this.lineMax = this.bMax;
  this.lineMin = this.bMin;
  this.l = this.bMax;
}

// 改变笔画颜色
Brush.prototype.changeColor = function(imgName){
  this.img.src = "image/pen/" + imgName;
}
// 绑定事件
Brush.prototype.bindEvent = function(){
  // 绑定触摸事件
  this.canvas.addEventListener("touchstart", this.downEvent.bind(this), false);
  this.canvas.addEventListener("touchmove", this.moveEvent.bind(this), false);
  this.canvas.addEventListener("touchend", this.upEvent.bind(this), false);
  this.canvas.addEventListener("contextmenu", function(e){ e.preventDefault() }, false);
  // 绑定鼠标按下事件
  this.canvas.addEventListener("mousedown", this.downEvent.bind(this), false);
  this.canvas.addEventListener("mousemove", this.moveEvent.bind(this), false);
  this.canvas.addEventListener("mouseup",   this.upEvent.bind(this), false);
  // this.canvas.onmousedown = this.downEvent.bind(this);
  // this.canvas.onmousemove = this.moveEvent.bind(this);
  // this.canvas.onmouseup = this.upEvent.bind(this);
}
// 移除事件
Brush.prototype.removeEvent = function(){
  this.canvas.removeEventListener("touchstart", this.downEvent.bind(this), false);
  this.canvas.removeEventListener("touchmove", this.moveEvent.bind(this), false);
  this.canvas.removeEventListener("touchend", this.upEvent.bind(this), false);
  this.canvas.removeEventListener("contextmenu", function(e){ e.preventDefault() }, false);

  this.canvas.removeEventListener("mousedown", this.downEvent.bind(this), false);
  this.canvas.removeEventListener("mousemove", this.moveEvent.bind(this), false);
  this.canvas.removeEventListener("mouseup", this.upEvent.bind(this), false);
}
Brush.prototype.clear = function() {
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}
Brush.prototype.clickEvent = function(e) {
  this.cli = this.getXY(e);
}
Brush.prototype.downEvent = function (e) {
  this.moveFlag = true;
  this.has = [];
  this.upof = this.getXY(e);
  // this.ctx.drawImage(this.img,(this.upof.x - this.big/2),(this.upof.y - this.big/2),this.big,this.big);
  var x1 = this.upof.x;
  var y1 = this.upof.y;
  this.arr.unshift({x1,y1});
};
Brush.prototype.moveEvent = function (e) {
  if (!this.moveFlag)
    return;
  e.preventDefault();
  var of = this.getXY(e); //move
  var up = this.upof;  //down
  var ur = this.radius;  //banjing
  var b = 0;
  this.has.unshift({time:new Date().getTime() ,dis:this.distance(up,of)});
  var dis = 0;
  var time = 0;
  for (var n = 0; n < this.has.length-1; n++) {
    dis += this.has[n].dis;
    time += this.has[n].time-this.has[n+1].time;
    if (dis>this.smoothness)
      break;
  }
  var or = Math.min(time/dis*this.linePressure+this.lineMin , this.lineMax) / 2;
  this.radius = or;
  this.upof = of;
  var len = Math.round(this.has[0].dis/2)+1;
  for (var i = 0; i < len; i++) {
    var x = up.x + (of.x-up.x)/len*i;
    var y = up.y + (of.y-up.y)/len*i;
    var r = ur + (or-ur)/len*i;
    this.ctx.beginPath();
    // this.ctx.arc(x,y,r,0.2*Math.PI,1.5*Math.PI,true);
    // this.ctx.fill();
    var r_r = r*2;

    x = x-this.l/2;
    y = y - this.l/2;
    this.arr.unshift({x,y});
    // console.log(this.img)
    if( !this.img ) continue;
    this.ctx.drawImage(this.img,x,y,this.l,this.l);
    this.l = this.l - 0.2;
    if( this.l < this.lineMin) this.l = this.lineMin;
    this.p++;
  }
}
Brush.prototype.upEvent = function (e) {
  this.moveFlag = false;
  this.l = this.bMax;
  if(this.arr.length >100){
    for(var j = 0; j <60 ;j++){
      // arr[j].x = arr[j].x - 2;
      // arr[j].y = arr[j].y - 1;
      this.arr[j].x = this.arr[j].x-this.l/4;
      this.arr[j].y = this.arr[j].y - this.l/4;
      if( !this.img ) continue;
      this.ctx.drawImage(this.img,this.arr[j].x,this.arr[j].y,this.l,this.l);

      this.l = this.l - 0.3;
      if( this.l < this.bEnd) this.l = this.bEnd;
    }
    this.l = this.bMax;
    this.arr = [];
  }
  if (this.arr.length==1) {
    // this.arr[0].x =
    this.ctx.drawImage(this.img,this.arr[0].x1 - this.l/2,this.arr[0].y1 - this.l/2,this.l,this.l);
    this.arr = [];
  }
}
Brush.prototype.getXY = function (e){
  var x = e.clientX || e.touches[0].clientX;
  var y = e.clientY || e.touches[0].clientY;
  // // return {
  //     x : e.clientX - this.canvas.offsetLeft + (document.body.scrollLeft || document.documentElement.scrollLeft),
  //     y : e.clientY - this.canvas.offsetTop  + (document.body.scrollTop || document.documentElement.scrollTop)
  // }
  return {
    x : x - this.canvas_offset.left + (document.body.scrollLeft || document.documentElement.scrollLeft),
    y : y - this.canvas_offset.top  + (document.body.scrollTop || document.documentElement.scrollTop)
  }
}
Brush.prototype.distance = function (a,b)
{
  let x = b.x-a.x , y = b.y-a.y;
  return Math.sqrt(x*x+y*y);
}





/* 
  钢笔 
*/
function Pen( options ){
  this.canvas = options.canvas;
  options.width ? this.canvas.width = options.width : "";
  options.height ? this.canvas.height = options.height : "";
  this.context = this.canvas.getContext("2d");
  this.context.lineWidth = options.lineWidth || 2;
  this.context.strokeStyle = '#000';
  this.current = [];
  this.hold = false;

  // canvas相对body的位移
  this.canvas_offset = (function(obj){
    var left = obj.offsetLeft;
    var top = obj.offsetTop;
    while( obj.parentNode != document.body ){
      obj = obj.parentNode;
      left += obj.offsetLeft;
      top  += obj.offsetTop;
    }
    return { left: left, top: top };
  })(this.canvas);
  
  this.bindEvent();
}
Pen.prototype.bindEvent = function(){
  this.canvas.addEventListener('mousedown',  this.start.bind(this));
  this.canvas.addEventListener('touchstart', this.start.bind(this));
  this.canvas.addEventListener('mousemove',  this.move.bind(this));
  this.canvas.addEventListener('touchmove',  this.move.bind(this));
  this.canvas.addEventListener('mouseup',    this.end.bind(this));
  this.canvas.addEventListener('touchend',   this.end.bind(this));
}
Pen.prototype.removeEvent = function(){
  this.canvas.removeEventListener('mousedown',  this.start.bind(this));
  this.canvas.removeEventListener('touchstart', this.start.bind(this));
  this.canvas.removeEventListener('mousemove',  this.move.bind(this));
  this.canvas.removeEventListener('touchmove',  this.move.bind(this));
  this.canvas.removeEventListener('mouseup',    this.end.bind(this));
  this.canvas.removeEventListener('touchend',   this.end.bind(this));
}
Pen.prototype.midPointBtw = function(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  };
};
Pen.prototype.getCoordinatesFromEvent = function( event ) {
  var touch = typeof event.changedTouches !== 'undefined';
  return {
    x: touch ? event.changedTouches[0].clientX - this.canvas_offset.left : event.clientX - this.canvas_offset.left,
    y: touch ? event.changedTouches[0].clientY - this.canvas_offset.top : event.clientY - this.canvas_offset.top
  };
};
Pen.prototype.drawSegments = function(event) {
  var coords = this.getCoordinatesFromEvent(event);
  this.current.push({
    x: coords.x * window.devicePixelRatio,
    y: coords.y * window.devicePixelRatio
  });
  this.context.beginPath();
  this.context.moveTo(this.current[0].x, this.current[0].y);
  for (var i = 0; i < this.current.length - 1; i += 1) {
    var midPoint = this.midPointBtw(this.current[i], this.current[i + 1]);
    this.context.quadraticCurveTo(this.current[i].x, this.current[i].y, midPoint.x, midPoint.y);
  }
  this.context.stroke();
};
Pen.prototype.start = function(event) {
  var coords = this.getCoordinatesFromEvent(event);
  this.hold = true;
  this.current = [{
    x: coords.x * window.devicePixelRatio,
    y: coords.y * window.devicePixelRatio
  }];
};
Pen.prototype.move = function(event) {
  if (this.hold) this.drawSegments(event);
};
Pen.prototype.end = function() {
  this.hold = false;
  // segments.push(this.current);
};

// var options = {
//   el: "canvas",
//   width: window.innerWidth,
//   height: window.innerHeight
// }
// var pen = new Pen( options );

