package com.zhirong.ncdata.common.entity;

import lombok.Data;

/***********************************************************************
 * 文件说明：统计地图实体类
 * 创建信息： 2019/03/02 12:09
 * 变更履历：
 ***********************************************************************/
@Data
public class StatisticsMap {
    private Integer value;    //   企业数量
    private String areaCode;    //   区域编码
    private String name;    //   区域名       与echarts的地图js文件对应
//    private SeriesDataLabel label;
}
