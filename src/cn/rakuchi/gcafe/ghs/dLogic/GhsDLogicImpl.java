package cn.rakuchi.gcafe.ghs.dLogic;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.BeanUtils;

import cn.rakuchi.gcafe.ghs.dto.GhsDLInputDTO;
import cn.rakuchi.gcafe.ghs.dto.GhsDLOutputDTO;
import cn.rakuchi.gcafe.ghs.po.GhsInfo;

public class GhsDLogicImpl implements GhsDLogic {

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
    private final static String GHS_HQL_01 =
            "from GhsInfo";

    /** 查询用SQLID */
    private final static String GHS_HQL_02 =
            "from GhsInfo s where s.ghsCd = ? and s.ghsClassifyCd = ?";

    /**
     * 查询供货商列表
     * @return 供货商列表
     */
    @SuppressWarnings("unchecked")
    public GhsDLOutputDTO selectGhsForList() {

        // 	取得Session
        Session session = sessionFactory.getCurrentSession();
        Query query=session.createQuery(GHS_HQL_01);

        // 执行查询
        List<GhsInfo> out = query.list();

        // 输出结果定义及设定
        GhsDLOutputDTO output = new GhsDLOutputDTO();
        output.setGhsList(out);

        return output;
    }

    /**
     * 根据供货商编号查询供货商信息
     * @param ghsCd 供货商编号
     * @return 供货商信息
     */
    public GhsDLOutputDTO selectGhsForObject(String ghsCd, String ghsClassifyCd) {

        // 	取得Session
        Session session = sessionFactory.getCurrentSession();
        Query query=session.createQuery(GHS_HQL_02);
        query.setParameter(0, ghsCd);
        query.setParameter(1, ghsClassifyCd);

        // 执行查询
        GhsInfo out = (GhsInfo)query.uniqueResult();

        // 输出结果定义及设定
        GhsDLOutputDTO output = new GhsDLOutputDTO();
        if (out != null) {
            output.getGhsList().add(out);
        }

        return output;
    }

    /**
     * 添加供货商
     * @param param 添加的供货商信息
     * @return 执行结果
     */
    public boolean insertGhs(GhsDLInputDTO param) {

        // 初期化参数PO
        GhsInfo ghsInfo = new GhsInfo();

        // 设置条件，Bean类型转换
        BeanUtils.copyProperties(param, ghsInfo);

        // 	取得Session
        Session session = sessionFactory.getCurrentSession();

        // 执行插入
        try {
            session.save(ghsInfo);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    /**
     * 修改供货商
     * @param param 修改的供货商信息
     * @return 执行结果
     */
    public boolean updateGhs(GhsDLInputDTO param) {

        // 初期化参数PO
        GhsInfo ghsInfo = new GhsInfo();

        // 设置条件，Bean类型转换
        BeanUtils.copyProperties(param, ghsInfo);

        // 	取得Session
        Session session = sessionFactory.getCurrentSession();
        
        // 执行修改
        try {
            session.update(ghsInfo);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    /**
     * 删除供货商
     * @param ghsCd 供货商编号
     * @return 执行结果
     */
    public boolean deleteGhs(GhsDLInputDTO param) {

        // 初期化参数PO
        GhsInfo ghsInfo = new GhsInfo();

        // 设置条件，Bean类型转换
        BeanUtils.copyProperties(param, ghsInfo);

        // 	取得Session
        Session session = sessionFactory.getCurrentSession();

        // 执行删除
        try {
            session.delete(ghsInfo);
        } catch (Exception e) {
            return false;
        }
        return true;
    }
}
