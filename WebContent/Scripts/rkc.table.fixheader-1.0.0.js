/// <summary>
/// 固定Table表头或列
/// </summary>
/// <param name="tblID">RepeaterClientID</param>
/// <param name="fixColumnNum">左侧固定列的数量</param>
/// <remarks>
/// 要求Repeater输出是一个完整的Table
/// <remarks>
/// <history>
/// 2006/01/05    zhangh    创建
/// 2010/05/18    zhangh    修改    增加固定列的功能
/// 2014/01/16    zhangh    修改    修改在固定列时，行的鼠标悬停样式无法应用于整行的问题。
/// </history>
function fixTableHeader(tblID, fixColumnNum) {
    $(function () {

        var tblFixColumnHeader = null; // 定义固定列的表头
        var tblFixColumnBody = null; // 定义固定列的表体
        var tblHeader = null; // 定义非固定列的表头
        var tblBody = null; // 定义非固定列的表体

        var divFixColumnHeader = null; // 定义固定列的表头的区域
        var divFixColumnBody = null; // 定义固定列的表体的区域
        var divFixColumnBody2 = null; // 定义固定列的表体的区域
        var divHeader = null; // 定义非固定列的表头的区域
        var divHeader2 = null; // 定义非固定列的表头的区域
        var divBody = null; // 定义非固定列的表体的区域

        var divContainer = null; // 定义容器区域

        var fixColumnFlag = false; // 定义固定列标志

        fixColumnNum = fixColumnNum == undefined ? 0 : fixColumnNum;
        fixColumnNum = isNaN(fixColumnNum) ? 0 : fixColumnNum;
        fixColumnFlag = fixColumnNum > 0 ? true : false;

        tblBody = $("#" + tblID);

        // 判断GridView是否存在
        if (tblBody.length == 0)
            return;

        // 判断Table是否有数据
        if (tblBody.children().children("tr").length == 0)
            return;

        // 判断固定列长是否大于列总长
        if (fixColumnNum > 0 && tblBody.children().children("tr:first").children().length < fixColumnNum)
            return;




        // 获取并设置容器控件
        divContainer = tblBody.parent();//如果用GridView需要tblBody.parent().parent();因为GridView会自动多一层div
        divContainer.css("overflow", "hidden");

        // --------------------------------------------------
        // 设置列宽
        // --------------------------------------------------
        $.each(tblBody.children().children("tr:first").children(), function (i, item) {
            // 定义列宽
            var cellWidth = 0;

            // 获取列宽
            if (this.style.width != "") {
                cellWidth = parseInt(this.style.width);
            } else {
                cellWidth = $(this).width();
            }

            //var innerTextLen = this.innerText.length;

            // 设置列宽
            //$(this).width(cellWidth + 4 * innerTextLen);
            $(this).width(cellWidth);
            // 设置下一行列宽，以便将header拆开后仍然保持对齐
            //$(this).parent().next().children(":nth-child(" + parseInt(i + 1) + ")").width(cellWidth + 4 * innerTextLen);
            $(this).parent().next().children(":nth-child(" + parseInt(i + 1) + ")").width(cellWidth);
        });

        // 如果需要固定列，则遍历所有行，设置每行的行高
        if (fixColumnFlag)
            $.each(tblBody.children().children(), function (i) {
                var rowHeight = $(this).children(":nth-child(1)").height();
                $(this).children(":nth-child(1)").height(rowHeight);
                $(this).children(":nth-child(" + (fixColumnNum + 1) + ")").height(rowHeight);
            });

        // 设置tblBody的宽度
        tblBody.css("table-layout", "fixed");
        tblBody.width(tblBody.width());

        // 如果需要固定列，将固定列拆出来
        if (fixColumnFlag) {

            // 获取固定列的表头
            tblFixColumnHeader = tblBody.clone();
            tblFixColumnHeader.attr("id", tblID + "_FixColumnHeader");
            tblFixColumnHeader.children().children("tr:not(:nth-child(1))").remove();
            tblFixColumnHeader.children().children("tr:nth-child(1)").children(":gt(" + parseInt(fixColumnNum - 1) + ")").remove();
            tblFixColumnHeader.width(parseInt(tblFixColumnHeader.children().children("tr:nth-child(1)").children().first().css("width")));

            // 获取固定列的表体
            tblFixColumnBody = tblBody.clone();
            tblFixColumnBody.attr("id", tblID + "_FixColumnBody");
            tblFixColumnBody.children().children("tr:nth-child(1)").remove();
            $.each(tblFixColumnBody.children().children(), function (i) {
                $(this).children(":gt(" + parseInt(fixColumnNum - 1) + ")").remove();
            });

            tblFixColumnBody.width(tblFixColumnHeader.width());

            // 移除tblBody中的固定列
            $.each(tblBody.children().children(), function (i) {
                $(this).children(":lt(" + parseInt(fixColumnNum) + ")").remove();
            });
        }

        // 获取非固定列的表头
        tblHeader = tblBody.clone();
        tblHeader.attr("id", tblID + "_Header");
        tblHeader.children().children("tr:not(:first)").remove();

        // 移除tblBody的表头
        tblBody.children().children("tr:first").remove();
        
        // 设置鼠标悬浮样式
        if (fixColumnFlag) {
            var $tblFixColumnBodyTrs = tblFixColumnBody.children().children("tr");
            var $tblBodyTrs = tblBody.children().children("tr");
            
            // 鼠标悬浮在固定列表体的tr上时，设置非固定列表体的tr样式
            $tblFixColumnBodyTrs.mouseover(function(){
                var idx = $tblFixColumnBodyTrs.index(this);
                
                var $tr2 = $tblBodyTrs.eq(idx);
                $tr2.addClass("hover");
            });
            
            // 鼠标离开固定列表体的tr上时，设置非固定列表体的tr样式
            $tblFixColumnBodyTrs.mouseleave(function(event){
                var idx = $tblFixColumnBodyTrs.index(this);
                
                var $tr2 = $tblBodyTrs.eq(idx);
                $tr2.removeClass("hover");
            });
            
            // 鼠标悬浮在非固定列表体的tr上时，设置固定列表体的tr样式
            $tblBodyTrs.mouseover(function(){
                var idx = $tblBodyTrs.index(this);
                
                var $tr2 = $tblFixColumnBodyTrs.eq(idx);
                $tr2.addClass("hover");
            });
            
            // 鼠标离开非固定列表体的tr上时，设置固定列表体的tr样式
            $tblBodyTrs.mouseleave(function(){
                var idx = $tblBodyTrs.index(this);
                
                var $tr2 = $tblFixColumnBodyTrs.eq(idx);
                $tr2.removeClass("hover");
            });
        }




        // 如果需要固定列，创建固定列所在的区域
        if (fixColumnFlag) {

            // 创建固定列表头的区域
            var divFixColumnHeader = $("<div id='div_" + tblFixColumnHeader.attr("id") + "' style='float:left;'></div>");
            divFixColumnHeader.css("overflow", "hidden");
            divFixColumnHeader.css("float", "left"); // 动态添加float=left在某些浏览器不识别，因此在创建JQuery对象的HTML里也要加上
            tblFixColumnHeader.appendTo(divFixColumnHeader);

            // 创建固定列表体的区域
            var divFixColumnBody = $("<div id='div_" + tblFixColumnBody.attr("id") + "' style='float:left;'></div>");
            divFixColumnBody.css("overflow", "hidden");
            divFixColumnBody.css("float", "left"); // 动态添加float=left在某些浏览器不识别，因此在创建JQuery对象的HTML里也要加上

            // 创建固定列表体的区域2
            var divFixColumnBody2 = $("<div id='div_" + tblFixColumnBody.attr("id") + "2" + "'></div>");
            divFixColumnBody2.css("overflow", "hidden");
            divFixColumnBody2.appendTo(divFixColumnBody);
            tblFixColumnBody.appendTo(divFixColumnBody2);

        }

        // 创建表头的区域
        divHeader = $("<div id='div_" + tblHeader.attr("id") + "'></div>");
        divHeader.css("overflow", "hidden");

        // 创建表头的区域2
        divHeader2 = $("<div id='div_" + tblHeader.attr("id") + "2" + "'></div>");
        divHeader2.css("overflow", "hidden");
        divHeader2.appendTo(divHeader);
        tblHeader.appendTo(divHeader2);

        // 创建表体的区域
        divBody = $("<div id='div_" + tblBody.attr("id") + "'></div>");
        divBody.css("overflow", "auto");
        tblBody.appendTo(divBody);


        // 将各种区域添加到内容区域
        if (fixColumnFlag)
            divFixColumnHeader.appendTo(divContainer);
        divHeader.appendTo(divContainer);
        if (fixColumnFlag)
            divFixColumnBody.appendTo(divContainer);
        divBody.appendTo(divContainer);

        // 定义固定列宽度
        var fixColumnWidth = fixColumnFlag ? tblFixColumnHeader.width() : 0;
        var fixColumnHeaderHeight = fixColumnFlag ? tblFixColumnHeader.height() : tblHeader.height();
        var fixColumnBodyHeight = fixColumnFlag ? tblFixColumnBody.height() : 0;

        // 需要先将新建的区域加到内容区域中，再设置宽高，否则无效
        if (fixColumnFlag) {
            divFixColumnHeader.width(fixColumnWidth);
            divFixColumnHeader.height(fixColumnHeaderHeight);

            divFixColumnBody.width(fixColumnWidth);
            divFixColumnBody.height(divContainer.height() - fixColumnHeaderHeight);

            divFixColumnBody2.width(fixColumnWidth);
            divFixColumnBody2.height(fixColumnBodyHeight + 17);
        }

        divHeader.width(divContainer.width() - fixColumnWidth);
        divHeader.height(fixColumnHeaderHeight);

        divHeader2.width(tblHeader.width() + 17);
        divHeader2.height(fixColumnHeaderHeight);

        divBody.width(divContainer.width() - fixColumnWidth);
        divBody.height(divContainer.height() - fixColumnHeaderHeight);


        // 设置滚动条事件
        divBody.scroll(function () {
            divHeader.scrollLeft(divBody.scrollLeft());
            if (fixColumnFlag)
                divFixColumnBody.scrollTop(divBody.scrollTop());
        });

        if (fixColumnFlag)
            divFixColumnBody.scroll(function () {
                divBody.scrollTop(divFixColumnBody.scrollTop());
            });

        // 设置浏览器大小变更事件
        $(window).resize(function () {
            if (fixColumnFlag)
                divFixColumnBody.height(divContainer.height() - fixColumnHeaderHeight);
            divHeader.width(divContainer.width() - fixColumnWidth);
            divBody.width(divContainer.width() - fixColumnWidth);
            divBody.height(divContainer.height() - fixColumnHeaderHeight);

            divHeader.scrollLeft(divBody.scrollLeft());
            if (fixColumnFlag)
                divFixColumnBody.scrollTop(divBody.scrollTop());

        });

        // 添加checkbox事件
        var chkHeader = null;
        if (fixColumnFlag) {
            chkHeader = tblFixColumnHeader.children().children(":nth-child(1)").children(":nth-child(1)").children(":checkbox");

            if (chkHeader != null && chkHeader.length == 1) {
                // 添加头部CheckBox点击事件
                chkHeader.click(function () {
                    $.each(tblFixColumnBody.children().children(), function () {
                        var chkItem = $(this).children(":nth-child(1)").children(":checkbox");
                        if (chkItem != null && chkItem.length == 1) {
                            chkItem.get(0).checked = chkHeader.get(0).checked;
                        }
                    });
                });

                // 添加子项CheckBox点击事件
                $.each(tblFixColumnBody.children().children(), function () {

                    var chkItem = $(this).children(":nth-child(1)").children(":checkbox");
                    if (chkItem != null && chkItem.length == 1) {

                        chkItem.click(function () {
                            var checkedCount = 0;
                            // 判断有多少个checkbox选中
                            $.each(tblFixColumnBody.children().children(), function () {
                                var chkTemp = $(this).children(":nth-child(1)").children(":checkbox");
                                if (chkTemp != null && chkTemp.length == 1) {
                                    checkedCount += chkTemp.get(0).checked ? 1 : 0;
                                }
                            });

                            tblFixColumnHeader.children().children(":nth-child(1)").children(":nth-child(1)").children(":checkbox").get(0).checked = (checkedCount == (tblFixColumnBody.children().children().length));
                        });
                    }
                });
            }
        }
        else {
            chkHeader = tblHeader.children().children(":nth-child(1)").children(":nth-child(1)").children(":checkbox");

            if (chkHeader != null && chkHeader.length == 1) {
                // 添加头部CheckBox点击事件
                chkHeader.click(function () {
                    $.each(tblBody.children().children(), function () {
                        var chkItem = $(this).children(":nth-child(1)").children(":checkbox");
                        if (chkItem != null && chkItem.length == 1) {
                            chkItem.get(0).checked = chkHeader.get(0).checked;
                        }
                    });
                });

                // 添加子项CheckBox点击事件
                $.each(tblBody.children().children(), function () {

                    var chkItem = $(this).children(":nth-child(1)").children(":checkbox");
                    if (chkItem != null && chkItem.length == 1) {

                        chkItem.click(function () {
                            var checkedCount = 0;
                            // 判断有多少个checkbox选中
                            $.each(tblBody.children().children(), function () {
                                var chkTemp = $(this).children(":nth-child(1)").children(":checkbox");
                                if (chkTemp != null && chkTemp.length == 1) {
                                    checkedCount += chkTemp.get(0).checked ? 1 : 0;
                                }
                            });

                            tblHeader.children().children(":nth-child(1)").children(":nth-child(1)").children(":checkbox").get(0).checked = (checkedCount == (tblBody.children().children().length));
                        });
                    }
                });
            }
        }
    });
}