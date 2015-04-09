package cn.rakuchi.gcafe.shop.dto;

import java.util.ArrayList;
import java.util.List;

import cn.rakuchi.gcafe.commons.dto.BaseDTO;
import cn.rakuchi.gcafe.shop.po.ShopInfo;

public class ShopBL01OutputDTO extends BaseDTO {

    /**
     * 序列化
     */
    private static final long serialVersionUID = -4795128167773658108L;

    /**
     * 店面列表. <br>
     */
    private List<ShopInfo> shopList = new ArrayList<ShopInfo>();

    /**
     * 设定店面列表. <br>
     *
     * @param shopList 店面列表
     */
    public void setShopList(List<ShopInfo> shopList) {

        this.shopList = shopList;
    }

    /**
     * 取得店面列表. <br>
     *
     * @return 店面列表
     */
    public List<ShopInfo> getShopList() {

        return shopList;
    }
}
