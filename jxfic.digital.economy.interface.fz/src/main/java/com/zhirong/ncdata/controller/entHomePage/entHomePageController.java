package com.zhirong.ncdata.controller.entHomePage;

import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.entHomePage.EntHomePageService;
import com.zhirong.ncdata.utils.ParamJsonToMap;
import com.zhirong.ncdata.utils.StrUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @author 谌思宇
 * @Package com.zhirong.ncdata.controller.QueryEnt
 * @Description 江西城市发展 页面
 * @date 2020/10/22 14:24
 */
@Controller
@RequestMapping(value = "/entHomePage")
public class entHomePageController extends BaseController {

	@Autowired
	private EntHomePageService HomePageService;

    /**
     * @throws
     * @title queryDigitalEconomyLJZAndZS
     * @Author Strive_Li
     * @Description 获取江西省区域 内产业总和 与 总营收 与 同比增速
     * 1 企业数量  2营业收入
     * @Date 2020/10/22 17:22
     */
    @ResponseBody
    @RequestMapping(value = "/getJXSENTSUMSAndVENDINC", produces = "text/html;charset=UTF-8")
    public String getJXSENTSUMSAndVENDINC() {
    	PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
        	if (pd.containsKey("AREA_NAME") && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
                   ) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                	list = HomePageService.getJXSENTSUMSAndVENDINC(pd);
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
     *各产业近三年发展趋势
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getChainYearAnalysis", produces = "text/html;charset=UTF-8")
    public String getChainYearAnalysis() {
    	PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
        	if (pd.containsKey("CONDITION")  && StrUtils.isNotEmpty(pd.getString("CONDITION"))
                    && pd.containsKey("AREA_NAME")
                   ) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                	list = HomePageService.getChainYearAnalysis(pd);
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
     * 各产业 各个地市情况
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getChainAnalysisByArea", produces = "text/html;charset=UTF-8")
    public String getChainAnalysisByArea() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            if (pd.containsKey("CONDITION")  && StrUtils.isNotEmpty(pd.getString("CONDITION"))
                    && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
            ) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = HomePageService.getChainAnalysisByArea(pd);
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
     * @throws
     * @title queryDigitalEconomyLJZAndZS
     * @Author Strive_Li
     * @Description 获取江西省区域 右边列表
     * 1 企业数量  2营业收入
     * @Date 2020/10/22 17:22
     */
    @ResponseBody
    @RequestMapping(value = "/queryDigitalEconomyLJZAndZS", produces = "text/html;charset=UTF-8")
    public String queryDigitalEconomyLJZAndZS() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            if (pd.containsKey("CONDITION")  && StrUtils.isNotEmpty(pd.getString("CONDITION"))
                    && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
            ) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = HomePageService.queryDigitalEconomyLJZAndZS(pd);
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

    /*****************************************南昌市*******************************************************/
    /**
     * @throws
     * @title getNanchangEntOverAll
     * @Author taohuaqin
     * @Description 南昌市数字经济核心产业数据总览
     * @Date 2020/10/24 16:21
     */
    @ResponseBody
    @RequestMapping(value = "/getNanchangEntOverAll", produces = "text/html;charset=UTF-8")
    public String getNanchangEntOverAll() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData list = new PageData();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            if (pd.containsKey("AREA_NAME") && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
            ) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = HomePageService.getNanchangEntOverAll(pd);
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
     * @throws
     * @title getNanchangGsEntOverAll
     * @Author taohuaqin
     * @Description 南昌市数字经济核心产业规上企业数据总览
     * @Date 2020/10/24 16:39
     */
    @ResponseBody
    @RequestMapping(value = "/getNanchangGsEntOverAll", produces = "text/html;charset=UTF-8")
    public String getNanchangGsEntOverAll() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData list = new PageData();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            if (pd.containsKey("AREA_NAME") && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
            ) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = HomePageService.getNanchangGsEntOverAll(pd);
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
     * @throws
     * @title getIndustryDataByYear
     * @Author taohuaqin
     * @Description 各产业近三年情况
     * 1 企业数量  2营业收入 3累计纳税 5从业人员
     * @Date 2020/10/24 16:39
     */
    @ResponseBody
    @RequestMapping(value = "/getIndustryDataByYear", produces = "text/html;charset=UTF-8")
    public String getIndustryDataByYear() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<List<PageData>> list = new ArrayList<>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            if (pd.containsKey("CONDITION")  && StrUtils.isNotEmpty(pd.getString("CONDITION"))
                    && pd.containsKey("AREA_NAME")
            ) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = HomePageService.getIndustryDataByYear(pd);
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
     * @throws
     * @title getNanchangChainAnalysis
     * @Author taohuaqin
     * @Description 各个县区各产业企业数量
     * 1 企业数量  2营业收入 3累计纳税 5从业人员
     * @Date 2020/10/26 11:05
     */
    @ResponseBody
    @RequestMapping(value = "/getNanchangChainAnalysis", produces = "text/html;charset=UTF-8")
    public String getNanchangChainAnalysis() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<List<PageData>> list = new ArrayList<>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            if (pd.containsKey("CONDITION")  && StrUtils.isNotEmpty(pd.getString("CONDITION"))
                    && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))){
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = HomePageService.getNanchangChainAnalysis(pd);
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
     * @throws
     * @title getNanchangSzjjEntByArea
     * @Author taohuaqin
     * @Description 各县区数字经济核心产业发展情况
     * 1 企业数量  2营业收入 3累计纳税 5从业人员
     * @Date 2020/10/22 17:22
     */
    @ResponseBody
    @RequestMapping(value = "/getNanchangSzjjEntByArea", produces = "text/html;charset=UTF-8")
    public String getNanchangSzjjEntByArea() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            if (pd.containsKey("CONDITION")  && StrUtils.isNotEmpty(pd.getString("CONDITION"))
                    && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
            ) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = HomePageService.getNanchangSzjjEntByArea(pd);
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
