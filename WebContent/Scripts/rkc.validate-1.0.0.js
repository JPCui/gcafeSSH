/// <summary>
/// 检查是否为空
/// </summary>
/// <param name="str">字符串</param>
/// <returns>true|false</returns>
function isEmpty(str) {
    return str == "";
}

/// <summary>
/// 检查是否为数字
/// </summary>
/// <param name="str">字符串</param>
/// <returns>true|false</returns>
function isNumber(str) {
    var re = /^[\d]+$/
    return re.test(str);
}

/// <summary>
/// 检查是否为网址
/// </summary>
/// <param name="str">字符串</param>
/// <returns>true|false</returns>
function isURL(str) {
    if (isEmpty(str)) return false;
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@ 
                     + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
                     + "|" // 允许IP和DOMAIN（域名） 
                     + "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
                     + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
                     + "[a-z]{2,6})" // first level domain- .com or .museum 
                     + "(:[0-9]{1,4})?" // 端口- :80 
                     + "((/?)|" // a slash isn't required if there is no file name 
                     + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    return re.test(str);
}

/// <summary>
/// 检查是否为电子邮件 
/// </summary>
/// <param name="str">字符串</param>
/// <returns>true|false</returns>
function isEmail(str) {
    if (isEmpty(str)) return false;
    var re = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return re.test(str);
}

/// <summary>
/// 检查是否为电话号码
/// </summary>
/// <param name="str">字符串</param>
/// <returns>true|false</returns>
function isTel(str) {
    var re = /[^0-9\-\(\)]/;
    return !re.test(str)
}

/// <summary>
/// 验证文本框中特殊字符
/// onpress = "return validateSpecialCharacter();"
/// </summary>
function validateSpecialCharacter() {
    var code;
    if (document.all) { //判断是否是IE浏览器
        code = window.event.keyCode;
    } else {
        code = arguments.callee.caller.arguments[0].which;
    }
    var character = String.fromCharCode(code);
    //var txt = new RegExp("[ \\`,\\~,\\!,\\@,\#,\\$,\\%,\\^,\\+,\\*,\\&,\\\\,\\|,\\<,\\>,\\{,\\},\\'',\" ]");
    var txt = new RegExp("[ ~#$%&~^|/\"<>*\\\\ ]");
    //特殊字符正则表达式 
    if (txt.test(character)) {
        if (document.all) {
            window.event.returnValue = false;
        } else {
            arguments.callee.caller.arguments[0].preventDefault();
        }
    }
}