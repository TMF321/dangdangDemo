$(function(){
    $('.small').mouseenter(function(){
        $('.mark').show();
    }).mouseleave(function(){
        $('.mark').hide();
    }).mousemove(function(ev){
        var l = ev.pageX - $('.small').offset().left - 50;
        var t = ev.pageY - $('.small').offset().top - 50;


        //限制出界
        if(l <= 0){
            l = 0;
        }
        if(l >= 200){
            l = 200;
        }

        if(t <= 0){
            t = 0;
        }
        if(t >= 265){
            t = 265;
        }

        //改变笼罩层的位置
        $('.mark').css({
            left: l,
            top: t
        })
        //同时移动大图片的位置，反向四倍的距离
        $('.big img').css({
            left: -l * 4,
            top: -t * 4
        })
    })
})