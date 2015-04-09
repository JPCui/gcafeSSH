package cn.rakuchi.gcafe.ghs.po;

import java.io.Serializable;

/**
 * 供货商
 * 
 * @author REAL
 * 
 */
public class GhsInfo implements Serializable {

	/**
	 * 序列化
	 */
	private static final long serialVersionUID = -6580567092308832105L;

	/**
	 * 供货商编号. <br>
	 */
	private String ghsCd = null;

	/**
	 * 设定供货商编号. <br>
	 * 
	 * @param ghsCd
	 *            供货商编号
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

	private String ghsClassifyCd = null;

	/**
	 * 取得供货商所属. <br>
	 * 
	 * @return 供货商所属
	 */
	public String getGhsClassifyCd() {
		return ghsClassifyCd;
	}

	/**
	 * 设定供货商所属. <br>
	 * 
	 * @param ghsClassifyCd
	 *            供货商所属
	 */
	public void setGhsClassifyCd(String ghsClassifyCd) {
		this.ghsClassifyCd = ghsClassifyCd;
	}

	private String ghsName = null;

	private String sort = null;

	private String remarks = null;

	private String validFlag = null;

	/**
	 * 取得供货商编号. <br>
	 * 
	 * @return 供货商编号
	 */
	public String getGhsName() {
		return ghsName;
	}

	/**
	 * 设定供货商名称 . <br>
	 * 
	 * @param ghsName
	 *            供货商名称
	 */
	public void setGhsName(String ghsName) {
		this.ghsName = ghsName;
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
	 * 
	 * 设定排序. <br>
	 * 
	 * @param sort
	 *            排序
	 */
	public void setSort(String sort) {
		this.sort = sort;
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
	 * 设定备注. <br>
	 * 
	 * @param remarks
	 *            备注
	 */
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	/**
	 * 获得有效标志. <br>
	 * 
	 * @return 有效标志
	 */
	public String getValidFlag() {
		return validFlag;
	}

	/**
	 * 设定有效标志. <br>
	 * 
	 * @param validFlag
	 *            有效标志
	 */
	public void setValidFlag(String validFlag) {
		this.validFlag = validFlag;
	}

	/**
	 * 取得序列化ID. <br> 
	 * @return 序列化ID
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
