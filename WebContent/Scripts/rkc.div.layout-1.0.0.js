/// <summary>
/// 设置div布局
/// </summary>
/// <param name="arrLayout">DIV布局用的数组</param>
/// <remarks>
/// 参数的格式：
/// var arrLayout = [{ id: "divID", width: "宽度", height: "高度", childFloat: "孩子的排列方向", children: [孩子们])];
/// 参数说明：
/// width：自动计算宽度"auto"；指定宽度"100px"；
/// height：自动计算高度"auto"；指定高度"100px"；
/// overflow：auto|hidden|scroll|visible|inherit；
/// childFloat：h|v（h为水平方向，v为垂直方向）；
/// children：当前DIV的子DIV数组，如：children: [{id:......},{id:......}]
/// 备注：
/// 每个div的子div只允许单向排列，即要么纵向排列，要么横向排列，不支持纵横交错排列。
/// 例如：
/// var arrLayout = [{ id: "divContainer", width: "auto", height: "auto", overflow: "hidden", childFloat: "v", children: [
///                             { id: "divHead", width: "auto", height: "100", overflow: "hidden", childFloat: "", children: [] },
///                             { id: "divNav", width: "auto", height: "20", overflow: "hidden", childFloat: "", children: [] },
///                             { id: "divBody", width: "auto", height: "auto", overflow: "hidden", childFloat: "", children: [] },
///                             { id: "divFoot", width: "auto", height: "0", overflow: "hidden", childFloat: "", children: []}]
/// }];
/// $(function() {
///     // 初始化布局
///     initLayout(arrLayout);
///     $(window).resize(function() {
///         initLayout(arrLayout);
///     });
/// });
/// </remarks>
function initLayout(arrLayout) {
    // 参数判断
    if (arrLayout == null
        || arrLayout == undefined
        || arrLayout.length != 1)
        return;

    var windowW = $(window).width();
    var windowH = $(window).height();
    setLayout(arrLayout[0], windowW, windowH, "");
}
function setLayout(item, w, h, float) {
    // get attribute
    var id = item.id;
    var overflow = item.overflow;
    var childFloat = item.childFloat;
    var children = item.children;

    // set current div
    var $divItem = $("#" + id);  
    if (w == 0 || h == 0) {
        $divItem.hide();
    }
    else {
        $divItem.show();
        with ($divItem) {
            width(w + "px");
            height(h + "px");
            css({
                border: "none",
                margin: "0",
                padding: "0",
                "box-sizing": "border-box",
                overflow: function() {
                    return overflow == "" ? "auto" : overflow;
                },
                float: function() {
                    return float == "" ? "none" : float;
                }
            });
        }
    }

    // get children's width and height
    if (children.length == 0) {
        return;
    }
    if (childFloat == "v") {
        var autoCount = 0;
        var unAutoH = 0;
        $.each(children, function(i, item) {
            autoCount += item.height == "auto" ? 1 : 0;
            unAutoH += item.height == "auto" ? 0 : Number(item.height);
        });
        var autoH = autoCount == 0 ? 0 : parseInt((h - unAutoH) / autoCount);
        autoH = autoH <= 0 ? 0 : autoH;
        

        $.each(children, function(i, item) {
            var childW = item.width == "auto" ? w : Number(item.width);
            var childH = item.height == "auto" ? autoH : Number(item.height);
            setLayout(item, childW, childH, "");
        });
    }
    if (childFloat == "h") {
        var autoCount = 0;
        var unAutoW = 0;
        $.each(children, function(i, item) {
            autoCount += item.width == "auto" ? 1 : 0;
            unAutoW += item.width == "auto" ? 0 : Number(item.width);
        });
        var autoW = autoCount == 0 ? 0 : parseInt((w - unAutoW) / autoCount);
        autoW = autoW <= 0 ? 0 : autoW;

        $.each(children, function(i, item) {
            var childW = item.width == "auto" ? autoW : Number(item.width);
            var childH = item.height == "auto" ? h : Number(item.height);
            setLayout(item, childW, childH, "left");
        });
    }
}