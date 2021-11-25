package com.zhirong.ncdata.controller.entDistribution;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.Page;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.entDistribution.IndustryDistributionService;
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
 * @Author 黄宇豪
 * @Description 产业布局
 * @Date 11:18 2020/8/22
 * @Param
 * @return
 **/
@Controller
@RequestMapping(value = "/industryDistributionController")
public class IndustryDistributionController extends BaseController {

    @Autowired
    private IndustryDistributionService industryDistributionService;

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getYearList
     * @Author Strive_Li
     * @Description 获取年份列表
     * @Date 2020/8/22 14:26
     */
    @ResponseBody
    @RequestMapping(value = "/getYearList", produces = "text/html;charset=UTF-8")
    public String getYearList() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List list = new ArrayList<>();
        HashMap map = new HashMap();
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        try {
            list = industryDistributionService.getYearList(pd);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        HashMap map1 = new HashMap();
        map1.put("yearList", list);
        map.put("data", map1);
        return new Gson().toJson(map);
    }

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getNcShiArea
     * @Author Strive_Li
     * @Description 获取抚州市所有县(包括抚州市)
     * @Date 2020/8/22 14:26
     */
    @ResponseBody
    @RequestMapping(value = "/getNcShiArea", produces = "text/html;charset=UTF-8")
    public String getNcShiArea() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        try {
            list = industryDistributionService.getNcShiArea(pd);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        HashMap map1 = new HashMap();
        map1.put("NCAREA", list);
        map.put("data", map1);
        return new Gson().toJson(map);
    }

    /**
     * @return java.lang.String
     * @Author 黄宇豪
     * @Description 数字经济发展情况
     * @Date 12:14 2020/8/22
     * @Param []
     **/
    @ResponseBody
    @RequestMapping(value = "/szjjFiveYearList", produces = "text/html;charset=UTF-8")
    public String szjjFiveYearList() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        HashMap data = new HashMap();
        map.put("data", data);
        try {
            PageData linepd = industryDistributionService.getSzjjFiveYearLine(pd);//获取折线图数据

            data.put("dataNames", linepd.get("dataNames"));//折线图xAxis中data
            data.put("dataValuesSzjj", linepd.get("dataValuesSzjj"));//折线图series中data 数字经济增长曲线
            data.put("dataValuesGdp", linepd.get("dataValuesGdp"));//折线图series中data GDP增长曲线
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        return new Gson().toJson(map);
    }

    /**
     * @return java.lang.String
     * @Author 黄宇豪
     * @Description 数字经济企业发展情况
     * @Date 14:08 2020/8/22
     * @Param []
     **/
    @ResponseBody
    @RequestMapping(value = "/szjjEntFiveYearList", produces = "text/html;charset=UTF-8")
    public String szjjEntFiveYearList() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        HashMap data = new HashMap();
        map.put("data", data);
        try {
            //产业类型，1注册资本 2市场主体总量 3市场主体新增
            if (pd.get("industryType") != null && StrUtils.isNotEmpty(pd.getString("industryType"))) {
                PageData linepd = industryDistributionService.getSzjjEntFiveYearLine(pd);//获取折线图数据
                data.put("dataNames", linepd.get("dataNames"));//折线图xAxis中data
                data.put("dataValues", linepd.get("dataValues"));//折线图series中data
            } else {
                map.put("status", "10009");
                map.put("msg", "接口内缺失必传的参数");
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        return new Gson().toJson(map);
    }

    /**
     * @return java.lang.String
     * @Author 黄宇豪
     * @Description 各县区数字经济产业排名
     * @Date 16:02 2020/8/22
     * @Param []
     **/
    @ResponseBody
    @RequestMapping(value = "/szjjByAreaList", produces = "text/html;charset=UTF-8")
    public String szjjByAreaList() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        HashMap data = new HashMap();
        map.put("data", data);
        try {
            if (pd.get("area") == null || StrUtils.isEmpty(pd.getString("area"))) {
                pd.put("area", "360000");
            }
            String area = pd.getString("area");
            if (area.endsWith("0000")) {//江西省
                area = area.substring(0, 2);
                pd.put("areaLevel", "2");
            } else {
                if (area.endsWith("00")) {//地市
                    area = area.substring(0, 4);
                    pd.put("areaLevel", "3");
                }
            }
            pd.put("area", area);
            PageData linepd = industryDistributionService.getSzjjByAreaList(pd);//获取折线图数据
            data.put("dataNames", linepd.get("dataNames"));//折线图xAxis中data
            data.put("dataValues", linepd.get("dataValues"));//折线图series中data
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        return new Gson().toJson(map);
    }

    /**
     * @return java.lang.String
     * @Author 黄宇豪
     * @Description 数字经济地图数据
     * @Date 17:04 2020/8/22
     * @Param []
     **/
    @ResponseBody
    @RequestMapping(value = "/szjjMapData", produces = "text/html;charset=UTF-8")
    public String szjjMapData() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        HashMap data = new HashMap();
        map.put("data", data);
        try {
            if (pd.get("area") != null && StrUtils.isNotEmpty(pd.getString("area"))) {
                String area = pd.getString("area");
                if (area.endsWith("0000")) {//江西省
                    area = area.substring(0, 2);
                    pd.put("areaLevel", "2");
                } else {
                    if (area.endsWith("00")) {//地市
                        area = area.substring(0, 4);
                        pd.put("areaLevel", "3");
                    }
                }
                pd.put("AREA", pd.get("area"));//传过来的初始的区域值
                pd.put("area", area);
                List<PageData> entlist = industryDistributionService.getSzjjMapData(pd);//获取地图数据
                data.put("entlist", entlist);
            } else {
                map.put("status", "10009");
                map.put("msg", "接口内缺失必传的参数");
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        return new Gson().toJson(map);
    }


    /**
     * 数字经济产业现状数据总览
     *
     * @return
     * @Author 陶华琴
     */
    @ResponseBody
    @RequestMapping(value = "/getIndustryChainOverAll", produces = "text/html;charset=UTF-8")
    public String getIndustryChainOverAll() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        try {
            if (pd.containsKey("AREA") && StrUtils.isNotEmpty(pd.getString("AREA"))
                    && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
                    && pd.containsKey("PARENT_DL")) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = industryDistributionService.getIndustryChainOverAll(pd);//获取右侧企业列表
                } catch (Exception e) {
                    e.printStackTrace();
                    map.put("status", "999");
                    map.put("msg", "接口异常");
                }
            } else {
                map.put("status", "10009");
                map.put("msg", "接口内缺失必传的参数");
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        map.put("data", list);
        return new Gson().toJson(map);
    }

    /**
     * 各县区数字经济产业发展
     *
     * @return
     * @Author 陶华琴
     */
    @ResponseBody
    @RequestMapping(value = "/getSzjjEntByArea", produces = "text/html;charset=UTF-8")
    public String getSzjjEntByArea() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        try {
            if (pd.containsKey("AREA") && StrUtils.isNotEmpty(pd.getString("AREA"))
                    && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
                    && pd.containsKey("PARENT_DL") && pd.containsKey("CONDITION")) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = industryDistributionService.getSzjjEntByArea(pd);
                } catch (Exception e) {
                    e.printStackTrace();
                    map.put("status", "999");
                    map.put("msg", "接口异常");
                }
            } else {
                map.put("status", "10009");
                map.put("msg", "接口内缺失必传的参数");
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        map.put("data", list);
        return new Gson().toJson(map);
    }

