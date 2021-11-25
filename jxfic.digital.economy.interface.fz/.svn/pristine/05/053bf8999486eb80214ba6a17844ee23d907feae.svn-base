package com.zhirong.ncdata.service.entDistribution;

import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author 黄宇豪
 * @Description 产业布局
 * @Date 11:19 2020/8/22
 * @Param 
 * @return 
 **/
@Service
public class IndustryDistributionService {
	
    @Resource(name = "daoSupport")
    private DaoSupport dao;

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getNcShiArea
     * @Author Strive_Li
     * @Description 获取抚州市所有县(包括抚州市)
     * @Date 2020/8/22 17:22
     */
    public List<PageData> getNcShiArea(PageData pd) throws Exception {
        return (List<PageData>)dao.findForList("IndustryDistributionMapper.getNcShiArea",pd);//获取抚州市区域
    }

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getYearList
     * @Author Strive_Li
     * @Description 获取年份列表
     * @Date 2020/8/23 20:29
     */
    public List<PageData> getYearList(PageData pd) throws Exception {
        List<PageData> list=(List<PageData>)dao.findForList("IndustryDistributionMapper.getYearList",pd);//获取年份列表
        List list1 = new ArrayList();
        for (int i = 0; i <list.size() ; i++) {
            list1.add(list.get(i).getString("year"));
        }
        return list1;
    }

    /**
     * @Author 黄宇豪
     * @Description 数字经济发展情况（数字经济增长曲线）(全国)
     * @Date 12:05 2020/8/22
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    public List<PageData> szjjFiveYearList(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("IndustryDistributionMapper.szjjFiveYearList",pd);
    }
    /**
     * @Author 黄宇豪
     * @Description 数字经济发展情况（GDP增长曲线）(抚州)
     * @Date 12:19 2020/8/22
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    public List<PageData> gdpFiveYearList(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("IndustryDistributionMapper.gdpFiveYearList",pd);
    }
    /**
     * @Author 黄宇豪
     * @Description 数字经济近6年企业数(抚州)
     * @Date 14:25 2020/8/22
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    /*public List<PageData> szjjEntSixYearList(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("IndustryDistributionMapper.szjjEntSixYearList",pd);
    }*/
    /**
     * @Author 黄宇豪
     * @Description 获取数字经济发展情况折线图数据
     * @Date 15:27 2020/8/22
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    public PageData getSzjjFiveYearLine(PageData pd) throws Exception {
        PageData linepd = new PageData();
        List<PageData> szjjList = szjjFiveYearList(pd);//数字经济增长曲线
        List<PageData> gdpList = gdpFiveYearList(pd);//GDP增长曲线

        String dataNames[] = new String[szjjList.size()];
        double dataValuesSzjj[] = new double[szjjList.size()];
        double dataValuesGdp[] = new double[szjjList.size()];

        for(int i = 0;i<szjjList.size();i++){
            dataNames[i] = szjjList.get(i).get("YEAR").toString();
            dataValuesSzjj[i] = Double.parseDouble(szjjList.get(i).get("GDP_SZJJ_ZSS").toString());
            dataValuesGdp[i] = Double.parseDouble(gdpList.get(i).get("GDP_LJTBS").toString());
        }
        linepd.put("dataNames",dataNames);
        linepd.put("dataValuesSzjj",dataValuesSzjj);
        linepd.put("dataValuesGdp",dataValuesGdp);
        return linepd;
    }
    
    /**
     * @Author 黄宇豪
     * @Description 数字经济企业发展情况近5年
     * @Date 14:54 2020/8/22
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    public List<PageData> szjjEntRegcapFiveYearList(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("IndustryDistributionMapper.szjjEntRegcapFiveYearList",pd);
    }
    /**
     * @Author 黄宇豪
     * @Description 数字经济企业发展情况折线图数据
     * @Date 15:31 2020/8/22
     * @Param [pd]
     * @return com.zhirong.ncdata.common.entity.PageData
     **/
    public PageData getSzjjEntFiveYearLine(PageData pd) throws Exception {
        PageData linepd = new PageData();
        List<PageData> szjjList = szjjEntRegcapFiveYearList(pd);

        if("1".equals(pd.getString("industryType"))){//注册资本
            //szjjList = szjjEntRegcapFiveYearList(pd);
            String dataNames[] = new String[szjjList.size()];
            double dataValues[] = new double[szjjList.size()];
            for(int i = 0;i<szjjList.size();i++){
                dataNames[i] = szjjList.get(i).get("YEAR").toString();
                dataValues[i] = Double.parseDouble(szjjList.get(i).get("REGCAPS").toString());
            }
            linepd.put("dataNames",dataNames);
            linepd.put("dataValues",dataValues);
        }else if("2".equals(pd.getString("industryType"))){//市场主体总量
            //szjjList = szjjEntSixYearList(pd);
            String dataNames[] = new String[szjjList.size()];
            int dataValues[] = new int[szjjList.size()];
            for(int i = 0;i<szjjList.size();i++){
                dataNames[i] = szjjList.get(i).get("YEAR").toString();
                dataValues[i] = Integer.parseInt(szjjList.get(i).get("ENTTOTALSUM").toString());
            }
            linepd.put("dataNames",dataNames);
            linepd.put("dataValues",dataValues);
        }else if("3".equals(pd.getString("industryType"))){//市场主体新增
            //szjjList = szjjEntSixYearList(pd);
            String dataNames[] = new String[szjjList.size()];
            int dataValues[] = new int[szjjList.size()];
            for(int i = 0;i<szjjList.size();i++){
                dataNames[i] = szjjList.get(i).get("YEAR").toString();
                dataValues[i] = Integer.parseInt(szjjList.get(i).get("ENTTOTALXZ").toString());
            }
            linepd.put("dataNames",dataNames);
            linepd.put("dataValues",dataValues);
        }
        return linepd;
    }
    /**
     * @Author 黄宇豪
     * @Description 各县区数字经济产业排名
     * @Date 16:03 2020/8/22
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    public List<PageData> szjjByAreaList(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("IndustryDistributionMapper.szjjByAreaList",pd);
    }
    /**
     * @Author 黄宇豪
     * @Description 各县区数字经济产业排名
     * @Date 16:16 2020/8/22
     * @Param [pd]
     * @return com.zhirong.ncdata.common.entity.PageData
     **/
    public PageData getSzjjByAreaList(PageData pd) throws Exception {
        PageData linepd = new PageData();
        List<PageData> szjjList = szjjByAreaList(pd);//县区数字经济产业

        String dataNames[] = new String[szjjList.size()];
        double dataValues[] = new double[szjjList.size()];

        for(int i = 0;i<szjjList.size();i++){
            dataNames[i] = szjjList.get(i).get("AREA_NAME").toString();
            dataValues[i] = Double.parseDouble(szjjList.get(i).get("SZJJCYZE").toString());
        }
        linepd.put("dataNames",dataNames);
        linepd.put("dataValues",dataValues);
        return linepd;
    }
    /**
     * @Author 黄宇豪
     * @Description 数字经济地图数据
     * @Date 17:06 2020/8/22
     * @Param [pd]
     * @return com.zhirong.ncdata.common.entity.PageData
     **/
    public List<PageData> szjjMapData(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("IndustryDistributionMapper.szjjMapData",pd);
    }

