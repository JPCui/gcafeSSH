package cn.rakuchi.gcafe.login.po;

import java.io.Serializable;

public class UserInfo implements Serializable{

    /**
     * 序列化
     */
    private static final long serialVersionUID = 8817411856233698912L;

    /**
     * 店面编号. <br>
     */
    private String shopCd = null;

    /**
     * 设定店面编号. <br>
     *
     * @param shopCd 店面编号
     */
    public void setShopCd(String shopCd) {

        this.shopCd = shopCd;
    }

    /**
     * 取得店面编号. <br>
     *
     * @return 店面编号
     */
    public String getShopCd() {

        return shopCd;
    }

    /**
     * 部门编号. <br>
     */
    private String deptCd = null;

    /**
     * 设定部门编号. <br>
     *
     * @param deptCd 部门编号
     */
    public void setDeptCd(String deptCd) {

        this.deptCd = deptCd;
    }

    /**
     * 取得部门编号. <br>
     *
     * @return 部门编号
     */
    public String getDeptCd() {

        return deptCd;
    }

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

    /**
     * 角色编号. <br>
     */
    private String roleCd = null;

    /**
     * 设定角色编号. <br>
     *
     * @param roleCd 角色编号
     */
    public void setRoleCd(String roleCd) {

        this.roleCd = roleCd;
    }

    /**
     * 取得角色编号. <br>
     *
     * @return 角色编号
     */
    public String getRoleCd() {

        return roleCd;
    }

    /**
     * 排序. <br>
     */
    private String sort = "";

    /**
     * 设定排序. <br>
     *
     * @param sort 排序
     */
    public void setSort(String sort) {

        this.sort = sort;
    }

    /**
     * 取得排序. <br>
     *
     * @return 排序
     */
    public String getSort() {

        return sort;
    }

    /**
     * 备注. <br>
     */
    private String remarks = null;

    /**
     * 设定备注. <br>
     *
     * @param remarks 备注
     */
    public void setRemarks(String remarks) {

        this.remarks = remarks;
    }

    /**
     * 取得备注. <br>
     *
     * @return 备注
     */
    public String getRemarks() {

        return remarks;
    }
}
