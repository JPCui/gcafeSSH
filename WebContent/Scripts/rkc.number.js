/* --------------------------------------------------
// 说明
// --------------------------------------------------
// 2013/11/13 by zhangh
// 进一步完善；
//
-------------------------------------------------- */

function getSelection(obj) {
    var selStart, selEnd, selText;
    selStart = obj.value.length;
    selEnd = obj.value.length;
    selText = "";
    if (obj.selectionStart) {
        selStart = obj.selectionStart;
        selEnd = obj.selectionEnd;
        selText = obj.value.substring(selStart, selEnd);
    }
    else {
        var rgn = document.selection.createRange();
        if (rgn.parentElement() == obj) {
            selText = rgn.text;
            var len = selText.length;
            var totalLen = obj.type == "text" ? $(obj).val().length : $(obj).text().length;
            rgn.moveStart("character", -Number(totalLen));
            selStart = rgn.text.length - len;
            selEnd = rgn.text.length;
        }
    }
    return {
        selStart: selStart,
        selEnd: selEnd,
        selText: selText
    };
}
function setSelection(obj, selStart, selEnd) {

    if (obj.selectionStart) {
        obj.selectionStart = selStart;
        obj.selectionEnd = selEnd;
        obj.setSelectionRange(selStart, selEnd);
    }
    else {

        var rgn = obj.createTextRange();
        rgn.collapse();
        rgn.moveEnd('character', selEnd);
        rgn.moveStart('character', selStart);
        rgn.select();

    }
}
//示例
//本次冻结数textbox验证
//        $(function () {
//            var $FrozenQtyNow = $("input[id='txtFrozenQtyNow']");
//            $.each($FrozenQtyNow, function (i, item) {
//                formatNumber($(item), 12, 4, 0, 0, false, "right");
//            })
//        })
// hasComma: true,false
// align: left,right
function formatNumber($input, prec, scale, emptyVal, zeroVal, hasComma, align) {

    if($input == undefined || $input[0] == undefined){
        alert("$input is undefined!");
        return;
    }
    
    // 禁用输入法
    $input.css("ime-mode", "disabled");

    // --------------------------------------------------
    // 参数判断
    // --------------------------------------------------
    // 精度（含整数和小数）
    prec = Number(prec) == NaN ? 0 : Number(prec);
    prec = prec < 0 ? 0 : prec;
    
    // 小数位数
    scale = Number(scale) == NaN ? 0 : Number(scale);
    scale = scale < 0 ? 0 : scale;
    
    // 空值
    emptyVal = Number(emptyVal) == NaN ? 0 : Number(emptyVal);

    // 零值
    zeroVal = Number(zeroVal) == NaN ? 0 : Number(zeroVal);
    
    // 逗号
    hasComma == hasComma == true ? true : false;
    
    // 水平位置
    align = (align != "left" && align != "right") ? "right" : align;
    $input.css("text-align", align);

    // 整数位数
    prec = prec - scale;
    
    // --------------------------------------------------
    // 值判断
    // --------------------------------------------------
    var value = $input.val();
    // 删除逗号
    value = String(value).indexOf(",") == -1 ? value : removeComma(value)
    
    // 空值判断
    value = Number(value) == NaN ? emptyVal : Number(value);
    
    // 零值判断
    value = Number(value) == 0 ? zeroVal : Number(value);
    
    // 获取小数点位置
    var pointIndex = String(value).indexOf(".");
    
    // 不存在小数点
    if (pointIndex == -1) {
        if(String(value).replace("-","").length > prec){
            alert("value is error! ");
            return;
        }
    }
    else {
        if(String(value).replace("-","").replace(".","").length > (prec + scale)){
            alert("value is error! ");
            return;
        }
    }
    
    // --------------------------------------------------
    // 初始化
    // --------------------------------------------------
    // 格式化小数
    value = formatScale(value, scale, emptyVal, zeroVal, hasComma);
    $input.val(value);
    
    

    // 小数点KeyCode
    var pointCode = 190;
    var pointCode2 = 110;

    // 如果没有小数，则屏蔽掉小数点
    if (scale == 0) {
        pointCode = 48;
        pointCode2 = 48;
    }
    
    // 光标起始位置与结束位置
    var objText, start, end;
    objText = $input[0];
    

    // 如果有逗号，因得到焦点后需要去掉逗号，因此需重新设置光标的位置
    // 在mousedown事件中，此时并未真正得到光标，因此得不到正确的光标位置
    // 在focus事件中，如果手动设置选中的文本，则本身的拖动选择将无法进行
    if(hasComma){
        $input.mouseup(function () {
        
            // 获取光标位置
            start = getSelection(objText).selStart;
            end = getSelection(objText).selEnd;
            
            // 获取文本框内容
            var value = $.trim($input.val());
            
            // 获取字符串起始位置到start的逗号个数
            var len = value.substring(0,start).replace(/[^,]/g, "").length;
            var len2 = value.substring(0,end).replace(/[^,]/g, "").length;
            start = start - len;
            end = end - len2;
            
            // 删除逗号
            value = removeComma(value);
            $input.val(value)
            
            // 设置光标选择区域
            setSelection(objText, start, end);
        });
    }

    //屏蔽掉无关的按键
    $input.keydown(function () {

        var kc = event.keyCode;

        if (kc != 48 //0
            && kc != 49 //1
            && kc != 50 //2
            && kc != 51 //3
            && kc != 52 //4
            && kc != 53 //5
            && kc != 54 //6
            && kc != 55 //7
            && kc != 56 //8
            && kc != 57 //9
            && kc != 189 //-
            && kc != pointCode //.
            && kc != 96 //小键盘0
            && kc != 97 //小键盘1
            && kc != 98 //小键盘2
            && kc != 99 //小键盘3
            && kc != 100 //小键盘4
            && kc != 101 //小键盘5
            && kc != 102 //小键盘6
            && kc != 103 //小键盘7
            && kc != 104 //小键盘8
            && kc != 105 //小键盘9
            && kc != 109 //小键盘-
            && kc != pointCode2 //小键盘.
            && kc != 8 //[退格]
            && kc != 35 //[End]
            && kc != 36 //[Home]
            && kc != 37 //[方向键左]
            && kc != 39 //[方向键右]
            && kc != 46 //[Delete]
            && kc != 16 //[Shift]
            && kc != 9 //[Tab]
            ) {
            event.returnValue = false;
            return;
        }
        //以下按键对数据超出范围没有影响
        if (kc == 8 //[退格]
            || kc == 35 //[End]
            || kc == 36 //[Home]
            || kc == 37 //[方向键左]
            || kc == 39 //[方向键右]
            || kc == 46 //[Delete]
            || kc == 16 //[Shift]
            || kc == 9 //[Tab]
            ) {
            //获取光标位置
            start = getSelection(objText).selStart;
            end = getSelection(objText).selEnd;
            if (kc == 8) {
                start--;
                if (start < 0) start = 0;
            }

            return;
        }

        //获取光标位置
        start = getSelection(objText).selStart;
        end = getSelection(objText).selEnd;

        //对长度有数据超出范围有影响的按键，做以下判断
        var value = $.trim($input.val());
        var pointIndex = value.indexOf(".");
        var len = value.indexOf("-") == -1 ? 0 : 1;
        if (len > 0 && (kc == 189 || kc == 109)) {
            event.returnValue = false;
            return;
        }
        if (start != 0 && (kc == 189 || kc == 109)) {
            event.returnValue = false;
            return;
        }

        if (start < end) {
            return;
        }

        if (pointIndex == -1) {
            //没有小数点时，如果整数部分已经达到长度，除负号和小数点以外的按键都要屏蔽
            if ((value.length - len == prec)) {
                if (kc != 190 && kc != 110 && kc != 189 && kc != 109) {
                    event.returnValue = false;
                    return;
                }
            }
        }
        if (pointIndex != -1) {
            // 屏蔽小数点
            if(kc == 190 || kc == 110){
                event.returnValue = false;
                return;
            }
            
            //有小数点时，如果光标在小数点左侧，并且整数部分已经达到长度，除负号以外的按键都要屏蔽
            if (start <= pointIndex && pointIndex - len == prec) {
                if (kc != 189 && kc != 109) {
                    event.returnValue = false;
                    return;
                }
            }
            
            //有小数点时，如果光标在小数点右侧，并且小数部分已经达到长度，全部屏蔽
            if (start > pointIndex && value.substring(pointIndex + 1).length == scale) {
                event.returnValue = false;
                return;
            }

        }
    });
    $input.keyup(function () {
//        var kc = event.keyCode;
//        if (kc != 35 //[End]
//            && kc != 36 //[Home]
//            && kc != 37 //[方向键左]
//            && kc != 39 //[方向键右]
//            && kc != 16 //[Shift]
//            ) {

//            //获取光标位置
//            start = getSelection(objText).selStart;
//            end = getSelection(objText).selEnd;

//            var value = $.trim($input.val());
//            var pattern = "([-]?[0-9]{0," + prec + "}[\.]{1}[0-9]{0," + scale + "})|([-]?[0-9]{0," + prec + "})";
//            var reg = new RegExp(pattern);
//            value = value.match(reg)[0];
//            $input.val(value);
////            1
////            if (start != value.length && kc != 8) {
////                start += 1;
////                end += 1;
////            }
//            setSelection(objText, start, end);

//        }
    });
    $input.blur(function () {
        var value = formatScale($input.val(), scale, emptyVal, zeroVal, hasComma);
        $input.val(value);
    });

}

