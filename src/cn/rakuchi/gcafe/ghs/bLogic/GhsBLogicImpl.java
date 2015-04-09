package cn.rakuchi.gcafe.ghs.bLogic;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;

import cn.rakuchi.fw.service.BLogicMessage;
import cn.rakuchi.fw.service.BLogicMessages;
import cn.rakuchi.fw.service.BLogicResult;
import cn.rakuchi.gcafe.commons.constants.Constants;
import cn.rakuchi.gcafe.ghs.dLogic.GhsDLogic;
import cn.rakuchi.gcafe.ghs.dto.GhsBL01OutputDTO;
import cn.rakuchi.gcafe.ghs.dto.GhsBL02OutputDTO;
import cn.rakuchi.gcafe.ghs.dto.GhsBLInputDTO;
import cn.rakuchi.gcafe.ghs.dto.GhsDLInputDTO;
import cn.rakuchi.gcafe.ghs.dto.GhsDLOutputDTO;
import cn.rakuchi.gcafe.ghs.po.GhsInfo;

public class GhsBLogicImpl implements GhsBLogic {

    /**
     * 输入检查.输入对象不存在
     */
    private static final String MSG_INPUT_NULL = "输入值不能为空！";

    /**
     * 输入检查.供货商编号不存在
     */
    private static final String MSG_INPUT_GHSCD_NULL = "供货商编号不能为空！";

    /**
     * 输入检查.供货商所属编号不存在
     */
    private static final String MSG_INPUT_GHSCLASSIFYCD_NULL = "供货商编号不能为空！";

    /**
     * 输入检查.供货商名称不存在
     */
    private static final String MSG_INPUT_GHSNAME_NULL = "供货商名称不能为空！";

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
    private GhsDLogic ghsDLogic;

    /**
     * 设定业务用DLogic. <br>
     *
     * @param ghsDLogic 业务用DLogic
     */
    public void setGhsDLogic(GhsDLogic ghsDLogic) {

        this.ghsDLogic = ghsDLogic;
    }

    /**
     * 查询供货商列表
     * @return 查询结果
     */
    public BLogicResult showGhsList() {

        // 初始化返回结果
        BLogicResult result = new BLogicResult();
        GhsBL01OutputDTO out = new GhsBL01OutputDTO();
        out.setGhsList(showAllGhsList());
        result.setObject(out);
        result.setResultString(Constants.SUCCESS);
        return result;
    }

    /**
     * 根据供货商编号查询供货商
     * @param ghsCd 供货商编号
     * @return 查询结果
     */
    public BLogicResult showGhsObject(String ghsCd, String ghsClassifyCd) {

        // 初始化返回结果
        BLogicResult result = new BLogicResult();
        GhsBL02OutputDTO out = new GhsBL02OutputDTO();

        // 根据ghsCd, ghsClassifyCd查询
        GhsDLOutputDTO ghsDLOutputDTO =
                ghsDLogic.selectGhsForObject(ghsCd, ghsClassifyCd);

        // 判断返回结果
        if (ghsDLOutputDTO.getGhsList() != null
                && ghsDLOutputDTO.getGhsList().size() == 1) {
            out.setGhsInfo(ghsDLOutputDTO.getGhsList().get(0));
        }

        // 查询列表
        out.setGhsList(showAllGhsList());
        result.setObject(out);
        result.setResultString(Constants.SUCCESS);
        return result;
    }

