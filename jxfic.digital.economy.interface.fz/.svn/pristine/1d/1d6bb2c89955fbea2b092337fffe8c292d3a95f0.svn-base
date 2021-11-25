package com.zhirong.ncdata.controller.qyhydfx;

import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.qyhydfx.QyhydfxService;
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
import java.util.Map;

/**
*  @title
*  @Author Strive_Li
*  @Description 企业活跃度分析
*  @Date 2020/10/30 10:19
*/
@Controller
@RequestMapping(value = "/qyhydfxController")
public class QyhydfxController extends BaseController {
    
	@Autowired
    private QyhydfxService qyhydfxService;
    @Autowired
    private RedisUtils redisUtils;




    /**
     * @Author 黄宇豪
     * @Description 获取江西民营企业存量(总量)
     * @Date 10:45 2020/10/30
     * @Param []
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/getMyqySumYear", produces = "text/html;charset=UTF-8")
    public String getMyqySumYear() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("flag") && StrUtils.isNotEmpty(pd.getString("flag"))) { //传入维度参数
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                String flag = pd.getString("flag");
                Map param  =new HashMap();
                if(flag.equals("总量")){
                    param.put("modename","民营企业存量");
                    param.put("types","总量");
                    List<Map> listSum = qyhydfxService.getSaData(param);
                    param.put("modename","民营企业增量");
                    List<Map> ListAdd = qyhydfxService.getSaData(param);
                    param.put("modename","民营企业注销");
                    List<Map> ListRemove = qyhydfxService.getSaData(param);
                    param.put("modename","民营企业吊销");
                    List<Map> ListRevoke = qyhydfxService.getSaData(param);
                    for (int i = 0; i <listSum.size(); i++) {
                        listSum.get(i).put("ADDSUM",ListAdd.get(i).get("COUNTS"));
                        listSum.get(i).put("REMOVESUM",ListRemove.get(i).get("COUNTS"));
                        listSum.get(i).put("REVOKESUM",ListRevoke.get(i).get("COUNTS"));
                    }
                    map.put("data",listSum);
                }else{
                    param.put("name",flag);
                    param.put("modename","民营企业存量");
                    param.put("types","产业");
                    List<Map> listSum = qyhydfxService.getSaData(param);
                    param.put("modename","民营企业增量");
                    List<Map> ListAdd = qyhydfxService.getSaData(param);
                    param.put("modename","民营企业注销");
                    List<Map> ListRemove = qyhydfxService.getSaData(param);
                    param.put("modename","民营企业吊销");
                    List<Map> ListRevoke = qyhydfxService.getSaData(param);
                    for (int i = 0; i <listSum.size(); i++) {
                        listSum.get(i).put("ADDSUM",ListAdd.get(i).get("COUNTS"));
                        listSum.get(i).put("REMOVESUM",ListRemove.get(i).get("COUNTS"));
                        listSum.get(i).put("REVOKESUM",ListRevoke.get(i).get("COUNTS"));
                    }
                    map.put("data",listSum);
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
        return new Gson().toJson(map);
    }
    /**
     * @Author 黄宇豪
     * @Description 获取江西企业存量(总量)
     * @Date 11:00 2020/10/30
     * @Param []
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/getQySumYear", produces = "text/html;charset=UTF-8")
    public String getQySumYear() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("flag") && StrUtils.isNotEmpty(pd.getString("flag"))) { //传入维度参数
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                String flag = pd.getString("flag");
                Map param  =new HashMap();
                if(flag.equals("总量")){
                    param.put("modename","企业存量");
                    param.put("types","总量");
                    List<Map> listSum = qyhydfxService.getSaData(param);
                    param.put("modename","企业增量");
                    List<Map> ListAdd = qyhydfxService.getSaData(param);
                    param.put("modename","企业注销");
                    List<Map> ListRemove = qyhydfxService.getSaData(param);
                    param.put("modename","企业吊销");
                    List<Map> ListRevoke = qyhydfxService.getSaData(param);
                    for (int i = 0; i <listSum.size(); i++) {
                        listSum.get(i).put("ADDSUM",ListAdd.get(i).get("COUNTS"));
                        listSum.get(i).put("REMOVESUM",ListRemove.get(i).get("COUNTS"));
                        listSum.get(i).put("REVOKESUM",ListRevoke.get(i).get("COUNTS"));
                    }
                    map.put("data",listSum);
                }else{
                    param.put("name",flag);
                    param.put("modename","企业存量");
                    param.put("types","产业");
                    List<Map> listSum = qyhydfxService.getSaData(param);
                    param.put("modename","企业增量");
                    List<Map> ListAdd = qyhydfxService.getSaData(param);
                    param.put("modename","企业注销");
                    List<Map> ListRemove = qyhydfxService.getSaData(param);
                    param.put("modename","企业吊销");
                    List<Map> ListRevoke = qyhydfxService.getSaData(param);
                    for (int i = 0; i <listSum.size(); i++) {
                        listSum.get(i).put("ADDSUM",ListAdd.get(i).get("COUNTS"));
                        listSum.get(i).put("REMOVESUM",ListRemove.get(i).get("COUNTS"));
                        listSum.get(i).put("REVOKESUM",ListRevoke.get(i).get("COUNTS"));
                    }
                    map.put("data",listSum);
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
        return new Gson().toJson(map);
    }
    /**
     * @Author 黄宇豪
     * @Description 获取江西个体工商户存量(总量)
     * @Date 11:01 2020/10/30
     * @Param []
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/getIndBusSumYear", produces = "text/html;charset=UTF-8")
    public String getIndBusSumYear() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("flag") && StrUtils.isNotEmpty(pd.getString("flag"))) { //传入维度参数
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                String flag = pd.getString("flag");
                Map param  =new HashMap();
                if(flag.equals("总量")){
                    param.put("modename","个体存量");
                    param.put("types","总量");
                    List<Map> listSum = qyhydfxService.getSaData(param);
                    param.put("modename","个体增量");
                    List<Map> ListAdd = qyhydfxService.getSaData(param);
                    param.put("modename","个体注销");
                    List<Map> ListRemove = qyhydfxService.getSaData(param);
                    param.put("modename","个体吊销");
                    List<Map> ListRevoke = qyhydfxService.getSaData(param);
                    for (int i = 0; i <listSum.size(); i++) {
                        listSum.get(i).put("ADDSUM",ListAdd.get(i).get("COUNTS"));
                        listSum.get(i).put("REMOVESUM",ListRemove.get(i).get("COUNTS"));
                        listSum.get(i).put("REVOKESUM",ListRevoke.get(i).get("COUNTS"));
                    }
                    map.put("data",listSum);
                }else{
                    param.put("name",flag);
                    param.put("modename","个体存量");
                    param.put("types","产业");
                    List<Map> listSum = qyhydfxService.getSaData(param);
                    param.put("modename","个体增量");
                    List<Map> ListAdd = qyhydfxService.getSaData(param);
                    param.put("modename","个体注销");
                    List<Map> ListRemove = qyhydfxService.getSaData(param);
                    param.put("modename","个体吊销");
                    List<Map> ListRevoke = qyhydfxService.getSaData(param);
                    for (int i = 0; i <listSum.size(); i++) {
                        listSum.get(i).put("ADDSUM",ListAdd.get(i).get("COUNTS"));
                        listSum.get(i).put("REMOVESUM",ListRemove.get(i).get("COUNTS"));
                        listSum.get(i).put("REVOKESUM",ListRevoke.get(i).get("COUNTS"));
                    }
                    map.put("data",listSum);
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
        return new Gson().toJson(map);
    }
    /**
     * @Author 黄宇豪
     * @Description 查询（外资，内资，农专）历年状况
     * @Date 11:01 2020/10/30
     * @Param []type（1：内资，2：外资，3：农专）
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/getIndustryOfYearInfo", produces = "text/html;charset=UTF-8")
    public String getIndustryOfYearInfo() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("flag") && StrUtils.isNotEmpty(pd.getString("flag"))
                && pd.containsKey("type") && StrUtils.isNotEmpty(pd.getString("type"))) { //传入维度参数
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                String flag = pd.getString("flag");
                List<Map> listSum = new ArrayList<Map>();
                if(flag.equals("总量")){
                    listSum =  qyhydfxService.getIndustryOfYearInfo(pd);
                }else{
                    listSum =  qyhydfxService.getIndustryByYear(pd);
                }
                map.put("data",listSum);
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
     * @Author 黄宇豪
     * @Description 获取年份
     * @Date 11:25 2020/10/30
     * @Param []
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/getMyqyYears", produces = "text/html;charset=UTF-8")
    public String getMyqyYears() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        try {
            List<String> listSum = qyhydfxService.getMyqyYears();
            map.put("data",listSum);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        return new Gson().toJson(map);
    }
    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getMyqyCyByYear
     * @Author Strive_Li
     * @Description 民营企业增加值(三产)
     * @Date 2020/10/30 10:46
     */
    @ResponseBody
    @RequestMapping(value = "/getMyqyCyByYear", produces = "text/html;charset=UTF-8")
    public String getMyqyCyByYear() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List list = new ArrayList<>();
        HashMap map = new HashMap();
        if (pd.containsKey("year") && StrUtils.isNotEmpty(pd.getString("year"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                list = qyhydfxService.getMyqyCyByYear(pd);
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
     * @title getQyCyByYear
     * @Author Strive_Li
     * @Description 江西企业总数(三产)
     * @Date 2020/10/30 11:01
     */
    @ResponseBody
    @RequestMapping(value = "/getQyCyByYear", produces = "text/html;charset=UTF-8")
    public String getQyCyByYear() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List list = new ArrayList<>();
        HashMap map = new HashMap();
        if (pd.containsKey("year") && StrUtils.isNotEmpty(pd.getString("year"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                list = qyhydfxService.getQyCyByYear(pd);
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
     * @title getQyCyByYear
     * @Author Strive_Li
     * @Description 江西个体工商户三产总数
     * @Date 2020/10/30 11:01
     */
    @ResponseBody
    @RequestMapping(value = "/getIndBusYear", produces = "text/html;charset=UTF-8")
    public String getIndBusYear() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List list = new ArrayList<>();
        HashMap map = new HashMap();
        if (pd.containsKey("year") && StrUtils.isNotEmpty(pd.getString("year"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                list = qyhydfxService.getIndBusYear(pd);
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
     * @title getQyCyByYear
     * @Author Strive_Li
     * @Description 查询（外资，内资，农专）三产总数
     * year，type（1：内资，2：外资，3：农专）
     * @Date 2020/10/30 11:01
     */
    @ResponseBody
    @RequestMapping(value = "/getIndustry", produces = "text/html;charset=UTF-8")
    public String getIndustry() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        HashMap map = new HashMap();
        if (pd.containsKey("year") && StrUtils.isNotEmpty(pd.getString("year"))&&pd.containsKey("type") && StrUtils.isNotEmpty(pd.getString("type"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                list = qyhydfxService.getIndustry(pd);
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
     * @title getMyqyCITYByYear
     * @Author Strive_Li
     * @Description 民营企业分地市详情(三产)
     * @Date 2020/10/30 13:45
     */
    @ResponseBody
    @RequestMapping(value = "/getMyqyCITYByYear", produces = "text/html;charset=UTF-8")
    public String getMyqyCITYByYear() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        HashMap map = new HashMap();
        List<Map> listSum = new ArrayList();
        if (pd.containsKey("year") && StrUtils.isNotEmpty(pd.getString("year"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                //总量
                List list1 = qyhydfxService.getMyqyclClty(pd);
                //增加量
                List list2 = qyhydfxService.getMyqyzlClty(pd);
                //注销量
                List list3 = qyhydfxService.getMyqyzdxClty(pd);
                //吊销量
                List list4 = qyhydfxService.getMyqyRevokeClty(pd);

                for (int i = 0; i <list1.size() ; i++) {
                    Map map1 = (Map) list1.get(i);
                    for (int j = 0; j < list2.size(); j++) {
                        Map map2 = (Map) list2.get(j);
                        if (map2.get("NAME").equals(map1.get("NAME"))){
                            map1.put("MYQYZJ",map2.get("COUNTS"));
                        }
                    }
                    for (int m = 0; m < list3.size(); m++) {
                        Map map3 = (Map) list3.get(m);
                        if (map3.get("NAME").equals(map1.get("NAME"))){
                            map1.put("MYQYZX",map3.get("COUNTS"));
                        }
                    }
                    for (int m = 0; m < list4.size(); m++) {
                        Map map4 = (Map) list4.get(m);
                        if (map4.get("NAME").equals(map1.get("NAME"))){
                            map1.put("MYQYDX",map4.get("COUNTS"));
                        }
                    }
                    listSum.add(map1);
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
        map.put("data", listSum);
        return new Gson().toJson(map);
    }
    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getQyCITYByYear
     * @Author Strive_Li
     * @Description 江西企业分地市详情(三产)
     * @Date 2020/10/30 13:45
     */
    @ResponseBody
    @RequestMapping(value = "/getQyCITYByYear", produces = "text/html;charset=UTF-8")
    public String getQyCITYByYear() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        HashMap map = new HashMap();
        List<Map> listSum = new ArrayList();
        if (pd.containsKey("year") && StrUtils.isNotEmpty(pd.getString("year"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                //总量
                List list1 = qyhydfxService.getQyclClty(pd);
                //增加量
                List list2 = qyhydfxService.getQyzlClty(pd);
                //注销量
                List list3 = qyhydfxService.getQyzdxClty(pd);
                //吊销
                List list4 = qyhydfxService.getQyRevokeClty(pd);

                for (int i = 0; i <list1.size() ; i++) {
                    Map map1 = (Map) list1.get(i);
                    for (int j = 0; j < list2.size(); j++) {
                        Map map2 = (Map) list2.get(j);
                        if (map2.get("NAME").equals(map1.get("NAME"))){
                            map1.put("MYQYZJ",map2.get("COUNTS"));
                        }
                    }
                    for (int m = 0; m < list3.size(); m++) {
                        Map map3 = (Map) list3.get(m);
                        if (map3.get("NAME").equals(map1.get("NAME"))){
                            map1.put("MYQYZX",map3.get("COUNTS"));
                        }
                    }
                    for (int m = 0; m < list4.size(); m++) {
                        Map map4 = (Map) list4.get(m);
                        if (map4.get("NAME").equals(map1.get("NAME"))){
                            map1.put("MYQYDX",map4.get("COUNTS"));
                        }
                    }
                    listSum.add(map1);
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
        map.put("data", listSum);
        return new Gson().toJson(map);
    }

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getIndBusCITYByYear
     * @Author Strive_Li
     * @Description 个体工商户分地市详情(三产)
     * @Date 2020/10/30 14:07
     */
    @ResponseBody
    @RequestMapping(value = "/getIndBusCITYByYear", produces = "text/html;charset=UTF-8")
    public String getIndBusCITYByYear() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        HashMap map = new HashMap();
        List<Map> listSum = new ArrayList();
        if (pd.containsKey("year") && StrUtils.isNotEmpty(pd.getString("year"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                //总量
                List list1 = qyhydfxService.getIndBusclClty(pd);
                //增加量
                List list2 = qyhydfxService.getIndBuszlClty(pd);
                //注销量
                List list3 = qyhydfxService.getIndBuszdxClty(pd);
                //吊销量
                List list4 = qyhydfxService.getIndBusRevokeClty(pd);

                for (int i = 0; i <list1.size() ; i++) {
                    Map map1 = (Map) list1.get(i);
                    for (int j = 0; j < list2.size(); j++) {
                        Map map2 = (Map) list2.get(j);
                        if (map2.get("NAME").equals(map1.get("NAME"))){
                            map1.put("MYQYZJ",map2.get("COUNTS"));
                        }
                    }
                    for (int m = 0; m < list3.size(); m++) {
                        Map map3 = (Map) list3.get(m);
                        if (map3.get("NAME").equals(map1.get("NAME"))){
                            map1.put("MYQYZX",map3.get("COUNTS"));
                        }
                    }
                    for (int m = 0; m < list4.size(); m++) {
                        Map map4 = (Map) list4.get(m);
                        if (map4.get("NAME").equals(map1.get("NAME"))){
                            map1.put("MYQYDX",map4.get("COUNTS"));
                        }
                    }
                    listSum.add(map1);
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
        map.put("data", listSum);
        return new Gson().toJson(map);
    }

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getIndustryActive
     * @Author Strive_Li
     * @Description 查询（外资，内资，农专）活跃度 year，type（1：内资，2：外资，3：农专）
     * @Date 2020/10/30 14:19
     */
    @ResponseBody
    @RequestMapping(value = "/getIndustryActive", produces = "text/html;charset=UTF-8")
    public String getIndustryActive() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        HashMap map = new HashMap();
        List<Map<String, Object>> listSum = new ArrayList();
        if (pd.containsKey("year") && StrUtils.isNotEmpty(pd.getString("year"))&&pd.containsKey("type") && StrUtils.isNotEmpty(pd.getString("type"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                listSum= qyhydfxService.getIndustryActive(pd);
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        map.put("data", listSum);
        return new Gson().toJson(map);
    }
}
