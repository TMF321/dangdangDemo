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
            Btns.removeClass('active').eq(iNow).addClass('active');
            if(iNow == 10){
                Btns.eq(0).addClass('active');
            }
            Ul.animate({left: -iNow * 750},800,function(){
                if(iNow == 10){
                    Ul.css('left', -750);
                    iNow = 0;
                }
                if(iNow == 0){
                    Ul.css('left', 10 * -750);
                    iNow = 10;
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



        //添加左右切换

        $('.leftRightTabs').find('a').click(function(){
            if(this.className == 'left'){
                iNow--;
                tab();
            }else{
                //右
                iNow++;
                tab();
            }
            return false;//阻止默认行为
        })
    }