    /**
     * 保存供货商 <br>
     * 1. 验证表单数据 <br>
     * 2. 根据查询结果，决定save or update <br>
     * 2-1. 普通更新 <br>
     * 2-2. 更新为全部 <br>
     * 2-3. 普通添加 <br>
     * 2-4. 添加全部 <br>
     * 
     * @param param 输入供货商消息
     * @return 保存结果
     */
    public BLogicResult saveGhs(GhsBLInputDTO param) {

        // 初始化返回结果
        BLogicResult result = new BLogicResult();

        // 初始化消息
        BLogicMessages messages = new BLogicMessages();

        /* 输入验证 */
        boolean checkFlg = true;
        if (param == null) {
            checkFlg = false;

            // 消息设定
            messages.add(Constants.ERROR, new BLogicMessage(
                    MSG_INPUT_NULL, false));
        } else if (param.getGhsCd() == null
                || Constants.BLANK.equals(param.getGhsCd())) {
            checkFlg = false;

            // 消息设定
            messages.add(Constants.ERROR, new BLogicMessage(
                    MSG_INPUT_GHSCD_NULL, false));
        } else if (param.getGhsClassifyCd() == null
                || Constants.BLANK.equals(param.getGhsClassifyCd())) {
            checkFlg = false;

            // 消息设定
            messages.add(Constants.ERROR, new BLogicMessage(
                    MSG_INPUT_GHSCLASSIFYCD_NULL, false));
        } else if (param.getGhsName() == null
                || Constants.BLANK.equals(param.getGhsName())) {
            checkFlg = false;

            // 消息设定
            messages.add(Constants.ERROR, new BLogicMessage(
                    MSG_INPUT_GHSNAME_NULL, false));
        }

        if (!checkFlg) {
            result.setMessages(messages);
            result.setResultString(Constants.SUCCESS);
            return result;
        }

        // 待操作数据集合
        List<GhsBLInputDTO> params = new ArrayList<GhsBLInputDTO>();
        
        // 供货商性质判断
        if(param.getGhsClassifyCd().trim().equals("00")){
        	GhsBLInputDTO zydGhsBLInputDTO = new GhsBLInputDTO();
        	BeanUtils.copyProperties(param, zydGhsBLInputDTO);
        	zydGhsBLInputDTO.setGhsClassifyCd("01");
        	
        	GhsBLInputDTO jmdGhsBLInputDTO = new GhsBLInputDTO();
        	BeanUtils.copyProperties(param, jmdGhsBLInputDTO);
        	jmdGhsBLInputDTO.setGhsClassifyCd("02");
        	
        	params.add(jmdGhsBLInputDTO);
        	params.add(zydGhsBLInputDTO);
        	
        }else{
        	params.add(param);
        }
        
        // 对集合中的数据遍历，分别进行添加或修改操作
        for(int i=0; i<params.size(); i++){
        	param = params.get(i);

            // 根据GhsCd及GhsClassifyCd查询是否已存在该数据
            GhsDLOutputDTO ghsDLOutputDTO =
                    ghsDLogic.selectGhsForObject(param.getGhsCd(), param.getGhsClassifyCd());
            if(ghsDLOutputDTO.getGhsList() != null
                    && ghsDLOutputDTO.getGhsList().size() == 1){
                /* 修改操作 */
            	
                // 初期化参数
                GhsDLInputDTO ghsDLInputDTO = new GhsDLInputDTO();

                // Bean类型转换
                BeanUtils.copyProperties(
                        ghsDLOutputDTO.getGhsList().get(0), ghsDLInputDTO);
                BeanUtils.copyProperties(param, ghsDLInputDTO);

                // 执行修改
                boolean successFlg = ghsDLogic.updateGhs(ghsDLInputDTO);

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
            }else{
            	/* 添加操作 */

                // 初期化参数
                GhsDLInputDTO ghsDLInputDTO = new GhsDLInputDTO();

                // Bean类型转换
                BeanUtils.copyProperties(param, ghsDLInputDTO);
                ghsDLInputDTO.setValidFlag("1");

                // 执行添加
                boolean successFlg = ghsDLogic.insertGhs(ghsDLInputDTO);

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
        }

        GhsBL01OutputDTO out = new GhsBL01OutputDTO();
        out.setGhsList(showAllGhsList());
        result.setObject(out);
        result.setMessages(messages);
        result.setResultString(Constants.SUCCESS);
        return result;
    }

    /**
     * 保存供货商 <br>
     * 1. 验证表单数据 <br>
     * 2. 根据查询结果，决定save or update <br>
     * @param param 输入供货商消息
     * @return 保存结果
     */
    @Override
    public BLogicResult updateValidFlag(String ghsCd, String ghsClassifyCd, String validFlag) {

        // 初始化返回结果
        BLogicResult result = new BLogicResult();

        // 初始化消息
        BLogicMessages messages = new BLogicMessages();

        // 根据GhsCd及GhsClassifyCd查询
        GhsDLOutputDTO ghsDLOutputDTO =
                ghsDLogic.selectGhsForObject(ghsCd, ghsClassifyCd);

        // 修改操作
        // 初期化参数
        GhsDLInputDTO ghsDLInputDTO = new GhsDLInputDTO();
        // Bean类型转换
        BeanUtils.copyProperties(
                ghsDLOutputDTO.getGhsList().get(0), ghsDLInputDTO);
        // 更换validFlag
        ghsDLInputDTO.setValidFlag(validFlag);

        // 执行修改
        boolean successFlg = ghsDLogic.updateGhs(ghsDLInputDTO);

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

        GhsBL01OutputDTO out = new GhsBL01OutputDTO();
        out.setGhsList(showAllGhsList());
        result.setObject(out);
        result.setMessages(messages);
        result.setResultString(Constants.SUCCESS);
        return result;
    }

    /**
     * 删除供货商
     * @param ghsCd 供货商编号
     * @return 删除结果
     */
    public BLogicResult removeGhs(String ghsCd, String ghsClassifyCd) {

        // 初始化返回结果
        BLogicResult result = new BLogicResult();

        // 初始化消息
        BLogicMessages messages = new BLogicMessages();

        // 根据ghsCd, ghsClassifyCd查询
        GhsDLOutputDTO ghsDLOutputDTO =
                ghsDLogic.selectGhsForObject(ghsCd, ghsClassifyCd);

        // 判断是否存在
        if (ghsDLOutputDTO.getGhsList() != null
                && ghsDLOutputDTO.getGhsList().size() == 1) {

            // 初期化参数
            GhsDLInputDTO ghsDLInputDTO = new GhsDLInputDTO();

            // Bean类型转换
            BeanUtils.copyProperties(
                    ghsDLOutputDTO.getGhsList().get(0), ghsDLInputDTO);

            // 执行修改
            boolean successFlg = ghsDLogic.deleteGhs(ghsDLInputDTO);

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

        GhsBL01OutputDTO out = new GhsBL01OutputDTO();
        out.setGhsList(showAllGhsList());
        result.setMessages(messages);
        result.setObject(out);
        result.setResultString(Constants.SUCCESS);
        return result;
    }

    /**
     * 取得所有供货商
     * @return 所有供货商
     */
    private List<GhsInfo> showAllGhsList() {
        GhsDLOutputDTO out = ghsDLogic.selectGhsForList();
        if (out != null) {
            return out.getGhsList();
        }
        return new ArrayList<GhsInfo>();
    }
}