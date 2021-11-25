package com.zhirong.ncdata.controller.entPanoramic;

import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.common.utils.StringUtils;
import com.zhirong.ncdata.config.ConfigProperties;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.entPanoramic.EntPanoramicService;
import com.zhirong.ncdata.utils.RedisUtils;
import com.zhirong.ncdata.utils.RequestLink;
import com.zhirong.ncdata.utils.StrUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.*;

/**
 * @Classname EntPanoramicController
 * @Description 企业全景
 * @Author 陶华琴
 * @Date 2020/10/22 10:33
 */
@Controller
@RequestMapping(value = "/entPanoramicNewController")
public class EntPanoramicNewController extends BaseController {

    @Autowired
    private EntPanoramicService entPanoramicService;
    @Autowired
    private RedisUtils redisUtils;
    @Autowired
    private ConfigProperties configProperties;

    /**
     * 企业全景视图
     * @return
     */
    @RequestMapping(value = "/queryAllView",produces = "text/html;charset=UTF-8")
    public String queryAllView(){
        PageData pd = this.getPageData();
        PageData pd2 = new PageData();
        Map<String,Object> echartsMap = new HashMap<>(10);
        HashMap map = new HashMap();
        map.put("status", "10001");
        map.put("msg", "接口调用成功");
        try {
            if (pd.containsKey("KeyNo")&&null!=pd.get("KeyNo")&&pd.containsKey("entname")&&null!=pd.get("entname")){
                Object keyNo = pd.get("KeyNo");
                pd2.put("unique",keyNo);
                Map<String,Object> temp1 = new HashMap<String, Object>();
                Map<String,Object> temp2 = new HashMap<String, Object>();
                List<Map<String, Object>> categoriesList = new ArrayList<Map<String, Object>>();
                List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>();
                List<Map<String, Object>> linksList = new ArrayList<Map<String, Object>>();

                String entname =pd.getString("entname").trim();
                temp1.put("name",entname);
                temp1.put("symbolSize",50);
                temp2.put("color","#23a7ea");
                temp1.put("itemStyle",temp2);
                dataList.add(temp1);

                String url1 = configProperties.getGETENTESTINFO();
                Map<String, Object> resultMap = RequestLink.sendConnectByPdToMap10(url1, pd2, "POST","unique");
                //判断接口调用是否成功
                if("200".equals(resultMap.get("status")+"") && "成功".equals(resultMap.get("message")+"")) {
                    //登记信息
                    Map<String, Object> dataMap = (Map<String, Object>)((Map<String, Object>) resultMap.get("result")).get("Company");
                    //主要人员
                    List<Map<String, Object>> employeesList = (List<Map<String, Object>>) dataMap.get("Employees");

                    temp1 = new HashMap<String, Object>();
                    temp1.put("name","主要人员");
                    categoriesList.add(temp1);
                    temp1  = new HashMap<String, Object>();
                    temp1.put("name","主要人员");
                    temp1.put("category","主要人员");
                    temp1.put("symbolSize",30);
                    dataList.add(temp1);
                    temp1 = new HashMap<String, Object>();
                    temp1.put("source",entname);
                    temp1.put("target","主要人员");
                    linksList.add(temp1);
                    temp1 = new HashMap<String, Object>();
                    for (Map<String, Object> item:employeesList){
                        int i=1;
                        temp1 = new HashMap<String, Object>();
                        temp1.put("name",item.get("Name").toString()+"("+item.get("Job")+")");
                        temp1.put("category","主要人员");
                        temp1.put("symbolSize",15);
                        temp1.put("my",item);
                        String uuid = UUID.randomUUID().toString();
                        StringBuilder content = new StringBuilder();
                        content.append("<table style='border-top:1px solid #CCC;' id='" + uuid.replace("-", "") + "'>")
                                .append("<tr><td>主要人员："+ item.get("Name") +"</td></tr>")
                                .append("<tr><td>职务："+ item.get("Job") +"</td></tr></table>");
//                                .append("<tr align='center'><td colspan='2'><input type='button' class='ok' id='ok' value='确定' onclick='ok(\"" + uuid.replace("-", "") + "\")'/></td></tr></table>");
                        temp1.put("mycontent",content);
                        dataList.add(temp1);
                        temp1 = new HashMap<String, Object>();
                        temp1.put("source","主要人员");
                        temp1.put("target",item.get("Name").toString()+"("+item.get("Job")+")");
                        linksList.add(temp1);
                        i = i+4;
                    }

                    //分支机构
                    List<Map<String, Object>> annualReportsList = (List<Map<String, Object>>) dataMap.get("Branches");
                    temp1 = new HashMap<String, Object>();
                    temp1.put("name","分支机构");
                    categoriesList.add(temp1);
                    temp1  = new HashMap<String, Object>();
                    temp1.put("name","分支机构");
                    temp1.put("category","分支机构");
                    temp1.put("symbolSize",30);
                    dataList.add(temp1);
                    temp1 = new HashMap<String, Object>();
                    temp1.put("source",entname);
                    temp1.put("target","分支机构");
                    linksList.add(temp1);
                    temp1 = new HashMap<String, Object>();
                    for (Map<String, Object> item:annualReportsList){
                        if(!StrUtils.delNull(dataMap.get("Name")).equals("")){
                            int i=1;
                            temp1 = new HashMap<String, Object>();
                            temp1.put("name",StrUtils.delNull(item.get("Name")));
                            temp1.put("category","分支机构");
                            temp1.put("symbolSize",15);
                            temp1.put("my",item);
                            StringBuilder content = new StringBuilder();
                            String uuid = UUID.randomUUID().toString();
                            content.append("<table style='border-top:1px solid #CCC;' id='" + uuid.replace("-", "") + "'>")
                                    .append("<tr><td colspan='2'>分支机构名称："+ StrUtils.delNull(item.get("Name")) + "</td></tr>");
                            content.append("<tr><td colspan='2'>注册号："+ StrUtils.delNull(item.get("RegNo")) +"</td></tr>");
                            content.append("<tr><td colspan='2'>登记机关："+ StrUtils.delNull(item.get("BelongOrg")) +"</td></tr></table>");
//                                    .append("<tr align='center'><td colspan='2'><input type='button' class='ok' id='ok' value='确定' onclick='ok(\"" + uuid.replace("-", "") + "\")'/></td></tr></table>");
                            temp1.put("mycontent",content);
                            dataList.add(temp1);
                            temp1 = new HashMap<String, Object>();
                            temp1.put("source","分支机构");
                            temp1.put("target",StrUtils.delNull(item.get("Name")));
                            linksList.add(temp1);
                            i = i+2;
                        }
                    }

                    //股东
                    List<Map<String, Object>> partnersList = (List<Map<String, Object>>) dataMap.get("Partners");
                    temp1 = new HashMap<String, Object>();
                    temp1.put("name","股东");
                    categoriesList.add(temp1);
                    temp1  = new HashMap<String, Object>();
                    temp1.put("name","股东");
                    temp1.put("category","股东");
                    temp1.put("symbolSize",30);
                    dataList.add(temp1);
                    temp1 = new HashMap<String, Object>();
                    temp1.put("source",entname);
                    temp1.put("target","股东");
                    linksList.add(temp1);
                    for (Map<String, Object> item:partnersList){
                        temp1 = new HashMap<String, Object>();
                        temp1.put("name",item.get("StockName")+"("+item.get("StockType")+")");
                        temp1.put("category","股东");
                        temp1.put("symbolSize",15);
                        temp1.put("my",item);
                        StringBuilder content = new StringBuilder();
                        String uuid = UUID.randomUUID().toString();
                        content.append("<table style='border-top:1px solid #CCC;' id='" + uuid.replace("-", "") + "'>")
                                .append("<tr><td>股东："+ item.get("StockName") +"</td></tr>")
                                .append("<tr><td>股东类型："+ item.get("StockType") +"</td></tr>")
                                .append("<tr><td>证照/证件类型："+ item.get("IdentifyType") +"</td></tr>")
                                .append("<tr><td>证照/证件号码：***</td></tr></table>");
//                                .append("<tr align='center'><td colspan='2'><input type='button' class='ok' id='ok' value='确定' onclick='ok(\"" + uuid.replace("-", "") + "\")'/></td></tr></table>");
                        temp1.put("mycontent",content);
                        dataList.add(temp1);
                        temp1 = new HashMap<String, Object>();
                        temp1.put("source","股东");
                        temp1.put("target",item.get("StockName")+"("+item.get("StockType")+")");
                        linksList.add(temp1);
                    }

                    // 法定代表人
                    temp1 = new HashMap<String, Object>();
                    temp1.put("name","法定代表人");
                    categoriesList.add(temp1);
                    temp1  = new HashMap<String, Object>();
                    temp1.put("name","法定代表人");
                    temp1.put("category","法定代表人");
                    temp1.put("symbolSize",30);
                    dataList.add(temp1);
                    temp1 = new HashMap<String, Object>();
                    temp1.put("source",entname);
                    temp1.put("target","法定代表人");
                    linksList.add(temp1);
                    if(!StrUtils.delNull(dataMap.get("OperName")).equals("")){
                        temp1 = new HashMap<String, Object>();
                        temp1.put("name",StrUtils.delNull(dataMap.get("OperName")));
                        temp1.put("category","法定代表人");
                        temp1.put("symbolSize",15);
                        dataList.add(temp1);
                        temp1 = new HashMap<String, Object>();
                        temp1.put("source","法定代表人");
                        temp1.put("target",StrUtils.delNull(dataMap.get("OperName")));
                        linksList.add(temp1);
                    }
                }

                pd.put("searchKey",pd.get("entname").toString().trim());
                String url2 = configProperties.getGETINVESTMENTS();
                //查询对外投资
                Map<String, Object> resultMapTz = RequestLink.sendConnectByPdToMap10(url2, pd, "get","searchKey");

                if("200".equals(resultMapTz.get("status")+"") && "成功".equals(resultMapTz.get("message")+"")){
                    Map<String, Object> getInvestments = (Map<String, Object>) resultMapTz.get("result");
                    getInvestments.remove("Message");
                    List<Map<String, Object>> list = (List<Map<String, Object>>) getInvestments.get("Result");
                    for(int i = 0; i < list.size(); i++ ){
                        Set<String> keys = list.get(i).keySet();
                        for(String key: keys){
                            if(list.get(i).get(key)==null || "null".equals(list.get(i).get(key)+"")){
                                list.get(i).put(key+"","");
                            }
                        }
                    }
                    temp1 = new HashMap<String, Object>();
                    temp1.put("name","对外投资");
                    categoriesList.add(temp1);
                    temp1  = new HashMap<String, Object>();
                    temp1.put("name","对外投资");
                    temp1.put("category","对外投资");
                    temp1.put("symbolSize",30);
                    dataList.add(temp1);
                    temp1 = new HashMap<String, Object>();
                    temp1.put("source",entname);
                    temp1.put("target","对外投资");
                    linksList.add(temp1);
                    for (Map<String, Object> item:list){
                        temp1 = new HashMap<String, Object>();
                        temp1.put("name",item.get("Name"));
                        temp1.put("category","对外投资");
                        temp1.put("symbolSize",15);
                        temp1.put("my",item);
                        StringBuilder content = new StringBuilder();
                        String uuid = UUID.randomUUID().toString();
                        content.append("<table style='border-top:1px solid #CCC;' id='" + uuid.replace("-", "") + "'>")
                                .append("<tr><td>企业名称："+ item.get("Name") +"</td></tr>")
                                .append("<tr><td>信用代码/注册号："+CreditCode(item) +"</td></tr>")
                                .append("<tr><td>法定代表人："+ item.get("OperName") +"</td></tr>")
                                .append("<tr><td>注册资本："+ item.get("RegistCapi") +"</td></tr></table>");
//                                .append("<tr align='center'><td colspan='2'><input type='button' class='ok' id='ok' value='确定' onclick='ok(\"" + uuid.replace("-", "") + "\")'/></td></tr></table>");
                        temp1.put("mycontent",content);
                        dataList.add(temp1);
                        temp1 = new HashMap<String, Object>();
                        temp1.put("source","对外投资");
                        temp1.put("target",item.get("Name"));
                        linksList.add(temp1);
                    }
                }

                // 查找法院判决信息
                PageData sxpd = new PageData();
                sxpd.put("isExactlySame", "true");
                sxpd.put("name",pd.getString("entname").trim());
                sxpd.put("companyName",pd.getString("entname").trim());
                sxpd.put("KeyNo",pd.getString("KeyNo"));
                sxpd.put("unique",pd.get("KeyNo"));

                String url3 = configProperties.getGETZHIXINGLIST();
                //查询失信信息
                Map<String, Object> sxrresultMap  = RequestLink.sendConnectByPdToMap10(url3, sxpd, "POST","name");
                if("200".equals(sxrresultMap.get("status")+"") && "成功".equals(sxrresultMap.get("message")+"")){
                    List<Map<String, Object>> bzzlist = (List<Map<String, Object>>) ((Map<String, Object>) sxrresultMap.get("result")).get("Result");
                    temp1 = new HashMap<String, Object>();
                    temp1.put("name","失信被执行人");
                    categoriesList.add(temp1);
                    temp1  = new HashMap<String, Object>();
                    temp1.put("name","失信被执行人");
                    temp1.put("category","失信被执行人");
                    temp1.put("symbolSize",30);
                    dataList.add(temp1);
                    temp1 = new HashMap<String, Object>();
                    temp1.put("source",entname);
                    temp1.put("target","失信被执行人");
                    linksList.add(temp1);
                    for (Map<String, Object> item:bzzlist){
                        temp1 = new HashMap<String, Object>();
                        temp1.put("name",item.get("Anno"));
                        temp1.put("category","失信被执行人");
                        temp1.put("symbolSize",15);
                        temp1.put("my",item);
                        StringBuilder content = new StringBuilder();
                        String uuid = UUID.randomUUID().toString();
                        content.append("<table style='border-top:1px solid #CCC;' id='" + uuid.replace("-", "") + "'>")
                                .append("<tr><td>立案号："+ item.get("Anno") +"</td></tr>")
                                .append("<tr><td>名称："+item.get("Name") +"</td></tr>")
                                .append("<tr><td>执行法院："+ item.get("Executegov") +"</td></tr></table>");
//                                .append("<tr align='center'><td colspan='2'><input type='button' class='ok' id='ok' value='确定' onclick='ok(\"" + uuid.replace("-", "") + "\")'/></td></tr></table>");
                        temp1.put("mycontent",content);
                        dataList.add(temp1);
                        temp1 = new HashMap<String, Object>();
                        temp1.put("source","失信被执行人");
                        temp1.put("target",item.get("Anno"));
                        linksList.add(temp1);
                    }
                }
                // 查找法院判决信息;
                pd.clear();
                pd.put("searchKey",entname);
                String url4 = configProperties.getGETENTJUDGMENTLIST();
                //调用查询法院裁判文书接口
                Map<String, Object> queryJudgmentAjax = RequestLink.sendConnectByPdToMap10(url4, pd,"POST","searchKey");
                //判断接口调用是否成功
                if("200".equals(queryJudgmentAjax.get("status")+"") && "成功".equals(queryJudgmentAjax.get("message")+"")){
                    //得到法院裁判文书信息JSON数据中的data数据
                    Map<String, Object> patentInfo = (Map<String, Object>) queryJudgmentAjax.get("result");
                    patentInfo.remove("Message");
                    List<Map<String, Object>> list = (List<Map<String, Object>>) patentInfo.get("Result");
                    for(int i = 0; i < list.size(); i++ ){
                        Set<String> keys = list.get(i).keySet();
                        for(String key: keys){
                            if(list.get(i).get(key)==null || "null".equals(list.get(i).get(key)+"")){
                                list.get(i).put(key+"","");
                            }
                        }
                    }
                    temp1 = new HashMap<String, Object>();
                    temp1.put("name","判决文书");
                    categoriesList.add(temp1);
                    temp1  = new HashMap<String, Object>();
                    temp1.put("name","判决文书");
                    temp1.put("category","判决文书");
                    temp1.put("symbolSize",30);
                    dataList.add(temp1);
                    temp1 = new HashMap<String, Object>();
                    temp1.put("source",entname);
                    temp1.put("target","判决文书");
                    linksList.add(temp1);
                    for (Map<String, Object> item:list){
                        temp1 = new HashMap<String, Object>();
                        temp1.put("name",item.get("CaseNo"));
                        temp1.put("category","判决文书");
                        temp1.put("symbolSize",15);
                        temp1.put("my",item);
                        StringBuilder content = new StringBuilder();
                        String uuid = UUID.randomUUID().toString();
                        content.append("<table style='border-top:1px solid #CCC;' id='" + uuid.replace("-", "") + "'>")
                                .append("<tr><td>判决书文号："+ item.get("CaseNo") +"</td></tr>")
                                .append("<tr><td>判决内容："+item.get("CaseName") +"</td></tr>")
                                .append("<tr><td>作出判决机关："+ item.get("Court") +"</td></tr></table>");
//                                .append("<tr align='center'><td colspan='2'><input type='button' class='ok' id='ok' value='确定' onclick='ok(\"" + uuid.replace("-", "") + "\")'/></td></tr></table>");
                        temp1.put("mycontent",content);
                        dataList.add(temp1);
                        temp1 = new HashMap<String, Object>();
                        temp1.put("source","判决文书");
                        temp1.put("target",item.get("CaseNo"));
                        linksList.add(temp1);
                    }
                    echartsMap.put("categoriesList",categoriesList);
                    echartsMap.put("dataList",dataList);
                    echartsMap.put("linksList",linksList);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        map.put("data", echartsMap);
        return new Gson().toJson(map);
    }
    /**
     * 查询舆情新闻
     * @return
     */
    @RequestMapping(value = "/queryNews",produces = "text/html;charset=UTF-8")
    public String queryNews(){
        PageData pd = this.getPageData();
        Map<String, Object> data = new HashMap<>(5);
        HashMap map = new HashMap();
        try {
            if (pd.containsKey("searchKey")&&null != pd.get("searchKey")){
                String newsUrl = configProperties.getGETNEWS();
                //查询新闻
                Map<String, Object> resultMap = RequestLink.sendConnectByPdToMap10(newsUrl, pd, "get","searchKey");
                if("200".equals(resultMap.get("status")+"")){
                    map.put("status", "10001");
                    map.put("msg", "接口调用成功");
                    data = (Map<String, Object>)resultMap.get("result");
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            map.put("status", "999");
            map.put("msg", "接口异常");
        }
        map.put("data", data);
        return new Gson().toJson(map);
    }



    private String CreditCode(Map<String,Object> ebList){
        return String.valueOf(ebList.get("CreditCode")).equals("")?ebList.get("No").toString():ebList.get("CreditCode").toString();
    }
}
