/// <summary>
/// 跳转
/// </summary>
/// <param name="url">目标地址</param>
function redirect(url) {
    if (url.indexOf("?") != -1) {
        url = url + "&r=" + Math.random();
    }
    else {
        url = url + "?r=" + Math.random();
    }
    window.location.href = url;
}

/// <summary>
/// 弹出模态窗口
/// </summary>
/// <param name="url">请求地址</param>
/// <param name="width">对话框宽</param>
/// <param name="height">对话框高</param>
/// <param name="scroll">是否显示滚动条[yes/no]</param>
/// <remarks>
/// 宽度和高度是不带单位的纯数字形式
/// <remarks>
function openModalDialog(url, width, height, scroll) {
    if (url.indexOf("?") != -1) {
        url = url + "&r=" + Math.random();
    }
    else {
        url = url + "?r=" + Math.random();
    }
    var dialogResult = window.showModalDialog(url, window, "dialogWidth=" + width + "px;dialogHeight=" + height + "px;status=no;help=no;scroll=" + scroll);
    return dialogResult;
}

/// <summary>
/// 从左侧取指定长度的字符串
/// </summary>
/// <param name="str">字符串</param>
/// <returns>字符串</returns>
function left(str, len) {
    if (str == null) return "";
    if (str == undefined) return "";
    if (str.length == 0) return "";
    if (len == null) return "";
    if (len == undefined) return "";
    if (len <= 0) return "";
    if (len >= str.length) return str;

    return str.substring(0, len);
}

/// <summary>
/// 从右侧取指定长度的字符串
/// </summary>
/// <param name="str">字符串</param>
/// <returns>字符串</returns>
function right(str, len) {
    if (str == null) return "";
    if (str == undefined) return "";
    if (str.length == 0) return "";
    if (len == null) return "";
    if (len == undefined) return "";
    if (len <= 0) return "";
    if (len >= str.length) return str;

    return str.substring(str.length - len, str.length);
}

/// <summary>
/// 取指定位置的字符串
/// </summary>
/// <param name="str">字符串</param>
/// <returns>字符串</returns>
function mid(str, start, end) {
    if (str == null) return "";
    if (str == undefined) return "";
    if (str.length == 0) return "";
    if (start == null) return "";
    if (start == undefined) return "";
    if (start <= 0) start = 0;
    if (start >=str.length) return "";
    if (end == null) return "";
    if (end == undefined) return "";
    if (end <= 0) return "";
    if (end >= str.length) end = str.length;
    if (start == end) return "";
    if (start > end) return "";

    return str.substr(star, end);
}

