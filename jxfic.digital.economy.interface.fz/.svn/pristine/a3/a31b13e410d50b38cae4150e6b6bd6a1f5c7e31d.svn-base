package com.zhirong.ncdata.controller.entDistribution;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.Page;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.entDistribution.EntDistributionService;
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
 * @Author 黄宇豪
 * @Description 企业分布
 * @Date 11:18 2020/8/22
 * @Param 
 * @return 
 **/
@Controller
@RequestMapping(value = "/entDistributionController")
public class EntDistributionController extends BaseController {

    @Autowired
    private EntDistributionService entDistributionService;
    @Autowired
    private RedisUtils redisUtils;

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getHyfb
     * @Author Strive_Li
     * @Description 行业分布
     * @Date 2020/8/22 14:26
     */
    @ResponseBody
    @RequestMapping(value = "/getHyfb", produces = "text/html;charset=UTF-8")
    public String getHyfb() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("PARENT_DL") && StrUtils.isNotEmpty(pd.getString("PARENT_DL"))) { //传人最顶层产业链编号
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                PageData data = entDistributionService.getHyfb(pd);
                map.put("data",data);
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        return new Gson().toJson(map);
    }

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getHyys
     * @Author Strive_Li
     * @Description 行业营收
     * @Date 2020/8/22 14:26
     */
    @ResponseBody
    @RequestMapping(value = "/getHyys", produces = "text/html;charset=UTF-8")
    public String getHyys() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("CHAIN_ID") && StrUtils.isNotEmpty(pd.getString("CHAIN_ID"))) { //传人最顶层产业链编号
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                list = entDistributionService.getHyys(pd);
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        map.put("data", list.get(0));
        return new Gson().toJson(map);
    }
    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getEnterpriseSite
     * @Author Strive_Li
     * @Description 得到企业坐标
     * @Date 2020/8/12 14:43
     */
    @ResponseBody
    @RequestMapping(value = "/getEnterpriseSite", produces = "text/html;charset=UTF-8")
    public String getEnterpriseSite() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("PARENT_DL")&& StrUtils.isNotEmpty(pd.getString("PARENT_DL"))) { //传人最顶层产业链编号
            //判断接口入参是否缺失
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
            list = entDistributionService.getEnterpriseSite(pd);
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
        map1.put("entMsg",list);
        map.put("data", map1);
        return new Gson().toJson(map);
    }
    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getEnterpriseSite
     * @Author Strive_Li
     * @Description 得到物联网企业分布
     * @Date 2020/8/12 14:43
     */
    @ResponseBody
    @RequestMapping(value = "/getWlwqyfb", produces = "text/html;charset=UTF-8")
    public String getWlwqyfb() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("PARENT_DL")&& StrUtils.isNotEmpty(pd.getString("PARENT_DL"))) { //传人最顶层产业链编号
            //判断接口入参是否缺失
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                list = entDistributionService.getWlwqyfb(pd);
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
        map1.put("wlwqyfb",list);
        map.put("data", map1);
        return new Gson().toJson(map);
    }

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getEntList
     * @Author Strive_Li
     * @Description 获取企业列表
     * @Date 2020/8/12 14:43
     */
    @ResponseBody
    @RequestMapping(value = "/getEntList", produces = "text/html;charset=UTF-8")
    public String getEntList() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("PARENT_DL")&& StrUtils.isNotEmpty(pd.getString("PARENT_DL"))) { //传人最顶层产业链编号
            //判断接口入参是否缺失
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                list = entDistributionService.getEntList(pd);
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
        map1.put("entlist",list);
        int SUMCOUNT=0;
        for (int i = 0; i <list.size() ; i++) {
            SUMCOUNT+=Integer.parseInt(list.get(i).get("COUNT").toString());
        }
        map1.put("SUMCOUNT",SUMCOUNT);
        map.put("data", map1);
        return new Gson().toJson(map);
    }

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getSjzl
     * @Author Strive_Li
     * @Description 得到数据总览抚州市排名
     * @Date 2020/8/26 10:27
     */
    @ResponseBody
    @RequestMapping(value = "/getSjzl", produces = "text/html;charset=UTF-8")
    public String getSjzl() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData list = new PageData();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("CHAIN_ID")&& StrUtils.isNotEmpty(pd.getString("CHAIN_ID"))) { //传人最顶层产业链编号
            //判断接口入参是否缺失
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                list = entDistributionService.getSjzl(pd);
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
     * @title getEnterpriseSite
     * @Author Strive_Li
     * @Description 根据企业数量,区域,新增数量得到企业列表
     * @Date 2020/8/12 14:43
     */
    @ResponseBody
    @RequestMapping(value = "/getEntListByAreaCount", produces = "text/html;charset=UTF-8")
    public String getEntListByAreaCount() {
        Page page = this.getPage();
        PageData pd = new ParamJsonToMap().toMap(page.getPageData().getString("param"));//参数封装在param中
        PageHelper.startPage(page.getPage(), page.getLimit());//分页
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        if (pd.containsKey("PARENT_DL") && StrUtils.isNotEmpty(pd.getString("PARENT_DL"))&&pd.containsKey("AREA") && StrUtils.isNotEmpty(pd.getString("AREA"))) { //传人最顶层产业链编号
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                list = entDistributionService.getEntListByAreaCount(pd);
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
