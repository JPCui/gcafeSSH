// 加载菜单
function initMenu(jsonParameter) {
    $.ajax({
        type: "get",
        cache: false,
        url: jsonParameter.menuDataHandler,
        dataType: "json",
        success: function (data) {
            var $ulMenu = $("#" + jsonParameter.menuId);
            $.each(data, function (i, jsonMenuItem) {
                createMenu(jsonMenuItem, $ulMenu, 1, jsonParameter);
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}

function createMenu(jsonMenuItem, $parentItem, level, jsonParameter) {

    var $menuItem = createMenuItem(jsonMenuItem, level, jsonParameter);
    $parentItem.append($menuItem);

    if (jsonMenuItem.Children.length > 0) {
        level++;
        $.each(jsonMenuItem.Children, function (i, jsonTreeChildItem) {
            createMenu(jsonTreeChildItem, $menuItem.children().last(), level, jsonParameter);
        });
    }
}
function createMenuItem(jsonMenuItem, level, jsonParameter) {
    var menuId = jsonParameter.menuId;

    var itemId = jsonMenuItem.ItemId;
    var parentItemId = jsonMenuItem.ParentItemId;
    var itemName = jsonMenuItem.ItemName;
    var itemValue = jsonMenuItem.ItemValue;
    var strSort = jsonMenuItem.Sort;
    var imgUrl = jsonMenuItem.ImgUrl;
    var url = jsonMenuItem.Url;
    var children = jsonMenuItem.Children;
    var hasChild = children.length > 0;

    var $menuItem = $("#" + menuId + "_Item_Template").children(":first").clone();
    $menuItem.attr("itemId", itemId);
    $menuItem.attr("parentItemId", parentItemId);
    $menuItem.attr("itemName", itemName);
    $menuItem.attr("itemValue", itemValue);
    $menuItem.attr("level", level);

    var $menuItemLI = $menuItem;
    var $menuItemUL = $menuItemLI.children(":last");

    var $imgspace = $("#imgSpace", $menuItemLI);
    var $imgExpend = $("#imgExpend", $menuItemLI);
    var $content = $("label", $menuItemLI);

    // space
    var imgSpaceWidth = 12 * (level - 1);
    $imgspace.css("width", imgSpaceWidth);
    $imgspace.css("height", "1px");

    $content.text(itemName);
    
    if(itemName==jsonParameter.selectedMenuName){
        $content.css("color","#0033CC");
    }

    if (!hasChild) {
        $imgExpend.hide();
        $menuItemUL.hide();
    }
    // 设置第一层折叠图标
    if (hasChild && level == 1) {
        $menuItem.addClass("lvl1");
        $imgExpend.show();
        if($menuItemUL.css("display")=="none"){
            $imgExpend.attr("src", "../Images/Common/down.gif");
        }
        else{
            $imgExpend.attr("src", "../Images/Common/up.gif");
        }
        $imgExpend.attr("align", "middle");
    }

//    // 设置第二层及以后层的折叠图标
//    if (hasChild && level >= 2) {
//        $imgExpend.show();
//        $imgExpend.attr("src", "../Images/Common/expand2.png");
//        $imgExpend.attr("align", "middle");
//    }

    if (hasChild) {
        $content.click(function () {
            if ($menuItemUL.css("display")=="none") {
                $menuItemUL.show();
                $menuItemUL.slideDown("fast");
                if (level == 1) {
                    $imgExpend.attr("src", "../Images/Common/up.gif");
                }
//                if (level >= 2) {
//                    $imgExpend.attr("src", "../Images/Common/expand2.png");
//                }
            }
            else {
                $menuItemUL.slideUp("fast");
                $menuItemUL.hide();
                
                if (level == 1) {
                    $imgExpend.attr("src", "../Images/Common/down.gif");
                }
//                if (level >= 2) {
//                    $imgExpend.attr("src", "../Images/Common/unexpand2.png");
//                }
            }
            return false;
        });
    }

    // 点击菜单后，
    if (!hasChild) {
        $content.click(function () {
            // 打开页面
            //$("#frmContent").attr("src", url);
            redirect(url);
        });
    }
    return $menuItem;
}