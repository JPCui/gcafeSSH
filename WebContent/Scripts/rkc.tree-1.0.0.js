// 该js要与../Controls/UCTree.ascx结合使用

/// <summary>
/// 初始化树型控件
/// </summary>
/// <param name="jsonTreeParameter">参数</param>
function initTree(jsonTreeParameter) {

    // 获取控件数据
    var $hdnTreeData = $("#" + jsonTreeParameter.hdnTreeDataID);
    var treeData = $hdnTreeData.val();

    // 如果数据不存在，则请求数据
    if ($.trim(treeData) == "") {

        // 判断是否存在请求数据的Handler程序
        if (jsonTreeParameter.treeDataHandler == "") {
            alert("无法找到请求数据的Handler程序。");
            return;
        }

        // 请求数据
        $.ajax({
            type: "get",
            cache: false,
            url: jsonTreeParameter.treeDataHandler,
            dataType: "json",
            success: function(data) {

                // 初始化树型控件
                var $divTree = $("#" + jsonTreeParameter.treeId);
                $.each(data, function(i, jsonTreeItem) {

                    // 创造树
                    createTreeItem(jsonTreeItem, $divTree, 1, jsonTreeParameter);
                });

                // 保存数据
                saveTree(jsonTreeParameter);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);
            }
        });
    }
    // 如果数据存在，则构造数据
    else {

        // 检查数据格式
        var arrTreeData = treeData.split(";");
        if (arrTreeData.length == 0) { alert("数据格式不正确。"); return; }
        if (arrTreeData[0] == "") { alert("数据格式不正确。"); return; }
        var arrTreeItemData = arrTreeData[0].split(",");
        if (arrTreeItemData.length == 0) { alert("数据格式不正确。"); return; }
        if (arrTreeItemData[0] == "") { alert("数据格式不正确。"); return; }
        if (arrTreeItemData[1] == "") { alert("数据格式不正确。"); return; }

        // 根据树型控件字符串数据构造Json数据
        var objJsonData = new Object();
        objJsonData.data = "[";
        makeJsonDataByTreeData(arrTreeItemData[1], arrTreeData, objJsonData);
        objJsonData.data += "]";
        var data = eval(objJsonData.data);

        // 初始化树型控件
        var $divTree = $("#" + jsonTreeParameter.treeId);
        $.each(data, function(i, jsonTreeItem) {
            createTreeItem(jsonTreeItem, $divTree, 1, jsonTreeParameter);
        });
    }
}

/// <summary>
/// 根据树型控件字符串数据构造Json数据
/// </summary>
/// <param name="parentItemId">父节点编号</param>
/// <param name="arrTreeData">Tree数据数组</param>
/// <param name="objJsonData">json数据对象</param>
function makeJsonDataByTreeData(parentItemId, arrTreeData, objJsonData) {
    var len = arrTreeData.length;

    for (var i = 0; i < len; i++) {
        var strTreeItemData = arrTreeData[i];
        if (strTreeItemData == "") continue;

        var arrTreeItemData = strTreeItemData.split(",");
        if (arrTreeItemData[1] != parentItemId) continue;

        // 顺序与后台TreeData属性一致
        var itemId = arrTreeItemData[0];
        var parentItemId = arrTreeItemData[1];
        var level = arrTreeItemData[2];
        var itemValue = arrTreeItemData[3];
        var itemName = arrTreeItemData[4];
        var checked = arrTreeItemData[5];
        var imgUrl = arrTreeItemData[6];
        var path = arrTreeItemData[7];

        // Key与类TreeDto的属性一致
        objJsonData.data += "{";
        objJsonData.data += "\"ItemId\":\"";
        objJsonData.data += itemId + "\",";
        objJsonData.data += "\"ParentItemId\":\"";
        objJsonData.data += parentItemId + "\",";
        objJsonData.data += "\"Level\":\"";
        objJsonData.data += level + "\",";
        objJsonData.data += "\"ItemValue\":\"";
        objJsonData.data += itemValue + "\",";
        objJsonData.data += "\"ItemName\":\"";
        objJsonData.data += itemName + "\",";
        objJsonData.data += "\"Checked\":\"";
        objJsonData.data += checked + "\",";
        objJsonData.data += "\"ImgUrl\":\"";
        objJsonData.data += imgUrl + "\",";
        objJsonData.data += "\"Path\":\"";
        objJsonData.data += path + "\",";
        objJsonData.data += "\"Children\":[";
        makeJsonDataByTreeData(itemId, arrTreeData, objJsonData);
        objJsonData.data += "]";
        objJsonData.data += "},";
    }

    if (objJsonData.data.lastIndexOf("},") == objJsonData.data.length - 2) {
        objJsonData.data = objJsonData.data.substring(0, objJsonData.data.length - 1);
    }
}

