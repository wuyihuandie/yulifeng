package com.zhirong.ncdata.service.entHomePage;

import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class EntHomePageService {
	@Resource(name = "daoSupport")
    private DaoSupport dao;
    
    /**
     * @param pd
     * @throws
     * @title getJXSENTSUMSAndVENDINC
     * @Author Strive_Li
     * @Description 获取江西省区域 总数 与 总营收
     * @Date 2020/10/22 17:22
     */
    public List<PageData> getJXSENTSUMSAndVENDINC(PageData pd) throws Exception {
        return (List<PageData>)dao.findForList("entHomePageMapper.getJXSENTSUMSAndVENDINC",pd);//获取江西省区域
    }
    
    
    /**
     * @param pd
     * @throws
     * @title getChainYearAnalysis
     * @Author taohuaqin
     * @Description 各产业近三年发展趋势
     * @Date 2020/10/24 15:22
     */
    public List<PageData> getChainYearAnalysis(PageData pd) throws Exception {
        return (List<PageData>)dao.findForList("entHomePageMapper.getChainYearAnalysis",pd);//获取江西省区域
    }

    /**
     * 各产业 各个地市数量
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getChainAnalysisByArea(PageData pd) throws Exception {
        return (List<PageData>)dao.findForList("entHomePageMapper.getChainAnalysisByArea",pd);
    }

    /**
     * @param pd
     * @throws
     * @title queryDigitalEconomyLJZAndZS
     * @Author Strive_Li
     * @Description 获取江西省区域 右边列表
     * 0 企业数量  1营业收入 2累计纳税 3净利润   4从业人员
     * @Date 2020/10/22 17:22
     */
    public List<PageData> queryDigitalEconomyLJZAndZS(PageData pd) throws Exception {
        return (List<PageData>)dao.findForList("entHomePageMapper.queryDigitalEconomyLJZAndZS",pd);//获取江西省区域
    }

    /**
     * 南昌市数字经济核心产业总览
     * @param pd
     * @return
     * @throws Exception
     */
    public PageData getNanchangEntOverAll(PageData pd) throws Exception {
        DecimalFormat df = new DecimalFormat("0.00");//设置小数点位数
        pd.put("year",pd.get("YEAR"));
        PageData object = (PageData)dao.findForObject("entHomePageMapper.getNanchangEntOverAll",pd);
        //查询前一年的数据
        pd.put("year",Integer.parseInt(pd.get("YEAR").toString())-1);
        PageData lastobject = (PageData)dao.findForObject("entHomePageMapper.getNanchangEntOverAll",pd);
        if(object != null){
            //企业数量增长率计算
            double currNum = Double.valueOf(object.get("ENTNUMS").toString());
            double nextNum = Double.valueOf(lastobject.get("ENTNUMS").toString());
            if(nextNum!=0){
                double resNum = (currNum-nextNum)/nextNum*100;
                object.put("ENTRATE",df.format(resNum));
            }else{
                if(currNum==0){
                    object.put("ENTRATE",0);
                }else{
                    object.put("ENTRATE",100);
                }
            }
            //营业收入增长率计算
            currNum = Double.valueOf(object.get("VENDINC").toString());
            nextNum = Double.valueOf(lastobject.get("VENDINC").toString());
            if(nextNum!=0){
                double resNum = (currNum-nextNum)/nextNum*100;
                object.put("VENDINCRATE",df.format(resNum));
            }else{
                if(currNum==0){
                    object.put("VENDINCRATE",0);
                }else{
                    object.put("VENDINCRATE",100);
                }
            }
            //纳税额增长率计算
            currNum = Double.valueOf(object.get("RATGRO").toString());
            nextNum = Double.valueOf(lastobject.get("RATGRO").toString());
            if(nextNum!=0){
                double resNum = (currNum-nextNum)/nextNum*100;
                object.put("RATGRORATE",df.format(resNum));
            }else{
                if(currNum==0){
                    object.put("RATGRORATE",0);
                }else{
                    object.put("RATGRORATE",100);
                }
            }
            //从业人员增长率计算
            currNum = Double.valueOf(object.get("EMPNUM").toString());
            nextNum = Double.valueOf(lastobject.get("EMPNUM").toString());
            if(nextNum!=0){
                double resNum = (currNum-nextNum)/nextNum*100;
                object.put("EMPNUMRATE",df.format(resNum));
            }else{
                if(currNum==0){
                    object.put("EMPNUMRATE",0);
                }else{
                    object.put("EMPNUMRATE",100);
                }
            }
        }
        return object;
    }

    /**
     * 南昌市数字经济核心产业规上企业总览
     * @param pd
     * @return
     * @throws Exception
     */
    public PageData getNanchangGsEntOverAll(PageData pd) throws Exception {
        DecimalFormat df = new DecimalFormat("0.00");//设置小数点位数
        pd.put("year",pd.get("YEAR"));
        PageData object = (PageData)dao.findForObject("entHomePageMapper.getNanchangGsEntOverAll",pd);
        //查询前一年的数据
        pd.put("year",Integer.parseInt(pd.get("YEAR").toString())-1);
        PageData lastobject = (PageData)dao.findForObject("entHomePageMapper.getNanchangGsEntOverAll",pd);
        if(object != null){
            //企业数量增长率计算
            double currNum = Double.valueOf(object.get("ENTNUMS").toString());
            double nextNum = Double.valueOf(lastobject.get("ENTNUMS").toString());
            if(nextNum!=0){
                double resNum = (currNum-nextNum)/nextNum*100;
                object.put("ENTRATE",df.format(resNum));
            }else{
                if(currNum==0){
                    object.put("ENTRATE",0);
                }else{
                    object.put("ENTRATE",100);
                }
            }
            //营业收入增长率计算
            currNum = Double.valueOf(object.get("VENDINC").toString());
            nextNum = Double.valueOf(lastobject.get("VENDINC").toString());
            if(nextNum!=0){
                double resNum = (currNum-nextNum)/nextNum*100;
                object.put("VENDINCRATE",df.format(resNum));
            }else{
                if(currNum==0){
                    object.put("VENDINCRATE",0);
                }else{
                    object.put("VENDINCRATE",100);
                }
            }
            //纳税额增长率计算
            currNum = Double.valueOf(object.get("RATGRO").toString());
            nextNum = Double.valueOf(lastobject.get("RATGRO").toString());
            if(nextNum!=0){
                double resNum = (currNum-nextNum)/nextNum*100;
                object.put("RATGRORATE",df.format(resNum));
            }else{
                if(currNum==0){
                    object.put("RATGRORATE",0);
                }else{
                    object.put("RATGRORATE",100);
                }
            }
            //从业人员增长率计算
            currNum = Double.valueOf(object.get("EMPNUM").toString());
            nextNum = Double.valueOf(lastobject.get("EMPNUM").toString());
            if(nextNum!=0){
                double resNum = (currNum-nextNum)/nextNum*100;
                object.put("EMPNUMRATE",df.format(resNum));
            }else{
                if(currNum==0){
                    object.put("EMPNUMRATE",0);
                }else{
                    object.put("EMPNUMRATE",100);
                }
            }
        }
        return object;
    }

    /**
     * 各产业近三年情况
     * @param pd
     * @return
     * @throws Exception
     */
    public List<List<PageData>> getIndustryDataByYear(PageData pd) throws Exception {
        List<List<PageData>> list = new ArrayList<>();
        if("1".equals(pd.get("CONDITION"))){
            for(int i = 2;i>=0;i--){
                pd.put("year",Integer.parseInt(pd.get("YEAR").toString())-i+"");
                List<PageData> pds = (List<PageData>)dao.findForList("entHomePageMapper.getIndustryDataByYear",pd);
                list.add(pds);
            }
        }else{
            for(int i = 2;i>=0;i--){
                pd.put("year",Integer.parseInt(pd.get("YEAR").toString())-i+"");
                List<PageData> pds = (List<PageData>)dao.findForList("entHomePageMapper.getIndustryNbDataByYear",pd);
                list.add(pds);
            }
        }
        return list;
    }
    /**
     * 各个县区各产业企业数量
     * @param pd
     * @return
     * @throws Exception
     */
    public List<List<PageData>> getNanchangChainAnalysis(PageData pd) throws Exception {
        List<List<PageData>> list = new ArrayList<>();
        List<PageData> industrylist= (List<PageData>)dao.findForList("entHomePageMapper.getIndustryByType",pd);
        //企业数量
        if("1".equals(pd.get("CONDITION"))){
            for(PageData pdd : industrylist){
                pd.put("PARENT_DL",pdd.get("PARENT_DL"));
                List<PageData> obj = (List<PageData>)dao.findForList("entHomePageMapper.getNanchangChainEntAnalysis",pd);
                list.add(obj);
            }

        }else{//年报数据
            for(PageData pdd : industrylist){
                pd.put("PARENT_DL",pdd.get("PARENT_DL"));
                List<PageData> obj = (List<PageData>)dao.findForList("entHomePageMapper.getNanchangChainNbAnalysis",pd);
                list.add(obj);
            }
        }
        list.add(industrylist);
        return list;
    }

    /**
     * 各县区数字经济核心产业发展情况
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getNanchangSzjjEntByArea(PageData pd) throws Exception {
        List<PageData> list = new ArrayList<>();
        if("1".equals(pd.get("CONDITION"))){
            list = (List<PageData>)dao.findForList("entHomePageMapper.getNanchangSzjjEntByArea",pd);
        }else{
            list = (List<PageData>)dao.findForList("entHomePageMapper.getNanchangSzjjIncomeByArea",pd);
        }
        return list;
    }
}
