package com.zhirong.ncdata.controller.industrialChain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zhirong.ncdata.common.entity.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.industrialChain.IndustrialChainService;
import com.zhirong.ncdata.utils.ParamJsonToMap;
import com.zhirong.ncdata.utils.StrUtils;

/**
 * @title
 * @Author Strive_Li
 * @Description 产业链分析
 * @Date 2020/8/18 11:10
 */
@Controller
@RequestMapping(value = "/industrialChainController")
public class IndustrialChainController extends BaseController {

    @Autowired
    private IndustrialChainService industrialChainService;
    
  


    /**外部调用了该接口
     *  @title dataOverviewJson
     *  @Author Strive_Li
     *  @Description 得到中间数据层信息
     *  @Date 2020/8/18 11:39
     * @param
     *  @return java.lang.String
     *  @throws
     */
    @RequestMapping(value = "/getDataLayers", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String dataOverviewJson() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        //判断接口入参是否缺失
        if (pd.containsKey("AREA")&& StrUtils.isNotEmpty(pd.getString("AREA"))&&pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
                && pd.containsKey("CHAIN_ID") && StrUtils.isNotEmpty(pd.getString("CHAIN_ID"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                list = industrialChainService.getDataLayers(pd);
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
     * @title getYears
     * @Author Strive_Li
     * @Description 获取年份列表
     * @Date 2020/8/14 14:46
     */
    @ResponseBody
    @RequestMapping(value = "/getYears", produces = "text/html;charset=UTF-8")
    public String getYears() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        try {
            list = industrialChainService.getYears(pd);//获取年份列表
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
     * @title getYears
     * @Author Strive_Li
     * @Description 获取顶层产业链
     * @Date 2020/8/14 14:46
     */
    @ResponseBody
    @RequestMapping(value = "/getTopIndustrialChains", produces = "text/html;charset=UTF-8")
    public String getTopIndustrialChains() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        if (pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))) {
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        try {
            list = industrialChainService.getTopIndustrialChains(pd);//获取顶层产业链
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        HashMap map1 = new HashMap();
        map1.put("topIndustrialChains", list);
        map.put("data", map1);
        return new Gson().toJson(map);
    }
    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getEnterpriseList
     * @Author Strive_Li
     * @Description 获取右侧企业列表
     * @Date 2020/8/14 14:46
     */
    @ResponseBody
    @RequestMapping(value = "/getEnterpriseList", produces = "text/html;charset=UTF-8")
    public String getEnterpriseList() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        if (pd.containsKey("AREA")  && StrUtils.isNotEmpty(pd.getString("AREA"))&& pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
                && pd.containsKey("CHAIN_ID") && StrUtils.isNotEmpty(pd.getString("CHAIN_ID"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
                list = industrialChainService.getEnterpriseList(pd);//获取右侧企业列表
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        HashMap map1 = new HashMap();
        map1.put("EntMsg", list);
        map.put("data", map1);
        return new Gson().toJson(map);
    }
    
    
   /**
     * @param 1:AREA (区域编号)
     *        2:YEAR (年度时间)
     *        3:CHAIN_ID (产业链编号) 
     *        4:CONDITION (排序条件: RATGRO(纳税总额),VENDINC(营业总收入),EMPNUM(从业人数)) 
     * @return java.lang.String
     * @throws 
     * @title getEnterpriseList
     * @Author 谌思宇
     * @Description 根据条件 获取 右侧企业列表  
     * @Date 2020/9/23 16:44
    */
    @ResponseBody
    @RequestMapping(value = "/getEnterpriseListByCondition", produces = "text/html;charset=UTF-8")
    public String getEnterpriseListByCondition() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        if (pd.containsKey("AREA")  && StrUtils.isNotEmpty(pd.getString("AREA"))
        		&& pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
                && pd.containsKey("PARENT_DL") && StrUtils.isNotEmpty(pd.getString("PARENT_DL"))
                && pd.containsKey("CONDITION") && StrUtils.isNotEmpty(pd.getString("CONDITION"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
            	
                list = industrialChainService.getEnterpriseListByCondition(pd);//获取右侧企业列表
            } catch (Exception e) {
                e.printStackTrace();
                map.put("status", "999");
                map.put("msg", "接口异常");
            }
        } else {
            map.put("status", "10009");
            map.put("msg", "接口内缺失必传的参数");
        }
        HashMap map1 = new HashMap();
        map1.put("EntMsg", list);
        map1.put("RATGROAndVENDINCOfUNIT", "万元");
        map1.put("EMPNUMOfUNIT", "人");
        map.put("data", map1);
        return new Gson().toJson(map);
    }

    /**
     * 重点项目清单查询
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getKeyProjectlist", produces = "text/html;charset=UTF-8")
    public String getKeyProjectlist(){
        Page page = this.getPage();
        PageData pd = new ParamJsonToMap().toMap(page.getPageData().getString("param"));//参数封装在param中
        PageHelper.startPage(page.getPage(), page.getLimit());//分页
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            list = industrialChainService.getKeyProjectlist(pd);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        PageInfo pageinfo = new PageInfo(list);
        page.setCount(pageinfo.getTotal());
        page.setList(list);
        page.setMap(null);//把入参清空
        map.put("data",page);
        return new Gson().toJson(map);
    }

    /**
     * 政策清单获取
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getPolicylist", produces = "text/html;charset=UTF-8")
    public String getPolicylist(){
        Page page = this.getPage();
        PageData pd = new ParamJsonToMap().toMap(page.getPageData().getString("param"));//参数封装在param中
        PageHelper.startPage(page.getPage(), page.getLimit());//分页
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            list = industrialChainService.getPolicylist(pd);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        PageInfo pageinfo = new PageInfo(list);
        page.setCount(pageinfo.getTotal());
        page.setList(list);
        page.setMap(null);//把入参清空
        map.put("data",page);
        return new Gson().toJson(map);
    }


    /**
     * @param 1:AREA (区域编号)
     *        2:YEAR (年度时间)
     *        3:PARENT_DL (产业大类)
     * @return java.lang.String
     * @throws
     * @title getIndustryChainDatas
     * @Author 陶华琴
     * @Description 产业链图获取
     * @Date 2020/10/9 11:44
     */
    @ResponseBody
    @RequestMapping(value = "/getIndustryChainDatas", produces = "text/html;charset=UTF-8")
    public String getIndustryChainDatas() {
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        if (pd.containsKey("AREA")  && StrUtils.isNotEmpty(pd.getString("AREA"))
                && pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
                && pd.containsKey("PARENT_DL") && StrUtils.isNotEmpty(pd.getString("PARENT_DL"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {

                list = industrialChainService.getIndustryChainDatas(pd);//获取右侧企业列表
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
     * @Author 陶华琴
     * @Description 具体产业环节下的企业获取（分页）
     * @return
     * @Date 2020/10/9 14:08
     */
    @ResponseBody
    @RequestMapping(value = "/getEnterpriseBychainIdList", produces = "text/html;charset=UTF-8")
    public String getEnterpriseBychainIdList() {
        Page page = this.getPage();
        PageData pd = new ParamJsonToMap().toMap(page.getPageData().getString("param"));//参数封装在param中
        PageHelper.startPage(page.getPage(), page.getLimit());//分页
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        try {
            if (pd.containsKey("YEAR") && StrUtils.isNotEmpty(pd.getString("YEAR"))
                    && pd.containsKey("PARENT_DL") && StrUtils.isNotEmpty(pd.getString("PARENT_DL"))
                    && pd.containsKey("AREA_CODE") && StrUtils.isNotEmpty(pd.getString("AREA_CODE"))
                    && pd.containsKey("CHAIN_LINK_NAME") && StrUtils.isNotEmpty(pd.getString("CHAIN_LINK_NAME"))
                    ) {
                map.put("status", "10001");
                map.put("msg", "接口调用成功");
                try {
                    list = industrialChainService.getEnterpriseBychainIdList(pd);//获取右侧企业列表
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
        PageInfo pageinfo = new PageInfo(list);
        page.setCount(pageinfo.getTotal());
        page.setList(list);
        page.setMap(null);//把入参清空
        map.put("data",page);
        return new Gson().toJson(map);
    }
}
