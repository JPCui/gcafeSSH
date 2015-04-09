package cn.rakuchi.gcafe.login.bLogic;

import org.springframework.beans.BeanUtils;

import cn.rakuchi.fw.commons.dto.UserValueObject;
import cn.rakuchi.fw.service.BLogic;
import cn.rakuchi.fw.service.BLogicMessage;
import cn.rakuchi.fw.service.BLogicMessages;
import cn.rakuchi.fw.service.BLogicResult;
import cn.rakuchi.gcafe.commons.constants.Constants;
import cn.rakuchi.gcafe.commons.uvo.UserInfoUVO;
import cn.rakuchi.gcafe.login.dLogic.LoginDLogic;
import cn.rakuchi.gcafe.login.dto.LoginBLInputDTO;
import cn.rakuchi.gcafe.login.dto.LoginBLOutputDTO;
import cn.rakuchi.gcafe.login.dto.LoginDLInputDTO;
import cn.rakuchi.gcafe.login.dto.LoginDLOutputDTO;

public class LoginBLogicImpl implements BLogic<LoginBLInputDTO> {

    /**
     * 登陆失败时
     */
    private static final String LOGIN_FAILURE = "loginFailure";

    /**
     * 登陆失败时
     */
    private static final String MSG_LOGIN_FAILURE = "用户不存在或密码不正确！";

    /**
     * 登录用DLogic. <br>
     */
    private LoginDLogic loginDLogic;

    /**
     * 设定登录用DLogic. <br>
     *
     * @param loginDLogic 登录用DLogic
     */
    public void setLoginDLogic(LoginDLogic loginDLogic) {

        this.loginDLogic = loginDLogic;
    }

    /**
     * 执行登录处理。
     *
     * @param param 输入的用户信息
     * @return BLogicResult 登录处理结果
     */
    public BLogicResult execute(LoginBLInputDTO params) {

        // 初始化BLogicResult
        BLogicResult result = new BLogicResult();

        // 初始化消息。
        BLogicMessages messages = new BLogicMessages();

        // 初始化DLogic用DTO
        LoginDLInputDTO in = new LoginDLInputDTO();

        // Bean转移
        BeanUtils.copyProperties(params, in);
        LoginDLOutputDTO out = loginDLogic.executeLogin(in);

        // 判断用户是否存在
        if (0 == out.getUserList().size()) {

            // 消息设定
            messages.add(Constants.MESSAGE, new BLogicMessage(
                    MSG_LOGIN_FAILURE, false));
            result.setErrors(messages);
            result.setResultString(LOGIN_FAILURE);
            return result;
        }

        // UVO生成
        UserInfoUVO uvo = (UserInfoUVO) UserValueObject.createUserValueObject();

        // 设定查询出来的UVO。
        BeanUtils.copyProperties(out.getUserList().get(0), uvo);

        // 设定业务返回对象
        LoginBLOutputDTO output = new LoginBLOutputDTO();
        output.setUvo(uvo);
        result.setObject(output);
        result.setResultString(Constants.SUCCESS);
        return result;
    }
}