/// <summary>
/// 创建节点
/// </summary>
/// <param name="jsonTreeItem">节点json数据</param>
/// <param name="$treeParentItem">父节点对象</param>
/// <param name="level">层级</param>
/// <param name="jsonTreeParameter">参数</param>
function createTreeItem(jsonTreeItem, $treeParentItem, level, jsonTreeParameter) {

    // 构造节点
    var $treeItem = makeTreeItem(jsonTreeItem, level, jsonTreeParameter);
    $treeParentItem.append($treeItem);

    // 创建子节点
    if (level < Number(jsonTreeParameter.maxLevel) || Number(jsonTreeParameter.maxLevel) == 0) {
        if (jsonTreeItem.Children.length > 0) {
            level++;
            $.each(jsonTreeItem.Children, function(i, jsonTreeChildItem) {
                createTreeItem(jsonTreeChildItem, $treeItem.children().eq(1), level, jsonTreeParameter);
            });
        }
    }
}

/// <summary>
/// 构造节点
/// </summary>
/// <param name="jsonTreeItem">节点json数据</param>
/// <param name="level">层级</param>
/// <param name="jsonTreeParameter">参数</param>
function makeTreeItem(jsonTreeItem, level, jsonTreeParameter) {

    // 获取参数
    var treeId = jsonTreeParameter.treeId;
    var checkMode = jsonTreeParameter.checkMode;
    var editType = jsonTreeParameter.editType;

    // 获取节点属性
    var itemId = jsonTreeItem.ItemId;
    var parentItemId = jsonTreeItem.ParentItemId;
    var itemName = jsonTreeItem.ItemName;
    var itemValue = jsonTreeItem.ItemValue;
    var imgUrl = jsonTreeItem.ImgUrl;
    var path = jsonTreeItem.Path;
    var children = jsonTreeItem.Children;
    var hasChild = children.length > 0;

    // 克隆节点模板
    var $treeItem = $("#" + treeId + "_Item_Template").children(":first").clone();
    $treeItem.attr("itemid", itemId);
    $treeItem.attr("parentitemid", parentItemId);
    $treeItem.attr("itemname", itemName);
    $treeItem.attr("itemvalue", itemValue);
    $treeItem.attr("level", level);
    $treeItem.attr("path", path);

    // 获取节点区域和子节点区域
    var $treeItemLI = $treeItem.children(":first");
    var $treeItemUL = $treeItem.children(":last");

    // 获取节点区域中的各个区域
    var $tdSpace = $("#tdSpace", $treeItemLI);
    var $tdLeft = $("#tdLeft", $treeItemLI);
    var $tdTemplate = $("#tdTemplate", $treeItemLI);
    var $tdOption = $("#tdOption", $treeItemLI);

    var $imgspace = $("img", $tdSpace);
    var $imgexpend = $("img[id='imgexpend']", $tdLeft);
    var $checkbox = $(":checkbox", $tdLeft);
    var $imgitem = $("img[id='imgitem']", $tdLeft);
    var $itemvalue = $("[name='itemvalue']", $tdTemplate);
    var $itemname = $("[name='itemname']", $tdTemplate);
    var $edititemvalue = $("[name='edititemvalue']", $tdTemplate);
    var $edititemname = $("[name='edititemname']", $tdTemplate);

    // 获取保存选择项的控件
    var $hdnSelectedItemData = $("#" + jsonTreeParameter.hdnSelectedItemDataID);

    // 空白
    var imgSpaceWidth = 18 * (level - 1);
    $imgspace.css("width", imgSpaceWidth);
    $imgspace.css("height", "1px");

    // 展开折叠
    $imgexpend.click(function() {
        if ($treeItemUL.children().length > 0) {
            if ($treeItemUL.is(":hidden")) {
                $treeItemUL.slideDown("fast");
                $imgexpend.attr("src", "../Images/Common/expand2.png");
            }
            else {
                $treeItemUL.hide();
                $imgexpend.attr("src", "../Images/Common/unexpand2.png");
            }
        }
        return false;
    });
    if (jsonTreeItem.Children.length == 0) {
        $imgexpend.hide();

        var $replace = $imgspace.clone();
        $replace.css("width", "16px");
        $replace.css("height", "1px");
        $replace.insertAfter($imgexpend);
    }

    // 复选框
    if (jsonTreeParameter.showCheckbox == "False") {
        // 隐藏复选框
        $checkbox.hide();
    }
    else {
        // 根据数据选中复选框
        var checkedData = $("#" + jsonTreeParameter.hdnCheckedItemDataID).val();
        if (checkedData != "") {
            var arrCheckedData = checkedData.split(";");
            for (i = 0; i < arrCheckedData.length; i++) {
                var itemCheckedData = $.trim(arrCheckedData[i]);
                var arrItemCheckedData = itemCheckedData.split(",");

                if ($.trim(arrItemCheckedData[0]) == $.trim(itemId)) {
                    $checkbox.attr("checked", true);
                    break;
                }
            }
        }
    }

    // 图片
    // 复选框
    if (jsonTreeParameter.showImage == "False") {
        $imgitem.hide();
    }
    else {
        if ($.trim(imgUrl) == "") imgUrl = "../Images/Common/page.png";
        $imgitem.attr("src", imgUrl);
    }

    // 项目
    $itemvalue.text(itemValue);
    $itemname.text(itemName);
    $edititemvalue.val(itemValue);
    $edititemname.val(itemName);

    if (editType == "Text") {
        $itemvalue.hide();
        $itemname.show();
        $edititemvalue.hide();
        $edititemname.show();
    }
    if (editType == "TextValue") {
        $itemvalue.show();
        $itemname.show();
        $edititemvalue.show();
        $edititemname.show();
    }

    // 初始化选择节点的样式
    var selectedData = $hdnSelectedItemData.val();
    if (selectedData != "") {
        var arrSelectedData = selectedData.split(";");
        var arrItemSelectedData = arrSelectedData[0].split(",");
        if ($.trim(arrItemSelectedData[0]) == $.trim(itemId)) {
            $treeItemLI.addClass("active");
        }
    }

    $treeItemLI.mouseover(function() {
        if ($treeItemLI.css("class") != "active") {
            $treeItemLI.addClass("hover");
        }
    });
    $treeItemLI.mouseleave(function() {
        if ($treeItemLI.css("class") != "active") {
            $treeItemLI.removeClass("hover");
        }
    });
    $treeItemLI.click(function() {
        $(".active", $("#" + treeId)).removeClass("active");
        $treeItemLI.addClass("active");

        saveSelectedItemData($treeItem, jsonTreeParameter);
    });

    // 节点文本点击时设置样式
    $itemname.click(function() {

        // 保存当前节点编号
        $("#hdnCurrentItemLIID_" + treeId).val($treeItem.attr("itemid"));

        saveSelectedItemData($treeItem, jsonTreeParameter);
    });

    // 如果显示复选框，则增加复选框事件
    if (jsonTreeParameter.showCheckbox == "True") {
        $checkbox.click(function(event) {

            // 获取当前节点的Checkbox选中状态
            var checkedFlg = $checkbox.attr("checked");

            if (checkMode == "Normal") {
                // 设置子节点的Checkbox选中状态
                $chkChildItems = $(":checkbox", $treeItemLI.next());
                $chkChildItems.attr("checked", checkedFlg);

                // 保存节点设置
                var $tmpTreeItems = $("div[itemid]", $treeItemLI.next());
                $.each($tmpTreeItems, function(i, item) {
                    saveItemData($(item));
                });

                // 设置父节点的Checkbox选中状态
                if (checkedFlg) {
                    // 设置父节点选中
                    var $treeItemContainer = $treeItem.parent();
                    while ($treeItemContainer.attr("id") != treeId) {
                        $(":checkbox", $treeItemContainer.prev()).attr("checked", true);
                        // 保存节点设置
                        saveItemData($treeItemContainer.parent());

                        $treeItemContainer = $treeItemContainer.parent().parent();
                    }

                }
                else {
                    // 当同级节点都未选中，设置父节点未选中
                    var $treeItemContainer = $treeItem.parent();
                    while ($treeItemContainer.attr("id") != treeId) {
                        var hasChecked = false;
                        $chkItems = $(":checkbox", $treeItemContainer);
                        $.each($chkItems, function(i, item) {
                            if ($(item).attr("checked")) {
                                hasChecked = true;
                                return true;
                            }
                        });
                        if (!hasChecked) {
                            $(":checkbox", $treeItemContainer.prev()).attr("checked", false);
                            // 保存节点设置
                            saveItemData($treeItemContainer.parent());
                        }
                        $treeItemContainer = $treeItemContainer.parent().parent();
                    }
                }
            }
            else if (checkMode == "Single") {
                var $tree = $("#" + treeId);

                // 取消已选中的节点
                var $checked = $(":checked", $tree);
                $.each($checked, function(i, item) {
                    var $tmpChk = $(item).attr("checked", false);
                    var $parents = $tmpChk.parentsUntil("div[itemid]");
                    var $tmpTreeItem = $parents.eq($parents.length - 1).parent();
                    // 保存节点设置
                    saveItemData($tmpTreeItem);
                });

                // 设置当前节点选中
                $checkbox.attr("checked", true);
            }
            else if (checkMode == "SingleUp") {
                var $tree = $("#" + treeId);

                // 取消已选中的节点
                var $checked = $(":checked", $tree);
                $.each($checked, function(i, item) {
                    var $tmpChk = $(item).attr("checked", false);
                    var $parents = $tmpChk.parentsUntil("div[itemid]");
                    var $tmpTreeItem = $parents.eq($parents.length - 1).parent();
                    // 保存节点设置
                    saveItemData($tmpTreeItem);
                });

                // 设置当前节点选中
                $checkbox.attr("checked", true);

                // 设置父节点选中
                var $treeItemContainer = $treeItem.parent();
                while ($treeItemContainer.attr("id") != treeId) {
                    $(":checkbox", $treeItemContainer.prev()).attr("checked", true);
                    // 保存节点设置
                    saveItemData($treeItemContainer.parent());

                    $treeItemContainer = $treeItemContainer.parent().parent();
                }
            }
            else if (checkMode == "SingleDown") {
                var $tree = $("#" + treeId);

                // 取消已选中的节点
                var $checked = $(":checked", $tree);
                $.each($checked, function(i, item) {
                    var $tmpChk = $(item).attr("checked", false);
                    var $parents = $tmpChk.parentsUntil("div[itemid]");
                    var $tmpTreeItem = $parents.eq($parents.length - 1).parent();
                    // 保存节点设置
                    saveItemData($tmpTreeItem);
                });

                // 设置当前节点选中
                $checkbox.attr("checked", true);

                // 设置子节点选中
                $(":checkbox", $treeItemLI.next()).attr("checked", true);

                // 保存节点设置
                var $tmpTreeItems = $("div[itemid]", $treeItemLI.next());
                $.each($tmpTreeItems, function(i, item) {
                    saveItemData($(item));
                });
            }

            saveCheckedItemData(jsonTreeParameter);

            saveItemData($treeItem);
            saveTree(jsonTreeParameter);

            event.stopPropagation();
        });
    }

    // 如果模式为Edit，增加编辑模式下各按钮的事件
    if (jsonTreeParameter.treeMode == "Edit") {
        var $divOption = $("#divOption", $tdOption);

        var $btnReduce = $("img[name='reduce']", $divOption);
        var $btnEdit = $("img[name='edit']", $divOption);
        var $btnDelete = $("img[name='delete']", $divOption);
        var $btnSave = $("img[name='save']", $divOption);
        var $btnCancel = $("img[name='cancel']", $divOption);

        $btnReduce.click(function() {
            reduceTreeItem($treeItem, jsonTreeParameter);
        });
        $btnEdit.click(function() {
            editTreeItem($treeItem, jsonTreeParameter);
        });
        $btnDelete.click(function() {
            deleteTreeItem($treeItem, jsonTreeParameter);
        });
        $btnSave.click(function() {
            saveTreeItem($treeItem, jsonTreeParameter);
        });
        $btnCancel.click(function() {
            cancelTreeItem($treeItem, jsonTreeParameter);
        });

        $treeItemLI.mouseover(function() {
            $divOption.show();
        });
        $treeItemLI.mouseout(function() {
            $divOption.hide();
        });

        // 添加自定义事件
        // 编辑模式下，对节点代码文本框添加自定义事件
        if (jsonTreeParameter.editType == "TextValue") {
            // 对值文本框添加事件
            var jsonItemValueEvent = eval(jsonTreeParameter.itemValueEvent);
            if (jsonItemValueEvent != null && jsonItemValueEvent != undefined) {
                $.each(jsonItemValueEvent, function(i, item) {
                    $edititemvalue.bind(item.EventName, function() {
                        eval(item.Function + "(this);");
                    });
                });
            }
        }

        // 添加自定义事件
        // 编辑模式下，对节点名称文本框添加自定义事件
        var jsonItemNameEvent = eval(jsonTreeParameter.itemNameEvent);
        if (jsonItemNameEvent != null && jsonItemNameEvent != undefined) {
            $.each(jsonItemNameEvent, function(i, item) {
                $edititemname.bind(item.EventName, function() {
                    eval(item.Function + "(this);");
                });
            });
        }
    }

    // 添加自定义事件
    // 对节点添加自定义事件
    var jsonItemEvent = eval(jsonTreeParameter.itemEvent);
    if (jsonItemEvent != null && jsonItemEvent != undefined) {
        $.each(jsonItemEvent, function(i, item) {
            if (item.Level == level || item.Level == "0") {
                // 整个节点点击
                $treeItemLI.bind(item.EventName, function() {
                    eval(item.Function + "(this);");
                });

                //                // 节点文本点击
                //                $itemname.bind(item.EventName, function() {
                //                    eval(item.Function + "(this);");
                //                });
            }
        });
    }

    saveItemData($treeItem);
    return $treeItem;
}

