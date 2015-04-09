<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%@ include file="../commons/header.jsp"%>
<form id="welcome">
    <br />
    <h2>欢迎光临</h2>
    <h4 class="line"></h4>
    <table type="detail" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <span>您可以做以下操作：</span>
            </td>
        </tr>
    </table>
    <h4 class="line"/>
    &nbsp;
    <table type="detail" cellpadding="0" cellspacing="0">
        <tr>
            <td>&nbsp;&nbsp;店面---店面、部门、操作员</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;供货商及商品---供货商、供货商操作员、商品及分类</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;订单---订单管理</td>
        </tr>
        <tr>
            <td>管理员：</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;统计分析---统计分析（总店）、综合查询（总店）</td>
        </tr>
        <tr>
            <td>加盟店：</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;下单---下单、购物车、订单列表</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;统计分析--统计分析（店面）</td>
        </tr>
        <tr>
            <td>供货商：</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;统计分析--统计分析（供货商）</td>
        </tr>
    </table>
</form>
<%@ include file="../commons/footer.jsp"%>