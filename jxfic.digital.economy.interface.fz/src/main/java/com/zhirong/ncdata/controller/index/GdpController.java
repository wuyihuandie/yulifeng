package com.zhirong.ncdata.controller.index;

import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.index.GdpService;
import com.zhirong.ncdata.utils.ParamJsonToMap;
import com.zhirong.ncdata.utils.RedisUtils;
import com.zhirong.ncdata.utils.StrUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @title
 * @Author Strive_Li
 * @Description gdp控制层
 * @Date 2020/8/12 10:52
 */
@Controller
@RequestMapping(value = "/gdpController")
public class GdpController extends BaseController {

    @Autowired
    private GdpService gdpService;
    @Autowired
    private RedisUtils redisUtils;

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title dataOverviewJson
     * @Author Strive_Li
     * @Description gdp数据总览
     * @Date 2020/8/12 14:43
     */
    @ResponseBody
    @RequestMapping(value = "/dataOverviewJson",produces = "text/html;charset=UTF-8")
    public String dataOverviewJson(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("area") && pd.containsKey("year") && StrUtils.isNotEmpty(pd.getString("area")) && StrUtils.isNotEmpty(pd.getString("year"))
         && pd.containsKey("areaType") && StrUtils.isNotEmpty(pd.getString("areaType"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                //根据年份和区域查询gdp数据总览 --1.全国  2.长江三角洲 3.珠江三角洲 4.中部六省
                if("2".equals(pd.getString("areaType"))||"3".equals(pd.getString("areaType"))) {//2 3需要带上抚州市排名
                    list = gdpService.querydataOverviewByAreaAndYear1(pd);
                    //}else if("2".equals(pd.getString("areaType"))||"3".equals(pd.getString("areaType"))||"5".equals(pd.getString("areaType"))){
                }else{
                    list = gdpService.querydataOverviewByAreaAndYear(pd);
                }
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        map.put("data", list);
        return new Gson().toJson(map);
    }

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title dataSumAndSpeed
     * @Author Strive_Li
     * @Description GDP总量和总增速
     * @Date 2020/8/12 14:43
     */
    @ResponseBody
    @RequestMapping(value = "/dataSumAndSpeed",produces = "text/html;charset=UTF-8")
    public String dataSumAndSpeed(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if ( pd.containsKey("year") &&  StrUtils.isNotEmpty(pd.getString("year"))
                && pd.containsKey("areaType") && StrUtils.isNotEmpty(pd.getString("areaType"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                //根据年份和区域查询gdp数据总览 --1.全国  2.长江三角洲 3.珠江三角洲 4.中部六省
                if("1".equals(pd.getString("areaType"))||"4".equals(pd.getString("areaType"))) {
                    list = gdpService.dataSumAndSpeed(pd);//全国和中部六省
                    DecimalFormat df = new DecimalFormat("#,###.00");
                    if (list.size() > 0) {
                        list.get(0).put("GDP_LJZ", df.format(list.get(0).get("GDP_LJZ")));
                        list.get(0).put("gdpNum", list.get(0).get("GDP_LJZ"));
                        list.get(0).put("avgGdpNum", df.format(list.get(0).get("AVGGDPNUM")));
                        list.get(0).put("growthRate", list.get(0).get("GDP_LJTB"));
                        list.get(0).remove("GDP_LJZ");
                        list.get(0).remove("GDP_LJTB");
                        list.get(0).remove("AVGGDPNUM");
                    }
                    //}else if("2".equals(pd.getString("areaType"))||"3".equals(pd.getString("areaType"))||"5".equals(pd.getString("areaType"))){
                }else{
                    list = gdpService.dataSumAndSpeed1(pd);//长江三角洲和珠江三角洲
                    DecimalFormat df = new DecimalFormat("#,###.00");
                    if(list.size()>0){
                    list.get(0).put("GDP_LJZ",df.format(list.get(0).get("GDP_LJZ")));
                    list.get(0).put("gdpNum",list.get(0).get("GDP_LJZ"));
                    list.get(0).put("avgGdpNum",df.format(list.get(0).get("AVGGDPNUM")));
                    list.get(0).put("growthRate",list.get(0).get("GDP_LJTB"));
                    list.get(0).remove("GDP_LJZ");
                    list.get(0).remove("GDP_LJTB");
                    list.get(0).remove("AVGGDPNUM");
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        map.put("data", list);
        return new Gson().toJson(map);
    }
    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title totalOutPutvalue
     * @Author Strive_Li
     * @Description 生产总值占比
     * @Date 2020/8/12 14:43
     */
    @ResponseBody
    @RequestMapping(value = "/totalOutPutvalue",produces = "text/html;charset=UTF-8")
    public String totalOutPutvalue(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if ( pd.containsKey("year") &&  StrUtils.isNotEmpty(pd.getString("year"))
                && pd.containsKey("areaType") && StrUtils.isNotEmpty(pd.getString("areaType"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                //根据年份和区域查询gdp数据总览 --1.全国  2.长江三角洲 3.珠江三角洲 4.中部六省
                if("1".equals(pd.getString("areaType"))||"4".equals(pd.getString("areaType"))) {
                    list = gdpService.totalOutPutvalue(pd);//全国和中部六省
                    //}else if("2".equals(pd.getString("areaType"))||"3".equals(pd.getString("areaType"))||"5".equals(pd.getString("areaType"))){
                }else{
                    list = gdpService.totalOutPutvalue1(pd);//长江三角洲和珠江三角洲
                }
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
//        HashMap map1 =new HashMap();
//        map1.put("dataNames",list.get(0).get("dataNames"));
//        map1.put("dataValues",list.get(0).get("dataValues"));
//        map.put("data", map1);
        map.put("data", list);
        return new Gson().toJson(map);
    }
    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title growthTrend
     * @Author Strive_Li
     * @Description GDP增长趋势（近五年）
     * @Date 2020/8/12 14:43
     */
    @ResponseBody
    @RequestMapping(value = "/growthTrend",produces = "text/html;charset=UTF-8")
    public String growthTrend(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("areaType") && StrUtils.isNotEmpty(pd.getString("areaType"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                //根据年份和区域查询gdp数据总览 --1.全国  2.长江三角洲 3.珠江三角洲 4.中部六省
                if("1".equals(pd.getString("areaType"))||"4".equals(pd.getString("areaType"))) {
                    list = gdpService.growthTrend(pd);//全国和中部六省
                    //}else if("2".equals(pd.getString("areaType"))||"3".equals(pd.getString("areaType"))){
                }else{
                    list = gdpService.growthTrend1(pd);//长江三角洲和珠江三角洲
                }
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
//        HashMap map1 =new HashMap();
//        map1.put("dataYears",list.get(0).get("dataYears"));
//        map1.put("dataValues",list.get(0).get("dataValues"));
//        map.put("data", map1);
        map.put("data", list);
        return new Gson().toJson(map);
    }
    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title growthTrend
     * @Author Strive_Li
     * @Description GDP排名
     * @Date 2020/8/12 14:43
     */
    @ResponseBody
    @RequestMapping(value = "/ranking",produces = "text/html;charset=UTF-8")
    public String ranking(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("year") && StrUtils.isNotEmpty(pd.getString("year"))&&pd.containsKey("areaType") && StrUtils.isNotEmpty(pd.getString("areaType"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                //根据年份和区域查询gdp数据总览 --1.全国  2.长江三角洲 3.珠江三角洲 4.中部六省
                if("1".equals(pd.getString("areaType"))||"4".equals(pd.getString("areaType"))) {
                    list = gdpService.ranking(pd);//全国和中部六省
                    //}else if("2".equals(pd.getString("areaType"))||"3".equals(pd.getString("areaType"))||"5".equals(pd.getString("areaType"))){
                }else{
                    list = gdpService.ranking1(pd);//长江三角洲和珠江三角洲
                }
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        HashMap map1 =new HashMap();
        map1.put("rankList",list);
        map.put("data", map1);
        return new Gson().toJson(map);
    }

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title growthTrend
     * @Author Strive_Li
     * @Description GDP增加值排名
     * @Date 2020/8/12 14:43
     */
    @ResponseBody
    @RequestMapping(value = "/zjzRanking",produces = "text/html;charset=UTF-8")
    public String zjzRanking(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("year") && StrUtils.isNotEmpty(pd.getString("year"))&&pd.containsKey("areaType") && StrUtils.isNotEmpty(pd.getString("areaType"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                //根据年份和区域查询gdp数据总览 --1.全国  2.长江三角洲 3.珠江三角洲 4.中部六省
                if("1".equals(pd.getString("areaType"))||"4".equals(pd.getString("areaType"))) {
                    list = gdpService.zjzRanking(pd);//全国和中部六省
                }else{
                    list = gdpService.zjzRanking1(pd);//长江三角洲和珠江三角洲
                }
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        HashMap map1 =new HashMap();
        map1.put("rankList",list);
        map.put("data", map1);
        return new Gson().toJson(map);
    }

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getYears
     * @Author Strive_Li
     * @Description 获取年份列表
     * @Date 2020/8/14 14:46
     */
    @ResponseBody
    @RequestMapping(value = "/getYears",produces = "text/html;charset=UTF-8")
    public String getYears(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                list = gdpService.getYears(pd);//获取年份列表
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        HashMap map1 =new HashMap();
        map1.put("yearList",list);
        map.put("data", map1);
        return new Gson().toJson(map);
    }
    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getProvinceCityData
     * @Author Strive_Li
     * @Description 获取省市数据(4个区域数据)
     * @Date 2020/8/14 14:46
     */
    @ResponseBody
    @RequestMapping(value = "/getProvinceCityData",produces = "text/html;charset=UTF-8")
    public String getProvinceCityData(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("areaType") && StrUtils.isNotEmpty(pd.getString("areaType"))) {
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        try {
            list = gdpService.getProvinceCityData(pd);//获取省市数据
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        HashMap map1 =new HashMap();
        map1.put("areaMapData",list);
        map.put("data", map1);
        return new Gson().toJson(map);
    }
}
