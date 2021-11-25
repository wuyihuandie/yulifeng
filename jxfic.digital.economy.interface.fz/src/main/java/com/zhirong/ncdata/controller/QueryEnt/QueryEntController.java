package com.zhirong.ncdata.controller.QueryEnt;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;
import com.zhirong.ncdata.common.entity.Page;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.QueryEnt.QueryEntService;
import com.zhirong.ncdata.service.entPanoramic.EntPanoramicService;
import com.zhirong.ncdata.utils.ParamJsonToMap;
import com.zhirong.ncdata.utils.RedisUtils;
import com.zhirong.ncdata.utils.StrUtils;
import com.zhirong.ncdata.utils.TokenGenDemo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author yanfeifan
 * @Package com.zhirong.ncdata.controller.QueryEnt
 * @Description 企业查询
 * @date 2020/9/2 14:24
 */
@Controller
@RequestMapping(value = "/queryEntController")
public class QueryEntController extends BaseController {

    @Autowired
    private EntPanoramicService entPanoramicService;
    @Autowired
    private RedisUtils redisUtils;
    @Autowired
    private QueryEntService queryEntService;

    /**
     * @Auther: hyming
     * Description:获取keyNo
     * @Date :16:28 2020/10/26
     * @Return:
     * @Param:  * @param null
     */
    @ResponseBody
    @RequestMapping(value = "/getEntKeyNo", produces = "text/html;charset=UTF-8")
    public void getEntKeyNo() throws Exception {
        Page page = this.getPage();
        PageData pd = new ParamJsonToMap().toMap(page.getPageData().getString("param"));//参数封装在param中
        //查询表中cc_data_szjjqygxb中企业名称findDataSzjjqygxbEntname
        List<String> entNameList = queryEntService.findDataSzjjqygxbEntname(pd);
        //根据entNameList中的企业名称来查询keyno
        HashMap map2 = new HashMap();
        String keyno = "";
        for (String entName : entNameList) {
            keyno= TokenGenDemo.getKeyNoByName(entName);
            if(!"error".equals(keyno)){
                map2.put("keyno",keyno);
                map2.put("entname",entName);
                queryEntService.insertDataSzjjqygxbByEntname(map2);
            }
        }
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
        Page page = this.getPage();
        PageData pd = new ParamJsonToMap().toMap(page.getPageData().getString("param"));//参数封装在param中
        //PageData pageData =new PageData();
//        List<LinkedTreeMap> list = new ArrayList<>();
        List<PageData> list = new ArrayList<>();
        HashMap map = new HashMap();
        String total = "";
        //判断接口入参是否缺失
        if (pd.containsKey("REGNO") && StrUtils.isNotEmpty(pd.getString("REGNO"))) {
            map.put("status", "10001");
            map.put("msg", "接口调用成功");
            try {
//                Map getSearchWide= TokenGenDemo.getSearchWideByDetails(pd.getString("searchName"), Integer.valueOf(pd.get("page").toString()));
                PageHelper.startPage(page.getPage(), page.getLimit());//分页
                Map getSearchWide= new HashMap();
                List<PageData> entMsg = entPanoramicService.getSearchWideByTableDetails(pd.getString("searchName"), Integer.valueOf(pd.get("page").toString()));
                if (entMsg.size() > 0) {
                    getSearchWide.put("Status", "200");
                    getSearchWide.put("Message", "查询成功");
                    LinkedTreeMap Paging = new LinkedTreeMap();
                    Paging.put("PageSize", 10.0);
                    Paging.put("PageIndex", Double.valueOf(pd.get("page").toString()));
                    Paging.put("TotalRecords", entPanoramicService.getSearchWideByTableDetailsCount(pd.getString("searchName")));
                    getSearchWide.put("Paging", Paging);
                    getSearchWide.put("OrderNumber", "ECI2020110314572057189169");
                    getSearchWide.put("Result", entMsg);
                } else {
                    getSearchWide.put("Status", "201");
                    getSearchWide.put("Message", "查询无结果");
                    getSearchWide.put("Paging", null);
                    getSearchWide.put("OrderNumber", "ECI2020110315073398030633");
                    getSearchWide.put("Result", null);
                }
                Map<String,Object> paging = (Map<String, Object>) getSearchWide.get("Paging");
                if(paging != null){
                    Double sum = paging.get("TotalRecords") == null?0.0: Double.valueOf(paging.get("TotalRecords").toString());
                    total = new DecimalFormat("0").format(sum);
                }
                if(getSearchWide.get("Result") != null){
//                    list = (List<LinkedTreeMap>) getSearchWide.get("Result");
                    list = (List<PageData>) getSearchWide.get("Result");
                    for (int i = 0;i<list.size();i++){
                        String no = list.get(i).get("No").toString();
                        PageData pp = entPanoramicService.getEntChainByPripid(no);
                        if(pp!=null){
                            list.get(i).put("CHAIN_NAME",pp.get("CHAIN_NAME"));
                        }
                    }
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
        //PageInfo pageinfo = new PageInfo(list);
        page.setCount(Long.valueOf("".equals(total)?"0":total));
        page.setList(list);
        page.setMap(null);//把入参清空
        map.put("data",page);
        return new Gson().toJson(map);
    }



    //

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getEntMsg
     * @Author 谌思宇
     * @Description 获取不同企业的数量与企业信息
     * @Date 2020/10/21 
     */
    @ResponseBody
    @RequestMapping(value = "/getInFormationDriven",method = RequestMethod.GET)
    public String getInFormationDriven() {
        PageData pd = this.getPageData();
        HashMap map = new HashMap();
        List<PageData> inFormationDriven = null;
        //判断接口入参是否缺失
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        try {
            inFormationDriven = queryEntService.getInFormationDriven(pd);
            map.put("QYSLDW", "家");
        } catch (Exception e) {
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        map.put("data", inFormationDriven);
        return new Gson().toJson(map);
    }


    /**
     * @Author 谌思宇
     * @Description 分页查询demo
     * @Date  2020/10/22
     * @Param []
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/findDataSzjjqygxbByCustomize",method = RequestMethod.POST)
    public String findDataSzjjqygxbByCustomize(){
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
            map.put("QYSLDW", "家");
            map.put("JEDW", "万元");
            try {
                list = queryEntService.findDataSzjjqygxbByCustomize(pd);
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
