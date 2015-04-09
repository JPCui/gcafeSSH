package cn.rakuchi.gcafe.shop.dLogic;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.BeanUtils;

import cn.rakuchi.gcafe.shop.dto.ShopDLInputDTO;
import cn.rakuchi.gcafe.shop.dto.ShopDLOutputDTO;
import cn.rakuchi.gcafe.shop.po.ShopInfo;

public class ShopDLogicImpl implements ShopDLogic {

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
    private final static String SHOP_HQL_01 =
            "from ShopInfo";

    /** 查询用SQLID */
    private final static String SHOP_HQL_02 =
            "from ShopInfo s where s.shopCd = ?";

    /**
     * 查询店面列表
     * @return 店面列表
     */
    @SuppressWarnings("unchecked")
    public ShopDLOutputDTO selectShopForList() {

        // 	取得Session
        Session session = sessionFactory.getCurrentSession();
        Query query=session.createQuery(SHOP_HQL_01);

        // 执行查询
        List<ShopInfo> out = query.list();

        // 输出结果定义及设定
        ShopDLOutputDTO output = new ShopDLOutputDTO();
        output.setShopList(out);

        return output;
    }

    /**
     * 根据店面编号查询店面信息
     * @param shopCd 店面编号
     * @return 店面信息
     */
    public ShopDLOutputDTO selectShopForObject(String shopCd) {

        // 	取得Session
        Session session = sessionFactory.getCurrentSession();
        Query query=session.createQuery(SHOP_HQL_02);
        query.setParameter(0, shopCd);

        // 执行查询
        ShopInfo out = (ShopInfo)query.uniqueResult();

        // 输出结果定义及设定
        ShopDLOutputDTO output = new ShopDLOutputDTO();
        if (out != null) {
            output.getShopList().add(out);
        }

        return output;
    }

    /**
     * 添加店面
     * @param param 添加的店面信息
     * @return 执行结果
     */
    public boolean insertShop(ShopDLInputDTO param) {

        // 初期化参数PO
        ShopInfo shopInfo = new ShopInfo();

        // 设置条件，Bean类型转换
        BeanUtils.copyProperties(param, shopInfo);

        // 	取得Session
        Session session = sessionFactory.getCurrentSession();

        // 执行插入
        try {
            session.save(shopInfo);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    /**
     * 修改店面
     * @param param 修改的店面信息
     * @return 执行结果
     */
    public boolean updateShop(ShopDLInputDTO param) {

        // 初期化参数PO
        ShopInfo shopInfo = new ShopInfo();

        // 设置条件，Bean类型转换
        BeanUtils.copyProperties(param, shopInfo);

        // 	取得Session
        Session session = sessionFactory.getCurrentSession();

        // 执行修改
        try {
            session.update(shopInfo);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    /**
     * 删除店面
     * @param shopCd 店面编号
     * @return 执行结果
     */
    public boolean deleteShop(ShopDLInputDTO param) {

        // 初期化参数PO
        ShopInfo shopInfo = new ShopInfo();

        // 设置条件，Bean类型转换
        BeanUtils.copyProperties(param, shopInfo);

        // 	取得Session
        Session session = sessionFactory.getCurrentSession();

        // 执行删除
        try {
            session.delete(shopInfo);
        } catch (Exception e) {
            return false;
        }
        return true;
    }
}
