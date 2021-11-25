package com.zhirong.ncdata.service.index;

import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;
import com.zhirong.ncdata.utils.StrUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author 黄宇豪
 * @Description 市场主体分析接口
 * @Date 11:55 2020/8/12
 * @Param
 * @return
 **/
@Service
public class EntStatisticsService {
	
    @Resource(name = "daoSupport")
    private DaoSupport dao;

    /**
     * @Author 黄宇豪
     * @Description 查询市场主体数量
     * @Date 14:09 2020/8/12
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    public PageData EntNum(PageData pd) throws Exception {
        return  (PageData) dao.findForObject("EntStatisticsMapper.EntNum",pd);
    }
    /**
     * @Author 黄宇豪
     * @Description 查询区域市场主体数量排名
     * @Date 14:49 2020/8/12
     * @Param [pd]
     * @return int
     **/
    public int AreaEntRank(PageData pd) throws Exception {
        return  (int) dao.findForObject("EntStatisticsMapper.AreaEntRank",pd);
    }
    /**
     * @Author 黄宇豪
     * @Description 查询市场主体总量
     * @Date 17:52 2020/8/12
     * @Param [pd]
     * @return com.zhirong.ncdata.common.entity.PageData
     **/
    public PageData EntTotal(PageData pd) throws Exception {
        return  (PageData) dao.findForObject("EntStatisticsMapper.EntTotal",pd);
    }
    /**
     * @Author 黄宇豪
     * @Description 获取市场主体总量数据
     * @Date 10:00 2020/8/25
     * @Param [pd]
     * @return com.zhirong.ncdata.common.entity.PageData
     **/
    public PageData getEntTotal(PageData pd) throws Exception {
        PageData data = new PageData();
        PageData entPd = EntTotal(pd);//查询市场主体总量
        if(entPd!=null){
            double entTotal = Double.parseDouble(entPd.get("ENTTOTALSUMS").toString());//市场主体总量
            double entAvgNum = Double.parseDouble(entPd.get("ENTTOTALSUM_AVG").toString());//市场主体平均值
            entAvgNum=entAvgNum/10000;//转万户单位
            String entAvgNumString = String.format("%.2f", entAvgNum);//保留2位小数
            DecimalFormat df = new DecimalFormat("#,###.00");
            data.put("entAvgNum",df.format(Double.parseDouble(entAvgNumString)));//市场主体平均数
            data.put("UNIT_AVG","万户");//单位
            String ENTTOTALZS_String = "";
            if(pd.get("entType") != null && StrUtils.isNotEmpty(pd.getString("entType"))){
                pd.put("year",Integer.valueOf(pd.getString("year"))-1);
                ENTTOTALZS_String = String.format("%.2f", getENTTOTALZS(pd,0,entTotal,"2"));//保留2位小数
            }else{
                ENTTOTALZS_String = String.format("%.2f", Double.parseDouble(entPd.get("ENTTOTALZS").toString()));//保留2位小数
            }
            data.put("growthRate",ENTTOTALZS_String);//增速（%）
            if("1".equals(pd.getString("areaType"))){//全国
                if(entPd.get("UNIT")!=null && "户".equals(entPd.get("UNIT").toString())){
                    entTotal=entTotal/100000000;//转亿户单位
                    String entTotalString = String.format("%.2f", entTotal);//保留2位小数
                    data.put("entTotal",entTotalString);//市场主体总数
                    data.put("UNIT","亿户");//单位
                }else{
                    data.put("entTotal",df.format(entTotal));//市场主体总数
                    data.put("UNIT",entPd.get("UNIT").toString());//单位
                }
            }else{//长江、珠江三角洲或中部六省
                if(entPd.get("UNIT")!=null && "户".equals(entPd.get("UNIT").toString())){
                    entTotal=entTotal/10000;//转万户单位
                    String entTotalString = String.format("%.2f", entTotal);//保留2位小数
                    data.put("entTotal",entTotalString);//市场主体总数
                    data.put("UNIT","万户");//单位
                }else{
                    data.put("entTotal",df.format(entTotal));//市场主体总数
                    data.put("UNIT",entPd.get("UNIT").toString());//单位
                }
            }
        }else{
            data.put("entTotal","");//市场主体总数
            data.put("growthRate","");//增速（%）
            data.put("UNIT","");//单位
            data.put("entAvgNum","");//市场主体平均数
            data.put("UNIT_AVG","");//单位
        }
        return data;
    }

