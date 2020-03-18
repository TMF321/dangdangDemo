 /*
                type 请求的方式
                url  请求的url
                data 提交的数据，传入对象
                success 下载数据成功以后执行的函数
                error   下载数据失败以后执行的函数
            */
        function $ajax({type = "get", url, data, success, error}){
            //1、声明ajax对象
            var xhr = null;
            try{
                xhr = new XMLHttpRequest();
            }catch(error){
                xhr = new ActiveXObject("Microsoft.XMLHTTP")
            }

            //2、调用open方法
            if(type == "get" && data){
                url += "?" + querystring(data);
            }

            xhr.open(type, url, true);

            //3、send方法
            if(type == "get"){
                xhr.send();
            }else{
                //设置提交数据格式
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                data ? xhr.send(querystring(data)) : xhr.send();
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        if(success){
                            success(xhr.responseText);
                        }
                    }else{
                        if(error){
                            error("Error：" + xhr.status);
                        }
                    }
                }
            }
        }


        function querystring(obj){
            var str = '';
            for(var attr in obj){
                str += attr + "=" + obj[attr] + "&";
            }
            return str.substring(0, str.length - 1);
        }