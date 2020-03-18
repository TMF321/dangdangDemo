window.onload = function(){
    var Btn = document.getElementById("btn1");
    var Inputs = document.getElementsByTagName("input");
    var Alert = document.getElementById("alert");

    Btn.onclick = function(){
        $ajax({
            type: "post",
            url: "register.php",
            data:{
                username: Inputs[0].value,
                password: Inputs[1].value,
                repassword: Inputs[2].value,
                createTime: (new Date()).getTime()
            },
            success: function(result){
                var obj = JSON.parse(result);
                Alert.style.display = 'block';
                if(obj.code){
                    Alert.className = 'alert alert-danger';
                }else{
                    Alert.className = 'alert alert-success';
                    //500毫秒以后跳转到登陆页面
                    setTimeout(function(){
                        location.assign("login.html");
                    }, 500);
                }
                Alert.innerHTML = obj.message;
            },
            error: function(msg){
                alert(msg);
            }
        })
    }
}