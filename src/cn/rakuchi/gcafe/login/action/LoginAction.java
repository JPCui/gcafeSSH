package cn.rakuchi.gcafe.login.action;

import cn.rakuchi.fw.service.BLogicResult;
import cn.rakuchi.fw.struts.action.AbstractBLogicAction;
import cn.rakuchi.gcafe.commons.constants.Constants;
import cn.rakuchi.gcafe.login.dto.LoginBLInputDTO;
import cn.rakuchi.gcafe.login.dto.LoginBLOutputDTO;

import com.opensymphony.xwork2.ActionContext;

public class LoginAction extends AbstractBLogicAction<LoginBLInputDTO> {

    /**
     * 序列化
     */
    private static final long serialVersionUID = -4802536320276663548L;

    /**
     * 用户名. <br>
     */
    private String userCode = "";

    /**
     * 设定用户名. <br>
     *
     * @param userCode 用户名
     */
    public void setUserCode(String userCode) {

        this.userCode = userCode;
    }

    /**
     * 取得用户名. <br>
     *
     * @return 用户名
     */
    public String getUserCode() {

        return userCode;
    }

    /**
     * 密码. <br>
     */
    private String userPwd = "";

    /**
     * 设定密码. <br>
     *
     * @param userPwd 密码
     */
    public void setUserPwd(String userPwd) {

        this.userPwd = userPwd;
    }

    /**
     * 取得密码. <br>
     *
     * @return 密码
     */
    public String getUserPwd() {

        return userPwd;
    }

    /**
     * 将页面的值传给业务层
     * @return 业务用对象
     */
    protected LoginBLInputDTO getBLogicParams() throws Exception {

        // 初期化业务输入对象
        LoginBLInputDTO loginBLInputDTO = new LoginBLInputDTO();
        loginBLInputDTO.setUserCd(userCode);
        loginBLInputDTO.setUserPwd(userPwd);
        return loginBLInputDTO;
    }

    /**
     * 业务返回结果设置到页面
     * @param result 业务处理结果
     */
    protected void processBLogicResult(BLogicResult result) {

        // 设置用户信息到Session
        LoginBLOutputDTO out = (LoginBLOutputDTO)result.getObject();
        ActionContext actionContext = ActionContext.getContext();
        actionContext.getSession().put(
                Constants.USER_VALUE_OBJECT, out.getUvo());
    }

    /**
     * 页面验证
     */
    public void validate() {

        // 清除现有消息
        clearErrorsAndMessages();

        // 判断用户名密码是否为空
        if (Constants.BLANK.equals(userCode.trim())) {
            this.addFieldError("userCode", "用户名不能为空！");
        }
        if (Constants.BLANK.equals(userPwd.trim())) {
            this.addFieldError("userPwd", "密码不能为空！");
        }
    }
}
