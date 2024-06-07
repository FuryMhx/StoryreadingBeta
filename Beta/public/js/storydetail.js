//加载是否已经登录
if (islogin()) {
    loadData();
}

function doRecord(type) {
    if (type == "start") {
        $("#btn_control").click();
        $(".social-feed-show").hide();
        $(".article-title-read").text("READ ALOUD!");
        $(".startbtn").hide();
        $(".endbtn").show();
    } else if (type == "end") {
        setTimeout(function () {
            $("#btn_control").click();
        },1000)
        $(".social-feed-show").show();
        $(".endbtn").hide();
        $(".startbtn").show();
    }
}
var nowData={}
//加载数据
function loadData() {
    let id = getUrlParam("id");
    new Noty({
        text: 'loading',
        layout: 'topRight',
        timeout: 1000
    }).show();
    postJSON("/story/detail/" + id, {}).then(function (res) {
        if (res.status == 200) {
            let data = res.data;
            nowData = data;
            for (const key in data) {
                $("#" + key).text(data[key]);
                if (key == "image") {
                    $("#image").attr("src", "./img/" + data[key]);
                }
            }
            $(".diff-wrapper").prettyTextDiff({
                originalContent: $('#oricontent').text(),
                changedContent: $('#usercontent').text(),
                diffContainer: ".diff1"
            });
            $(".wrapper-content").show();
        }
    })
}

let btnStatus = "UNDEFINED"; // "UNDEFINED" "CONNECTING" "OPEN" "CLOSING" "CLOSED"

const btnControl = document.getElementById("btn_control");

const recorder = new RecorderManager("../js/dist");
recorder.onStart = () => {
    changeBtnStatus("OPEN");
}
let iatWS;
let resultText = "";
let resultTextTemp = "";
let countdownInterval;

/**
 * 获取websocket url
 * 该接口需要后端提供，这里为了方便前端处理
 */
function getWebSocketUrl() {
    // 请求地址根据语种不同变化
    var url = "wss://iat-api.xfyun.cn/v2/iat";
    var host = "iat-api.xfyun.cn";
    var apiKey = API_KEY;
    var apiSecret = API_SECRET;
    var date = new Date().toGMTString();
    var algorithm = "hmac-sha256";
    var headers = "host date request-line";
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`;
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    var signature = CryptoJS.enc.Base64.stringify(signatureSha);
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    var authorization = btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    return url;
}
function toBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function countdown() {
    //最长时间为30秒
    let seconds = 30;
    btnControl.innerText = `录音中（${seconds}s）`;
    $("#during").html(`During recording（${seconds}s）`)
    countdownInterval = setInterval(() => {
        seconds = seconds - 1;
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            doRecord("end");
            //   recorder.stop();
        } else {
            btnControl.innerText = `录音中（${seconds}s）`;
            $("#during").html(`During recording（${seconds}s）`)
        }
    }, 1000);
}

function changeBtnStatus(status) {
    btnStatus = status;
    if (status === "CONNECTING") {
        btnControl.innerText = "建立连接中";
        document.getElementById("result").innerText = "";
        resultText = "";
        resultTextTemp = "";
    } else if (status === "OPEN") {
        countdown();
    } else if (status === "CLOSING") {
        btnControl.innerText = "关闭连接中";
    } else if (status === "CLOSED") {
        btnControl.innerText = "开始录音";
    }
}

function renderResult(resultData) {
    // 识别结束
    let jsonData = JSON.parse(resultData);
    if (jsonData.data && jsonData.data.result) {
        let data = jsonData.data.result;
        let str = "";
        let ws = data.ws;
        for (let i = 0; i < ws.length; i++) {
            str = str + ws[i].cw[0].w;
        }
        // 开启wpgs会有此字段(前提：在控制台开通动态修正功能)
        // 取值为 "apd"时表示该片结果是追加到前面的最终结果；取值为"rpl" 时表示替换前面的部分结果，替换范围为rg字段
        if (data.pgs) {
            if (data.pgs === "apd") {
                // 将resultTextTemp同步给resultText
                resultText = resultTextTemp;
            }
            // 将结果存储在resultTextTemp中
            resultTextTemp = resultText + str;
        } else {
            resultText = resultText + str;
        }
        document.getElementById("result").innerText =
            resultTextTemp || resultText || "";
    }
    if (jsonData.code === 0 && jsonData.data.status === 2) {
        iatWS.close();
    }
    if (jsonData.code !== 0) {
        iatWS.close();
        console.error(jsonData);
    }
}

function connectWebSocket() {
    const websocketUrl = getWebSocketUrl();
    if ("WebSocket" in window) {
        iatWS = new WebSocket(websocketUrl);
    } else if ("MozWebSocket" in window) {
        iatWS = new MozWebSocket(websocketUrl);
    } else {
        alert("浏览器不支持WebSocket");
        return;
    }
    changeBtnStatus("CONNECTING");
    iatWS.onopen = (e) => {
        // 开始录音
        recorder.start({
            sampleRate: 16000,
            frameSize: 1280,
        });
        var params = {
            common: {
                app_id: APPID,
            },
            business: {
                language: "en_us",
                domain: "iat",
                accent: "mandarin",
                vad_eos: 3000,
            },
            data: {
                status: 0,
                format: "audio/L16;rate=16000",
                encoding: "raw",
            },
        };
        iatWS.send(JSON.stringify(params));
    };
    iatWS.onmessage = (e) => {
        renderResult(e.data);
    };
    iatWS.onerror = (e) => {
        console.error(e);
        recorder.stop();
        changeBtnStatus("CLOSED");
    };
    iatWS.onclose = (e) => {
        recorder.stop();
        changeBtnStatus("CLOSED");
    };
}

recorder.onFrameRecorded = ({ isLastFrame, frameBuffer }) => {
    if (iatWS.readyState === iatWS.OPEN) {
        iatWS.send(
            JSON.stringify({
                data: {
                    status: isLastFrame ? 2 : 1,
                    format: "audio/L16;rate=16000",
                    encoding: "raw",
                    audio: toBase64(frameBuffer),
                },
            })
        );
        if (isLastFrame) {
            changeBtnStatus("CLOSING");
        }
    }
};
recorder.onStop = () => {
    clearInterval(countdownInterval);
};

btnControl.onclick = function () {
    if (btnStatus === "UNDEFINED" || btnStatus === "CLOSED") {
        connectWebSocket();
    } else if (btnStatus === "CONNECTING" || btnStatus === "OPEN") {
        // 结束录音
        recorder.stop();
        $("#usercontent").text($("#result").text()?$("#result").text():" ");
        $(".diff-wrapper").prettyTextDiff({
            originalContent: replacePunctuation($('#content').text()),
            changedContent: replacePunctuation($('#usercontent').text()),
            diffContainer: "#diffResults"
        });
        setTimeout(function () {
          let contentresult = 1
          let diffResults = $("#diffResults").html().replace("<ins> </ins>","");
          if(diffResults.indexOf("<del>")>-1 || diffResults.indexOf("<ins>")>-1) {
            $(".article-title-read").text("Review Mistakes!");
            contentresult = 2
          }else{
            $(".article-title-read").text("Story Complete!");
            contentresult = 1
          }
          postJSON("/story/addlog", {
            'oricontent': nowData.content,
            'oriimage':nowData.image,
            'orititle':nowData.title, 
            'usercontent':$('#usercontent').text(), 
            'logtime':getNowTime()+"",
            'account':window.localStorage.getItem("account") || '',
            'contentresult':contentresult
          }).then(function (res) {})
        },200)
    }
};