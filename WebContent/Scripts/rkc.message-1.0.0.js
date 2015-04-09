/// <summary>
/// 显示消息
/// </summary>
/// <param name="message">消息内容</param>
/// <param name="msgType">info|alert|error</param>
function showMessage(message, msgType) {
    if (message == "") return;

    if (msgType == null) msgType = "Info";
    if (msgType == undefined) msgType = "Info";
    if (msgType != "Info" && msgType != "Alert" && msgType != "Error") msgType = "Info";

    var minWidth = "300";

    var isModalDialog = false;
    var win = window;
    // --------------------------------------------------
    // 当需要在最外层画面显示消息,取消以下代码注释
    // 当仅在本画面显示消息,注释以下代码
    //    if (null != window.dialogArguments && undefined != window.dialogArguments) {
    //        win = window.dialogArguments;
    //        isModalDialog = true;
    //    }

    //    if (win != win.parent) {
    //        win = win.parent;
    //    }
    // --------------------------------------------------

    // 获取消息区域
    var $divMessage = getMessageArea(win);

    // 弹出消息
    popupMessage(win, $divMessage, message, msgType, minWidth);
    if (isModalDialog) {
        window.close();
    }
}

/// <summary>
/// 获取消息区域
/// </summary>
/// <param name="win">目标win对象</param>
function getMessageArea(win) {
    var $divMessage = $("div[id='rkc_divMessage']", $(win.document.body));
    if ($divMessage.length == 0) {
        var str = "<div id='rkc_divMessage' style='position: absolute; left: 0px; top: 0px; height:0px; overflow:hidden; z-index:999;'>"
                + "<iframe frameborder='0' src='' style='width: 100%; height: 100%; border: 0px;'>"
                + "</iframe>"
                + "</div>";
        $divMessage = $(str);


        // 在目标窗体中添加消息区域
        $(win.document.body).append($divMessage);
    }
    return $divMessage;
}

/// <summary>
/// 弹出消息
/// </summary>
/// <param name="$divMessage">消息区域对象</param>
/// <param name="message">消息内容</param>
/// <param name="width">宽度</param>
function popupMessage(win, $divMessage, message, msgType, width) {

    // 获取Json形式的消息
    var jsonMessage = getJsonMessage(message);

    setMessageAreaSize($divMessage, jsonMessage, width);
    setMessageAreaPosition(win, $divMessage);

    var $frmMessage = $("iframe", $divMessage);
    var url = "../jsp/commons/message.htm?r=" + Math.random();
    $frmMessage.attr("src", url);
    $frmMessage.one("load", function() {
        $divMessage.fadeIn("normal", function() {
            var frmMessageWindow = $frmMessage[0].contentWindow;
            frmMessageWindow.setMessage(jsonMessage, msgType, width);
        });
        window.setTimeout(hideMessageArea, 4000, $divMessage);
    });
}

/// <summary>
/// 弹出消息
/// </summary>
/// <param name="$divMessage">消息区域对象</param>
function hideMessageArea($divMessage) {
    $divMessage.fadeOut("normal", function(){
        $divMessage.remove();
    });
}

/// <summary>
/// 获取Json形式的消息
/// </summary>
/// <param name="message">消息内容</param>
function getJsonMessage(message) {
    var arrMessage = message.indexOf("&&") == -1 ? (message+'&&').split("&&") : message.split("&&");

    var jsonMessage = "";
    jsonMessage += "[";
    for (var i = 0; i < arrMessage.length - 1; i++) {
        jsonMessage += "{";
        jsonMessage += "\"Message\":";
        jsonMessage += "\"";
        jsonMessage += arrMessage[i];
        jsonMessage += "\"";
        jsonMessage += "},";
    }
    jsonMessage += "]";
    if (jsonMessage.indexOf(",]") != -1) {
        jsonMessage = jsonMessage.replace(",]", "]");
    }
    jsonMessage = jsonMessage.replace("\r\n", "");
    jsonMessage = jsonMessage.replace("\r", "");
    return eval(jsonMessage);
}

/// <summary>
/// 设置消息区域大小
/// </summary>
/// <param name="$divMessage">消息区域对象</param>
/// <param name="jsonMessage">Json形式的消息</param>
/// <param name="width">宽度</param>
function setMessageAreaSize($divMessage, jsonMessage, width) {

    $divMessage.css("width", width + "px");
    $divMessage.css("height", "0px");

    var $frmMessage = $("iframe", $divMessage);
    $frmMessage.css("width", width + "px");
    $frmMessage.css("height", "0px");
}

/// <summary>
/// 设置消息区域位置
/// </summary>
/// <param name="$divMessage">消息区域对象</param>
function setMessageAreaPosition(win, $divMessage) {

    var top = "12";
    var left = $divMessage.parent().width();
    left = (left - $divMessage.width()) / 2;

    $divMessage.css("top", top + "px");
    $divMessage.css("left", left + "px");
}