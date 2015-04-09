package cn.rakuchi.gcafe.login.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import cn.rakuchi.gcafe.login.po.UserInfo;

public class LoginDLOutputDTO implements Serializable {

    /**
     * 序列化
     */
    private static final long serialVersionUID = -2237541582588978959L;

    /**
     * 用户列表. <br>
     */
    private List<UserInfo> userList = new ArrayList<UserInfo>();

    /**
     * 设定用户列表. <br>
     *
     * @param userList 用户列表
     */
    public void setUserList(List<UserInfo> userList) {

        this.userList = userList;
    }

    /**
     * 取得用户列表. <br>
     *
     * @return 用户列表
     */
    public List<UserInfo> getUserList() {

        return userList;
    }
}
