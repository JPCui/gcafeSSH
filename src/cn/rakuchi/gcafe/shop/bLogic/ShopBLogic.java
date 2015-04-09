package cn.rakuchi.gcafe.shop.bLogic;

import cn.rakuchi.fw.service.BLogicResult;
import cn.rakuchi.gcafe.shop.dto.ShopBLInputDTO;

public interface ShopBLogic {

    /**
     * 查询店面列表
     * @return 查询结果
     */
    public BLogicResult showShopList();

    /**
     * 根据店面编号查询店面
     * @param shopCd 店面编号
     * @return 查询结果
     */
    public BLogicResult showShopObject(String shopCd);

    /**
     * 保存店面
     * @param param 输入店面消息
     * @return 保存结果
     */
    public BLogicResult saveShop(ShopBLInputDTO param);

    /**
     * 删除店面
     * @param shopCd 店面编号
     * @return 删除结果
     */
    public BLogicResult removeShop(String shopCd);
}
