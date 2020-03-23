define(["parabola", "jquery", "jquery-cookie"], function(parabola, $){
    function download(){
    sc_num(); //计算一个购物车中商品的数量
    //1.通过ajax下载数据   dataType
    $.ajax({
        type:'get',
        url:'../data/data.json',
        success:function(arr){
            //通过循环创建节点到页面上
            for(var i = 0; i < arr.length; i++){
                //node就是我们创建好的节点
                var node = $(`<li class="goods_item">
                <div class="goods_pic">
                    <img src="${arr[i].img}" alt="">
                </div>
                <div class="goods_title">
                 <a class="goods_text" href="#">"${arr[i].title}"</a>   
                 <p class="current">&yen;${arr[i].price}</p>
                </div>
                <div class="sc">
                    <div id="${arr[i].id}" class="sc_btn">加入购物车</div>
                </div>
               </li>`);
                node.appendTo($('.goods_box ul'));
            }
        },
        error:function(msg){
            console.log(msg);
        }
    })
}

    //给页面上的购物车按钮添加点击事件
    //ajax后添加的节点，添加事件，一般用事件委托添加
    /*
    1、cookie最大4kb，尽可能少的信息存储商品
        直接存储 商品的id 和 商品的数量 键 goods  值 [{id:id,num:1},{id:id,num:1}]
    2、cookie只能存储字符串  将数据结构转成json格式字符串存储进去
*/ 
function addToCart(){
    $('.goods_box ul').on('click', '.sc_btn', function(){
        var id = this.id;
        //1.之前是否添加过该商品
        var first = $.cookie('goods') == null ? true : false;
        if(first){
            //是第一次添加，直接存储
            var arr = [{id:id, num:1}];
            $.cookie('goods', JSON.stringify(arr), {expires: 7});
        }else{
            //2.判断之前是否添加过
            var cookieStr = $.cookie('goods');
            var cookieArr = JSON.parse(cookieStr);
            var same = false;//假设之前没有添加过
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    cookieArr[i].num++;//数量加一
                    same = true;
                    break;
                }
            }

            //3.如果没有添加过
            if(!same){
                var obj = {id: id, num: 1};
                cookieArr.push(obj);//新增数据
            }
            //最后都要存储回去
            $.cookie('goods', JSON.stringify(cookieArr), {expires: 7});
        }

        //alert($.cookie('goods'));
        sc_num();//计算一个购物车中商品数量

        //进行抛物线
        ballMove(this);
        
    })
}

