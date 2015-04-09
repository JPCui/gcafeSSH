package cn.rakuchi.gcafe.ghs.dto;

import cn.rakuchi.gcafe.commons.dto.BaseDTO;

public class GhsDLInputDTO extends BaseDTO {

    /**
     * 序列化
     */
    private static final long serialVersionUID = -6492260016485142140L;

    /**
     * 供货商编号. <br>
     */
    private String ghsCd = null;

    /**
     * 设定供货商编号. <br>
     *
     * @param ghsCd 供货商编号
     */
    public void setGhsCd(String ghsCd) {

        this.ghsCd = ghsCd;
    }

    /**
     * 取得供货商编号. <br>
     *
     * @return 供货商编号
     */
    public String getGhsCd() {

        return ghsCd;
    }

    /**
     * 供货商名称. <br>
     */
    private String ghsName = null;

    /**
     * 设定供货商名称. <br>
     *
     * @param ghsName 供货商名称
     */
    public void setGhsName(String ghsName) {

        this.ghsName = ghsName;
    }

    /**
     * 取得供货商名称. <br>
     *
     * @return 供货商名称
     */
    public String getGhsName() {

        return ghsName;
    }

    /**
     * 供货商所属编号. <br>
     */
    private String ghsClassifyCd = null;

    /**
     * 设定供货商所属编号. <br>
     *
     * @param classify 供货商所属编号
     */
    public void setGhsClassifyCd(String ghsClassifyCd) {

        this.ghsClassifyCd = ghsClassifyCd;
    }

    /**
     * 取得供货商所属编号. <br>
     *
     * @return 供货商所属编号
     */
    public String getGhsClassifyCd() {

        return ghsClassifyCd;
    }

    /**
     * 排序. <br>
     */
    private String sort = "";

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

    /**
     * 有效标志. <br>
     */
    private String validFlag = null;

    /**
     * 设定有效标志. <br>
     *
     * @param remarks 有效标志
     */
    public void setValidFlag(String validFlag) {

        this.validFlag = validFlag;
    }

    /**
     * 取得有效标志. <br>
     *
     * @return 有效标志
     */
    public String getValidFlag() {

        return validFlag;
    }
}
