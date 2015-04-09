package cn.rakuchi.gcafe.login.dLogic;

import cn.rakuchi.gcafe.login.dto.LoginDLInputDTO;
import cn.rakuchi.gcafe.login.dto.LoginDLOutputDTO;

public interface LoginDLogic {

    /**
     * 用户登录
     * @param 输入的用户信息
     * @return 用户信息
     */
    public LoginDLOutputDTO executeLogin(LoginDLInputDTO param);
}
