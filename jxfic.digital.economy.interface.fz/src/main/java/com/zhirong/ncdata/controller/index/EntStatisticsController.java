package com.zhirong.ncdata.controller.index;

import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.Page;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.index.EntStatisticsService;
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
 * @Author 黄宇豪
 * @Description 市场主体分析接口
 * @Date 11:41 2020/8/12
 * @Param
 * @return
 **/
@Controller
@RequestMapping(value = "/entStatisticsController")
public class EntStatisticsController extends BaseController {

    @Autowired
    private EntStatisticsService entStatisticsService;
    @Autowired
    private RedisUtils redisUtils;

    /**
     * @Author 黄宇豪
     * @Description 市场主体数据总览
     * @Date 13:56 2020/8/12
     * @Param []
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/entDataOverview",produces = "text/html;charset=UTF-8")
    public String EntDataOverview(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        HashMap data = new HashMap();
        map.put("data",data);
        try {
            if(pd.get("area")!=null && StrUtils.isNotEmpty(pd.getString("area")) && //区域代码
                    pd.get("year")!=null && StrUtils.isNotEmpty(pd.getString("year")) && //年份
                    pd.get("areaType")!=null && StrUtils.isNotEmpty(pd.getString("areaType"))){ //地区标签
                PageData entpd = entStatisticsService.EntNum(pd);//查询市场主体数量
                if(entpd!=null){
                    pd.put("ENTTOTALSUM",Integer.valueOf(entpd.getString("ENTTOTALSUM")));
                    int rank = entStatisticsService.AreaEntRank(pd);//查询排名
                    data.put("rank",String.valueOf(rank+1));//排名

                    DecimalFormat df = new DecimalFormat("#,###");
                    Double ENTTOTALSUM = Double.parseDouble(entpd.getString("ENTTOTALSUM"));
                    //市场主体类型 1:个体总数 2:农民专业合作社总数 3:内资总数 4:外资总数
                    if(pd.get("entType") != null && StrUtils.isNotEmpty(pd.getString("entType"))){
                        pd.put("year",Integer.valueOf(pd.getString("year"))-1);
                        int thisYearENTTOTALSUM = Integer.valueOf(entpd.getString("ENTTOTALSUM"));
                        data.put("growthRate",String.valueOf(entStatisticsService.getENTTOTALZS(pd,thisYearENTTOTALSUM,0.0,"1")));//增速（%）
                    }else{
                        data.put("growthRate",entpd.get("ENTTOTALZS").toString());//增速（%）
                    }
                    DecimalFormat dfs=new DecimalFormat("0.0");//设置保留位数
                    data.put("growthRate",dfs.format(Double.parseDouble(data.get("growthRate").toString())));//增速（%）
                    data.put("entNum",df.format(ENTTOTALSUM));//市场主体总数
                    data.put("UNIT",entpd.get("UNIT").toString());//单位
                }else{
                    data.put("rank","");//排名
                    data.put("entNum","");//市场主体总数
                    data.put("growthRate","");//增速（%）
                    data.put("UNIT","");//单位
                }
            }else{
                map.put("status","10009");
                map.put("msg","接口内缺失必传的参数");
            }
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        return new Gson().toJson(map);
    }

    /**
     * @Author 黄宇豪
     * @Description 市场主体总量和总增速
     * @Date 17:37 2020/8/12
     * @Param []
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/entTotalAndGrowthRate",produces = "text/html;charset=UTF-8")
    public String EntTotalAndGrowthRate(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        HashMap data = new HashMap();
        map.put("data",data);
        try {
            if(pd.get("year")!=null && StrUtils.isNotEmpty(pd.getString("year")) && //年份
                    pd.get("areaType")!=null && StrUtils.isNotEmpty(pd.getString("areaType"))){ //地区标签
                PageData entPd = entStatisticsService.getEntTotal(pd);
                data.put("entTotal",entPd.get("entTotal"));//市场主体总数
                data.put("growthRate",entPd.get("growthRate"));//增速（%）
                data.put("UNIT",entPd.get("UNIT"));//单位
                data.put("entAvgNum",entPd.get("entAvgNum"));//市场主体平均数
                data.put("UNIT_AVG",entPd.get("UNIT_AVG"));//单位
            }else{
                map.put("status","10009");
                map.put("msg","接口内缺失必传的参数");
            }
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        return new Gson().toJson(map);
    }
    /**
     * @Author 黄宇豪
     * @Description 市场主体占比饼图数据
     * @Date 9:43 2020/8/13
     * @Param []
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/entProportionBar",produces = "text/html;charset=UTF-8")
    public String EntProportionBar(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        HashMap data = new HashMap();
        map.put("data",data);
        try {
            if(pd.get("year")!=null && StrUtils.isNotEmpty(pd.getString("year")) && //年份
                    pd.get("areaType")!=null && StrUtils.isNotEmpty(pd.getString("areaType"))){ //地区标签
                PageData barpd = entStatisticsService.entProportionBarData(pd);//市场主体占比饼图数据

                data.put("dataNames",barpd.get("dataNames"));//饼图legend名称
                data.put("dataValues",barpd.get("dataValues"));//饼图数据
            }else{
                map.put("status","10009");
                map.put("msg","接口内缺失必传的参数");
            }
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        return new Gson().toJson(map);
    }
    /**
     * @Author 黄宇豪
     * @Description 市场主体增长趋势（近五年）
     * @Date 16:02 2020/8/13
     * @Param []
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/entGrowthTrendFiveYear",produces = "text/html;charset=UTF-8")
    public String EntGrowthTrendFiveYear(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        HashMap data = new HashMap();
        map.put("data",data);
        try {
            if(pd.get("areaType")!=null && StrUtils.isNotEmpty(pd.getString("areaType"))){ //地区标签
                PageData entPd = entStatisticsService.getEntGrowthTrendFiveYearData(pd);
                data.put("dataNames",entPd.get("dataNames"));//折线图legend名称
                data.put("dataValues",entPd.get("dataValues"));//折线图数据
                data.put("UNIT",entPd.get("UNIT"));//单位
            }else{
                map.put("status","10009");
                map.put("msg","接口内缺失必传的参数");
            }
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        return new Gson().toJson(map);
    }
    /**
     * @Author 黄宇豪
     * @Description 市场主体排名
     * @Date 14:33 2020/8/13
     * @Param []
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/entNumsRank",produces = "text/html;charset=UTF-8")
    public String EntNumsRank(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        HashMap data = new HashMap();
        map.put("data",data);
        try {
            if(pd.get("year")!=null && StrUtils.isNotEmpty(pd.getString("year")) && //年份
                    pd.get("areaType")!=null && StrUtils.isNotEmpty(pd.getString("areaType"))){ //地区标签
                List<PageData> rankList = entStatisticsService.EntNumsRank(pd);//查询市场主体总量
                data.put("rankList",rankList);
                data.put("UNIT","户");
                if(rankList!=null && rankList.size()!=0){
                    for(PageData rank : rankList){//循环从list里取出单位
                        if(rank.get("UNIT")!=null && StrUtils.isNotEmpty(rank.getString("UNIT"))){
                            data.put("UNIT",rank.getString("UNIT"));
                            break;
                        }
                    }
                }
            }else{
                map.put("status","10009");
                map.put("msg","接口内缺失必传的参数");
            }
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        return new Gson().toJson(map);
    }
    /**
     * @Author 黄宇豪
     * @Description 市场主体分析可查询的年份
     * @Date 15:14 2020/8/14
     * @Param []
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/entYear",produces = "text/html;charset=UTF-8")
    public String entYear(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        HashMap data = new HashMap();
        map.put("data",data);
        try {
            List<String> yearList = entStatisticsService.EntYearList(pd);
            data.put("yearList",yearList);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        return new Gson().toJson(map);
    }
}
