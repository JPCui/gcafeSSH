package cn.rakuchi.gcafe.shop.dLogic;

import cn.rakuchi.gcafe.shop.dto.ShopDLInputDTO;
import cn.rakuchi.gcafe.shop.dto.ShopDLOutputDTO;

public interface ShopDLogic {

    /**
     * 查询店面列表
     * @return 店面列表
     */
    public ShopDLOutputDTO selectShopForList();

    /**
     * 根据店面编号查询店面信息
     * @param shopCd 店面编号
     * @return 店面信息
     */
    public ShopDLOutputDTO selectShopForObject(String shopCd);

    /**
     * 添加店面
     * @param param 添加的店面信息
     *
     */
    public boolean insertShop(ShopDLInputDTO param);

    /**
     * 修改店面
     * @param param 修改的店面信息
     */
    public boolean updateShop(ShopDLInputDTO param);

    /**
     * 删除店面
     * @param shopCd 店面编号
     */
    public boolean deleteShop(ShopDLInputDTO param);
}