// 格式化小数位数
function formatScale(inputValue, scale, emptyVal, zeroVal, hasComma) {

    // --------------------------------------------------
    // 参数判断
    // --------------------------------------------------
    // 小数位数
    scale = Number(scale) == NaN ? 0 : Number(scale);
    scale = scale < 0 ? 0 : scale;
    
    // 空值
    emptyVal = Number(emptyVal) == NaN ? 0 : Number(emptyVal);

    // 零值
    zeroVal = Number(zeroVal) == NaN ? 0 : Number(zeroVal);
    
    // 逗号
    hasComma == hasComma == true ? true : false;

    // --------------------------------------------------
    // 值判断
    // --------------------------------------------------
    var value = inputValue;
    // 删除逗号
    value = String(value).indexOf(",") == -1 ? value : removeComma(value)
    
    // 空值判断
    value = Number(value) == NaN ? emptyVal : Number(value);
    
    // 零值判断
    value = Number(value) == 0 ? zeroVal : Number(value);

    // --------------------------------------------------
    // 格式化
    // --------------------------------------------------
    value = String(value);
    
    // 获取小数点位置
    var pointIndex = value.indexOf(".");
    
    // 不存在小数点
    if (pointIndex == -1) {
        value += ".";
        for (i = 0; i < scale; i++) {
            value += "0";
        }
    }
    else {
        // 保留scale位小数
        value = String(Math.round(Number(value) * Math.pow(10, scale)) / (Math.pow(10, scale)));
        
        //计算后可能小数点消失,如1.00会变成1
        if (value.indexOf(".") == -1) {
            value += ".";
        }
        
        // 补零
        var rightText = value.substring(pointIndex + 1);
        if (rightText.length < scale) {
            for (i = 0; i < scale - rightText.length; i++) {
                value += "0";
            }
        }
    }

    // 增加逗号
    if (hasComma) {
        value = addComma(value, scale);
    }

    return value;
}

