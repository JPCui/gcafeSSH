package cn.rakuchi.gcafe.ghs.dLogic;

import cn.rakuchi.gcafe.ghs.dto.GhsDLInputDTO;
import cn.rakuchi.gcafe.ghs.dto.GhsDLOutputDTO;

public interface GhsDLogic {

    /**
     * 查询店面列表
     * @return 店面列表
     */
    public GhsDLOutputDTO selectGhsForList();

    /**
     * 根据店面编号查询店面信息
     * @param ghsCd 店面编号
     * @return 店面信息
     */
    public GhsDLOutputDTO selectGhsForObject(String ghsCd, String ghsClassifyCd);

    /**
     * 添加店面
     * @param param 添加的店面信息
     *
     */
    public boolean insertGhs(GhsDLInputDTO param);

    /**
     * 修改店面
     * @param param 修改的店面信息
     */
    public boolean updateGhs(GhsDLInputDTO param);

    /**
     * 删除店面
     * @param ghsCd 店面编号
     */
    public boolean deleteGhs(GhsDLInputDTO param);
}
