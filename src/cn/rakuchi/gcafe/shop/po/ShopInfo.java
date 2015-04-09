package cn.rakuchi.gcafe.shop.po;

import java.io.Serializable;

public class ShopInfo implements Serializable {

    /**
     * 序列化
     */
    private static final long serialVersionUID = -6580567092308832105L;

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
     * 店面名称. <br>
     */
    private String shopName = null;

    /**
     * 设定店面名称. <br>
     *
     * @param shopName 店面名称
     */
    public void setShopName(String shopName) {

        this.shopName = shopName;
    }

    /**
     * 取得店面名称. <br>
     *
     * @return 店面名称
     */
    public String getShopName() {

        return shopName;
    }

    /**
     * 性质. <br>
     */
    private String classify;

    /**
     * 设定性质. <br>
     *
     * @param classify 性质
     */
    public void setClassify(String classify) {

        this.classify = classify;
    }

    /**
     * 取得性质. <br>
     *
     * @return 性质
     */
    public String getClassify() {

        return classify;
    }

    /**
     * 排序. <br>
     */
    private String sort = null;

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