////根据数据添加子节点
//function createTreeChildItem(jsonChildItemData, $treeItem, removeSiblingsFlag) {
//    //获取TreeID
//    var $treeItemContainer = $treeItem.parent();
//    while ($treeItemContainer.attr("level") != "0") {
//        $treeItemContainer = $treeItemContainer.parent().parent();
//    }
//    var treeId = $treeItemContainer.attr("id");

//    //获取数参数jsonTreeParameter
//    var $tree = $("#" + treeId);
//    var $treeOption = $("#" + treeId + "_Option");
//    var $hdnTreeParameter = $("input[id$='hdnTreeParameter']", $treeOption);
//    var jsonTreeParameter = eval($hdnTreeParameter.val())[0];

//    //获取当前节点层级
//    var level = Number($treeItem.attr("level"));

//    //移除同辈节点的子节点
//    if (removeSiblingsFlag) {
//        var $treeItems = $("div[itemid]", $tree);
//        $treeItems.each(function(i, item) {
//            var $tmpTreeItem = $(item);
//            if (Number($tmpTreeItem.attr("level")) > level) {
//                $tmpTreeItem.remove();
//            }
//        });
//        $treeItems.each(function(i, item) {
//            var $tmpTreeItem = $(item);
//            if (Number($tmpTreeItem.attr("level")) == level) {
//                if ($tmpTreeItem.attr("itemid") != $treeItem.attr("itemid")) {
//                    var $treeItemLI = $tmpTreeItem.children(":first");
//                    var $treeItemUL = $tmpTreeItem.children(":last");
//                    var $imgexpend = $("img[id='imgexpend']", $treeItemLI);
//                    $treeItemUL.show();
//                    $imgexpend.attr("src", "../Images/Common/expand2.png");
//                }
//            }
//        });
//    }

