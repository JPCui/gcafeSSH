package cn.rakuchi.gcafe.shop.bLogic;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;

import cn.rakuchi.fw.service.BLogicMessage;
import cn.rakuchi.fw.service.BLogicMessages;
import cn.rakuchi.fw.service.BLogicResult;
import cn.rakuchi.gcafe.commons.constants.Constants;
import cn.rakuchi.gcafe.shop.dLogic.ShopDLogic;
import cn.rakuchi.gcafe.shop.dto.ShopBL01OutputDTO;
import cn.rakuchi.gcafe.shop.dto.ShopBL02OutputDTO;
import cn.rakuchi.gcafe.shop.dto.ShopBLInputDTO;
import cn.rakuchi.gcafe.shop.dto.ShopDLInputDTO;
import cn.rakuchi.gcafe.shop.dto.ShopDLOutputDTO;
import cn.rakuchi.gcafe.shop.po.ShopInfo;

public class ShopBLogicImpl implements ShopBLogic {

    /**
     * 输入检查.输入对象不存在
     */
    private static final String MSG_INPUT_NULL = "输入值不能为空！";

    /**
     * 输入检查.店面编号不存在
     */
    private static final String MSG_INPUT_SHOPCD_NULL = "店面编号不能为空！";

    /**
     * 输入检查.店面名称不存在
     */
    private static final String MSG_INPUT_SHOPNAME_NULL = "店面名称不能为空！";

    /**
     * 添加成功时
     */
    private static final String MSG_INS_SUCCESS = "添加成功！";

    /**
     * 修改成功时
     */
    private static final String MSG_UPD_SUCCESS = "修改成功！";

    /**
     * 删除成功时
     */
    private static final String MSG_DEL_SUCCESS = "删除成功！";

    /**
     * 添加成功时
     */
    private static final String MSG_INS_FAILURE = "添加失败！";

    /**
     * 修改成功时
     */
    private static final String MSG_UPD_FAILURE = "修改失败！";

    /**
     * 删除成功时
     */
    private static final String MSG_DEL_FAILURE = "删除失败！";

    /**
     * 业务用DLogic. <br>
     */
    private ShopDLogic shopDLogic;

    /**
     * 设定业务用DLogic. <br>
     *
     * @param shopDLogic 业务用DLogic
     */
    public void setShopDLogic(ShopDLogic shopDLogic) {

        this.shopDLogic = shopDLogic;
    }

    /**
     * 查询店面列表
     * @return 查询结果
     */
    public BLogicResult showShopList() {

        // 初始化返回结果
        BLogicResult result = new BLogicResult();
        ShopBL01OutputDTO out = new ShopBL01OutputDTO();
        out.setShopList(showAllShopList());
        result.setObject(out);
        result.setResultString(Constants.SUCCESS);
        return result;
    }

    /**
     * 根据店面编号查询店面
     * @param shopCd 店面编号
     * @return 查询结果
     */
    public BLogicResult showShopObject(String shopCd) {

        // 初始化返回结果
        BLogicResult result = new BLogicResult();
        ShopBL02OutputDTO out = new ShopBL02OutputDTO();

        // 根据ID查询
        ShopDLOutputDTO shopDLOutputDTO =
                shopDLogic.selectShopForObject(shopCd);

        // 判断返回结果
        if (shopDLOutputDTO.getShopList() != null
                && shopDLOutputDTO.getShopList().size() == 1) {
            out.setShopInfo(shopDLOutputDTO.getShopList().get(0));
        }

        // 查询列表
        out.setShopList(showAllShopList());
        result.setObject(out);
        result.setResultString(Constants.SUCCESS);
        return result;
    }

