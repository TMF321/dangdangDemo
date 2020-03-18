window.onload = function(){
    var Btn = document.getElementById("btn1");
    var Inputs = document.getElementsByTagName("input");
    var Alert = document.getElementById("alert");

    Btn.onclick = function(){
        //通过ajax提交要登陆的信息
        $ajax({
            type: "post",
            url: "login.php",
            data: {
                username: Inputs[0].value,
                password: Inputs[1].value
            },
            success: function(result){
                var obj = JSON.parse(result);
                Alert.style.display = 'block';
                if(obj.code){
                    Alert.className = 'alert alert-danger';
                }else{
                    Alert.className = 'alert alert-success';
                }
                Alert.innerHTML = obj.message;
            },
            error: function(msg){
                alert(msg);
            }
        })
    }
}