//    //添加子节点
//    $treeItem.children(":last").children().remove();
//    $.each(jsonChildItemData, function(i, jsonTreeItem) {
//        createTreeItem(jsonTreeItem, $treeItem.children(":last"), level + 1, jsonTreeParameter);
//    });

//    // 保存数据
//    saveTree(jsonTreeParameter);
//}

/* --------------------------------------------------
以下是操作区域的事件
-------------------------------------------------- */
/// <summary>
/// 添加节点
/// </summary>
/// <param name="jsonTreeParameter">参数</param>
function addTreeItem(jsonTreeParameter) {

    var $hdnCurrentItemLIID = $("#hdnCurrentItemLIID_" + jsonTreeParameter.treeId);
    if (null == $hdnCurrentItemLIID
        || undefined == $hdnCurrentItemLIID) return;

    // 添加根节点
    if ($hdnCurrentItemLIID.val() == "") {
        addRootItem(jsonTreeParameter);
        return;
    }

    // 获取当前节点
    var $tree = $("#" + jsonTreeParameter.treeId);
    var itemId = $hdnCurrentItemLIID.val();
    var $currentTreeItem = $("div[itemid='" + itemId + "']", $tree);

    var level = $currentTreeItem.attr("level");
    var $targetContent = $currentTreeItem.parent();

    // 获取新节点数据
    var jsonTreeItem = getNewTreeItemJsonData();
    jsonTreeItem.ParentItemId = $currentTreeItem.attr("parentitemid");

    // 构造节点
    var $treeItemNew = makeTreeItem(jsonTreeItem, level, jsonTreeParameter);
    $treeItemNew.appendTo($targetContent);

    saveTree(jsonTreeParameter);
}

