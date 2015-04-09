package cn.rakuchi.gcafe.login.action;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import cn.rakuchi.fw.commons.util.JsonUtil;
import cn.rakuchi.gcafe.commons.dto.MenuInfo;

import com.opensymphony.xwork2.ActionSupport;

public class MenuHandlerAction extends ActionSupport{

    /**
     * 序列化
     */
    private static final long serialVersionUID = -9059735836059750775L;

    /* 用于存放JSON生成后的字符串结果 */
    private String jsonResult;

    public String getJsonResult() {
        return jsonResult;
    }

    public void setJsonResult(String jsonResult) {
        this.jsonResult = jsonResult;
    }

    public void doExecute() throws Exception {
        HttpServletResponse response=ServletActionContext.getResponse();

        MenuInfo menuInfo1 = new MenuInfo();
        menuInfo1.setItemId("1");
        menuInfo1.setParentItemId("-1");
        menuInfo1.setItemName("店面");
        menuInfo1.setItemValue("店面");
        menuInfo1.setUrl("");

        MenuInfo menuInfo2 = new MenuInfo();
        menuInfo2.setItemId("2");
        menuInfo2.setParentItemId("1");
        menuInfo2.setItemName("店面");
        menuInfo2.setItemValue("店面");
        menuInfo2.setUrl("../shop/show.do");

        MenuInfo menuInfo3 = new MenuInfo();
        menuInfo3.setItemId("3");
        menuInfo3.setParentItemId("1");
        menuInfo3.setItemName("部门");
        menuInfo3.setItemValue("部门");
        menuInfo3.setUrl("");

        MenuInfo menuInfo4 = new MenuInfo();
        menuInfo4.setItemId("4");
        menuInfo4.setParentItemId("1");
        menuInfo4.setItemName("操作员");
        menuInfo4.setItemValue("操作员");
        menuInfo4.setUrl("");

        menuInfo1.getChildren().add(menuInfo2);
        menuInfo1.getChildren().add(menuInfo3);
        menuInfo1.getChildren().add(menuInfo4);

        MenuInfo menuInfo5 = new MenuInfo();
        menuInfo5.setItemId("5");
        menuInfo5.setParentItemId("-1");
        menuInfo5.setItemName("供货商及商品");
        menuInfo5.setItemValue("供货商及商品");
        menuInfo5.setUrl("");

        MenuInfo menuInfo6 = new MenuInfo();
        menuInfo6.setItemId("6");
        menuInfo6.setParentItemId("5");
        menuInfo6.setItemName("供货商");
        menuInfo6.setItemValue("供货商");
        menuInfo6.setUrl("../ghs/show.do");

        MenuInfo menuInfo7 = new MenuInfo();
        menuInfo7.setItemId("7");
        menuInfo7.setParentItemId("5");
        menuInfo7.setItemName("供货商操作员");
        menuInfo7.setItemValue("供货商操作员");
        menuInfo7.setUrl("");

        MenuInfo menuInfo8 = new MenuInfo();
        menuInfo8.setItemId("8");
        menuInfo8.setParentItemId("5");
        menuInfo8.setItemName("商品及分类");
        menuInfo8.setItemValue("商品及分类");
        menuInfo8.setUrl("");

        menuInfo5.getChildren().add(menuInfo6);
        menuInfo5.getChildren().add(menuInfo7);
        menuInfo5.getChildren().add(menuInfo8);

        MenuInfo menuInfo9 = new MenuInfo();
        menuInfo9.setItemId("9");
        menuInfo9.setParentItemId("-1");
        menuInfo9.setItemName("订单");
        menuInfo9.setItemValue("订单");
        menuInfo9.setUrl("");

        MenuInfo menuInfo10 = new MenuInfo();
        menuInfo10.setItemId("10");
        menuInfo10.setParentItemId("9");
        menuInfo10.setItemName("订单管理");
        menuInfo10.setItemValue("订单管理");
        menuInfo10.setUrl("");

        menuInfo9.getChildren().add(menuInfo10);

        MenuInfo menuInfo11 = new MenuInfo();
        menuInfo11.setItemId("11");
        menuInfo11.setParentItemId("-1");
        menuInfo11.setItemName("下单");
        menuInfo11.setItemValue("下单");
        menuInfo11.setUrl("");

        MenuInfo menuInfo12 = new MenuInfo();
        menuInfo12.setItemId("12");
        menuInfo12.setParentItemId("11");
        menuInfo12.setItemName("下单");
        menuInfo12.setItemValue("下单");
        menuInfo12.setUrl("");

        MenuInfo menuInfo13 = new MenuInfo();
        menuInfo13.setItemId("13");
        menuInfo13.setParentItemId("11");
        menuInfo13.setItemName("购物车");
        menuInfo13.setItemValue("购物车");
        menuInfo13.setUrl("");

        MenuInfo menuInfo14 = new MenuInfo();
        menuInfo14.setItemId("14");
        menuInfo14.setParentItemId("11");
        menuInfo14.setItemName("订单列表");
        menuInfo14.setItemValue("订单列表");
        menuInfo14.setUrl("");

        menuInfo11.getChildren().add(menuInfo12);
        menuInfo11.getChildren().add(menuInfo13);
        menuInfo11.getChildren().add(menuInfo14);

        MenuInfo menuInfo15 = new MenuInfo();
        menuInfo15.setItemId("15");
        menuInfo15.setParentItemId("-1");
        menuInfo15.setItemName("统计分析");
        menuInfo15.setItemValue("统计分析");
        menuInfo15.setUrl("");

        MenuInfo menuInfo16 = new MenuInfo();
        menuInfo16.setItemId("16");
        menuInfo16.setParentItemId("15");
        menuInfo16.setItemName("统计分析（总店）");
        menuInfo16.setItemValue("统计分析（总店）");
        menuInfo16.setUrl("");

        MenuInfo menuInfo17 = new MenuInfo();
        menuInfo17.setItemId("17");
        menuInfo17.setParentItemId("15");
        menuInfo17.setItemName("统计分析（供货商）");
        menuInfo17.setItemValue("统计分析（供货商）");
        menuInfo17.setUrl("");

        MenuInfo menuInfo18 = new MenuInfo();
        menuInfo18.setItemId("18");
        menuInfo18.setParentItemId("15");
        menuInfo18.setItemName("统计分析（店面）");
        menuInfo18.setItemValue("统计分析（店面）");
        menuInfo18.setUrl("");

        MenuInfo menuInfo19 = new MenuInfo();
        menuInfo19.setItemId("19");
        menuInfo19.setParentItemId("15");
        menuInfo19.setItemName("综合查询（总店）");
        menuInfo19.setItemValue("综合查询（总店）");
        menuInfo19.setUrl("");

        menuInfo15.getChildren().add(menuInfo16);
        menuInfo15.getChildren().add(menuInfo17);
        menuInfo15.getChildren().add(menuInfo18);
        menuInfo15.getChildren().add(menuInfo19);

        List<MenuInfo> list = new ArrayList<MenuInfo>();
        list.add(menuInfo1);
        list.add(menuInfo5);
        list.add(menuInfo9);
        list.add(menuInfo11);
        list.add(menuInfo15);

        jsonResult = JsonUtil.getJsonString4JavaList(list);
        response.setContentType("appliction/json;charset=utf-8");
        response.getWriter().write(jsonResult);
        response.getWriter().flush();
        response.getWriter().close();
    }
}
