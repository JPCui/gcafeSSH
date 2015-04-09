package cn.rakuchi.gcafe.ghs.action;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;

import cn.rakuchi.fw.service.BLogicResult;
import cn.rakuchi.fw.struts.action.BaseActionSupport;
import cn.rakuchi.gcafe.ghs.bLogic.GhsBLogic;
import cn.rakuchi.gcafe.ghs.dto.GhsBL01OutputDTO;
import cn.rakuchi.gcafe.ghs.dto.GhsBL02OutputDTO;
import cn.rakuchi.gcafe.ghs.dto.GhsBLInputDTO;
import cn.rakuchi.gcafe.ghs.po.GhsInfo;

public class GhsAction extends BaseActionSupport {

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
    private GhsBLogic businessLogic;

    /**
     * 设定业务逻辑. <br>
     *
     * @param businessLogic 业务逻辑
     */
    public void setBusinessLogic(GhsBLogic businessLogic) {
        this.businessLogic = businessLogic;
    }

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
     * 取得店面列表. <br>
     *
     * @return 店面列表
     */
    public List<GhsInfo> getGhsList() {

        return ghsList;
    }

    /**
     * 隐藏供货商编号. <br>
     */
    private String hdnGhsCd;

    /**
     * 设定隐藏店面编号. <br>
     *
     * @param hdnGhsCd 隐藏店面编号
     */
    public void setHdnGhsCd(String hdnGhsCd) {

        this.hdnGhsCd = hdnGhsCd;
    }

    /**
     * 取得隐藏店面编号. <br>
     *
     * @return 隐藏店面编号
     */
    public String getHdnGhsCd() {

        return hdnGhsCd;
    }

	/**
     * 隐藏供货商所属编号. <br>
     */
    private String hdnGhsClassifyCd;

    /**
     * 设定隐藏供货商所属编号. <br>
     *
     * @param hdnGhsCd 隐藏供货商所属编号
     */
    public void setHdnGhsClassifyCd(String hdnGhsClassifyCd) {
		this.hdnGhsClassifyCd = hdnGhsClassifyCd;
	}

    /**
     * 取得隐藏供货商所属编号. <br>
     *
     * @return 隐藏供货商所属编号
     */
	public String getHdnGhsClassifyCd() {
		return hdnGhsClassifyCd;
	}
	
	/**
	 * 有效标志
	 */
	private String hdnValidFlag;
	
	/**
	 * 设定有效标志 <br>
	 * @param hdnValidFlag 有效标志
	 */
	public void setHdnValidFlag(String hdnValidFlag){
		this.hdnValidFlag = hdnValidFlag;
	}
	
	/**
	 * 获得有效标志 <br>
	 * @return 有效标志
	 */
	public String getHdnValidFlag(){
		return this.hdnValidFlag;
	}

    /**
     * 画面初期化
     * @return 跳转路径
     * @throws Exception
     */
    public String show() throws Exception{

        // 执行业务处理
        BLogicResult result = businessLogic.showGhsList();

        // 处理结果
        if(evaluateBLogicResult(result)) {
            GhsBL01OutputDTO out = (GhsBL01OutputDTO)result.getObject();
            setGhsInfo(null);
            setGhsList(out.getGhsList());
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
       GhsBLInputDTO ghsBLInputDTO =  new GhsBLInputDTO();

       // Bean类型转换
       BeanUtils.copyProperties(ghsInfo, ghsBLInputDTO);

       // 执行业务处理
       BLogicResult result = businessLogic.saveGhs(ghsBLInputDTO);

       // 处理结果
       if(evaluateBLogicResult(result)) {
           GhsBL01OutputDTO out = (GhsBL01OutputDTO)result.getObject();
           setGhsInfo(null);
           setGhsList(out.getGhsList());
       }
       return result.getResultString();
    }

    /**
     * 更新有效标志按钮
     * @return 跳转路径
     * @throws Exception
     */
    public String updateValidFlag() throws Exception{
       // 执行业务处理
       BLogicResult result = businessLogic.updateValidFlag(hdnGhsCd, hdnGhsClassifyCd, hdnValidFlag);

       // 处理结果
       if(evaluateBLogicResult(result)) {
           GhsBL01OutputDTO out = (GhsBL01OutputDTO)result.getObject();
           setGhsInfo(null);
           setGhsList(out.getGhsList());
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
        BLogicResult result = businessLogic.showGhsObject(hdnGhsCd, hdnGhsClassifyCd);

        // 处理结果
        if(evaluateBLogicResult(result)) {
            GhsBL02OutputDTO out = (GhsBL02OutputDTO)result.getObject();
            setGhsInfo(out.getGhsInfo());
            setGhsList(out.getGhsList());
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
        BLogicResult result = businessLogic.removeGhs(hdnGhsCd, hdnGhsClassifyCd);

        // 处理结果
        if (evaluateBLogicResult(result)) {
            GhsBL01OutputDTO out = (GhsBL01OutputDTO)result.getObject();
            setGhsInfo(null);
            setGhsList(out.getGhsList());
        }
        return result.getResultString();
    }
}