/// <summary>
/// 移除字符串开始和结尾处的空白
/// </summary>
/// <param name="str">字符串</param>
/// <returns>字符串</returns>
function trim(str) {
    return (str || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
}

/// <summary>
/// 下载
/// </summary>
/// <param name="str">下载地址</param>
function download(url) {
    var turnForm = document.getElementById("frmDownload");
    turnForm.method = 'post';
    turnForm.action = url;
    turnForm.target = '_self';
    turnForm.submit();

    return false;
}

function initDefaultText($txt,text){
    $txt.attr("default-value",text);
    var val = $txt.val();
    if(val == ""){
        $txt.val(text);
    }
    val = $txt.val();
    if(val == text){
        $txt.addClass("info");
    }
    $txt.focus(function(){
        if($txt.val()==text){
            $txt.val("");
            $txt.removeClass("info");
        }
    });
    $txt.blur(function(){
        if($txt.val()==""){
            $txt.val(text);
            $txt.addClass("info");
        }
    });
}

/// <summary>
/// 滚动到页面顶部
/// </summary>
function gotoTop(){
    if (document.documentElement && document.documentElement.scrollTop) {
        document.documentElement.scrollTop = 0;
    }
    else if (document.body && document.body.scrollTop) {
        document.body.scrollTop = 0;
    }
}

var oldSetTimeOut = setTimeout;
/// <summary>
/// //重写window.setTimeout，使其可传参数，且参数可为object
/// </summary>
/// <param name="callback">回调函数</param>
/// <param name="timeout">时间</param>
/// <param name="param">参数</param>
/// <remarks>
/// 调用：window.setTimeout(test, 1000 [, 参数对象1[, 参数对象2...]]);
/// </remarks>
window.setTimeout = function(callback, timeout, param) {
   if(param!= undefined){
        var args = Array.prototype.slice.call(arguments, 2);
        function callFunc() { callback.apply(null, args); }
        return oldSetTimeOut(callFunc, timeout);
    }
    return oldSetTimeOut(callback, timeout);
}

var oldSetInterval = setInterval;
/// <summary>
/// //重写window.setInterval，使其可传参数，且参数可为object
/// </summary>
/// <param name="callback">回调函数</param>
/// <param name="timeout">时间</param>
/// <param name="param">参数</param>
/// <remarks>
/// 调用：window.setInterval(test, 1000 [, 参数对象1[, 参数对象2...]]);
/// </remarks>
window.setInterval = function(callback, interval, param) {
    if(param!= undefined){
        var args = Array.prototype.slice.call(arguments, 2);
        function callFunc() { callback.apply(null, args); }
        return oldSetInterval(callFunc, interval);
    }
    return oldSetInterval(callback, interval);
}

/* --------------------------------------------------
   session丢失事件
-------------------------------------------------- */
/// <summary>
/// session丢失的时候，跳转置目标画面
/// </summary>
/// <remarks>
/// 该方法通常用于后台判断session丢失后，向前台注册的方法。
/// </remarks>
/// <history>
/// 2013/11/23    zhangh    更新    修改为DOM加载完成后执行
///                                 由于该方法需要当前画面跳转，如果在DOM加载完成前执行，有可能导致当前画面的JS执行失败。
///                                 比如无法正常获取到控件。
/// </history>
function sessionMiss(targetPageUrl) {

    var isModalDialog = false;
    var win = window;
    if (null != window.dialogArguments && undefined != window.dialogArguments) {
        win = window.dialogArguments;// 须父窗口传递window到弹出窗口
        isModalDialog = true;
    }

    if (win != win.parent) {// 这里需要测试
        win = win.parent;
    }
    
    if (isModalDialog) {
        window.close();
    }
    
    // 隐藏文档内容，避免跳转前显示
    $(win.document.body).hide();
    
    // 需要在DOM加载完成后在执行
    $(function(){
        win.location.href = targetPageUrl;
    });
}

/* --------------------------------------------------
   初始化或获取表单数据
-------------------------------------------------- */
// 保存当前画面的表单数据
var __CURRENTFORMDATA = undefined;

/// <summary>
/// 初始化当前画面的表单数据字符串
/// </summary>
/// <remarks>
/// 数据来自text,password,radio,checkbox,file,textarea,select
/// 多用于比较表单内容是否改变
/// </remarks>
/// <history>
/// 2013/11/23    zhangh    添加
/// </history>
function initFormData(){
    __INITFORMDATA = "";
    var $texts = $(":text,:password,:radio,:checkbox,:file,textarea,option:selected");
    $texts.one("focus",function(){
        $.each($texts, function(i, item){
            __INITFORMDATA += $(item).val();
        });
    });
}

/// <summary>
/// 获取当前画面初始化的表单数据字符串
/// </summary>
/// <remarks>
/// 数据来自text,password,radio,checkbox,file,textarea,select
/// 多用于比较表单内容是否改变
/// </remarks>
/// <history>
/// 2013/11/23    zhangh    添加
/// </history>
function getInitFormData(){
    return __INITFORMDATA;
}

/// <summary>
/// 获取当前画面的表单数据字符串
/// </summary>
/// <remarks>
/// 数据来自text,password,radio,checkbox,file,textarea,select
/// 多用于比较表单内容是否改变
/// </remarks>
/// <history>
/// 2013/11/23    zhangh    添加
/// </history>
function getFormData(){
    var str = "";
    var $texts = $(":text,:password,:radio,:checkbox,:file,textarea,option:selected");
    $.each($texts, function(i, item){
        str += $(item).val();
    });
    return str;
}

/// <summary>
/// 判断表单是否变更
/// </summary>
/// <return>
/// true:change
/// false:not change
/// </return>
/// <history>
/// 2013/11/23    zhangh    添加
/// </history>
function isFormChanged(){
    var initFormData = getInitFormData();
    if(initFormData == ""){
        return false;
    }
    
    var formData = getFormData();
    
    return initFormData != formData;
}

/// <summary>
/// Enter键转Tab键
/// </summary>
/// <param name="selectFlg">true选中光标所在文本框的内容|false不选中光标所在文本框的内容</param>
/// <history>
/// 2014/01/05    zhangh    添加
/// </history>
function enterToTab(selectFlg){
    $(function(){        
        var $txts = $('input:text');
        if($txts.length>0){
        
            // keydown事件
            $txts.bind('keydown', function (e) {

                if (e.which == 13) {
                
                    e.preventDefault();
                    var nxtIdx = $txts.index(this) + 1;
                    nxtIdx = nxtIdx < $txts.length ?  nxtIdx : 0;
                    
                    var $nextTxt = $(":input:text:eq(" + nxtIdx + ")");
                    $nextTxt.focus();
                    
                    // 选中文本框内容
                    if(selectFlg){
                        setSelection($nextTxt[0],0,$nextTxt.val().length);
                    }               
                }
            });
        }
    });
}

/// <summary>
/// 前台通过ajax设置参数，后台通过基类中的getParameter获取
/// </summary>
/// <param name="sender">事件对象</param>
/// <param name="keys">参数Key字符串数组</param>
/// <param name="vals">参数值字符串数组</param>
/// <history>
/// 2014/02/18    zhangh    添加
/// </history>
function setParameter(sender, toPage,keys,vals) {
    sender.setParameter = new Object();
    sender.setParameter.ReturnData = null;
    sender.setParameter.IsSussess = false;

    var strParameters = "";
    strParameters = strParameters + "[";
    var len = keys.length;
    if (len == 0) {
        return true;
    }
    for (var i = 0; i < len; i++) {
        var strItem = "";
        strItem = strItem + "{";
        strItem = strItem + "\"";
        strItem = strItem + "FromPage";
        strItem = strItem + "\":";
        strItem = strItem + "\"";
        strItem = strItem + "\",";

        strItem = strItem + "\"";
        strItem = strItem + "ToPage";
        strItem = strItem + "\":";
        strItem = strItem + "\"";
        strItem = strItem + toPage;
        strItem = strItem + "\",";

        strItem = strItem + "\"";
        strItem = strItem + "Key";
        strItem = strItem + "\":";
        strItem = strItem + "\"";
        strItem = strItem + keys[i];
        strItem = strItem + "\",";

        strItem = strItem + "\"";
        strItem = strItem + "Value";
        strItem = strItem + "\":";
        strItem = strItem + "\"";
        strItem = strItem + vals[i];
        strItem = strItem + "\"";
        strItem = strItem + "}";

        if (i != len - 1) {
            strItem = strItem + ",";
        }

        strParameters = strParameters + strItem;
    }
    strParameters = strParameters + "]";
    
    // 请求数据
    $.ajax({
        type: "post",
        cache: false,
        async: false,
        url: "../Handlers/SetParameterHandler.ashx",
        data: { "jsonArray": strParameters },
        success: function(data) {
            sender.setParameter.ReturnData = data;
            sender.setParameter.IsSussess = true;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}
//例如：
//var keys = ["userId", "deptId"];
//var vals = [userId, deptId];
//setParameter(sender, "WebForm2.aspx", keys, vals);

/// <summary>
/// 获取消息内容
/// </summary>
/// <param name="msgName">消息名称</param>
/// <param name="msgKey">消息Key</param>
/// <param name="params">参数字符串数组</param>
/// <remarks>
/// 参数字符串数组：
/// ["a","b"]
/// </remarks>
/// <history>
/// 2014/03/17    zhangh    添加
/// </history>
function getMessage(msgName, msgKey, params) {

    if (msgName == "") return false;
    if (msgKey == "") return false;

    var strParameters = "";
    if (params != null && params != undefined) {

        strParameters = strParameters + "[";
        var len = params.length;
        if (len == 0) {
            return true;
        }
        for (var i = 0; i < len; i++) {
            var strItem = "";

            strItem = strItem + "{";
            strItem = strItem + "\"";
            strItem = strItem + "Key";
            strItem = strItem + "\":";
            strItem = strItem + "\"";
            strItem = strItem + i;
            strItem = strItem + "\",";

            strItem = strItem + "\"";
            strItem = strItem + "Value";
            strItem = strItem + "\":";
            strItem = strItem + "\"";
            strItem = strItem + params[i];
            strItem = strItem + "\"";
            strItem = strItem + "}";

            if (i != len - 1) {
                strItem = strItem + ",";
            }

            strParameters = strParameters + strItem;
        }
        strParameters = strParameters + "]";
    }

    var returnValue = "";
    // 请求数据
    $.ajax({
        type: "post",
        cache: false,
        async: false,
        url: "../Handlers/GetMessageHandler.ashx",
        data: { "msgName": msgName, "msgKey": msgKey, "jsonArray": strParameters },
        success: function(data) {
            returnValue = data;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
    return returnValue;
}