function rightCartEvent(){
    //给购物车中删除的按钮添加点击事件
    $('.sc_right ul').on('click','.delete_goodsBtn',function(){
        //获取当前商品的div
        var id = $(this).closest('li').remove().attr('id');
        //删除该商品   既要去删除节点，还要删除cookie中的数据
        var cookieStr = $.cookie('goods');
        var cookieArr = JSON.parse(cookieStr);
        var index = cookieArr.findIndex(item => item.id ==id);
        //通过下标删除元素
        cookieArr.splice(index, 1);
        //判断数组是否是空数组
        cookieArr.length == 0 ? $.cookie('goods', null) : $.cookie('goods', JSON.stringify(cookieArr), {
            expires: 7
        })

        //重新计算一下购物车中商品的数量
        sc_num();
    })


    //给+和-添加事件
    $('.sc_right ul').on('click', '.sc_goodsNum button', function(){
        //获取商品的id
        var id = $(this).closest('li').attr('id');
        var cookieStr = $.cookie('goods');
        var cookieArr = JSON.parse(cookieStr);
        //把当前要去操作的数据拿到
        //var item = cookieArr.find(item => item.id == id);
        for(var i = 0; i < cookieArr.length; i++){
            if(cookieArr[i].id == id){
                var item = cookieArr[i];
                break;
            }
        }

        //判断是+还是-
        if(this.innerHTML == '+'){
            item.num++;
        }else{
            item.num == 1 ? alert('该商品数量为1，不能减少') : item.num--;

        }
        //要把更改后的数量在页面上显示
        $(this).siblings('span').html(`商品数量：${item.num}`);
        //将数据存储回去
        $.cookie('goods', JSON.stringify(cookieArr), {
            expires: 7
        })
        //重新计算商品的数量
        sc_num();
    })



    //点击按钮以后清空购物车
    $('#clearCar').click(function(){
        $.cookie('goods', null);
        sc_num();
        sc_msg();
    })


    //给右侧购物车添加移入移出效果
    $('.sc_right').mouseenter(function(){
        $(this).stop(true).animate({right: 0}, 500);
    })
    $('.sc_right').mouseleave(function(){
        $(
            this).stop(true).animate({right: -270}, 500);
    })
}


    //封装一个可以进行抛物线运动的函数
    //btn是当前点击的加入购物车按钮
    function ballMove(Btn){
        //1.将这个小球显示在加入购物车按钮部分
        $('#ball').css({
            left: $(Btn).offset().left,
            top: $(Btn).offset().top,
            display: 'block',
        })
        //计算偏移位置
        var X = $('.sc_right .sc_pic').offset().left - $(Btn).offset().left;
        var Y = $('.sc_right .sc_pic').offset().top - $(Btn).offset().top;

        //2.创建一个抛物线对象
        var bool = new Parabola({
            el:'#ball',
            offset:[X,Y],
            duration: 800,
            curvature: 0.0007,
            callback:function(){
                $('#ball').hide();
            }          
        })
        bool.start();
    }
       //加载添加到购物车里的数据
/*
    购物车的数据，存储在cookie中的
    [{id:id,num:2},{id:id,num:2}
    
    商品的详细信息，在服务器的数据源里。存放的是全部商品的数据。
    【注】根据cookie中存储的数据，在所有商品信息中，将加入购物车的这部分信息单独提取出来
*/
function rightCart(){ 
         $('.sc_right ul').empty(); //清除所有的子节点

         $.ajax({
             type:'get',
             url: '../data/data.json',
             success:function(arr){              
                 //获取cookie中的数据
                 var cookieStr = $.cookie('goods'); 
                 if(cookieStr){
                     var cookieArr = JSON.parse(cookieStr);
                     var newArr = [];
                     //找出
                     for(var i = 0; i < arr.length; i++){
                         for(var j = 0; j < cookieArr.length; j++){
                             if(arr[i].id == cookieArr[j].id){
                                arr[i].num == cookieArr[j].num;
                                newArr.push(arr[i]);                             
                             }
                         }
                     }
                }
                

                     for(var i = 0; i < newArr.length; i++){
                         //创建节点，添加到购物车里
                         var node = $(`<li id="${newArr[i].id}">
                            <div class="sc_goodsPic">
                                <img src="${newArr[i].img}" alt="">
                            </div>
                            <div class="sc_goodsTitle">
                                <p>${newArr[i].title}</p>
                            </div>
                            <div class="sc_goodsBtn">购买</div>
                            <div class="delete_goodsBtn">删除</div>
                            <div class="sc_goodsNum">
                                <button>+</button>
                                <button>-</button>
                            <span>商品数量:${newArr[i].num}</span></div>
                        </li>`);
                        node.appendTo($('.sc_right ul'));
                 }
             },
             error:function(msg){
                 console.log(msg);
             }
         })

     }




     //计算购物车数量
     function sc_num(){
         var cookieStr = $.cookie('goods');
         if(cookieStr){
             var sum = 0;
             var cookieArr = JSON.parse(cookieStr);
             for(var i = 0; i < cookieArr.length; i++){
                sum += cookieArr[i].num;
             }
             $('.sc_right .sc_num').html(sum);
         }else{
             $('.sc_right .sc_num').html(0);
         }
     }
     return{
        download: download,
        addToCart: addToCart,
        rightCart: rightCart,
        rightCartEvent: rightCartEvent,
    }   
})