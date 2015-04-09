<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>绿茵阁</title>
    <link href="<%=request.getContextPath() %>/Styles/rkc-darkgreen.css" rel="stylesheet" type="text/css" />
    <script src="<%=request.getContextPath() %>/Scripts/jquery-1.4.1.min.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath() %>/Scripts/rkc.common-1.0.0.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath() %>/Scripts/rkc.message-1.0.0.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath() %>/Scripts/rkc.validate-1.0.0.js" type="text/javascript"></script>
    <script src="<%=request.getContextPath() %>/Scripts/rkc.menu-top-nav-1.0.0.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
    function logout(){
        if(confirm("确定要退出系统吗？")){
            window.location.href = "<%=request.getContextPath() %>/logout.do";
        }
    }
    function clearValue(){
        // 清空默认值
        $.each($("input[type='text'],textarea"),function(i,item){
            var $element = $(item);

            if($element.attr("default-value") != undefined
                && $element.attr("default-value") != ""){
                $element.val($element.attr("default-value"));
            }
            else{
                $element.val("");
            }
        });

        $(":radio:first").attr("checked",true);
    }
    </script>
</head>
<body>
    <div class="row w-960">
        <div class="col-10 col-begin" >
            <div style="width: 100px; float: left;">
                <img src="<%=request.getContextPath() %>/Images/Main/logo_min2.jpg" alt="" />
            </div>
            <div id="topNavBar1" ></div>
            <script language="javascript" type="text/javascript">
                  $(function () {
                      initMenu('topNavBar1','<%=request.getContextPath() %>/login/menuHandlerAction.do','');
                  });
            </script>
            <br />
        </div>
        <div class="col-2 col-end">
            <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr>
                    <td align="right" style="width: 100px;">
                        <span id="lblLoginInfo"><s:property value="%{#session.uvo.userName}"/></span>
                        <input type="button" value="退出" onclick="logout();" class="btn btn-link" />
                    </td>
                </tr>
            </table>
        </div>
      </div>
      <div class="row w-960">
        <div class="col-12">
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