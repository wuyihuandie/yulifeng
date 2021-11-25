package com.zhirong.ncdata.service.index;

import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author yanfeifan
 * @Package com.zhirong.ncdata.service.index
 * @Description 数字经济controller层
 * @date 2020/8/12 10:18
 */
@Service
public class DigitalEconomyService {

    @Resource(name = "daoSupport")
    private DaoSupport dao;


    /**
     * 查询数据经济预警总览
     * @param pd
     * @return List<PageData>
     * @throws Exception
     */
    public List<PageData> queryDigitalEconomyLJZAndZS(PageData pd) throws Exception {
        List<PageData> list = new ArrayList<>();
        //查询所属年份各省数字经济累计值
        List<PageData> digitalEconomyLJZAndZSList = (List<PageData>) dao.findForList("DigitalEconomyMapper.queryDigitalEconomyLJZAndZS",pd);
        if(digitalEconomyLJZAndZSList.size()>0){
            //格式化数据
            digitalEconomyLJZAndZSList = decimalFormat(digitalEconomyLJZAndZSList,"0");
            for (int i = 0; i < digitalEconomyLJZAndZSList.size(); i++) {
                //循环查找相同的区域码
                if(pd.getString("area").equals(digitalEconomyLJZAndZSList.get(i).getString("AREA"))){
                    PageData pData = new PageData();
                    pData.put("rank",i+1);
                    pData.put("AREA",digitalEconomyLJZAndZSList.get(i).getString("AREA"));
                    pData.put("GDP_SZJJ_ZS",digitalEconomyLJZAndZSList.get(i).get("GDP_SZJJ_ZS"));
                    pData.put("AREA_NAME",digitalEconomyLJZAndZSList.get(i).get("AREA_NAME"));
                    pData.put("GDP_SZJJ_LJZ",digitalEconomyLJZAndZSList.get(i).get("GDP_SZJJ_LJZ"));
                    pData.put("UNIT",digitalEconomyLJZAndZSList.get(i).get("UNIT"));
                    list.add(pData);
                }
            }

        }
        return list;
    }

    /**
     * 数字经济总量和总增速
     * @param pd
     * @return List<PageData>
     * @throws Exception
     */
    public List<PageData> queryDigitalEconomyZLAndZZS(PageData pd) throws Exception {
        List<PageData> list = (List<PageData>) dao.findForList("DigitalEconomyMapper.queryDigitalEconomyZLAndZZS",pd);
        //格式化数据
        list = decimalFormat(list,"1");
        return list;
    }

    /**
     * 数字经济总量和总增速-全国
     * @param pd
     * @return List<PageData>
     * @throws Exception
     */
    public List<PageData> queryDigitalEconomyZLAndZZSByAll(PageData pd) throws Exception {
        List<PageData> list = (List<PageData>) dao.findForList("DigitalEconomyMapper.queryDigitalEconomyZLAndZZSByAll",pd);
        //格式化数据
        for (PageData pageData : list) {
            if(pageData != null){
                float gdpNum = 0;
                if(pageData.get("gdpNum") != null) {
                    gdpNum = (float) pageData.get("gdpNum");
                    DecimalFormat df = new DecimalFormat("#,###.00");
                    pageData.put("gdpNum", df.format(gdpNum));
                }
            }
        }
        return list;
    }

    /**
     * 数字经济占GDP的比重及增速
     * @param pd
     * @return List<PageData>
     * @throws Exception
     */
    public List<List<Object>> queryDigitalEconomyGDPBZAndZS(PageData pd) throws Exception {
        List<List<Object>> listList = new ArrayList<>();
        List<PageData> queryDigitalEconomyGDPBZAndZS = (List<PageData>) dao.findForList("DigitalEconomyMapper.queryDigitalEconomyGDPBZAndZS",pd);
        //格式化数据
        for (PageData pageData : queryDigitalEconomyGDPBZAndZS) {
            if(pageData != null){
                List<Object> list = new ArrayList<>();
                list.add(pageData.get("GDP_SZJJ_LJZ"));
                list.add(pageData.get("GDP_SZJJ_ZS"));
                list.add(pageData.get("GDP_SZJJ_ZB"));
                list.add(pageData.get("AREA"));
                list.add(pageData.get("AREA_NAME"));
                list.add(pageData.get("UNIT"));
                listList.add(list);
            }
        }
        return listList;
    }

