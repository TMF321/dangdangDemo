console.log('加载成功');
//配置要引入的.js模块的路径
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "banner": "banner",

    },
    shim: {
        //设置依赖关系
        "jquery-cookie": ["jquery"],

    }
})


//<1>使用简单 <2>模块间的关系
//引入模块，调用实现对应的功能
require(["banner"], function(banner, index){
    banner.bannerTab();
})