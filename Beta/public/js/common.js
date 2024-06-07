document.write(
    `<link href=\"./css/bootstrap.min.css\" rel=\"stylesheet\">
    <link href=\"./css/style.css\" rel=\"stylesheet\">
    <link href=\"./font-awesome/css/font-awesome.css\" rel=\"stylesheet\">
    <link href=\"./css/noty.css\" rel=\"stylesheet\">
    <link href=\"./css/animate.css\" rel=\"stylesheet\">
    <script src=\"./js/jquery-2.1.1.js\"></script>
    <script src=\"./js/bootstrap.min.js\"></script>
    </script><script src=\"./js/noty.min.js\"></script>`
);
function logout() {
    new Noty({
        text: "logout success",
        layout: 'topRight',
        type: 'success',
        timeout: 2000,
        theme: 'bootstrap-v4'
    }).show();
    window.localStorage.clear();
    setTimeout(function () {
        window.location.href = "./login.html";
    }, 2000)
}

function myprofile(){
    window.location.href = "./profile.html";
}
/**
 * 判断是否登录及跳转页面
 * @param url
 * @param type
 */
function islogin() {
    let account = window.localStorage.getItem("account") || ''
    if (!account) {
        //未登录 需要先去登录
        new Noty({
            text: "please login first",
            type: 'error',
            layout: 'topRight',
            timeout: 2000,
            theme: 'bootstrap-v4'
        }).show();
        window.location.href = "./login.html";
        return false;
    }
    $("#user_name").text(account);
    $("#user_name1").text(account);
    
    return true;
}

/**
 * 封装post请求 json字符串
 * @param url
 * @param addNew
 * @returns {Promise<unknown>}
 */
function postData(url, addNew) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(addNew),
            success: function (data) {
                // noty.success('数据加载成功')
                console.log(url + "postData响应:", data)
                resolve(data)
            },
            error: function (data) {
                console.log(url + "请求异常：" + data)
                resolve(data)
            }
        })
    })

}

/**
 * 
 * @param url
 * @param addNew
 * @returns {Promise<unknown>}
 */
function postJSON(url, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            success: function (data) {
                console.log(url + "=======postJSON:", data)
                resolve(data)
            },
            error: function (data) {
                console.log(url + "=======：" + data)
                resolve(data)
            }
        })
    })

}


/**
 * 得到url地址参数
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

//当前时间 美国格式 月/日/年,小时:分钟:秒
function getNowTime() {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒
    var clock = "";
    if (month < 10) {
        clock += "0";
    }
    clock += month + "/";
    if (day < 10) {
        clock += "0";
    }
    clock += day + "/";
    clock += year+" ";
    if (hh < 10) {
        clock += "0";
    }
    clock += hh + ":";
    if (mm < 10) {
        clock += '0';
    }
    clock += mm + ":";
    if (ss < 10) {
        clock += '0';
    }
    clock += ss;
    return clock;
}

function replacePunctuation(str) {
    return str.replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g, '.');
}