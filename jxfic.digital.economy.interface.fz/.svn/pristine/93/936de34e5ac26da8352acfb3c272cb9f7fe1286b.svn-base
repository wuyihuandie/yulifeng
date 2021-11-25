package com.zhirong.ncdata.controller.cyyc;

import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.cyyc.CyycService;
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
*  @title 产业预测
*  @Author Strive_Li
*  @Date 2020/9/11 9:42
*/
@Controller
@RequestMapping(value = "/cycController")
public class CyycController extends BaseController {

    @Autowired
    private CyycService cyycService;
    @Autowired
    private RedisUtils redisUtils;

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getCyycYears
     * @Author Strive_Li
     * @Description 获取年份列表
     * @Date 2020/8/14 14:46
     */
    @ResponseBody
    @RequestMapping(value = "/getCyycYears",produces = "text/html;charset=UTF-8")
    public String getYears(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        try {
            list = cyycService.getCyycYears(pd);//获取年份列表
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
     * @title getCytzyc
     * @Author Strive_Li
     * @Description 产业投资预测
     * @Date 2020/9/11 10:06
     */
    @ResponseBody
    @RequestMapping(value = "/getCytzyc",produces = "text/html;charset=UTF-8")
    public String getCytzyc(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData pageData=new PageData();
        HashMap map = new HashMap();
        if (pd.containsKey("ARITHMETIC") && StrUtils.isNotEmpty(pd.getString("ARITHMETIC"))) {
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        try {
            pageData = cyycService.getCytzyc(pd);//获取年份列表
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        }else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        map.put("data", pageData);
        return new Gson().toJson(map);
    }
    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getCyzjzyc
     * @Author Strive_Li
     * @Description 产业增加值预测
     * @Date 2020/9/11 10:06
     */
    @ResponseBody
    @RequestMapping(value = "/getCyzjzyc",produces = "text/html;charset=UTF-8")
    public String getCyzjzyc(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData pageData=new PageData();
        HashMap map = new HashMap();
        if (pd.containsKey("ARITHMETIC") && StrUtils.isNotEmpty(pd.getString("ARITHMETIC"))) {
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        try {
            pageData = cyycService.getCyzjzyc(pd);
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
     * @param
     * @return java.lang.String
     * @throws
     * @title getScztfzyc
     * @Author Strive_Li
     * @Description 市场主体发展预测
     * @Date 2020/9/11 10:06
     */
    @ResponseBody
    @RequestMapping(value = "/getScztfzyc",produces = "text/html;charset=UTF-8")
    public String getScztfzyc(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData pageData=new PageData();
        HashMap map = new HashMap();
        if (pd.containsKey("ARITHMETIC") && StrUtils.isNotEmpty(pd.getString("ARITHMETIC"))) {
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        try {
            pageData = cyycService.getScztfzyc(pd);//获取年份列表
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
     * @param
     * @return java.lang.String
     * @throws
     * @title getCytzyc
     * @Author Strive_Li
     * @Description 预期目标
     * @Date 2020/9/11 10:06
     */
    @ResponseBody
    @RequestMapping(value = "/getYqmb",produces = "text/html;charset=UTF-8")
    public String getYqmb(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData pageData=new PageData();
        HashMap map = new HashMap();
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        try {
            pageData = cyycService.getYqmb(pd);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        map.put("data", pageData);
        return new Gson().toJson(map);
    }
}