/// <summary>
/// 添加子节点
/// </summary>
/// <param name="jsonTreeParameter">参数</param>
function addTreeChildItem(jsonTreeParameter) {

    var $hdnCurrentItemLIID = $("#hdnCurrentItemLIID_" + jsonTreeParameter.treeId);
    if (null == $hdnCurrentItemLIID
        || undefined == $hdnCurrentItemLIID
        || $hdnCurrentItemLIID.val() == "") return;

    // 获取当前节点
    var $tree = $("#" + jsonTreeParameter.treeId);
    var itemId = $hdnCurrentItemLIID.val();
    var $currentTreeItem = $("div[itemid='" + itemId + "']", $tree);

    // 判断层级是否超出范围
    var level = Number($currentTreeItem.attr("level")) + 1;
    if (level > Number(jsonTreeParameter.maxLevel) && Number(jsonTreeParameter.maxLevel) != 0) {
        alert('超出层级范围,无法创建节点。');
        return;
    }
    var $targetContent = $currentTreeItem.children(":last");

    // 获取新节点数据
    var jsonTreeItem = getNewTreeItemJsonData();
    jsonTreeItem.ParentItemId = $currentTreeItem.attr("itemid");

    // 构造节点
    var $treeItemNew = makeTreeItem(jsonTreeItem, level, jsonTreeParameter);
    $treeItemNew.appendTo($targetContent);

    saveTree(jsonTreeParameter);
}

