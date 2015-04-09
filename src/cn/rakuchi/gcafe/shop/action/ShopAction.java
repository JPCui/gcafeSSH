package cn.rakuchi.gcafe.shop.action;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;

import cn.rakuchi.fw.service.BLogicResult;
import cn.rakuchi.fw.struts.action.BaseActionSupport;
import cn.rakuchi.gcafe.shop.bLogic.ShopBLogic;
import cn.rakuchi.gcafe.shop.dto.ShopBL01OutputDTO;
import cn.rakuchi.gcafe.shop.dto.ShopBL02OutputDTO;
import cn.rakuchi.gcafe.shop.dto.ShopBLInputDTO;
import cn.rakuchi.gcafe.shop.po.ShopInfo;

public class ShopAction extends BaseActionSupport {

    /**
     * 序列化
     */
    private static final long serialVersionUID = -7166476951687775959L;

    /**
     * BLogicResult为null时返回的错误信息。
     */
    protected static final String BLOGIC_RESULT_NULL_ERROR =
        "errors.blogic.result.null";

    /**
     * 业务逻辑. <br>
     */
    private ShopBLogic businessLogic;

    /**
     * 设定业务逻辑. <br>
     *
     * @param businessLogic 业务逻辑
     */
    public void setBusinessLogic(ShopBLogic businessLogic) {

        this.businessLogic = businessLogic;
    }

    /**
     * 店面信息. <br>
     */
    private ShopInfo shopInfo;

    /**
     * 设定店面信息. <br>
     *
     * @param shopInfo 店面信息
     */
    public void setShopInfo(ShopInfo shopInfo) {

        this.shopInfo = shopInfo;
    }

    /**
     * 取得店面信息. <br>
     *
     * @return 店面信息
     */
    public ShopInfo getShopInfo() {

        return shopInfo;
    }

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

    /**
     * 隐藏店面编号. <br>
     */
    private String hdnShopCd;

    /**
     * 设定隐藏店面编号. <br>
     *
     * @param hdnShopCd 隐藏店面编号
     */
    public void setHdnShopCd(String hdnShopCd) {

        this.hdnShopCd = hdnShopCd;
    }

    /**
     * 取得隐藏店面编号. <br>
     *
     * @return 隐藏店面编号
     */
    public String getHdnShopCd() {

        return hdnShopCd;
    }

    /**
     * 画面初期化
     * @return 跳转路径
     * @throws Exception
     */
    public String show() throws Exception{

        // 执行业务处理
        BLogicResult result = businessLogic.showShopList();

        // 处理结果
        if(evaluateBLogicResult(result)) {
            ShopBL01OutputDTO out = (ShopBL01OutputDTO)result.getObject();
            setShopInfo(null);
            setShopList(out.getShopList());
        }
        return result.getResultString();
    }

    /**
     * 保存按钮
     * @return 跳转路径
     * @throws Exception
     */
    public String save() throws Exception{

        // 初期化
       ShopBLInputDTO shopBLInputDTO =  new ShopBLInputDTO();

       // Bean类型转换
       BeanUtils.copyProperties(shopInfo, shopBLInputDTO);

       // 执行业务处理
       BLogicResult result = businessLogic.saveShop(shopBLInputDTO);

       // 处理结果
       if(evaluateBLogicResult(result)) {
           ShopBL01OutputDTO out = (ShopBL01OutputDTO)result.getObject();
           setShopInfo(null);
           setShopList(out.getShopList());
       }
       return result.getResultString();
    }

    /**
     * 编辑按钮
     * @return 跳转路径
     * @throws Exception
     */
    public String edit() throws Exception{

        // 执行业务处理
        BLogicResult result = businessLogic.showShopObject(hdnShopCd);

        // 处理结果
        if(evaluateBLogicResult(result)) {
            ShopBL02OutputDTO out = (ShopBL02OutputDTO)result.getObject();
            setShopInfo(out.getShopInfo());
            setShopList(out.getShopList());
        }
        return result.getResultString();
    }

    /**
     * 删除按钮
     * @return 跳转路径
     * @throws Exception
     */
    public String remove() throws Exception{

        // 执行业务处理
        BLogicResult result = businessLogic.removeShop(hdnShopCd);

        // 处理结果
        if (evaluateBLogicResult(result)) {
            ShopBL01OutputDTO out = (ShopBL01OutputDTO)result.getObject();
            setShopInfo(null);
            setShopList(out.getShopList());
        }
        return result.getResultString();
    }
}