    /**
     * 数字经济增长趋势
     * @param pd
     * @return List<PageData>
     * @throws Exception
     */
    public Map<String,Object> queryDigitalEconomyZZQS(PageData pd) throws Exception {
        Map<String,Object> map = new HashMap<>();
        List<Object> gdpNumList = new ArrayList<>();
        List<Object> growthRateList = new ArrayList<>();
        List<PageData> queryDigitalEconomyGDPBZAndZS = (List<PageData>) dao.findForList("DigitalEconomyMapper.queryDigitalEconomyZZQS",pd);
        //获取近7年份
        List<String> getBeforeSevenYear = getBeforeYear(3);
        for (String year : getBeforeSevenYear) {
            for (PageData pageData : queryDigitalEconomyGDPBZAndZS) {
                if(year.equals(pageData.get("INTERVAL_DATE"))){
                    gdpNumList.add(pageData.get("gdpNum")==null?"null":pageData.get("gdpNum"));
                    growthRateList.add(pageData.get("growthRate")==null?"null":pageData.get("growthRate"));
                    map.put("UNIT",pageData.get("UNIT"));
                }
            }
        }
        map.put("dataNames",getBeforeSevenYear);
        map.put("dataValues",gdpNumList);
        map.put("growthRateList",growthRateList);
        return map;
    }

    /**
     * 数字经济增长趋势-全国
     * @param pd
     * @return List<PageData>
     * @throws Exception
     */
    public Map<String,Object> queryDigitalEconomyZZQSByAll(PageData pd) throws Exception {
        Map<String,Object> map = new HashMap<>();
        List<Object> gdpNumList = new ArrayList<>();
        List<Object> growthRateList = new ArrayList<>();
        List<PageData> list = (List<PageData>) dao.findForList("DigitalEconomyMapper.queryDigitalEconomyZZQSByAll",pd);
        //获取近7年份
        List<String> getBeforeSevenYear = getBeforeYear(3);
        for (String year : getBeforeSevenYear) {
            for (PageData pageData : list) {
                if(year.equals(pageData.get("INTERVAL_DATE"))){
                    gdpNumList.add(pageData.get("gdpNum")==null?"null":pageData.get("gdpNum"));
                    growthRateList.add(pageData.get("growthRate")==null?"null":pageData.get("growthRate"));
                    map.put("UNIT",pageData.get("UNIT"));
                }
            }
        }
        map.put("dataNames",getBeforeSevenYear);
        map.put("dataValues",gdpNumList);
        map.put("growthRateList",growthRateList);
        return map;
    }

    /**
     * 数字经济排名
     * @param pd
     * @return List<PageData>
     * @throws Exception
     * 
     */
    public List<PageData> queryDigitalEconomyPM(PageData pd) throws Exception {
        //当前年的数字经济排名
        List<PageData> presentList = (List<PageData>) dao.findForList("DigitalEconomyMapper.queryDigitalEconomyPM",pd);
        //去年的数字经济排名
        int presentYear = Integer.valueOf(pd.getString("year"));
        String formerlyOneYear = String.valueOf(presentYear-1);
        pd.put("year",formerlyOneYear);
        List<PageData> formerlyList = (List<PageData>) dao.findForList("DigitalEconomyMapper.queryDigitalEconomyPM",pd);
        //格式化数据
        presentList = decimalFormat(presentList,"0");
        //循环比较2年的排名，算出排名上升还是下降
        for (PageData presentListData : presentList) {
            for (PageData formerlyListData : formerlyList) {
                if(presentListData.getString("AREA").equals(formerlyListData.getString("AREA"))){
                    String presentRANK = presentListData.getString("rank");
                    String formerlyRANK = formerlyListData.getString("rank");
                    int rankChange = Integer.valueOf(formerlyRANK)-Integer.valueOf(presentRANK);
                    presentListData.put("rankChange",rankChange);
                }
            }
        }

        return presentList;
    }
    