/// <summary>
/// 添加根节点
/// </summary>
/// <param name="jsonTreeParameter">参数</param>
function addRootItem(jsonTreeParameter) {

    // 没有选中节点时,创建根节点
    var $hdnCurrentItemLIID = $("#hdnCurrentItemLIID_" + jsonTreeParameter.treeId);
    if ($hdnCurrentItemLIID.val() == "") {

        var $tree = $("#" + jsonTreeParameter.treeId);

        // 获取新节点的Json对象
        var jsonTreeItem = getNewTreeItemJsonData();

        // 构造节点
        var $treeItemNew = makeTreeItem(jsonTreeItem, "1", jsonTreeParameter);

        // 添加节点
        $treeItemNew.appendTo($tree);
    }

    saveTree(jsonTreeParameter);
}

/* --------------------------------------------------
以下是编辑区域的事件
-------------------------------------------------- */
/// <summary>
/// 还原操作
/// </summary>
/// <param name="$treeItem">节点对象</param>
/// <param name="jsonTreeParameter">参数</param>
function reduceTreeItem($treeItem, jsonTreeParameter) {
    var $treeItemLI = $treeItem.children(":first");

    var $btnReduce = $("img[name='reduce']", $treeItemLI);
    $btnReduce.hide();

    var $itemvalue = $("[name='itemvalue']", $treeItemLI);
    var $itemname = $("[name='itemname']", $treeItemLI);
    var $edititemvalue = $("[name='edititemvalue']", $treeItemLI);
    var $edititemname = $("[name='edititemname']", $treeItemLI);

    $itemvalue.text($treeItem.attr("itemValue"));
    $itemname.text($treeItem.attr("itemName"));
    $edititemvalue.val($treeItem.attr("itemValue"));
    $edititemname.val($treeItem.attr("itemName"));

    saveItemData($treeItem);
    saveTree(jsonTreeParameter);
}

/// <summary>
/// 编辑操作
/// </summary>
/// <param name="$treeItem">节点对象</param>
/// <param name="jsonTreeParameter">参数</param>
function editTreeItem($treeItem, jsonTreeParameter) {
    var $treeItemLI = $treeItem.children(":first");

    var $btnReduce = $("img[name='reduce']", $treeItemLI);
    var $btnEdit = $("img[name='edit']", $treeItemLI);
    var $btnDelete = $("img[name='delete']", $treeItemLI);
    var $btnSave = $("img[name='save']", $treeItemLI);
    var $btnCancel = $("img[name='cancel']", $treeItemLI);

    $btnReduce.hide();
    $btnEdit.hide();
    $btnDelete.hide();
    $btnSave.show();
    $btnCancel.show();

    var $divItemTemplate = $("#divItemTemplate", $treeItemLI);
    var $divEditItemTemplate = $("#divEditItemTemplate", $treeItemLI);
    $divItemTemplate.hide();
    $divEditItemTemplate.show();

    var editType = jsonTreeParameter.editType;
    if (editType == "Text") {
        var $edititemname = $("[name='edititemname']", $divEditItemTemplate);
        $edititemname.focus();
    }
    if (editType == "TextValue") {
        var $edititemvalue = $("[name='edititemvalue']", $divEditItemTemplate);
        $edititemvalue.focus();
    }

}

/// <summary>
/// 删除操作
/// </summary>
/// <param name="$treeItem">节点对象</param>
/// <param name="jsonTreeParameter">参数</param>
function deleteTreeItem($treeItem, jsonTreeParameter) {
    var $treeItemLI = $treeItem.children(":first");

    if ($treeItemLI.next().children().length > 0) {
        alert('当前节点下存在子节点,无法删除。');
        return;
    }
    if (confirm('确定删除当前节点吗？')) {
        $treeItem.remove();
    }

    var $hdnCurrentItemLIID = $("#hdnCurrentItemLIID_" + jsonTreeParameter.treeId);
    if ($treeItem.attr("itemid") == $hdnCurrentItemLIID.val()) {
        $hdnCurrentItemLIID.val("");
    }

    saveTree(jsonTreeParameter);
}

