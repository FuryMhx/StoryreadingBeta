function checkForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "") {
        new Noty({
            text: "please input your account",
            type: 'error',
            layout: 'topRight',
            timeout: 2000,
            theme: 'bootstrap-v4'
        }).show()
        return false;
    }
    if (password == "") {
        new Noty({
            text: "please input your password",
            type: 'error',
            layout: 'topRight',
            timeout: 2000,
            theme: 'bootstrap-v4'
        }).show()
        return false;
    }
    postJSON("/user/login", {
        username, password
    }).then(function (res) {
        if (res.status == 200) {
            window.localStorage.setItem("account",username);
            new Noty({
                text: 'login success',
                layout: 'topRight',
                timeout: 2000,
                theme: 'bootstrap-v4'
            }).show();
            window.location.href = "./index.html";
        } else {
            new Noty({
                text: res.code,
                layout: 'topRight',
                type: 'error',
                timeout: 2000,
                theme: 'bootstrap-v4'
            }).show();
        }
    })
}

window.onload = function () {
    if (window.localStorage.getItem("account")) {
        //如果已经登录了 直接到首页
        window.location.href = "./index.html";
    }
}