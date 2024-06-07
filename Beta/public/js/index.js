//加载是否已经登录
if(islogin()){
    loadData(); 
}

//加载数据
function loadData() {
    postJSON("/story/getDataList", {}).then(function (res) {
        if (res.status == 200) {
            let list = res.data;
            let content = "";
            for (let i = 0; i < list.length; i++) {
                content+=`<div class="col-sm-4 col-md-file">
                    <div class="ibox float-e-margins" onclick="todetail(${list[i].sid})">
                        <div class="ibox-title">
                            <h5>${list[i].title}</h5>
                        </div>
                        <div>
                            <div class="ibox-content no-padding border-left-right ibox-content-image">
                                <img alt="${list[i].title}" class="img-responsive" src="img/${list[i].image}">
                            </div>
                        </div>
                    </div></div>`;
            }
            $("#story_list").html(content);
        }
    })
}

function todetail(sid) {
    window.location.href = "./storydetail.html?id=" + sid;
}