// 增加逗号
function addComma(value, scale) {

    if (value == "") return "";
    
    var sign = value.indexOf("-") == -1 ? "" : "-";
    scale = scale > 0 && scale <= 20 ? scale : 2;
    value = parseFloat((value + "").replace(/[^\d\.]/g, "")).toFixed(scale) + "";
    var l = value.split(".")[0].split("").reverse();
    var r = value.split(".")[1];
    var t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return sign + t.split("").reverse().join("") + "." + r;
}

// 删除逗号
function removeComma(value) {
    return value.replace(/[^\d\.-]/g, "");
}

////格式化数字 允许：负号、数字、小数点、四位小数
//function FormatNumber($input, scale) {
//    $input.keyup(function () {
//        // 键【backspace】、【<-】、【->】、【Delete】
//        if (event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46) return;

//        var value = $.trim($(this).val());
//        var sign = "";
//        var signIndex = value.indexOf("-");
//        if (signIndex == 0) {
//            sign = "-";
//        }

//        var newValue = "";
//        var pointIndex = value.indexOf(".");
//        if (pointIndex != -1) {
//            var point = ".";
//            if (scale == null) scale = 4;
//            var leftText = value.substring(0, pointIndex);
//            var rightText = value.substring(pointIndex);
//            leftText = leftText.replace(/[^\d]/g, "");
//            rightText = rightText.replace(/[^\d]/g, "").substring(0, scale);

//            newValue = sign + leftText + point + rightText
//        } else {
//            newValue = sign + value.replace(/[^\d]/g, "");
//        }

//        $(this).val(newValue);
//    });
//}
////格式化数字 允许：负号、数字
//function FormatNumberOnly($input) {
//    $input.keyup(function () {
//        var value = $.trim($(this).val());
//        value = value.replace(" ", "");

//        var sign = "";
//        var signIndex = value.indexOf("-");
//        if (signIndex == 0) {
//            sign = "-";
//        }

//        var newValue = sign + value.replace(/[^\d]/g, "");
//        $(this).val(newValue);
//    });
//}