    /**
     * 查询所有
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> szjjAllMapData(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("IndustryDistributionMapper.szjjAllMapData",pd);
    }
    /**
     * @Author 黄宇豪
     * @Description 查询区域列表
     * @Date 17:26 2020/9/9
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    public List<PageData> areaList(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("IndustryDistributionMapper.areaList",pd);
    }
    /**
     * @Author 黄宇豪
     * @Description 获取企业数量
     * @Date 17:41 2020/9/9
     * @Param [pd]
     * @return int
     **/
    public int getEntNum(PageData pd) throws Exception {
        return  (int) dao.findForObject("IndustryDistributionMapper.getEntNum",pd);
    }
    public List<PageData> getSzjjMapData(PageData pd) throws Exception {
        List<PageData> areaList = areaList(pd);
        for(PageData newpd : areaList){
            List<PageData> szjjMapData = new ArrayList<>();
            if(pd.get("PARENT_DL")==null||"".equals(pd.get("PARENT_DL"))){
                szjjMapData = szjjAllMapData(newpd);
            }else{
                newpd.put("PARENT_DL",pd.get("PARENT_DL"));
                newpd.put("AREA",pd.get("AREA"));
                szjjMapData = szjjMapData(newpd);
            }
            newpd.put("szjjMapData",szjjMapData);
        }
        return areaList;
    }



