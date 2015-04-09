package cn.rakuchi.gcafe.login.dto;

import java.io.Serializable;

public class LoginBLInputDTO implements Serializable {

    /**
     * 序列化
     */
    private static final long serialVersionUID = -6560737292739294922L;

    /**
     * 用户编号. <br>
     */
    private String userCd = null;

    /**
     * 设定用户编号. <br>
     *
     * @param userCd 用户编号
     */
    public void setUserCd(String userCd) {

        this.userCd = userCd;
    }

    /**
     * 取得用户编号. <br>
     *
     * @return 用户编号
     */
    public String getUserCd() {

        return userCd;
    }

    /**
     * 用户名. <br>
     */
    private String userName = null;

    /**
     * 设定用户名. <br>
     *
     * @param userName 用户名
     */
    public void setUserName(String userName) {

        this.userName = userName;
    }

    /**
     * 取得用户名. <br>
     *
     * @return 用户名
     */
    public String getUserName() {

        return userName;
    }

    /**
     * 密码. <br>
     */
    private String userPwd = null;

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
}
