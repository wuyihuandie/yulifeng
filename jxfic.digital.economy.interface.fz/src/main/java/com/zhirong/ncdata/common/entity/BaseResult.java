package com.zhirong.ncdata.common.entity;

import lombok.Data;

/***********************************************************************
 * 文件说明：应用项目返回类型
 * 创建信息： 2019/01/18 10:51
 * 变更履历：
 ***********************************************************************/
@Data
public class BaseResult {

    private int code;   // 状态码（0表示正常）
    private Object data;    // 数据
    private String msg; // 信息
    private String error;   // 系统返回的错误详情

    public BaseResult(int code, Object data, String msg, String error) {
        this.code = code;
        this.data = data;
        this.msg = msg;
        this.error = error;
    }

    public BaseResult(int code) {
        this.code = code;
        if(code == 500){
            msg = "系统错误，请联系管理员";
        }
    }

    public BaseResult(Object data) {
        this();
        this.data = data;
    }

    public BaseResult() {
        this.code = 0;
        this.msg = "操作成功";
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
