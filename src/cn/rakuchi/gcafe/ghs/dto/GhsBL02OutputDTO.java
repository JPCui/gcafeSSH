package cn.rakuchi.gcafe.ghs.dto;

import java.util.ArrayList;
import java.util.List;

import cn.rakuchi.gcafe.commons.dto.BaseDTO;
import cn.rakuchi.gcafe.ghs.po.GhsInfo;

public class GhsBL02OutputDTO extends BaseDTO {

    /**
	 * 序列化
	 */
	private static final long serialVersionUID = 7887937700890188853L;

    /**
     * 供货商信息. <br>
     */
    private GhsInfo ghsInfo;

    /**
     * 设定供货商信息. <br>
     *
     * @param ghsInfo 供货商信息
     */
    public void setGhsInfo(GhsInfo ghsInfo) {

        this.ghsInfo = ghsInfo;
    }

    /**
     * 取得供货商信息. <br>
     *
     * @return 供货商信息
     */
    public GhsInfo getGhsInfo() {

        return ghsInfo;
    }

    /**
     * 供货商列表. <br>
     */
    private List<GhsInfo> ghsList = new ArrayList<GhsInfo>();

    /**
     * 设定供货商列表. <br>
     *
     * @param ghsList 供货商列表
     */
    public void setGhsList(List<GhsInfo> ghsList) {

        this.ghsList = ghsList;
    }

    /**
     * 取得供货商列表. <br>
     *
     * @return 供货商列表
     */
    public List<GhsInfo> getGhsList() {

        return ghsList;
    }
}
