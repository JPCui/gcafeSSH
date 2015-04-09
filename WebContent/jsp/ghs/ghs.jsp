<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%@ include file="../commons/header.jsp"%>
<script language="javascript" type="text/javascript">
function pageValid() {
    if(!valGhsCd()) return false;
    if(!valGhsClassifyCd()) return false;
    if(!valGhsName()) return false;
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

    $("#ghsForm").attr("action", "<%=request.getContextPath() %>/ghs/save.do");
    return true;
}
function valGhsCd() {
    var $element = $("input[id$='txtGhsCd']");
    // 为空判断
    if($element.val() == ""
        || $element.val() == $element.attr("default-value")){
        showMessage("供货商编号不能为空。","Alert");

        return false;
    }

    // 长度判断
    if($element.val().length>50) {
        showMessage("供货商编号不能超过50个字符。","Alert");

        return false;
    }

    return true;
}
// 验证input：供货商所属类型
function valGhsClassifyCd() {
    var $element = $("input[name='ghsInfo.ghsClassifyCd']:checked");

    // 为空判断
    if($element.val() == ""
        || $element.val() == $element.attr("default-value")) {
        showMessage("请选择供货商所属类型。","Alert");

        gotoTop();
        return false;
    }
    return true;
}
// 验证input：供货商名称
function valGhsName() {
    var $element = $("input[id$='txtGhsName']");

    // 为空判断
    if($element.val() == ""
        || $element.val() == $element.attr("default-value")) {
        showMessage("供货商名称不能为空。","Alert");

        gotoTop();
        return false;
    }

    // 长度判断
    if($element.val().length>100) {
        showMessage("供货商名称不能超过100个字符。","Alert");

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
function onRemove(ghsCd, ghsClassifyCd) {
    $("#ghsForm").attr("action", "<%=request.getContextPath() %>/ghs/remove.do");
    $("#hdnGhsCd").attr("value" , ghsCd);
    $("#hdnGhsClassifyCd").attr("value" , ghsClassifyCd);
    return confirm("确定要删除供货商(" + ghsCd + "," + ghsClassifyCd + ")吗？该操作将同时删除供货商下部门、操作员、购物车中相关信息。");
}

// 编辑
function onEdit(ghsCd, ghsClassifyCd, validFlag) {
	$("#hdnGhsCd").attr("value" , ghsCd);
	$("#hdnGhsClassifyCd").attr("value" , ghsClassifyCd);
	$("#hdnValidFlag").attr("value" , validFlag);
	$("#ghsForm").attr("action", "<%=request.getContextPath() %>/ghs/edit.do");
}

/**
 * 修改有效标记. <br>
 */
function onUpdateValidFlag(ghsCd, ghsClassifyCd, validFlag) {
 $("#hdnGhsCd").attr("value" , ghsCd);
 $("#hdnGhsClassifyCd").attr("value" , ghsClassifyCd);
 $("#hdnValidFlag").attr("value" , validFlag);
 
 $("#ghsForm").attr("action", "<%=request.getContextPath() %>/ghs/updateValidFlag.do");
}
</script>
<s:form action="show" id="ghsForm" namespace="/ghs">
    <br />
    <h2>供货商管理</h2>
    <h4 class="line"></h4>
    <table type="detail" cellpadding="0" cellspacing="0">
        <tr>
            <td class="info nowrap">
                <label>供货商编号</label>
            </td>
            <td class="item nowrap">
                <s:textfield name="ghsInfo.ghsCd" maxlength="50" id="txtGhsCd" cssClass="form-control primary w-100" />
            </td>
            <td class="info nowrap">
                <label>供货商名称</label>
            </td>
            <td class="item nowrap" align="left">
                <s:textfield name="ghsInfo.ghsName" maxlength="100" id="txtGhsName" cssClass="form-control primary" />
            </td>
        </tr>
        <tr>
            <td class="info">
                <label>
                    备注</label>
            </td>
            <td class="item nowrap" colspan="3">
                <s:textarea id="txtRemarks" name="ghsInfo.remarks" rows="3" cols="20"  cssClass="form-control primary"/>
            </td>
        </tr>
        <tr>
            <td class="item nowrap" colspan="2">
            	<input type="radio" value="00" id="radioClassify01" name="ghsInfo.ghsClassifyCd">
            	<label for="radioClassify00">全部</label>
                <s:radio id="radioClassify" name="ghsInfo.ghsClassifyCd" list="#{'01':'直营店','02':'加盟店'}" value="ghsInfo.ghsClassifyCd" />
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
                <span>供货商编号</span>
            </td>
            <td>
                <span>供货商名称</span>
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
        <s:iterator value="ghsList" id="ghsInfo">
        <tr>
            <td class="item nowrap">
                <div style="width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                    overflow: hidden;">
                    <span title="<s:property value="ghsCd"/>"><s:property value="ghsCd"/></span>
                </div>
            </td>
            <td class="item nowrap">
                <div style="width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                    overflow: hidden;">
                    <span title="<s:property value="ghsName"/>"><s:property value="ghsName"/></span>
                </div>
            </td>
            <td class="item nowrap">
                <div style="width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                    overflow: hidden;">
                    <s:if test="#ghsInfo.ghsClassifyCd == '01'">
                        <span title="直营店">直营店</span>
                    </s:if>
                    <s:if test="#ghsInfo.ghsClassifyCd == '02'">
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
                <s:if test="#ghsInfo.validFlag == 0">
                    <input id="btnFlag" type="submit" name="btnFlag" value="启用" onclick="onUpdateValidFlag('<s:property value="ghsCd"/>','<s:property value="ghsClassifyCd"/>','1');" class="btn btn-link" />
                </s:if>
                <s:if test="#ghsInfo.validFlag != 0">
                    <input id="btnFlag" type="submit" name="btnFlag" value="禁用" onclick="onUpdateValidFlag('<s:property value="ghsCd"/>','<s:property value="ghsClassifyCd"/>','0');" class="btn btn-link" />
	                <!-- 启用状态下的操作 -->
	                <s:if test="#ghsInfo.ghsClassifyCd != '00'">
	                    <input id="btnEdit" type="submit" name="btnEdit" value="编辑" onclick="onEdit('<s:property value="ghsCd"/>','<s:property value="ghsClassifyCd"/>','<s:property value="validFlag"/>');" class="btn btn-link" />
	                    <input id="btnDelete" type="submit" name="btnRemove" value="删除" onclick="return onRemove('<s:property value="ghsCd"/>','<s:property value="ghsClassifyCd"/>');" class="btn btn-link" />
	                </s:if>
                </s:if>
                <input id="btnGhsDept" type="button" value="操作员管理" class="btn btn-link" />
            </td>
        </tr>
        </s:iterator>
    </table>
    <div>
        <s:hidden id="hdnGhsCd" name="hdnGhsCd"/>
        <s:hidden id="hdnGhsClassifyCd" name="hdnGhsClassifyCd"/>
        <s:hidden id="hdnValidFlag" name="hdnValidFlag"/>
        <s:hidden id="validFlag" name="ghsInfo.validFlag"/>
    </div>
</s:form>
<%@ include file="../commons/footer.jsp"%>