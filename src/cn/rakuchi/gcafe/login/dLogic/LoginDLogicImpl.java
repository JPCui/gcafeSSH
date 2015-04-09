package cn.rakuchi.gcafe.login.dLogic;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.BeanUtils;

import cn.rakuchi.gcafe.login.dto.LoginDLInputDTO;
import cn.rakuchi.gcafe.login.dto.LoginDLOutputDTO;
import cn.rakuchi.gcafe.login.po.UserInfo;

public class LoginDLogicImpl implements LoginDLogic {

    /**
     * SessionFactory
     */
    SessionFactory sessionFactory;

    /**
     * @param sessionFactory 设置sessionFactory
     */
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    /** 查询用SQLID */
    private final static String LOGIN_HQL_01 =
            "from UserInfo u where u.userCd = ? and u.userPwd = ?";

    /**
     * 执行登陆处理
     * @param param 查询条件
     */
    @SuppressWarnings("unchecked")
    public LoginDLOutputDTO executeLogin(LoginDLInputDTO param) {

        // 初期化条件VO
        UserInfo sql01Input = new UserInfo();

        // 设置条件，Bean类型转换
        BeanUtils.copyProperties(param, sql01Input);

        // 	取得Session
        Session session = sessionFactory.getCurrentSession();
        Query query=session.createQuery(LOGIN_HQL_01);
        query.setParameter(0, param.getUserCd());
        query.setParameter(1, param.getUserPwd());

        // 执行查询
        List<UserInfo> out = query.list();

        // 输出结果定义及设定
        LoginDLOutputDTO output = new LoginDLOutputDTO();
        output.setUserList(out);
        return output;
    }
}