    /**
     * @Author 黄宇豪
     * @Description 查询市场主体占比数据
     * @Date 10:32 2020/8/13
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    public PageData EntProportionList(PageData pd) throws Exception {
        return  (PageData) dao.findForObject("EntStatisticsMapper.EntProportionList",pd);
    }
    /**
     * @Author 黄宇豪
     * @Description 查询近5年的市场主体总量
     * @Date 16:34 2020/8/13
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    public List<PageData> EntGrowthTrendFiveYearList(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("EntStatisticsMapper.EntGrowthTrendFiveYearList",pd);
    }
    /**
     * @Author 黄宇豪
     * @Description 获取近5年的市场主体总量数据
     * @Date 10:23 2020/8/25
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    public PageData getEntGrowthTrendFiveYearData(PageData pd) throws Exception {
        PageData data = new PageData();
        List<PageData> entList = EntGrowthTrendFiveYearList(pd);//查询近5年的市场主体总量
        String  dataNames[] = new String[entList.size()];
        double dataValues[] = new double[entList.size()];
        for(int i = 0;i<entList.size();i++){
            dataNames[i] = entList.get(i).get("YEAR").toString();
            double entTotal = Double.parseDouble(entList.get(i).get("ENTTOTALSUMS").toString());
            if(pd.get("area")!=null && StrUtils.isNotEmpty(pd.getString("area"))){//查询某个区域不用转单位
                dataValues[i] = Integer.parseInt(entList.get(i).get("ENTTOTALSUMS").toString());
                data.put("UNIT",entList.get(i).get("UNIT").toString());//单位
                data.put("dataValues",dataValues);//折线图数据
            }else{
                if("1".equals(pd.getString("areaType"))){//全国
                    if(entList.get(i).get("UNIT")!=null && "户".equals(entList.get(i).get("UNIT").toString())){
                        entTotal=entTotal/100000000;//转亿户单位
                        String entTotalString = String.format("%.2f", entTotal);//保留2位小数
                        dataValues[i] = Double.parseDouble(entTotalString);
                        data.put("UNIT","亿户");//单位
                    }else{
                        dataValues[i] = Integer.parseInt(entList.get(i).get("ENTTOTALSUMS").toString());
                        data.put("UNIT",entList.get(i).get("UNIT").toString());//单位
                    }
                }else{//长江、珠江三角洲或中部六省
                    if(entList.get(i).get("UNIT")!=null && "户".equals(entList.get(i).get("UNIT").toString())){
                        entTotal=entTotal/10000;//转万户单位
                        String entTotalString = String.format("%.2f", entTotal);//保留2位小数
                        dataValues[i] = Double.parseDouble(entTotalString);
                        data.put("UNIT","万户");//单位
                    }else{
                        dataValues[i] = Integer.parseInt(entList.get(i).get("ENTTOTALSUMS").toString());
                        data.put("UNIT",entList.get(i).get("UNIT").toString());//单位
                    }
                }
                data.put("dataValues",dataValues);//折线图数据
            }
        }
        data.put("dataNames",dataNames);//折线图legend名称
        return data;
    }
    /**
     * @Author 黄宇豪
     * @Description 查询市场主体列表
     * @Date 15:34 2020/8/13
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    public List<PageData> EntNumsRankList(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("EntStatisticsMapper.EntNumsRankList",pd);
    }
    /**
     * @Author 黄宇豪
     * @Description 市场主体占比饼图数据
     * @Date 10:31 2020/8/14
     * @Param [pd]
     * @return com.zhirong.ncdata.common.entity.PageData
     **/
    public PageData entProportionBarData(PageData pd) throws Exception{
        PageData barpd = new PageData();
        PageData entpd= EntProportionList(pd);//查询市场主体总量
        if(entpd!=null){
            List<PageData> dataValues = new ArrayList<PageData>();
            double entNums[] = new double[4];
            entNums[0] = Double.parseDouble(entpd.get("NZTOTALSUMS").toString());//内资企业
            entNums[1] = Double.parseDouble(entpd.get("WZTOTALSUMS").toString());//外资企业
            entNums[2] = Double.parseDouble(entpd.get("GTTOTALSUMS").toString());//个体工商户
            entNums[3] = Double.parseDouble(entpd.get("NMZYTOTALSUMS").toString());//农专合作社

            double entTotals = entNums[0]+entNums[1]+entNums[2]+entNums[3];//总数

            double NZTOTALSUMS_ZB = entNums[0]/entTotals*100;//内资企业占比
            double WZTOTALSUMS_ZB = entNums[1]/entTotals*100;//外资企业占比
            double GTTOTALSUMS_ZB = entNums[2]/entTotals*100;//个体工商户占比
            double NMZYTOTALSUMS_ZB = entNums[3]/entTotals*100;//农专合作社占比

            String dataNames[] = new String[4];//饼图legend名称
            dataNames[0] = "内资企业,"+String.format("%.2f", NZTOTALSUMS_ZB)+"%";
            dataNames[1] = "外资企业,"+String.format("%.2f", WZTOTALSUMS_ZB)+"%";
            dataNames[2] = "个体工商户,"+String.format("%.2f", GTTOTALSUMS_ZB)+"%";
            dataNames[3] = "农专合作社,"+String.format("%.2f", NMZYTOTALSUMS_ZB)+"%";

            for(int i=0;i<entNums.length;i++){//循环存入饼图数据
                PageData valuePd = new PageData();
                valuePd.put("name",dataNames[i]);
                valuePd.put("value",(int)entNums[i]);
                dataValues.add(valuePd);
            }
            barpd.put("dataNames",dataNames);//饼图legend名称
            barpd.put("dataValues",dataValues);//饼图数据
        }else{
            barpd.put("dataNames","");//饼图legend名称
            barpd.put("dataValues","");//饼图数据
        }
        return barpd;
    }
    /**
     * @Author 黄宇豪
     * @Description 查询市场主体排名
     * @Date 15:00 2020/8/14
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    public List<PageData> EntNumsRank(PageData pd) throws Exception {
        List<PageData> rankList = EntNumsRankList(pd);//查询所选年份市场主体排名
        String lastYear = String.valueOf(Integer.parseInt(pd.getString("year"))-1);//获取去年年份
        pd.put("year",lastYear);

        List<PageData> rankLastList = EntNumsRankList(pd);//查询所选年份去年的市场主体排名
        DecimalFormat df = new DecimalFormat("#,###");

        for(PageData yearPd : rankList){//循环比较2年的排名，算出排名差
            if(yearPd.get("ENTTOTALSUM")!=null){
                double entnum= Double.parseDouble(yearPd.get("ENTTOTALSUM").toString());
                yearPd.put("ENTTOTALSUMS",df.format(entnum));//市场主体数量隔三位加逗号
            }else{
                yearPd.put("ENTTOTALSUMS","");
            }

            for(PageData lastYearPd : rankLastList){
                if(yearPd.getString("AREA").equals(lastYearPd.getString("AREA"))){
                    if(!"-".equals(yearPd.get("rank").toString())){
                        int rank = Integer.parseInt("".equals(yearPd.get("rank").toString())?"0":yearPd.get("rank").toString());//所选年份排名
                        int lastRank = Integer.parseInt("".equals(lastYearPd.get("rank").toString())?"0":lastYearPd.get("rank").toString());//所选年份去年排名
                        int rankChage = lastRank-rank;//去年排名减去今年排名等于变化名次
                        yearPd.put("rankChage",rankChage);
                    }
                }
            }
        }
        return rankList;
    }
    /**
     * @Author 黄宇豪
     * @Description 市场主体分析可查询的年份
     * @Date 15:14 2020/8/14
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    public List<String> EntYearList(PageData pd) throws Exception {
        return  (List<String>) dao.findForList("EntStatisticsMapper.EntYearList",pd);
    }


    //计算1:个体总数 2:农民专业合作社总数 3:内资总数 4:外资总数 增速
    public Double getENTTOTALZS(PageData pd,int thisYearENTTOTALSUM,Double thisYearENTTOTALSUM_Double,String type) throws Exception {
        PageData yesteryearEntpd = new PageData();
        String ENTTOTALZS = "";
        DecimalFormat decimalFormat=new DecimalFormat("0.00");//设置保留位数
        if("1".equals(type)){
            yesteryearEntpd = EntNum(pd);//查询市场主体数量
            int  yesteryearENTTOTALSUM = Integer.valueOf(yesteryearEntpd.getString("ENTTOTALSUM"));
            //计算增速：（今年的总数-去年的总数）/去年的总数
            ENTTOTALZS = decimalFormat.format((float)(thisYearENTTOTALSUM-yesteryearENTTOTALSUM)/yesteryearENTTOTALSUM);
        }else{
            yesteryearEntpd = EntTotal(pd);//查询市场主体总量
            Double yesteryearENTTOTALSUM = Double.parseDouble(yesteryearEntpd.get("ENTTOTALSUMS").toString());
            //计算增速：（今年的总数-去年的总数）/去年的总数
            ENTTOTALZS = decimalFormat.format((float)(thisYearENTTOTALSUM_Double-yesteryearENTTOTALSUM)/yesteryearENTTOTALSUM);
        }
        return Double.valueOf(ENTTOTALZS)*100;
    }
}
