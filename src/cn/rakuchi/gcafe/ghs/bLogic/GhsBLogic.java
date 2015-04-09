package cn.rakuchi.gcafe.ghs.bLogic;

import cn.rakuchi.fw.service.BLogicResult;
import cn.rakuchi.gcafe.ghs.dto.GhsBLInputDTO;

public interface GhsBLogic {

    /**
     * 查询供货商列表
     * @return 查询结果
     */
    public BLogicResult showGhsList();

    /**
     * 根据供货商编号查询供货商
     * @param ghsCd 供货商编号
     * @return 查询结果
     */
    public BLogicResult showGhsObject(String ghsCd, String ghsClassifyCd);

    /**
     * 保存供货商
     * @param param 输入供货商消息
     * @return 保存结果
     */
    public BLogicResult saveGhs(GhsBLInputDTO param);

    /**
     * 删除供货商
     * @param ghsCd 供货商编号
     * @return 删除结果
     */
    public BLogicResult removeGhs(String ghsCd, String ghsClassifyCd);

    /**
     * 更改供货商的有效标记
     * @param ghsCd
     * @param ghsClassifyCd
     * @param validFlag
     * @return
     */
	public BLogicResult updateValidFlag(String ghsCd, String ghsClassifyCd,
			String validFlag);
}
