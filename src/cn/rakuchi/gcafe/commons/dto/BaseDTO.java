/*
 * @(#)BaseDTO.java
 *
 * Copyright (c) 2011-2015 RakuchiSoft Corporation.
 */
package cn.rakuchi.gcafe.commons.dto;

import java.io.Serializable;

import cn.rakuchi.gcafe.commons.uvo.UserInfoUVO;

/**
 * 业务用DTO的BASE抽象类
 */
public abstract class BaseDTO implements Serializable{

    /**
     * 序列化
     */
    private static final long serialVersionUID = -5970899007035095187L;

    /**
     * 用户信息. <br>
     */
    private UserInfoUVO uvo = new UserInfoUVO();

    /**
     * 设定用户信息. <br>
     *
     * @param uvo 用户信息
     */
    public void setUvo(UserInfoUVO uvo) {

        this.uvo = uvo;
    }

    /**
     * 取得用户信息. <br>
     *
     * @return 用户信息
     */
    public UserInfoUVO getUvo() {

        return uvo;
    }
}
