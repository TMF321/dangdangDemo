define(['jquery'], function($){
function bannerTab(){
    var Ul = $('.play').find('.imgBox');
    var Btns = $('.play').find('ol li');
    var iNow = 0;//当前显示图片的下标
    var timer = null;
        //点击按钮的时候实现图片的切换
        Btns.click(function(){
            iNow = $(this).index();
            tab();
        })


        //自动轮播
        timer = setInterval(function(){
            iNow++;
            tab();
        },2000);


        //封装一个切换函数
        function tab(){
        Btns.removeClass("active").eq(iNow).addClass("active");
        if(iNow == Btns.size()){
            Btns.eq(0).addClass("active");
        }
        
        Ul.animate({top: -315 * iNow}, 500, function(){
            if(iNow == Btns.size()){
                //直接将图片拉回第一张，继续开始
                Ul.css("top", 0);
                iNow = 0;
            }
        });
    }
        //移入移出
        $('.play').mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2000);
        })
    }
    return {
        bannerTab: bannerTab
    }
})