package com.zhirong.ncdata.controller.entPanoramic;

import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.utils.*;
import com.zhirong.ncdata.service.entPanoramic.EntPanoramicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.net.URLEncoder;
import java.util.*;

/**
 * @Classname EntPanoramicController
 * @Description 企业全景
 * @Author Strive_Li
 * @Date 2020/8/27 10:33
 */
@Controller
@RequestMapping(value = "/entPanoramicController")
public class EntPanoramicController extends BaseController {
    @Autowired
    private EntPanoramicService entPanoramicService;
    @Autowired
    private RedisUtils redisUtils;

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getEntMsg
     * @Author Strive_Li
     * @Description 获取企业信息
     * @Date 2020/8/27 10:43
     */
    @ResponseBody
    @RequestMapping(value = "/getEntMsg", produces = "text/html;charset=UTF-8")
    public String getEntMsg() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData pd1 = new PageData();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("PRIPID") && StrUtils.isNotEmpty(pd.getString("PRIPID"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                if(pd.containsKey("TYPE_R") && StrUtils.isNotEmpty(pd.getString("TYPE_R")) && "1".equals(pd.getString("TYPE_R"))){
                    pd.put("REGNO",pd.get("PRIPID"));
                    PageData getPRIPID = entPanoramicService.getPRIPID(pd);
                    if(getPRIPID != null){
                        pd.put("PRIPID",getPRIPID.get("PRIPID"));
                    }
                }
                pd1 = entPanoramicService.getEntMsg(pd);
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        map.put("data", pd1);
        return new Gson().toJson(map);
    }
    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getHistogramData
     * @Author Strive_Li
     * @Description 经营情况,企业利润,企业缴税数据
     * @Date 2020/8/27 14:00
     */
    @ResponseBody
    @RequestMapping(value = "/getHistogramData", produces = "text/html;charset=UTF-8")
    public String getHistogramData() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData list = new PageData();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("PRIPID") && StrUtils.isNotEmpty(pd.getString("PRIPID"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                if(pd.containsKey("TYPE_R") && StrUtils.isNotEmpty(pd.getString("TYPE_R")) && "1".equals(pd.getString("TYPE_R"))){
                    pd.put("REGNO",pd.get("PRIPID"));
                    PageData getPRIPID = entPanoramicService.getPRIPID(pd);
                    if(getPRIPID != null){
                        pd.put("PRIPID",getPRIPID.get("PRIPID"));
                    }
                }
                list = entPanoramicService.getHistogramData(pd);
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
     * @title getEntScore
     * @Author Strive_Li
     * @Description 获取企业分数
     * @Date 2020/8/27 17:37
     */
    @ResponseBody
    @RequestMapping(value = "/getEntScore", produces = "text/html;charset=UTF-8")
    public String getEntScore() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData pageData =new PageData();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("PRIPID") && StrUtils.isNotEmpty(pd.getString("PRIPID"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                if(pd.containsKey("TYPE_R") && StrUtils.isNotEmpty(pd.getString("TYPE_R")) && "1".equals(pd.getString("TYPE_R"))){
                    pd.put("REGNO",pd.get("PRIPID"));
                    PageData getPRIPID = entPanoramicService.getPRIPID(pd);
                    if(getPRIPID != null){
                        pd.put("PRIPID",getPRIPID.get("PRIPID"));
                    }
                }
                pageData = entPanoramicService.getEntScore(pd);
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
     * @title getEntCreditxq
     * @Author Strive_Li
     * @Description 获取企业信用详情URL
     * @Date 2020/8/27 17:37
     */
    @ResponseBody
    @RequestMapping(value = "/getEntCreditxq", produces = "text/html;charset=UTF-8")
    public String getEntCreditxq() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData pageData =new PageData();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("REGNO") && StrUtils.isNotEmpty(pd.getString("REGNO"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                String returnUrl="/company-gateway?keyword="+pd.getString("REGNO");
                String httpUrl=TokenGenDemo.getHttpUrl(returnUrl);
                pageData.put("httpUrl",httpUrl);
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
     * @title getEntQj
     * @Author Strive_Li
     * @Description 获取企业全景URL
     * @Date 2020/8/28 11:51
     */
    @ResponseBody
    @RequestMapping(value = "/getEntQj", produces = "text/html;charset=UTF-8")
    public String getEntQj() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData pageData =new PageData();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("REGNO") && StrUtils.isNotEmpty(pd.getString("REGNO"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                String httpUrl="";
                Map qccMap=TokenGenDemo.getSearchWide(pd.getString("REGNO"));
                List<LinkedTreeMap> entlist = (List<LinkedTreeMap>)qccMap.get("Result");
                if(entlist.size()!=0){
                    String keyNo = entlist.get(0).get("KeyNo").toString();
                    httpUrl+="/charts/company?keyNo="+keyNo;
                    httpUrl=TokenGenDemo.getHttpUrl(httpUrl);
                }
                pageData.put("httpUrl",httpUrl);
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
     * @title getXwyq
     * @Author Strive_Li
     * @Description 获取新闻舆情
     * @Date 2020/8/28 11:51
     */
    @ResponseBody
    @RequestMapping(value = "/getXwyq", produces = "text/html;charset=UTF-8")
    public String getXwyq() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        PageData pageData =new PageData();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("PRIPID") && StrUtils.isNotEmpty(pd.getString("PRIPID"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                String returnUrl="/monitor/news";
                String httpUrl=TokenGenDemo.getHttpUrl(returnUrl);
                pageData.put("httpUrl",httpUrl);
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
     * @title getEntNews
     * @Author Strive_Li
     * @Description 获取新闻舆情
     * @Date 2020/8/28 16:00
     */
    @ResponseBody
    @RequestMapping(value = "/getEntNews", produces = "text/html;charset=UTF-8")
    public String getEntNews() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> pageData =new ArrayList<>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("PRIPID") && StrUtils.isNotEmpty(pd.getString("PRIPID"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                if(pd.containsKey("TYPE_R") && StrUtils.isNotEmpty(pd.getString("TYPE_R")) && "1".equals(pd.getString("TYPE_R"))){
                    pd.put("REGNO",pd.get("PRIPID"));
                    PageData getPRIPID = entPanoramicService.getPRIPID(pd);
                    if(getPRIPID != null){
                        pd.put("PRIPID",getPRIPID.get("PRIPID"));
                    }
                }
                pageData = entPanoramicService.getEntNews(pd);
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        HashMap map1=new HashMap();
        map1.put("entNews",pageData);
        map.put("data", map1);
        return new Gson().toJson(map);
    }

    /**
     * 企查查企业舆情
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/searchNews", produces = "text/html;charset=UTF-8")
    public String searchNews() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        Map map1 = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("searchKey") && StrUtils.isNotEmpty(pd.getString("searchKey"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                String returnUrl="/CompanyNews/SearchNews";
                String parameter="searchKey="+ URLEncoder.encode(pd.getString("searchKey"), "utf-8");
                map1 = TokenGenDemo.SendRequest(returnUrl,parameter);
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        map.put("data", map1);
        return new Gson().toJson(map);
    }

    /**
     * 企业知识产权
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getintellectualProperty", produces = "text/html;charset=UTF-8")
    public String getintellectualProperty() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("searchKey") && StrUtils.isNotEmpty(pd.getString("searchKey"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                Integer year = Integer.valueOf(DateUtil.getYear());
                List<String> yearList= new ArrayList();//年份
                List patentsList= Arrays.asList(0,0,0,0,0);//各年份专利数
                List copyRightList= Arrays.asList(0,0,0,0,0);//各年份著作权数
                for (int i=5;i>0;i--){
                    yearList.add(year-i+"");
                }
                String returnUrl1="/PatentV4/SearchMultiPatents";//专利查询
                String returnUrl2="/CopyRight/SearchCopyRight";//企业著作权查询
                String parameter="pageSize=50&searchKey="+ URLEncoder.encode(pd.getString("searchKey"), "utf-8");
                for (int i=1;;i++){
                    String parameter1=parameter+"&pageIndex="+i;
                    Map map1 = TokenGenDemo.SendRequest(returnUrl1,parameter1);
                    List<Map> groupItems = (List<Map>)map1.get("GroupItems");
                    if (groupItems==null || groupItems.size()==0){
                        break;
                    }
                    List<Map> items = (List<Map>) groupItems.get(0).get("Items");
                    for (Map item : items) {
                        if (yearList.get(0).equals(item.get("Value"))){
                            patentsList.add(0,item.get("Count"));
                        }
                        if (yearList.get(1).equals(item.get("Value"))){
                            patentsList.add(1,item.get("Count"));
                        }
                        if (yearList.get(2).equals(item.get("Value"))){
                            patentsList.add(2,item.get("Count"));
                        }
                        if (yearList.get(3).equals(item.get("Value"))){
                            patentsList.add(3,item.get("Count"));
                        }
                        if (yearList.get(4).equals(item.get("Value"))){
                            patentsList.add(4,item.get("Count"));
                        }
                    }
                }
                for (int i=1;;i++){
                    String parameter1=parameter+"&pageIndex="+i;
                    Map map2 = TokenGenDemo.SendRequest(returnUrl2,parameter1);
                    List<Map> results = (List<Map>)map2.get("Result");
                    if (results==null || results.size()==0){
                        break;
                    }
                    int n0=0;
                    int n1=0;
                    int n2=0;
                    int n3=0;
                    int n4=0;
                    for (Map result : results) {
                        String registerDate = String.valueOf(result.get("RegisterDate"));
                        int year1 = DateUtil.getYear(registerDate);
                        if (Integer.valueOf(yearList.get(0))==year1){
                            n0+=1;
                        }
                        if (Integer.valueOf(yearList.get(1))==year1){
                            n1+=1;
                        }
                        if (Integer.valueOf(yearList.get(2))==year1){
                            n2+=1;
                        }
                        if (Integer.valueOf(yearList.get(3))==year1){
                            n3+=1;
                        }
                        if (Integer.valueOf(yearList.get(4))==year1){
                            n4+=1;
                        }
                    }
                    copyRightList.add(0,n0);
                    copyRightList.add(1,n1);
                    copyRightList.add(2,n2);
                    copyRightList.add(3,n3);
                    copyRightList.add(4,n4);
                }
                map.put("yearList", yearList);
                map.put("patentsList", patentsList);
                map.put("copyRightList", copyRightList);
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
}
