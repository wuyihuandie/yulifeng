package com.zhirong.ncdata.utils;

import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.thymeleaf.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PageUtil {

    private static Logger logger = LoggerFactory.getLogger(PageUtil.class);

    /**
     *  获取当前页数
     * @return
     */
    public static int getPageIndex(String start, String length){
        int pageIndex = 1;
        if(null == length){
            length = "10";
        }
        if(StringUtils.isEmpty(start)){
            start = "0";
        }
        switch (start){
            case "0":
                break;
            default:
                if(null == start){
                    pageIndex = 1;
                }else if(start .equals("null")){
                    pageIndex = 1;
                }else {
                    pageIndex += Integer.valueOf(start)/Integer.valueOf(length);
                }
                break;
        }
        return pageIndex;
    }

    public static Map getData(PageInfo pageInfo){
        Map data = new HashMap();
        data.put("total",pageInfo.getTotal());
        data.put("rows",pageInfo.getList());
        return data;
    }


    public static Map getData1(PageInfo pageInfo,Map param){
        Map data = new HashMap();
        data.put("total",pageInfo.getTotal());
        // 原始数据
        List list = pageInfo.getList();
        // bootstrap-table  数据
        List tbdataList = new ArrayList<>();
        // 每次循环获取的数据
        Map data1 = new HashMap();
        String str = "";
        for (int i = 0; i < list.size(); i++) {
            // 每次循环的数据
            Map map = (Map) list.get(i);

            if((null == str || str.isEmpty()) || ( (map.containsKey("REGION")&&str.indexOf(map.get("REGION")+"")!=-1) || (map.containsKey("INDICATORS")&&str.indexOf(map.get("INDICATORS")+"")!=-1))){
                if(str.isEmpty() && map.containsKey("REGION")){
                    str = map.get("TIME") + "" + map.get("REGION");
                }else if(str.isEmpty() && map.containsKey("INDICATORS")){
                    str = map.get("TIME") + "" + map.get("INDICATORS");
                }
                if(map.containsKey("ADDED_GDP") && param.containsKey("tableName") && "ZR_INDIC_FGYJJZZZGDP".equals(param.get("tableName"))){
                    data1.put(map.get("TIME")+"",map.get("ADDED_GDP")+"");
                }else if(map.containsKey("BUYBACKS")){
                    data1.put(map.get("TIME")+"",map.get("BUYBACKS")+"");
                }else if(map.containsKey("TAXES")){
                    data1.put(map.get("TIME")+"",map.get("TAXES")+"");
                }else if(map.containsKey("SYNUMBER")){
                    data1.put(map.get("TIME")+"",map.get("SYNUMBER")+"");
                }else if(map.containsKey("CKNUMBER")){
                    data1.put(map.get("TIME")+"",map.get("CKNUMBER")+"");
                }else if(map.containsKey("CONTRIBUTION")){
                    data1.put(map.get("TIME")+"",map.get("CONTRIBUTION")+"");
                }else if(map.containsKey("ADDED")){
                    data1.put(map.get("TIME")+"",map.get("ADDED")+"");
                }
                if(!data1.containsValue(map.get("C_NAME") + "(" + map.get("UNITS") + ")")){
                    data1.put("c_name", map.get("C_NAME") + "(" + map.get("UNITS") + ")");
                }
                if(param.containsKey("tableName") && "ZR_INDIC_FGYJJZZZGDP".equals(param.get("tableName"))){
                    data1.put("c_name", map.get("C_NAME") + "(%)");
                }
            }else{
                tbdataList.add(data1);
                data1 = new HashMap();
                if(map.containsKey("REGION")){
                    str = map.get("TIME") + "" + map.get("REGION");
                }else if(map.containsKey("INDICATORS")){
                    str = map.get("TIME") + "" + map.get("INDICATORS");
                }
                if(map.containsKey("ADDED_GDP") && param.containsKey("tableName") && "ZR_INDIC_FGYJJZZZGDP".equals(param.get("tableName"))){
                    data1.put(map.get("TIME")+"",map.get("ADDED_GDP")+"");
                }else if(map.containsKey("BUYBACKS")){
                    data1.put(map.get("TIME")+"",map.get("BUYBACKS")+"");
                }else if(map.containsKey("TAXES")){
                    data1.put(map.get("TIME")+"",map.get("TAXES")+"");
                }else if(map.containsKey("SYNUMBER")){
                    data1.put(map.get("TIME")+"",map.get("SYNUMBER")+"");
                }else if(map.containsKey("CKNUMBER")){
                    data1.put(map.get("TIME")+"",map.get("CKNUMBER")+"");
                }else if(map.containsKey("CONTRIBUTION")){
                    data1.put(map.get("TIME")+"",map.get("CONTRIBUTION")+"");
                }else if(map.containsKey("ADDED")){
                    data1.put(map.get("TIME")+"",map.get("ADDED")+"");
                }
                if(!data1.containsValue(map.get("C_NAME") + "(" + map.get("UNITS") + ")")){
                    data1.put("c_name", map.get("C_NAME") + "(" + map.get("UNITS") + ")");
                }
                if(param.containsKey("tableName") && "ZR_INDIC_FGYJJZZZGDP".equals(param.get("tableName"))){
                    data1.put("c_name", map.get("C_NAME") + "(%)");
                }
            }
        }
        if(!data1.isEmpty() && !tbdataList.contains(data1)){
            tbdataList.add(data1);
        }
        data.put("rows",tbdataList);
        return data;
    }

    public static Map getData2(PageInfo pageInfo){
        Map data = new HashMap();
        data.put("total",pageInfo.getTotal());

        List<String> keys = new ArrayList<>();

        List<Map<String, Object>> dataList = new ArrayList<>();
        List<String> thdataList = new ArrayList<>();

        List<Map<String, Object>> list = pageInfo.getList();
        List<Map<String, Object>> list1 = new ArrayList<>();
        String times = "";
        Map<String, Object> data1 = new HashMap<>();
        for (int i = 0; i < list.size(); i++) {
            //Map<String, Object> data1 = new HashMap<>();
            Map map = list.get(i);

            String c_name = map.get("C_NAME")+"";

            String time = map.get("TIME")+"";

            if((null == thdataList || thdataList.size() == 0 ) || !thdataList.contains(c_name)){
                thdataList.add(c_name);
                times += time;

                if(null != list1 & list1.size() >0 ){
                    //data1 = new HashMap<>();
                    //data1.put(c_name,list1);
                    //data1.put("c_name",c_name + "(" + map.get("UNITS") + ")");
                    data1.put("c_name",c_name);
                    list1.add(data1);

                    dataList.add(data1);
                    data1 = new HashMap<>();
                }


                list1 = new ArrayList<>();
                //data1 = new HashMap<>();

                if(map.containsKey("ADDED")){
                    data1.put(map.get("TIME")+"",map.get("ADDED")+"");
                }else if(map.containsKey("BUYBACKS")){
                    data1.put(map.get("TIME")+"",map.get("BUYBACKS")+"");
                }else if(map.containsKey("TAXES")){
                    data1.put(map.get("TIME")+"",map.get("TAXES")+"");
                }else if(map.containsKey("SYNUMBER")){
                    data1.put(map.get("TIME")+"",map.get("SYNUMBER")+"");
                }else if(map.containsKey("CKNUMBER")){
                    data1.put(map.get("TIME")+"",map.get("CKNUMBER")+"");
                }else if(map.containsKey("CONTRIBUTION")){
                    data1.put(map.get("TIME")+"",map.get("CONTRIBUTION")+"");
                }

//                data1.put(map.get("TIME")+"",map.get("ADDED")+"");
                list1.add(data1);
            }


            if(thdataList.contains(c_name) && times.indexOf(time) == -1){
                if(map.containsKey("ADDED")){
                    data1.put(map.get("TIME")+"",map.get("ADDED")+"");
                }else if(map.containsKey("BUYBACKS")){
                    data1.put(map.get("TIME")+"",map.get("BUYBACKS")+"");
                }else if(map.containsKey("TAXES")){
                    data1.put(map.get("TIME")+"",map.get("TAXES")+"");
                }else if(map.containsKey("SYNUMBER")){
                    data1.put(map.get("TIME")+"",map.get("SYNUMBER")+"");
                }else if(map.containsKey("CKNUMBER")){
                    data1.put(map.get("TIME")+"",map.get("CKNUMBER")+"");
                }else if (map.containsKey("CONTRIBUTION")){
                    data1.put(map.get("TIME")+"",map.get("CONTRIBUTION")+"");
                }
//                data1.put(map.get("TIME")+"",map.get("ADDED")+"");
                list1.add(data1);
            }
        }
        data.put("rows",dataList);
        return data;
    }
}
