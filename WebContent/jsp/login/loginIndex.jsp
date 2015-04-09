<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Rakuchi Soft</title>
        <link href="<%=request.getContextPath() %>/Styles/rkc-darkgreen.css" rel="stylesheet" type="text/css" />
        <script src="<%=request.getContextPath() %>/Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
        <script src="<%=request.getContextPath() %>/Scripts/rkc.common-1.0.0.js" type="text/javascript"></script>
        <script src="<%=request.getContextPath() %>/Scripts/rkc.validate-1.0.0.js" type="text/javascript"></script>
        <script src="<%=request.getContextPath() %>/Scripts/rkc.div.layout-1.0.0.js" type="text/javascript"></script>
        <script src="<%=request.getContextPath() %>/Scripts/rkc.message-1.0.0.js" type="text/javascript"></script>
        <script src="<%=request.getContextPath() %>/Scripts/login.js" type="text/javascript"></script>
        <script language="javascript" type="text/javascript">
            var arrLayout =
            [
                { id: "divContainer", width: "auto", height: "auto", overflow: "hidden", childFloat: "v", children: [
                    { id: "divTop", width: "auto", height: "auto", overflow: "hidden", childFloat: "", children: [] },
                    { id: "divMiddle", width: "auto", height: "202", overflow: "hidden", childFloat: "h", children: [] },
                    { id: "divBottom", width: "auto", height: "auto", overflow: "hidden", childFloat: "", children: [] }
                    ]
                }
            ];

            $(function() {

                // 初始化布局
                initLayout(arrLayout);
                $(window).resize(function() {
                    initLayout(arrLayout);
                });

                if ($("#userCode").val() == "") {
                    $("#userCode").focus();
                }
                else if ($("#userPwd").val() == "") {
                        $("#userPwd").focus();
                }
            });
        </script>
    </head>
    <body>
        <s:form action="loginAction" id="loginForm" namespace="/login">
            <div id="divContainer" style="background-color: #fff;">
                <div id="divTop">
                    <h4 style="height: 2px; background-color: #017159;"></h4>
                        <div style="width: 530px; height: 150px; margin: 0 auto; background-color: #fff; position: relative;">
                            <div style="height: 180px; width: 180px; position: absolute; left: 20px; top: 20px; background-repeat: no-repeat;">
                                &nbsp;
                            </div>
                            <div style="height: 150px; position: absolute; left: 180px; top: 15px; background-color: #fff;">
                            </div>
                        </div>
                </div>
                <div id="divMiddle">
                    <div style="width: 530px; height: 150px; margin: 0 auto; background-color: #fff;
                        position: relative;">
                        <div style="height: 180px; width: 180px; position: absolute; left: 20px; top: 20px;
                            background-image: url('<%=request.getContextPath() %>/Images/Login/Rakuchi_run.gif'); background-repeat: no-repeat;">
                            &nbsp;
                        </div>
                        <div style="height: 150px; position: absolute; left: 180px; top: 15px; background-color: #fff;">
                            <table cellpadding="0" cellspacing="0" border="0" style="height: 100%;">
                                <tr>
                                    <td align="right" colspan="2">
                                        <span style="color: #007d63; font-size: 12px; padding-top: 10px;">系统登录</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right" valign="middle" class="nowrap">
                                        <strong><span>用户名：</span></strong>
                                    </td>
                                    <td align="left" valign="middle" class="nowrap">
                                        <s:textfield name="userCode" maxlength="20" cssClass="form-control primary width200"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right" valign="middle" class="nowrap" style="padding-left: 10px;">
                                        <strong><span>密码：</span></strong>
                                    </td>
                                    <td align="left" valign="middle" class="nowrap">
                                        <s:password name="userPwd" maxlength="20" cssClass="form-control primary width200"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right" valign="middle" class="nowrap" style="padding-left: 10px;" colspan="2">
                                        <table>
                                            <tr>
                                                <td>
                                                    <input type="button" value="注册" class="btn btn-link"/>
                                                </td>
                                                <td>
                                                    <input type="button" value="忘记密码" class="btn btn-link"/>
                                                </td>
                                                <td>
                                                    <s:submit value="登陆" cssClass="btn btn-primary w-80"/>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="divBottom" style="text-align: center;">
                </div>
            </div>
        </s:form>
    </body>
<s:if test="hasActionMessages()">
  <script language="JavaScript">
    var msg = '';
    <s:iterator value="actionMessages">
           msg=msg+'<s:property/>'+'&&';
    </s:iterator>
    showMessage(msg,"Info");
  </script>
</s:if>
<s:if test="hasActionErrors()">
  <script language="JavaScript">
    var error = '';
    <s:iterator value="actionErrors">
        error=error+'<s:property/>'+'&&';
    </s:iterator>
    showMessage(error,"Error");
  </script>
</s:if>
<s:if test="hasFieldErrors()">
 <script language="JavaScript">
   var fieldErrors = '';
   <s:iterator value="fieldErrors">
     <s:iterator value="value">
         fieldErrors=fieldErrors+'<s:property/>'+'&&';
     </s:iterator>
   </s:iterator>
   showMessage(fieldErrors,"Alert");
 </script>
</s:if>
</html>