    /**
     * 保存店面
     * @param param 输入店面消息
     * @return 保存结果
     */
    public BLogicResult saveShop(ShopBLInputDTO param) {

        // 初始化返回结果
        BLogicResult result = new BLogicResult();

        // 初始化消息
        BLogicMessages messages = new BLogicMessages();

        // 输入验证
        boolean checkFlg = true;
        if (param == null) {
            checkFlg = false;

            // 消息设定
            messages.add(Constants.ERROR, new BLogicMessage(
                    MSG_INPUT_NULL, false));
        } else if (param.getShopCd() == null
                || Constants.BLANK.equals(param.getShopCd())) {
            checkFlg = false;

            // 消息设定
            messages.add(Constants.ERROR, new BLogicMessage(
                    MSG_INPUT_SHOPCD_NULL, false));
        } else if (param.getShopName() == null
                || Constants.BLANK.equals(param.getShopName())) {
            checkFlg = false;

            // 消息设定
            messages.add(Constants.ERROR, new BLogicMessage(
                    MSG_INPUT_SHOPNAME_NULL, false));
        }

        if (!checkFlg) {
            result.setMessages(messages);
            result.setResultString(Constants.SUCCESS);
            return result;
        }

        // 根据ID查询
        ShopDLOutputDTO shopDLOutputDTO =
                shopDLogic.selectShopForObject(param.getShopCd());

        // 判断是否存在
        if (shopDLOutputDTO.getShopList() != null
                && shopDLOutputDTO.getShopList().size() == 1) {

            // 修改操作
            // 初期化参数
            ShopDLInputDTO shopDLInputDTO = new ShopDLInputDTO();

            // Bean类型转换
            BeanUtils.copyProperties(
                    shopDLOutputDTO.getShopList().get(0), shopDLInputDTO);
            BeanUtils.copyProperties(param, shopDLInputDTO);

            // 执行修改
            boolean successFlg = shopDLogic.updateShop(shopDLInputDTO);

            // 修改结果判定
            if (!successFlg) {

                // 消息设定
                messages.add(Constants.ERROR, new BLogicMessage(
                        MSG_UPD_FAILURE, false));
                result.setErrors(messages);
                result.setResultString(Constants.FAILURE);
                return result;
            } else {

                // 消息设定
                messages.add(Constants.MESSAGE, new BLogicMessage(
                        MSG_UPD_SUCCESS, false));
            }
        } else {

            // 初期化参数
            ShopDLInputDTO shopDLInputDTO = new ShopDLInputDTO();

            // Bean类型转换
            BeanUtils.copyProperties(param, shopDLInputDTO);

            // 执行添加
            boolean successFlg = shopDLogic.insertShop(shopDLInputDTO);

            // 添加结果判定
            if (!successFlg) {

                // 消息设定
                messages.add(Constants.ERROR, new BLogicMessage(
                        MSG_INS_FAILURE, false));
                result.setErrors(messages);
                result.setResultString(Constants.FAILURE);
                return result;
            } else {

                // 消息设定
                messages.add(Constants.MESSAGE, new BLogicMessage(
                        MSG_INS_SUCCESS, false));
            }
        }

        ShopBL01OutputDTO out = new ShopBL01OutputDTO();
        out.setShopList(showAllShopList());
        result.setObject(out);
        result.setMessages(messages);
        result.setResultString(Constants.SUCCESS);
        return result;
    }

    /**
     * 删除店面
     * @param shopCd 店面编号
     * @return 删除结果
     */
    public BLogicResult removeShop(String shopCd) {

        // 初始化返回结果
        BLogicResult result = new BLogicResult();

        // 初始化消息
        BLogicMessages messages = new BLogicMessages();

        // 根据ID查询
        ShopDLOutputDTO shopDLOutputDTO =
                shopDLogic.selectShopForObject(shopCd);

        // 判断是否存在
        if (shopDLOutputDTO.getShopList() != null
                && shopDLOutputDTO.getShopList().size() == 1) {

            // 初期化参数
            ShopDLInputDTO shopDLInputDTO = new ShopDLInputDTO();

            // Bean类型转换
            BeanUtils.copyProperties(
                    shopDLOutputDTO.getShopList().get(0), shopDLInputDTO);

            // 执行修改
            boolean successFlg = shopDLogic.deleteShop(shopDLInputDTO);

            // 删除结果判定
            if (!successFlg) {

                // 消息设定
                messages.add(Constants.ERROR, new BLogicMessage(
                        MSG_DEL_FAILURE, false));
                result.setErrors(messages);
                result.setResultString(Constants.FAILURE);
                return result;
            } else {

                // 消息设定
                messages.add(Constants.MESSAGE, new BLogicMessage(
                        MSG_DEL_SUCCESS, false));
            }
        }

        ShopBL01OutputDTO out = new ShopBL01OutputDTO();
        out.setShopList(showAllShopList());
        result.setMessages(messages);
        result.setObject(out);
        result.setResultString(Constants.SUCCESS);
        return result;
    }

    /**
     * 取得所有店面
     * @return 所有店面
     */
    private List<ShopInfo> showAllShopList() {
        ShopDLOutputDTO out = shopDLogic.selectShopForList();
        if (out != null) {
            return out.getShopList();
        }
        return new ArrayList<ShopInfo>();
    }
}