    /**
     * 数字经济 增速排名
     * @param pd
     * @return List<PageData>
     * @throws Exception
     * 1
     */
    public List<PageData> queryDigitalEconomyPMByZs(PageData pd) throws Exception {
        //当前年的数字经济排名
        List<PageData> presentList = (List<PageData>) dao.findForList("DigitalEconomyMapper.queryDigitalEconomyPMByZs",pd);
        //去年的数字经济排名
        int presentYear = Integer.valueOf(pd.getString("year"));
        String formerlyOneYear = String.valueOf(presentYear-1);
        pd.put("year",formerlyOneYear);
        List<PageData> formerlyList = (List<PageData>) dao.findForList("DigitalEconomyMapper.queryDigitalEconomyPMByZs",pd);
        //格式化数据
        presentList = decimalFormat(presentList,"0");
        //循环比较2年的排名，算出排名上升还是下降
        for (PageData presentListData : presentList) {
            for (PageData formerlyListData : formerlyList) {
                if(presentListData.getString("AREA").equals(formerlyListData.getString("AREA"))){
                    String presentRANK = presentListData.getString("rank");
                    String formerlyRANK = formerlyListData.getString("rank");
                    int rankChange = Integer.valueOf(formerlyRANK)-Integer.valueOf(presentRANK);
                    presentListData.put("rankChange",rankChange);
                }
            }
        }

        return presentList;
    }
    
    

    /**
     * 江西省核心产业企业营收各市占比情况
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> queryDigitalIncomeRate(PageData pd) throws Exception {
        List<PageData> list1= (List<PageData>) dao.findForList("DigitalEconomyMapper.queryDigitalEconomyPM",pd);//区域GDP
        List dataNames=new ArrayList<>();//各名称集合
        List<PageData> dataValues=new ArrayList<>();//各数据集合
        if(list1.size()>0){
            for (int i = 0; i < list1.size(); i++) {
                dataNames.add(i,list1.get(i).get("AREA_NAME"));
                PageData pageData =new PageData();
                pageData.put("name",list1.get(i).get("AREA_NAME"));
                pageData.put("value",Double.valueOf(String.format("%.2f", Double.parseDouble(list1.get(i).get("GDP_SZJJ_LJZ").toString()))));
                dataValues.add(pageData);
            }
        }
        PageData pageData =new PageData();
        pageData.put("dataNames",dataNames);
        pageData.put("dataValues",dataValues);
        List <PageData>list2=new ArrayList<>();//各区数据
        list2.add(pageData);
        return list2;
    }
    /**@param list 数据集
     *@param type 字段类型
    * @throws
    * @Author yanfeifan
    * @Description 格式化数据-#,###.00
     * **/
    private List<PageData> decimalFormat(List<PageData> list,String type){
        for (PageData pageData : list) {
            if(pageData != null){
                if("1".equals(type)){
                    Double gdpNum = 0.0;
                    if(pageData.get("gdpNum") != null) {
                        gdpNum = Double.valueOf((Double) pageData.get("gdpNum"));
                        DecimalFormat df = new DecimalFormat("#,###.00");
                        pageData.put("gdpNum", df.format(gdpNum));
                    }
                }else{
                    float GDP_SZJJ_LJZ = 0;
                    if(pageData.get("GDP_SZJJ_LJZ") != null){
                        GDP_SZJJ_LJZ = (float) pageData.get("GDP_SZJJ_LJZ");
                        DecimalFormat df = new DecimalFormat("#,###.00");
                        pageData.put("GDP_SZJJ_LJZ",df.format(GDP_SZJJ_LJZ));
                    }
                }
            }
        }
        return list;
    }

    /**@atuh
     * 获取当前年的前几年
     * @param num 需要获取前几年
     * @return List<String>
     */
    public List<String> getBeforeYear(int num){
        List<String> list = new ArrayList<>();
        SimpleDateFormat format = new SimpleDateFormat("yyyy");
        Calendar c = Calendar.getInstance();
        for (int i = num; i > 0; i--) {
            c.setTime(new Date());
            c.add(Calendar.YEAR, -i);
            Date y = c.getTime();
            String year = format.format(y);
            list.add(year);
        }
        return list;
    }

}
