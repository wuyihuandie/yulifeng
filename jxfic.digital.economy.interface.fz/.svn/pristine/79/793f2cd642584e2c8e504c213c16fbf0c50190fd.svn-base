package com.zhirong.ncdata.utils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.zhirong.ncdata.common.entity.Page;
import com.zhirong.ncdata.common.entity.PageData;

import java.util.List;

/**
 * @Author 黄宇豪
 * @Description json格式转成map
 * @Date 16:38 2020/8/9
 * @Param
 * @return
 **/
public class ParamJsonToMap {
    public PageData toMap(String param){
        PageData pd = new PageData();
        if(StrUtils.isNotEmpty(param)){
            pd = new Gson().fromJson(param, new TypeToken<PageData>() {
            }.getType());//json字符串转对象
        }
        return pd;
    }
}
