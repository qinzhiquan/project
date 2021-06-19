
// 文字轮动
!function(){
    
    var textSpans = document.querySelectorAll(".company_name span");

    function textTransform(){
        for(var i = 0; i < textSpans.length; i++){
            !function(i){
                setTimeout(function(){
                    textSpans[i].className = "in";
                    setTimeout(function(){
                        textSpans[i].className = "";
                    }, (i+1)*150);
                }, i * 150);
            }(i)
        }
    }
    textTransform();
    setInterval(textTransform, 3000);

}()