let x,y;
let minTop;
let leftBox = document.getElementsByClassName('monkeyListLeft')[0];
let rightBox = document.getElementsByClassName('monkeyListRight')[0];



leftBox.onmousedown = function (e) {
    if(!minTop){
        minTop = - leftBox.offsetHeight + 500;
    }

    var e = e || window.event; //要用event这个对象来获取鼠标的位置

    y = e.clientY - leftBox.offsetTop;


    leftBox.onmousemove = function(e) {
        //是否为可移动状态                　　　　　　　　　　　 　　　　　　　
        var e = e || window.event;

        var moveY = e.clientY - y; //得到距离上边移动距离


        if(leftBox.offsetTop>10){
            if(moveY<=0){
                leftBox.style.top = moveY + "px";
            }
        }else if(leftBox.offsetTop<minTop){
            if(moveY >= minTop ){
                leftBox.style.top = moveY + "px";
            }
        }else{
            leftBox.style.top = moveY + "px";
        }
    }

    document.onmouseup = function() {
        leftBox.onmousemove = null;
    }
};

rightBox.onmousedown = function (e) {

    if(!minTop){
        minTop = - rightBox.offsetHeight + 500;
    }

    var e = e || window.event; //要用event这个对象来获取鼠标的位置

    y = e.clientY - rightBox.offsetTop;


    rightBox.onmousemove = function(e) {
        //是否为可移动状态                　　　　　　　　　　　 　　　　　　　
        var e = e || window.event;

        var moveY = e.clientY - y; //得到距离上边移动距离

        if(rightBox.offsetTop>10){
            if(moveY<=0){
                rightBox.style.top = moveY + "px";
            }
        }else if(rightBox.offsetTop<minTop){
            if(moveY >= minTop ){
                rightBox.style.top = moveY + "px";
            }
        }else{
            rightBox.style.top = moveY + "px";
        }
    }

    document.onmouseup = function() {
        rightBox.onmousemove = null;
    }
};




