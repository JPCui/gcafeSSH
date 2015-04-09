package cn.rakuchi.gcafe.commons.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class MenuInfo implements Serializable {

    /**
     * 序列化
     */
    private static final long serialVersionUID = -198110400698405422L;

    /**
     * 成员ID. <br>
     */
    private String itemId = null;

    /**
     * 设定成员ID. <br>
     *
     * @param itemId 成员ID
     */
    public void setItemId(String itemId) {

        this.itemId = itemId;
    }

    /**
     * 取得成员ID. <br>
     *
     * @return 成员ID
     */
    public String getItemId() {

        return itemId;
    }

    /**
     * 父成员ID. <br>
     */
    private String parentItemId = null;

    /**
     * 设定父成员ID. <br>
     *
     * @param parentItemId 父成员ID
     */
    public void setParentItemId(String parentItemId) {

        this.parentItemId = parentItemId;
    }

    /**
     * 取得父成员ID. <br>
     *
     * @return 父成员ID
     */
    public String getParentItemId() {

        return parentItemId;
    }

    /**
     * 成员名. <br>
     */
    private String itemName = null;

    /**
     * 设定成员名. <br>
     *
     * @param itemName 成员名
     */
    public void setItemName(String itemName) {

        this.itemName = itemName;
    }

    /**
     * 取得成员名. <br>
     *
     * @return 成员名
     */
    public String getItemName() {

        return itemName;
    }

    /**
     * 成员值. <br>
     */
    private String itemValue = null;

    /**
     * 设定成员值. <br>
     *
     * @param itemValue 成员值
     */
    public void setItemValue(String itemValue) {

        this.itemValue = itemValue;
    }

    /**
     * 取得成员值. <br>
     *
     * @return 成员值
     */
    public String getItemValue() {

        return itemValue;
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
     * 图片URL. <br>
     */
    private String imgUrl = null;

    /**
     * 设定图片URL. <br>
     *
     * @param imgUrl 图片URL
     */
    public void setImgUrl(String imgUrl) {

        this.imgUrl = imgUrl;
    }

    /**
     * 取得图片URL. <br>
     *
     * @return 图片URL
     */
    public String getImgUrl() {

        return imgUrl;
    }

    /**
     * URL. <br>
     */
    private String url = null;

    /**
     * 设定URL. <br>
     *
     * @param url URL
     */
    public void setUrl(String url) {

        this.url = url;
    }

    /**
     * 取得URL. <br>
     *
     * @return URL
     */
    public String getUrl() {

        return url;
    }

    /**
     * 子菜单. <br>
     */
    private List<MenuInfo> children = new ArrayList<MenuInfo>();

    /**
     * 设定子菜单. <br>
     *
     * @param children 子菜单
     */
    public void setChildren(List<MenuInfo> children) {

        this.children = children;
    }

    /**
     * 取得子菜单. <br>
     *
     * @return 子菜单
     */
    public List<MenuInfo> getChildren() {

        return children;
    }
}
