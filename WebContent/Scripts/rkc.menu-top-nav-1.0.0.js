/* --------------------------------------------------
// 说明
// --------------------------------------------------
// 2013/11/13 by zhangh
// 因menu结构的调整，重写js；
// top-nav不再考虑无限层级，仅设计2层；
// 考虑li不复杂且不经常变更，html中不再保留li模板，而直接用js生成；
//

// 结构
// --------------------------------------------------
<ul class="nav">
    <li class="active"><a href="#">Home</a></li>
    <li><a href="#">Profile</a></li>
    <li class="disabled"><a href="#">Disabled</a></li>
    <li class="dropdown"><a>Dropdown
        <span class="caret"></span></a>
        <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
        </ul>
    </li>
</ul>

// 数据
// --------------------------------------------------
// 异步请求菜单数据，返回Json形式的数据，格式如下：
[{"itemId":""
,"parentItemId":""
,"itemName":""
,"itemValue":""
,"sort":""
,"imgUrl":""
,"url":""
,"remarks":""
,"level":""
,"class":""
,"checked":""
,"path":""
,"children":[]
}]
// 注：项目中的属性并非全部使用（其他控件可能使用），为了开发统一，不要省略；
// 数据本身是嵌套的，根据children[]反映层次关系；
//
-------------------------------------------------- */

// 加载菜单
function initMenu(divMenuId, menuDataHandler, selectedItemId) {

    // 参数判断
    if(divMenuId == "" || menuDataHandler == "")
        return;

    // 将参数构成能够Json对象
    var strParameter = "";
    strParameter += "[{";
    strParameter += "\"divMenuId\":";
    strParameter += "\"" + divMenuId + "\",";
    strParameter += "\"menuDataHandler\":";
    strParameter += "\"" + menuDataHandler + "\",";
    strParameter += "\"selectedItemId\":";
    strParameter += "\"" + selectedItemId + "\"";
    strParameter += "}]";

    var jsonParameter = eval(strParameter)[0];

    // 获取菜单数据
    $.ajax({
        type: "get",
        cache: false,
        url: jsonParameter.menuDataHandler,
        dataType: "json",
        success: function (data) {

            // 数据不存在时提示
            if(data==null || data == undefined){
                return;
            }

            // 获取menu所在的div
            var $divMenu = $("#" + jsonParameter.divMenuId);

            // menu div不存在时提示
            if($divMenu.length==0){
                alert("menu div isn't exists!");
                return;
            }

            $divMenu.html("");

            // 创建第一层ul
            var strUl = "<ul class='top-nav'>";
            var $ul = $(strUl);
            $ul.appendTo($divMenu);

            // 遍历创建第一层li
            $.each(data, function (i, jsonDataItem) {
                makeItem(jsonDataItem, $ul, 1, jsonParameter);
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}

function makeItem(jsonDataItem, $parentItem, level, jsonParameter) {
    var $li = createItem(jsonDataItem, level, jsonParameter);
    $parentItem.append($li);
    if (jsonDataItem.children.length > 0) {
        level++;
        $.each(jsonDataItem.children, function (i, jsonChildDataItem) {
            makeItem(jsonChildDataItem, $li.children().last(), level, jsonParameter);
        });
    }
}

function createItem(jsonDataItem, level, jsonParameter) {
    var $divMenu = $("#" + jsonParameter.divMenuId);

    // 获取属性值
    var itemId = jsonDataItem.itemId;
    var parentItemId = jsonDataItem.parentItemId;
    var itemName = jsonDataItem.itemName;
    var itemValue = jsonDataItem.itemValue;
    var strSort = jsonDataItem.sort;
    var imgUrl = jsonDataItem.imgUrl;
    var url = jsonDataItem.url;
    var children = jsonDataItem.children;
    var hasChild = children.length > 0;

    // --------------------------------------------------
    // 创建li
    var $li = $("<li></li>");

    // 如果没有名称则作为divider处理
    if(itemName == ""){
        $li.addClass("divider");
        return $li;
    }

    // 设置level
    $li.attr("level", level);

    // 设置class active
    if(jsonParameter.selectedItemId == itemId){
        $li.addClass("active");
    }

    // 设置class dropdown
    if(hasChild){
        $li.addClass("dropdown");

        // 点击事件
        $li.click(function(){
            // 收起同级其他节点及其子节点的下拉框
            var $siblings = $li.siblings();
            $.each($siblings, function(i, item){
                $(item).removeClass("open");
                $(".dropdown", $(item)).removeClass("open");
            });

            $(this).toggleClass("open");
            return false;
        });
    }

    if(!hasChild){

        // 点击事件
        $li.click(function(){
            // 取消已激活的项目
            $("li", $divMenu).removeClass("active");

            // 自己激活
            $(this).addClass("active");

            // 收起所有下拉框
            $(".dropdown", $divMenu).removeClass("open");
            return false;
        });
    }

    // --------------------------------------------------
    // 创建a
    var $a = $("<a></a>");

    // 设置文本
    $a.text(itemName+" ");

    // 设置href
    if(url != ""){
        $a.click(function(){
            redirect(url);
        });
        //$a.attr("href", url);
    }

    // 设置caret
    if(hasChild){
        var $caret = $("<span class='dropdown-arror'></span>");
        $a.append($caret);
    }

    // 添加到li
    $li.append($a);

    // --------------------------------------------------
    // 创建child ul
    if(hasChild){
        var $childUl = $("<ul class='dropdown-menu'></ul>");
        $li.append($childUl);
    }
    // --------------------------------------------------

    return $li;
}
$(function(){
    $(document.body).click(function(){
        $(".dropdown").removeClass("open");
    });
});