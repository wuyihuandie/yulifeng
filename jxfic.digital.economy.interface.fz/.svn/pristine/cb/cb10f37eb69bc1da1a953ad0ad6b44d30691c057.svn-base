package com.zhirong.ncdata.controller.entDistribution;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.entDistribution.IndustryDistributionService;
import com.zhirong.ncdata.utils.ParamJsonToMap;
import com.zhirong.ncdata.utils.StrUtils;

/**
 * @Author 谌思宇
 * @Description 地域分析 页数据
 * @Date 11:18 2020/10/10
 * @Param 
 * @return 
 **/
@Controller
@RequestMapping(value = "/regionAnalysisController")
public class RegionAnalysisController extends BaseController{

	@Autowired
    private IndustryDistributionService industryDistributionService;
	
	
	 /**
     * 数字经济产业 地域分析 数据总览
     * @Author 谌思宇
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getRegionAnalysisOverAll",produces = "text/html;charset=UTF-8")
    public String getIndustryChainOverAll(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        try {
            if (pd.containsKey("AREA")  && StrUtils.isNotEmpty(pd.getString("AREA"))
                    && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
                    && pd.containsKey("AREA_NAME")
                   ) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = industryDistributionService.getRegionAnalysisAll(pd);//获取右侧企业列表
                } catch (Exception e) {
                    e.printStackTrace();
                    map.put("status", "999");
                    map.put("msg", "接口异常");
                }
            } else {
                map.put("status", "10009");
                map.put("msg", "接口内缺失必传的参数");
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
     * 行业数量
     * CONDITION  1 企业 2 营业收入 3 累计纳税 4 净利润 5 从业人员
     * @Author 谌思宇
     * @param
     * @return 
     */
    @ResponseBody
    @RequestMapping(value = "/getChainAnalysisByArea",produces = "text/html;charset=UTF-8")
    public String getChainAnalysisByArea(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        try {
            if (pd.containsKey("AREA")  && StrUtils.isNotEmpty(pd.getString("AREA"))
                    && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
                    && pd.containsKey("AREA_NAME")&& pd.containsKey("CONDITION")) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = industryDistributionService.getIndustryChainPmNums(pd);
                } catch (Exception e) {
                    e.printStackTrace();
                    map.put("status", "999");
                    map.put("msg", "接口异常");
                }
            } else {
                map.put("status", "10009");
                map.put("msg", "接口内缺失必传的参数");
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
     * 数字经济产业 地域分析 获取企业右侧列表
     * @Author 谌思宇
     */
    @ResponseBody
    @RequestMapping(value = "/getRegionAnalysisList", produces = "text/html;charset=UTF-8")
    public String getRegionAnalysisList() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        try {
            if (pd.containsKey("AREA")  && StrUtils.isNotEmpty(pd.getString("AREA"))
                    && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
                    && pd.containsKey("AREA_NAME") && pd.containsKey("CONDITION")) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = industryDistributionService.getRegionEnterprise(pd);
                } catch (Exception e) {
                    e.printStackTrace();
                    map.put("status", "999");
                    map.put("msg", "接口异常");
                }
            } else {
                map.put("status", "10009");
                map.put("msg", "接口内缺失必传的参数");
            }
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        map.put("data",list);
        return new Gson().toJson(map);
    }
    
    
    
}
