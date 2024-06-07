//加载是否已经登录
if(islogin()){
    loadData(); 
}

//加载数据
function loadData() {
    let account = window.localStorage.getItem("account") || ''
    postJSON("/history/getDataList", {order:'logtime desc',account:account}).then(function (res) {
        if (res.status == 200) {
            let list = res.data;
            let content = "";
            if(list.length>0){
                for (let i = 0; i < list.length; i++) {
                    content+=`
                    <div class="feed-element" onclick="window.location.href='./hisdetail.html?id=${list[i].upid}'">
                        <a href="javascript:void(0)" class="pull-left">
                            <img alt="image" class="img-circle" src="img/${list[i].oriimage}">
                        </a>
                        <div class="media-body ">
                            <small class="pull-right text-navy">${list[i].logtime}</small>
                            <strong class="title-line">${list[i].orititle}</strong>
                            <div class="actions">
                            ${list[i].contentresult == 1?'<a class="btn btn-xs btn-warning"><i class="fa fa-heart"></i>&nbsp;&nbsp;Complete</a>':'<a class="btn btn-xs btn-danger"><i class="fa fa-warning"></i>&nbsp;&nbsp;Mistakes</a>'}
                            </div>
                        </div>
                    </div>`;
                }
            }else{
                content = '<div class="feed-element text-center" >no more records</div>';
            }
            $(".feed-activity-list").html(content);
        }
    })
}