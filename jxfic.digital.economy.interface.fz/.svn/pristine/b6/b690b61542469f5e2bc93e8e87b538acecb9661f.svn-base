package com.zhirong.ncdata.controller.entDistribution;

import com.github.pagehelper.PageInfo;
import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.Page;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.common.utils.StringUtils;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.entDistribution.EntDistributionService;
import com.zhirong.ncdata.service.entDistribution.IndustrialParkService;
import com.zhirong.ncdata.utils.ParamJsonToMap;
import com.zhirong.ncdata.utils.RedisUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author yanfeifan
 * @Package com.zhirong.ncdata.controller.entDistribution
 * @Description 产业园区
 * @date 2020/8/24 11:23
 */
@Controller
@RequestMapping(value = "/industrialParkController")
public class IndustrialParkController extends BaseController {

    @Autowired
    private IndustrialParkService industrialParkService;
    @Autowired
    private RedisUtils redisUtils;

    /**
     * @param PARK_ID   产业园id
     * @throws
     * @Author yanfeifan
     * @Description 产业园区介绍
     **/
    @ResponseBody
    @RequestMapping(value = "/queryIndustrialParkJS",produces = "text/html;charset=UTF-8")
    public String queryIndustrialParkJS(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData pageData = new PageData();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        //产业园id
        String PARK_ID = pd.getString("PARK_ID");
        if( StringUtils.isBlank(PARK_ID)){
            map.put("status","10009");
            map.put("msg","接口内缺失必传的参数");
            return new Gson().toJson(map);
        }
        try {
            pageData = industrialParkService.queryIndustrialParkJSById(pd);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        map.put("data",pageData);
        return new Gson().toJson(map);
    }

    /**
     * @throws
     * @Author yanfeifan
     * @Description 产业园区产业分布
     **/
    @ResponseBody
    @RequestMapping(value = "/queryIndustrialParkCYFB",produces = "text/html;charset=UTF-8")
    public String queryIndustrialParkCYFB(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            list = industrialParkService.queryIndustrialParkCYFB(pd);
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
     * @Author yanfeifan
     * @Description 产业园区地理分布
     **/
    @ResponseBody
    @RequestMapping(value = "/queryIndustrialParkDLFB",produces = "text/html;charset=UTF-8")
    public String queryIndustrialParkDLFB(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        Map<String,Object> mapS = new HashMap<>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            mapS = industrialParkService.queryIndustrialParkDLFB(pd);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        map.put("data",mapS);
        return new Gson().toJson(map);
    }

    /**
     * @param PARK_ID   产业园id
     * @throws
     * @Author yanfeifan
     * @Description 产业园区发展情况
     **/
    @ResponseBody
    @RequestMapping(value = "/queryIndustrialParkFZQK",produces = "text/html;charset=UTF-8")
    public String queryIndustrialParkFZQK(){
        Page page = this.getPage();
        PageData pd = new ParamJsonToMap().toMap(page.getPageData().getString("param"));//参数封装在param中
        Map<String,Object> mapS = new HashMap<>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        //产业园id
        String PARK_ID = pd.getString("PARK_ID");
        if( StringUtils.isBlank(PARK_ID)){
            map.put("status","10009");
            map.put("msg","接口内缺失必传的参数");
            return new Gson().toJson(map);
        }
        try {
            mapS = industrialParkService.queryIndustrialParkFZQK(pd);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        map.put("data",mapS);
        return new Gson().toJson(map);
    }

    /**
     * @throws
     * @Author yanfeifan
     * @Description 产业园区排名
     **/
    @ResponseBody
    @RequestMapping(value = "/queryIndustrialParkPM",produces = "text/html;charset=UTF-8")
    public String queryIndustrialParkPM(){
        Page page = this.getPage();
        PageData pd = new ParamJsonToMap().toMap(page.getPageData().getString("param"));//参数封装在param中
        Map<String,Object> mapS = new HashMap<>();
        List<PageData> list = new ArrayList<>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            mapS = industrialParkService.queryIndustrialParkPM(pd);
            list = industrialParkService.queryIndustrialParkPMList(pd);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        PageInfo pageinfo = new PageInfo(list);
        page.setCount(pageinfo.getTotal());
        page.setList(list);
        page.setMap(null);//把入参清空
        mapS.put("listPage",page);
        map.put("data",mapS);
        return new Gson().toJson(map);
    }
}