    /**
     * 各产业数量 标准分类
     *
     * @return
     * @Author 陶华琴
     */
    @ResponseBody
    @RequestMapping(value = "/getIndustryChainPmNums", produces = "text/html;charset=UTF-8")
    public String getIndustryChainPmNums() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        try {
            if (pd.containsKey("AREA") && StrUtils.isNotEmpty(pd.getString("AREA"))
                    && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
                    && pd.containsKey("CONDITION") && StrUtils.isNotEmpty(pd.getString("CONDITION"))) {
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
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        map.put("data", list);
        return new Gson().toJson(map);
    }

    /**
     * 各产业数量 本地分类
     *
     * @return
     * @Author 陶华琴
     */
    @ResponseBody
    @RequestMapping(value = "/getIndustryPmNums", produces = "text/html;charset=UTF-8")
    public String getIndustryPmNums() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        try {
            if (pd.containsKey("AREA") && StrUtils.isNotEmpty(pd.getString("AREA"))
                    && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
                    && pd.containsKey("CONDITION") && StrUtils.isNotEmpty(pd.getString("CONDITION"))) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = industryDistributionService.getIndustryPmNums(pd);
                } catch (Exception e) {
                    e.printStackTrace();
                    map.put("status", "999");
                    map.put("msg", "接口异常");
                }
            } else {
                map.put("status", "10009");
                map.put("msg", "接口内缺失必传的参数");
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        map.put("data", list);
        return new Gson().toJson(map);
    }

    /**
     * 获取企业右侧列表
     *
     * @return java.lang.String
     * @throws
     * @Author 陶华琴
     * @title getEnterpriseList
     * @Author Strive_Li
     * @Description 获取右下角企业列表
     * @Date 2020/8/14 14:46
     */
    @ResponseBody
    @RequestMapping(value = "/getChainEnterprise", produces = "text/html;charset=UTF-8")
    public String getChainEnterprise() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        try {
            if (pd.containsKey("AREA") && StrUtils.isNotEmpty(pd.getString("AREA"))
                    && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
                    && pd.containsKey("PARENT_DL") && pd.containsKey("CONDITION")) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = industryDistributionService.getChainEnterprise(pd);
                } catch (Exception e) {
                    e.printStackTrace();
                    map.put("status", "999");
                    map.put("msg", "接口异常");
                }
            } else {
                map.put("status", "10009");
                map.put("msg", "接口内缺失必传的参数");
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        map.put("data", list);
        return new Gson().toJson(map);
    }

    /**
     * 企业详情列表
     *
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getCompanyDetailsList", produces = "text/html;charset=UTF-8")
    public String getCompanyDetailsList() {
        Page page = this.getPage();
        PageData pd = new ParamJsonToMap().toMap(page.getPageData().getString("param"));//参数封装在param中
        PageHelper.startPage(page.getPage(), page.getLimit());//分页
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        if (pd.containsKey("AREA") && StrUtils.isNotEmpty(pd.getString("AREA"))
                && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
        ) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                list = industryDistributionService.getCompanyDetailsList(pd);
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        PageInfo pageinfo = new PageInfo(list);
        page.setCount(pageinfo.getTotal());
        page.setList(list);
        page.setMap(null);//把入参清空
        map.put("data", page);
        return new Gson().toJson(map);
    }
}