/// <summary>
/// 保存操作
/// </summary>
/// <param name="$treeItem">节点对象</param>
/// <param name="jsonTreeParameter">参数</param>
function saveTreeItem($treeItem, jsonTreeParameter) {
    var $treeItemLI = $treeItem.children(":first");

    var $btnReduce = $("img[name='reduce']", $treeItemLI);
    var $btnEdit = $("img[name='edit']", $treeItemLI);
    var $btnDelete = $("img[name='delete']", $treeItemLI);
    var $btnSave = $("img[name='save']", $treeItemLI);
    var $btnCancel = $("img[name='cancel']", $treeItemLI);

    $btnEdit.show();
    $btnDelete.show();
    $btnReduce.hide();
    $btnSave.hide();
    $btnCancel.hide();

    var $divItemTemplate = $("#divItemTemplate", $treeItemLI);
    var $divEditItemTemplate = $("#divEditItemTemplate", $treeItemLI);

    $divItemTemplate.show();
    $divEditItemTemplate.hide();

    var $itemvalue = $("[name='itemvalue']", $treeItemLI);
    var $itemname = $("[name='itemname']", $treeItemLI);
    var $edititemvalue = $("[name='edititemvalue']", $treeItemLI);
    var $edititemname = $("[name='edititemname']", $treeItemLI);

    $itemvalue.text($edititemvalue.val());
    $itemname.text($edititemname.val());

    if (($edititemvalue.val() != $treeItem.attr("itemvalue"))
    || ($edititemname.val() != $treeItem.attr("itemname"))) {
        $btnReduce.show();
    }
    else {
        $btnReduce.hide();
    }

    saveItemData($treeItem);
    saveTree(jsonTreeParameter);
}

/// <summary>
/// 取消操作
/// </summary>
/// <param name="$treeItem">节点对象</param>
/// <param name="jsonTreeParameter">参数</param>
function cancelTreeItem($treeItem, jsonTreeParameter) {
    var $treeItemLI = $treeItem.children(":first");

    var $btnReduce = $("img[name='reduce']", $treeItemLI);
    var $btnEdit = $("img[name='edit']", $treeItemLI);
    var $btnDelete = $("img[name='delete']", $treeItemLI);
    var $btnSave = $("img[name='save']", $treeItemLI);
    var $btnCancel = $("img[name='cancel']", $treeItemLI);

    $btnEdit.show();
    $btnDelete.show();
    $btnReduce.hide();
    $btnSave.hide();
    $btnCancel.hide();

    var $divItemTemplate = $("#divItemTemplate", $treeItemLI);
    var $divEditItemTemplate = $("#divEditItemTemplate", $treeItemLI);

    $divItemTemplate.show();
    $divEditItemTemplate.hide();

    var $itemvalue = $("[name='itemvalue']", $treeItemLI);
    var $itemname = $("[name='itemname']", $treeItemLI);
    var $edititemvalue = $("[name='edititemvalue']", $treeItemLI);
    var $edititemname = $("[name='edititemname']", $treeItemLI);

    $edititemvalue.val($itemvalue.text());
    $edititemname.val($itemname.text());

    if (($edititemvalue.val() != $treeItem.attr("itemvalue"))
    || ($edititemname.val() != $treeItem.attr("itemname"))) {
        $btnReduce.show();
    }
    else {
        $btnReduce.hide();
    }
}

/// <summary>
/// 保存节点项的值
/// 新增节点、保存节点、还原节点
/// </summary>
/// <param name="$treeItem">节点对象</param>
function saveItemData($treeItem) {
    var $treeItemLI = $treeItem.children(":first");

    var $itemvalue = $("[name='itemvalue']", $treeItemLI);
    var $itemname = $("[name='itemname']", $treeItemLI);
    var $checkbox = $(":checkbox", $treeItemLI);
    var $imgitem = $("img[id='imgitem']", $treeItemLI);
    var $hdnItemData = $("#hdnItemData", $treeItemLI);

    var itemId = $treeItem.attr("itemid");
    var parentItemId = $treeItem.attr("parentitemid");
    var level = $treeItem.attr("level");
    var itemValue = $itemvalue.text();
    var itemName = $itemname.text();
    var checked = 0;
    if ($checkbox.length == 0) {
        checked = "0";
    }
    else {
        checked = $checkbox.attr("checked") ? "1" : "0";
    }
    var imgUrl = $imgitem.attr("src");
    var path = $treeItem.attr("path");

    var strData = "";
    strData += itemId + ",";
    strData += parentItemId + ",";
    strData += level + ",";
    strData += itemValue + ",";
    strData += itemName + ",";
    strData += checked + ",";
    strData += imgUrl + ",";
    strData += path + ";";

    $hdnItemData.val(strData);
}

