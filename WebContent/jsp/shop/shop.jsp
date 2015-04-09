<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%@ include file="../commons/header.jsp"%>
<script language="javascript" type="text/javascript">
function pageValid() {
    if(!valShopCd()) return false;
    if(!valShopName()) return false;
    if(!valRemarks()) return false;
    // 清空默认值
    $.each($("input[type='text'],textarea"),function(i,item){
        var $element = $(item);
        if($element.attr("default-value") != undefined
            && $element.attr("default-value") != ""
            && $element.attr("default-value") == $element.val()){
                $element.val("");
            }
    });

    $("#shopForm").attr("action", "<%=request.getContextPath() %>/shop/save.do");
    return true;
}
function valShopCd() {
    var $element = $("input[id$='txtShopCd']");
    // 为空判断
    if($element.val() == ""
        || $element.val() == $element.attr("default-value")){
        showMessage("店面编号不能为空。","Alert");

        return false;
    }

    // 长度判断
    if($element.val().length>50) {
        showMessage("店面编号不能超过50个字符。","Alert");

        return false;
    }

    // 总店判断
    if($element.val() == "0000") {
        showMessage("总店不允许删改。","Alert");

        return false;
    }
    return true;
}
function valShopName() {
    var $element = $("input[id$='txtShopName']");

    // 为空判断
    if($element.val() == ""
        || $element.val() == $element.attr("default-value")) {
        showMessage("店面名称不能为空。","Alert");

        gotoTop();
        return false;
    }

    // 长度判断
    if($element.val().length>100) {
        showMessage("店面名称不能超过100个字符。","Alert");

        gotoTop();
        return false;
    }
    return true;
}
function valRemarks() {
    var $element = $("textarea[id$='txtRemarks']");

    // 长度判断
    if($element.val().length>500){
        showMessage("备注不能超过500个字符。","Alert");

        return false;
    }
    return true;
}

// 删除前提示
function onRemove(shopCd) {
    $("#shopForm").attr("action", "<%=request.getContextPath() %>/shop/remove.do");
    $("#hdnShopCd").attr("value" , shopCd);
    return confirm("确定要删除店面" + $("#hdnShopCd").val() + "吗？该操作将同时删除店面下部门、操作员、购物车中相关信息。");
}

// 编辑
function onEdit(shopCd) {
    $("#hdnShopCd").attr("value" , shopCd);
    $("#shopForm").attr("action", "<%=request.getContextPath() %>/shop/edit.do");
}
</script>
<s:form action="show" id="shopForm" namespace="/shop">
    <br />
    <h2>店面管理</h2>
    <h4 class="line"></h4>
    <table type="detail" cellpadding="0" cellspacing="0">
        <tr>
            <td class="info nowrap">
                <label>店面编号</label>
            </td>
            <td class="item nowrap">
                <s:textfield name="shopInfo.shopCd" maxlength="50" id="txtShopCd" cssClass="form-control primary w-100" />
            </td>
            <td class="info nowrap">
                <label>店面名称</label>
            </td>
            <td class="item nowrap" align="left">
                <s:textfield name="shopInfo.shopName" maxlength="100" id="txtShopName" cssClass="form-control primary" />
            </td>
        </tr>
        <tr>
            <td class="info">
                <label>
                    备注</label>
            </td>
            <td class="item nowrap" colspan="3">
                <s:textarea id="txtRemarks" name="shopInfo.remarks" rows="3" cols="20"  cssClass="form-control primary"/>
            </td>
        </tr>
        <tr>
            <td class="item nowrap" colspan="2">
                <s:radio id="radioClassify" name="shopInfo.classify" list="#{'01':'直营店','02':'加盟店'}" value="shopInfo.classify" />
            </td>
            <td class="item nowrap" align="right" colspan="2">
                <s:submit id="btnSave" name="btnSave" value="保存" onclick="return pageValid();" cssClass="btn btn-primary w-60" />
                <input id="btnClear" name="btnClear" value="清空"  type="button" onclick="clearValue();" class="btn btn-default w-60" />
            </td>
        </tr>
    </table>
    <h4 class="line"></h4>
    <table type="grid" cellpadding="0" cellspacing="0">
        <tr class="head">
            <td>
                <span>店面编号</span>
            </td>
            <td>
                <span>店面名称</span>
            </td>
            <td>
                <span>性质</span>
            </td>
            <td>
                <span>备注</span>
            </td>
            <td>
                <span>操作</span>
            </td>
        </tr>
        <s:iterator value="shopList" id="shopInfo">
        <tr>
            <td class="item nowrap">
                <div style="width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                    overflow: hidden;">
                    <span title="<s:property value="shopCd"/>"><s:property value="shopCd"/></span>
                </div>
            </td>
            <td class="item nowrap">
                <div style="width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                    overflow: hidden;">
                    <span title="<s:property value="shopName"/>"><s:property value="shopName"/></span>
                </div>
            </td>
            <td class="item nowrap">
                <div style="width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                    overflow: hidden;">
                    <s:if test="#shopInfo.classify == '01'">
                        <span title="直营店">直营店</span>
                    </s:if>
                    <s:if test="#shopInfo.classify == '02'">
                        <span title="加盟店">加盟店</span>
                    </s:if>
                </div>
            </td>
            <td class="item nowrap">
                <div style="width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                    overflow: hidden;">
                    <span title="<s:property value="remarks"/>"><s:property value="remarks"/></span>
                </div>
            </td>
            <td class="item nowrap">
                <s:if test="#shopInfo.classify != '00'">
                    <input id="btnEdit" type="submit" name="btnEdit" value="编辑" onclick="onEdit('<s:property value="shopCd"/>');" class="btn btn-link" />
                    <input id="btnDelete" type="submit" name="btnRemove" value="删除" onclick="return onRemove('<s:property value="shopCd"/>');" class="btn btn-link" />
                </s:if>
                <input id="btnShopDept" type="button" value="部门管理" onclick="gotoShopDept(<s:property value="shopCd"/>);" class="btn btn-link" />
            </td>
        </tr>
        </s:iterator>
    </table>
    <div>
        <s:hidden id="hdnShopCd" name="hdnShopCd"/>
    </div>
</s:form>
<%@ include file="../commons/footer.jsp"%>