    /**
     * 数字经济产业现状数据总览
     * @Author 陶华琴
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getIndustryChainOverAll(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("IndustryDistributionMapper.getIndustryChainOverAll",pd);
    }
    
    /**
     * 数字经济 地域分析 城市发展 现状 数据总览
     * @Author 谌思宇
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getRegionAnalysisAll(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("IndustryDistributionMapper.getRegionAnalysisAll",pd);
    }
    
   
    /**
     * 各县区数字经济产业发展
     * @Author 陶华琴
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getSzjjEntByArea(PageData pd) throws Exception {
        List<PageData> list = null;
        String condition = pd.get("CONDITION").toString();
        if("1".equals(condition)){
            list = (List<PageData>) dao.findForList("IndustryDistributionMapper.getSzjjEntByArea",pd);
        }else{
            list = (List<PageData>) dao.findForList("IndustryDistributionMapper.getSzjjIncomeByArea",pd);
        }
        return list;
    }

    /**
     * 各产业数量 标准产业分类
     * @Author 陶华琴
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getIndustryChainPmNums(PageData pd) throws Exception {
        List<PageData> list = null;
        String condition = pd.get("CONDITION").toString();
        if("1".equals(condition)){
            list = (List<PageData>) dao.findForList("IndustryDistributionMapper.getIndustryChainEntPmNums",pd);
        }else{
            list = (List<PageData>) dao.findForList("IndustryDistributionMapper.getIndustryChainIncomePmNums",pd);
        }
        return  list;
    }
    
    /**
     * 数字经济产业 地域分析 各产业数量 与 占比
     * @Author 谌思宇
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getRegionAnalysisNums(PageData pd) throws Exception {
    	List<PageData> list = null;
        String condition = pd.get("CONDITION").toString();
        if("1".equals(condition)){
            list = (List<PageData>) dao.findForList("IndustryDistributionMapper.getIndustryChainEntPmNums",pd);
        }else{
            if("2".equals(condition)){
                pd.put("CONDITION","an.VENDINC");
            }else if("3".equals(condition)){
                pd.put("CONDITION","an.RATGRO");
            }else if("4".equals(condition)){
                pd.put("CONDITION","an.NETINC");
            }else{
                pd.put("CONDITION","an.EMPNUM");
            }
            list = (List<PageData>) dao.findForList("IndustryDistributionMapper.getIndustryChainIncomePmNums",pd);
        }
        
        Integer numbers = 0;   //总数
        for (PageData pageData : list) {
        	Integer Number = Integer.parseInt(pageData.get("SUMS").toString());  //每个产业 的数量
        	numbers += Number;
		}
        
        for (PageData pageData1 : list) {
        	Integer NumberD = Integer.parseInt(pageData1.get("SUMS").toString());  //每个产业 的数量
        	pageData1.put("PTage",percent(NumberD, numbers));  //百分比
		}
        
        return  list;
    }
     
    public   static  String percent( double  p1,  double  p2)   
    { 
     String str; 
     double  p3  =  p1  /  p2; 
     NumberFormat nf  =  NumberFormat.getPercentInstance(); 
     nf.setMinimumFractionDigits( 1 ); 
     str  =  nf.format(p3); 
     return  str; 
    }  
   
    /**
     * 各产业数量 本地分类
     * @Author 陶华琴
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getIndustryPmNums(PageData pd) throws Exception {
        List<PageData> list = null;
        String condition = pd.get("CONDITION").toString();
        if("1".equals(condition)){
            list = (List<PageData>) dao.findForList("IndustryDistributionMapper.getIndustryEntPmNums",pd);
        }else{
            list = (List<PageData>) dao.findForList("IndustryDistributionMapper.getIndustryIncomePmNums",pd);
        }
        return  list;
    }

    /**
     * 数字经济企业发展情况近5年
     * @Author 陶华琴
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getSzjjEntFiveYearList(PageData pd) throws Exception {
        List<PageData> list = null;
        String condition = pd.get("CONDITION").toString();
        if("1".equals(condition)||"2".equals(condition)){
            pd.put("CONDITION","an.VENDINC");
        }else if("3".equals(condition)){
            pd.put("CONDITION","an.RATGRO");
        }else if("4".equals(condition)){
            pd.put("CONDITION","an.NETINC");
        }else{
            pd.put("CONDITION","an.EMPNUM");
        }
        list = (List<PageData>) dao.findForList("IndustryDistributionMapper.getSzjjEntFiveYearList",pd);
        return  list;
    }

    /**
     * 获取企业列表 排名
     * @Author 陶华琴
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getChainEnterprise(PageData pd) throws Exception {
        List<PageData> list = null;
        list = (List<PageData>) dao.findForList("IndustryDistributionMapper.getChainEnterprise",pd);
        return  list;
    }
    
    
    /**
     * 数字经济产业 地域分析 获取企业列表 排名
     * @Author 谌思宇
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getRegionEnterprise(PageData pd) throws Exception {
        List<PageData> list = (List<PageData>) dao.findForList("IndustryDistributionMapper.getRegionEnterprise",pd);
        return  list;
    }

    /**
     * 企业详情列表
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getCompanyDetailsList(PageData pd) throws Exception {
        String AREA_NAME = pd.get("AREA_NAME").toString();
        if ("市本级".equals(AREA_NAME)){
            pd.put("AREA_NAME","抚州市");
        }
        List<PageData> list = (List<PageData>) dao.findForList("IndustryDistributionMapper.getCompanyDetailsList",pd);
        return  list;
    }
}