/// <summary>
/// 保存选择的节点项的值
/// 新增节点、保存节点、还原节点
/// </summary>
/// <param name="$treeItem">节点对象</param>
function saveSelectedItemData($treeItem, jsonTreeParameter) {
    var $tree = $("#" + jsonTreeParameter.treeId);
    if ($tree.children().length == 0) return false;

    // 保存当前节点的数据
    var $treeItemLI = null;
    var $hdnItemData = null;
    var strData = "";
    var $parentTreeItem = $treeItem;
    while ($parentTreeItem.parent().attr("id") != jsonTreeParameter.treeId) {

        $treeItemLI = $parentTreeItem.children(":first");
        $hdnItemData = $("#hdnItemData", $treeItemLI);

        strData += $hdnItemData.val();

        $parentTreeItem = $parentTreeItem.parent().parent();
    }
    $treeItemLI = $parentTreeItem.children(":first");
    $hdnItemData = $("#hdnItemData", $treeItemLI);
    strData += $hdnItemData.val();

    var $hdnSelectedItemData = $("#" + jsonTreeParameter.hdnSelectedItemDataID);
    $hdnSelectedItemData.val(strData);
}

/// <summary>
/// 保存选中的节点项的值
/// 新增节点、保存节点、还原节点
/// </summary>
/// <param name="$treeItem">节点对象</param>
function saveCheckedItemData(jsonTreeParameter) {
    var $tree = $("#" + jsonTreeParameter.treeId);
    if ($tree.children().length == 0) return false;

    var strData = "";
    var $treeItems = $("div[itemid]", $tree);
    $treeItems.each(function(i, item) {
        var $treeItem = $(item);
        var $treeItemLI = $treeItem.children(":first");
        var $checkbox = $(":checkbox", $treeItemLI);
        var $hdnItemData = $("#hdnItemData", $treeItemLI);

        if ($checkbox.length > 0 && $checkbox.attr("checked")) {
            strData += $hdnItemData.val();
        }
    });

    $("#" + jsonTreeParameter.hdnCheckedItemDataID).val(strData);
}

/// <summary>
/// 保存Tree数据
/// </summary>
/// <param name="jsonTreeParameter">参数</param>
/// <remarks>
/// 遍历每一个节点，从hdnItemData获取节点的值，拼接后保存到hdnTreeData
/// </remarks>
function saveTree(jsonTreeParameter) {
    var $tree = $("#" + jsonTreeParameter.treeId);

    var strData = "";
    var $treeItems = $("div[itemid]", $tree);
    $treeItems.each(function(i, item) {
        var $treeItem = $(item);
        var $treeItemLI = $treeItem.children(":first");
        var $hdnItemData = $("#hdnItemData", $treeItemLI);
        strData += $hdnItemData.val();
    });
    var $hdnTreeData = $("#" + jsonTreeParameter.hdnTreeDataID);
    $hdnTreeData.val(strData);

    return true;
}

/// <summary>
/// 获取新节点的Json对象
/// </summary>
/// <return>
/// 新节点的Json对象
/// </return>
function getNewTreeItemJsonData() {
    // 节点信息
    var itemId = getYYYYMMDDHHMMSSFFF();
    var parentItemId = "-1";
    var level = "1";
    var itemName = "新建节点";
    var itemValue = "";
    var checked = "False";
    var imgUrl = "";
    var path = "";
    var children = "[]";

    var strTreeItem = "";
    strTreeItem += "[{";
    strTreeItem += "\"ItemId\":";
    strTreeItem += "\"" + itemId + "\",";
    strTreeItem += "\"ParentItemId\":";
    strTreeItem += "\"" + parentItemId + "\",";
    strTreeItem += "\"Level\":";
    strTreeItem += "\"" + level + "\",";
    strTreeItem += "\"ItemValue\":";
    strTreeItem += "\"" + itemValue + "\",";
    strTreeItem += "\"ItemName\":";
    strTreeItem += "\"" + itemName + "\",";
    strTreeItem += "\"Checked\":";
    strTreeItem += "\"" + checked + "\",";
    strTreeItem += "\"ImgUrl\":";
    strTreeItem += "\"" + imgUrl + "\",";
    strTreeItem += "\"Path\":";
    strTreeItem += "\"" + path + "\",";
    strTreeItem += "\"Children\":";
    strTreeItem += children;
    strTreeItem += "}]";

    return eval(strTreeItem)[0];
}

function getYYYYMMDDHHMMSSFFF() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    var millisecond = today.getMilliseconds();

    year = String(year);
    month = String(month <= 9 ? "0" + month : month);
    day = String(day <= 9 ? "0" + day : day);
    hour = String(hour <= 9 ? "0" + hour : hour);
    minute = String(minute <= 9 ? "0" + minute : minute);
    second = String(second <= 9 ? "0" + second : second);
    millisecond = String(millisecond <= 9 ? "00" + millisecond : millisecond <= 99 ? "0" + millisecond : millisecond);

    return year + month + day + hour + minute + second + millisecond;
}