
if (islogin()) {
    loadData();
}


function loadData() {
    let id = getUrlParam("id");
    new Noty({
        text: 'loading',
        layout: 'topRight',
        timeout: 1000
    }).show();
    postJSON("/history/detail/" + id, {}).then(function (res) {
        if (res.status == 200) {
            let data = res.data;
            for (const key in data) {
                $("#" + key).text(data[key]);
                if(key == "oriimage"){
                    $("#oriimage").attr("src","./img/" + data[key]);
                    continue;
                }
                if(key == "contentresult"){
                    if(data[key] == 1){
                        //完成
                        $("#contentresult").text("Story Complete!");
                        $("#resultshow").hide();
                        $("#contentresult1").show();
                    }else{
                        $("#contentresult").text("Review Mistakes!");
                        $("#contentresult2").show();
                        $("#resultshow").show();
                    }
                    continue;
                }
            }
            $(".diff-wrapper").prettyTextDiff({
                originalContent: replacePunctuation($('#oricontent').text()),
                changedContent: replacePunctuation($('#usercontent').text()),
                diffContainer: ".diff1"
            });
            $(".wrapper-content").show();
        }
    })
}