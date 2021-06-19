!function(){
    const canvas  = document.createElement("canvas");
    const ctx = canvas.getContext('2d');
    const innerWidth  = window.innerWidth;
    const innerHeight = window.innerHeight;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    canvas.style = "position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: -2;";
    document.body.appendChild(canvas);

    var imgName = [
        { src: "drop_down_01.png", width: 21, height: 250 },
        { src: "drop_down_02.png", width: 23, height: 280 },
        { src: "drop_down_03.png", width: 45, height: 157 },
        { src: "drop_down_04.png", width: 25, height: 62 },
        { src: "drop_down_05.png", width: 6, height: 62 },
        { src: "drop_down_06.png", width: 18, height: 50 },
        { src: "drop_down_07.png", width: 47, height: 55 },
        { src: "drop_down_08.png", width: 19, height: 11 }
    ]

    var drop_down_imgs = [];
    var drop_down_eles_container = [];

    function DropDownEle(img, width, height) {
        // 坐标
        this.img = img;
        this.width = width;  //waitPicMinW + (waitPicMaxW-waitPicMinW)*Math.random();
        this.height = height;  //this.width * .7;
        this.x0 = Math.random() * (innerWidth - this.width);
        this.y0 = Math.random() * innerHeight;
        this.speed = Math.random() * .3 + .3;
    }
    DropDownEle.prototype.update = function() {
        var that = this;
        // 正常运动（正常位移）
        // 超出底部再重新在顶部下落
        if (this.y0 > innerHeight){
            this.y0 = -this.height;
            this.x0 = Math.random() * (innerWidth - this.width);
        }
        this.y0 += this.speed;
        ctx.beginPath()
        ctx.drawImage(this.img, this.x0, this.y0, this.width, this.height);
        ctx.closePath();
    }

    window.onload = function(){
        resources.load( imgName );
        resources.onReady(function( res ){
            for( var k in res )
            drop_down_imgs.push( res[k] );
            drop_down_imgs.forEach(function(v, i){
                var arr = [];
                for( var j =0 ; j < imgName.length; j++ ){
                    arr.push( new DropDownEle( v, imgName[i].width, imgName[i].height ) );
                }
                drop_down_eles_container.push(arr);
            });
            !function(){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for(var i = 0; i < drop_down_eles_container.length; i++){
                    drop_down_eles_container[i].forEach(function(v, i){
                        v.update()
                    })
                }
                requestAnimationFrame( arguments.callee )
            }()
        })
    }
}()

!function(){
    var imageFolder = 'img/';
    var resourceCache = {};
    var loading = [];
    var readyCallBacks = [];
    // Load an image url or an array of image urls
    function load( urlOrArr ){
        if( urlOrArr instanceof Array ){
            urlOrArr.forEach(function(url){
                _load(url.src);
            })
        }else{
            _load(urlOrArr);
        }
    }
    function _load(url){
        if( resourceCache[url] ){
            return resourceCache[url];
        }else{
            var img = new Image();
            img.onload = function(){
                resourceCache[url] = img;
                if( isReady() )
                    readyCallBacks.forEach(function(func){ func( resourceCache ); });
            }
            resourceCache[url] = false;
            img.src = imageFolder + url;
        }
    }
    function isReady(){
        var ready = true;
        for( var k in resourceCache ){
            if( resourceCache.hasOwnProperty(k) && !resourceCache[k] ){
                ready = false;
            }
        }
        return ready;
    }
    function get(url){
        return resourceCache[url];
    }
    function onReady(func){
        readyCallBacks.push(func);
    }
    window.resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    }
}()