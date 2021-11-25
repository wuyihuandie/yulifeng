package com.zhirong.ncdata.common.entity;

import lombok.Data;

/***********************************************************************
 * 文件说明：统计地图请求实体类
 * 创建信息：2019/03/02 12:50
 * 变更履历：
 ***********************************************************************/
@Data
public class StatisticsMapReq {

    public static final String PROVINCE_HEAD_CODE_JX = "36";    // 江西省头部编码

    public static final String AREA_LEVEL_CITY = "2";    // 地市级

    private String provinceHeadCode;    // 省份头部编码（若传入该参数，则查询该省下数据）  列如：36****为江西省
    private String year;    // 查询年份
    private String areaLevel;    // 区域等级
    private String areaCode;    // 区域等级
    private String areaName;    // 区域名


}
