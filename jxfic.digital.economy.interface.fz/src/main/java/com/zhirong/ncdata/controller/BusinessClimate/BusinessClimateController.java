package com.zhirong.ncdata.controller.BusinessClimate;

import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.common.utils.StringUtils;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.BusinessClimate.BusinessClimateService;
import com.zhirong.ncdata.utils.ParamJsonToMap;
import com.zhirong.ncdata.utils.RedisUtils;
import com.zhirong.ncdata.utils.StrUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @author yanfeifan
 * @Package com.zhirong.ncdata.controller.BusinessClimate
 * @Description  营商环境Controller
 * @date 2020/9/5 10:14
 */
@Controller
@RequestMapping(value = "/businessClimateController")
public class BusinessClimateController extends BaseController {

    @Autowired
    private BusinessClimateService businessClimateService;
    @Autowired
    private RedisUtils redisUtils;

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getIndexXq
     * @Author Strive_Li
     * @Description 获取微观问卷指标、宏观指标详情
     * @Date 2020/9/5 11:00
     */
    @ResponseBody
    @RequestMapping(value = "/getIndexXq", produces = "text/html;charset=UTF-8")
    public String getIndexXq() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData pageData =new PageData();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("type") && StrUtils.isNotEmpty(pd.getString("type"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                pageData = businessClimateService.getIndexXq(pd);
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        map.put("data", pageData);
        return new Gson().toJson(map);
    }


    /**
     * @throws
     * @Author yanfeifan
     * @Description 各地营商环境得分及类型
     **/
    @ResponseBody
    @RequestMapping(value = "/queryBusinessClimateByScoreAndType",produces = "text/html;charset=UTF-8")
    public String queryBusinessClimateByScoreAndType(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        List<PageData> pageDataList = new ArrayList<>();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            pageDataList = businessClimateService.queryBusinessClimateByScoreAndType(pd);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }

        map.put("data",pageDataList);
        return new Gson().toJson(map);
    }

    /**
     * @param index_id   营商环境指标ID
     * @throws
     * @Author yanfeifan
     * @Description 各地市子环境加权得分及排名
     **/
    @ResponseBody
    @RequestMapping(value = "/queryBusinessClimateByWeightedScoresAndRankings",produces = "text/html;charset=UTF-8")
    public String queryBusinessClimateByWeightedScoresAndRankings(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        List<PageData> pageDataList = new ArrayList<>();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        //营商环境指标ID
        String index_id = pd.getString("index_id");
        if(StringUtils.isBlank(index_id)){
            map.put("status","10009");
            map.put("msg","接口内缺失必传的参数");
            return new Gson().toJson(map);
        }
        try {
            pageDataList = businessClimateService.queryBusinessClimateByWeightedScoresAndRankings(pd);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }

        map.put("data",pageDataList);
        return new Gson().toJson(map);
    }


    /**
     * @throws
     * @Author yanfeifan
     * @Description 查询所有各地市子环境营商环境指标ID
     **/
    @ResponseBody
    @RequestMapping(value = "/queryBusinessClimateByZhjIndexId",produces = "text/html;charset=UTF-8")
    public String queryBusinessClimateByZhjIndexId(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        List<PageData> pageDataList = new ArrayList<>();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            pageDataList = businessClimateService.queryBusinessClimateByZhjIndexId(pd);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        map.put("data",pageDataList);
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
    @RequestMapping(value = "/getYshjYears",produces = "text/html;charset=UTF-8")
    public String getYears(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        try {
            list = businessClimateService.getYshjYears(pd);//获取年份列表
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
}
