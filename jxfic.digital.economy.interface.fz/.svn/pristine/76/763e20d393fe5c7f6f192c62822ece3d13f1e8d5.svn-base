package com.zhirong.ncdata.controller.index;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.common.utils.StringUtils;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.index.DigitalEconomyService;
import com.zhirong.ncdata.utils.ParamJsonToMap;
import com.zhirong.ncdata.utils.RedisUtils;
import com.zhirong.ncdata.utils.StrUtils;

/**
 * @author yanfeifan
 * @Package com.zhirong.ncdata.controller.index
 * @Description  数字经济controller层
 * @date 2020/8/12 10:11
 */
@Controller
@RequestMapping(value = "/digitalEconomyController")
public class DigitalEconomyController extends BaseController {

    @Autowired
    private DigitalEconomyService digitalEconomyService;
    @Autowired
    private RedisUtils redisUtils;


    /**
     * @param year   年份
     * @param area 区域码
     * @param areaType 地区标签（1 全国 2长江三角洲 3珠江三角洲 4中部六省）
    * @throws
    * @Author yanfeifan
    * @Description 数据经济预警总览
    **/
    @ResponseBody
    @RequestMapping(value = "/queryDigitalEconomyLJZAndZS",produces = "text/html;charset=UTF-8")
    public String queryDigitalEconomyLJZAndZS(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        //区域码
        String area = pd.getString("area");
        //年份
        String year = pd.getString("year");
        //地区标签
        String areaType = pd.getString("areaType");
        if( StringUtils.isBlank(area) || StringUtils.isBlank(year) || StringUtils.isBlank(areaType)){
            map.put("status","10009");
            map.put("msg","接口内缺失必传的参数");
            return new Gson().toJson(map);
        }
        try {
            list = digitalEconomyService.queryDigitalEconomyLJZAndZS(pd);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        map.put("data",list);
        return new Gson().toJson(map);
    }

    /**
     * @param year   年份
     * @param areaType 地区标签（1 全国 2长江三角洲 3珠江三角洲 4中部六省）
     * @throws
     * @Author yanfeifan
     * @Description 数字经济总量和总增速
     **/
    @ResponseBody
    @RequestMapping(value = "/queryDigitalEconomyZLAndZZS",produces = "text/html;charset=UTF-8")
    public String queryDigitalEconomyZLAndZZS(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        //年份
        String year = pd.getString("year");
        //地区标签
        String areaType = pd.getString("areaType");
        if(StringUtils.isBlank(year) || StringUtils.isBlank(areaType)){
            map.put("status","10009");
            map.put("msg","接口内缺失必传的参数");
            return new Gson().toJson(map);
        }
        try {
            if("1".equals(areaType)){
                //取全国数字经济数据
                list = digitalEconomyService.queryDigitalEconomyZLAndZZSByAll(pd);
            }else{
                list = digitalEconomyService.queryDigitalEconomyZLAndZZS(pd);
            }
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        map.put("data",list);
        return new Gson().toJson(map);
    }


    /**
     * @param year   年份
     * @param areaType 地区标签（1 全国 2长江三角洲 3珠江三角洲 4中部六省）
     * @param CONDITION 排序条件 (1 数字经济增加值   2 增速)
     * @throws 
     * @Author yanfeifan
     * @Description 数字经济占GDP的比重及增速
     * 2020 10.10 日 添加按增速 排名    //谌思宇
     * 
     **/
    @ResponseBody
    @RequestMapping(value = "/queryDigitalEconomyGDPBZAndZS",produces = "text/html;charset=UTF-8")
    public String queryDigitalEconomyGDPBZAndZS(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<List<Object>> list = new ArrayList<>();
        HashMap map = new HashMap();
        Map<String,Object> maps = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        //年份
        String year = pd.getString("year");
        //地区标签
        String areaType = pd.getString("areaType");
        if(StringUtils.isBlank(year) || StringUtils.isBlank(areaType)){
            map.put("status","10009");
            map.put("msg","接口内缺失必传的参数");
            return new Gson().toJson(map);
        }
        try {
            list = digitalEconomyService.queryDigitalEconomyGDPBZAndZS(pd);
            maps.put("dataValues",list);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }

        map.put("data",maps);
        return new Gson().toJson(map);
    }

    
    /**
     * @param year   年份
     * @param areaType 地区标签（1 全国 2长江三角洲 3珠江三角洲 4中部六省）
     * @throws 
     * @Author 谌思宇
     * @Description 数字经济占GDP的增速 排名数据
     * 2020 10.10 日 添加按增速 排名    //谌思宇
     * 
     **/
    @ResponseBody
    @RequestMapping(value = "/zjzRanking",produces = "text/html;charset=UTF-8")
    public String zjzRanking(){
    	PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        Map<String,Object> maps = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        //年份
        String year = pd.getString("year");
        //地区标签
        String areaType = pd.getString("areaType");
        if(StringUtils.isBlank(year) || StringUtils.isBlank(areaType)){
            map.put("status","10009");
            map.put("msg","接口内缺失必传的参数");
            return new Gson().toJson(map);
        }
        try {
            list = digitalEconomyService.queryDigitalEconomyPMByZs(pd);
            maps.put("rankList",list);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        map.put("data",maps);
        return new Gson().toJson(map);
    }
    
    /**
     * @param area   区域码
     * @param areaType 地区标签（1 全国 2长江三角洲 3珠江三角洲 4中部六省）
     * @throws
     * @Author yanfeifan
     * @Description 数字经济增长趋势
     **/
    @ResponseBody
    @RequestMapping(value = "/queryDigitalEconomyZZQS",produces = "text/html;charset=UTF-8")
    public String queryDigitalEconomyZZQS(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<>();
        HashMap map = new HashMap();
        Map<String,Object> maps = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        //地区标签
        String areaType = pd.getString("areaType");
        //区域码
        String area = pd.getString("area");
        if(StringUtils.isBlank(areaType)){
            map.put("status","10009");
            map.put("msg","接口内缺失必传的参数");
            return new Gson().toJson(map);
        }
        try {
            if("1".equals(areaType)){
                maps = digitalEconomyService.queryDigitalEconomyZZQSByAll(pd);
            }else{
                maps = digitalEconomyService.queryDigitalEconomyZZQS(pd);
            }
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        map.put("data",maps);
        return new Gson().toJson(map);
    }

    /**
     * @throws
     * @Author yanfeifan
     * @Description 数字经济排名
     **/
    @ResponseBody
    @RequestMapping(value = "/queryDigitalEconomyPM",produces = "text/html;charset=UTF-8")
    public String queryDigitalEconomyPM(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        Map<String,Object> maps = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        //年份
        String year = pd.getString("year");
        //地区标签
        String areaType = pd.getString("areaType");
        if(StringUtils.isBlank(year) || StringUtils.isBlank(areaType)){
            map.put("status","10009");
            map.put("msg","接口内缺失必传的参数");
            return new Gson().toJson(map);
        }
        try {
            list = digitalEconomyService.queryDigitalEconomyPM(pd);
            maps.put("rankList",list);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        map.put("data",maps);
        return new Gson().toJson(map);
    }


    /**
     * 江西省核心产业企业营收各市占比情况
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/queryDigitalIncomeRate",produces = "text/html;charset=UTF-8")
    public String queryDigitalIncomeRate(){
        PageData ss= this.getPageData();
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if ( pd.containsKey("year") &&  StrUtils.isNotEmpty(pd.get("year").toString())
                && pd.containsKey("areaType") && StrUtils.isNotEmpty(pd.getString("areaType"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                list = digitalEconomyService.queryDigitalIncomeRate(pd);
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
}

