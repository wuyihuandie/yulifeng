package com.zhirong.ncdata.common.entity;

import lombok.Data;

import java.util.List;

/***********************************************************************
 * 文件说明：layui表格参数类，用于返回给layui生成列表表格
 * 创建信息： 2019/01/10 9:10
 * 变更履历：
 ***********************************************************************/
@Data
public class LayuiResult {

    public static final Integer DATA_STATUS_VERIFY_ERROR = 400;   // 错误码为400，为后台验证未通过
    public static final Integer DATA_STATUS_DH_ERROR = 401;   // 错误码为401，大华接口调用错误
    public static final Integer DATA_STATUS_SYSTEM_ERROR = 500;   // 错误码为500，为系统错误

    public static final String MSG_SYSTEM_ERROR = "系统错误，请联系管理员";   // 错误码为500，为系统错误时，返回的信息
    public static final String MSG_DH_ERROR = "系统错误，请联系管理员";   // 错误码为401，为大华接口调用错误时，返回的信息

    private Integer code;    // 数据状态
    private String msg;     // 状态信息
    private Integer count;     // 数据总条数
    private Object data;     // 数据列表
    private Integer dataStatus;     // 数据真实状态

    public LayuiResult(){
        code = 0;
        dataStatus=0;
        count = 0;
    }

    public LayuiResult(BaseResult result){
        this();
        dataStatus = result.getCode();
        // 如果未继承TreeEntity，则code赋值
        if(!TreeEntity.class.isAssignableFrom(this.getClass())){
            code = result.getCode();
        }
        data = result.getData();
        msg = result.getMsg();
        if(data != null){
            if(data instanceof List){
                count = ((List) data).size();
            }else {
                count = 1;
            }
        }
    }

    public LayuiResult(List data) {
        this();
        this.data = data;
        msg = "";
        count = data != null ? data.size() : 0;
    }

    public LayuiResult(Page page) {
        this();
        this.data = page.getList();
        msg = "";
        count = Math.toIntExact(page.getCount());
    }

}
