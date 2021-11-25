package com.zhirong.ncdata.service.index;

import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;
import com.zhirong.ncdata.utils.StrUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/**
 * @title
 * @Author Strive_Li
 * @Description GDP业务层
 * @Date 2020/8/12 10:49
 */
@Service
public class GdpService {
	
    @Resource(name = "daoSupport")
    private DaoSupport dao;

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title querydataOverviewByAreaAndYear
     * @Author Strive_Li
     * @Description 根据年份和区域查询gdp数据总览 1.全国  4.中部六省
     * @Date 2020/8/12 14:48
     */
    public List<PageData> querydataOverviewByAreaAndYear(PageData pd) throws Exception {
        List<PageData> list= (List<PageData>) dao.findForList("GdpMapper.querydataOverviewByAreaAndYear",pd);
        List<PageData> list1=new ArrayList<>();//存放传过来的区域数据
        //将排名添加到list中
        for (int i = 0; i <list.size() ; i++) {
            if(pd.getString("area").equals(list.get(i).getString("AREA"))){
                PageData pageData=list.get(i);
                pageData.put("rank",i+1+"");
                DecimalFormat df = new DecimalFormat("#,###.00");
                pageData.put("GDP_LJZ",df.format(pageData.get("GDP_LJZ")));
                pageData.remove("AREA");
                pageData.remove("AREA_NAME");
                list1.add(pageData);
            }
        }

        return  list1;
    }
    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title querydataOverviewByAreaAndYear
     * @Author Strive_Li
     * @Description 根据年份和区域查询gdp数据总览 2.长江三角洲  3.珠江三角洲
     * @Date 2020/8/12 14:48
     */
    public List<PageData> querydataOverviewByAreaAndYear1(PageData pd) throws Exception {
        List<PageData> list= (List<PageData>) dao.findForList("GdpMapper.querydataOverviewByAreaAndYear1",pd);
        List<PageData> list1=new ArrayList<>();//存放传过来的区域数据
        //将排名添加到list中
        for (int i = 0; i <list.size() ; i++) {
            if(pd.getString("area").equals(list.get(i).getString("AREA"))){
                PageData pageData=list.get(i);
                pageData.put("rank",i+1+"");
                DecimalFormat df = new DecimalFormat("#,###.00");
                pageData.put("GDP_LJZ",df.format(pageData.get("GDP_LJZ")));
                pageData.remove("AREA");
                pageData.remove("AREA_NAME");
                list1.add(pageData);
            }
        }
        return  list1;
    }

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title dataSumAndSpeed
     * @Author Strive_Li
     * @Description 根据年份获取GDP总量和总增速 全国和中部六省
     * @Date 2020/8/12 17:49
     */
    public List<PageData> dataSumAndSpeed(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("GdpMapper.dataSumAndSpeed",pd);
    }

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title dataSumAndSpeed1
     * @Author Strive_Li
     * @Description 根据年份获取GDP总量和总增速 珠江和长江三角洲
     * @Date 2020/8/12 17:49
     */
    public List<PageData> dataSumAndSpeed1(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("GdpMapper.dataSumAndSpeed1",pd);
    }
    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title totalOutPutvalue
     * @Author Strive_Li
     * @Description 生产总值占比 全国和中部六省
     * @Date 2020/8/12 17:49
     */
    public List<PageData> totalOutPutvalue(PageData pd) throws Exception {
        List<PageData> listSum= (List<PageData>) dao.findForList("GdpMapper.dataSumAndSpeed",pd);
        List<PageData> list1= (List<PageData>) dao.findForList("GdpMapper.querydataOverviewByAreaAndYear",pd);//区域GDP
        List dataNames=new ArrayList<>();//各名称集合
        List<PageData> dataValues=new ArrayList<>();//各数据集合
        if(list1.size()>0){
            double sumGDP_LJZ=(double)listSum.get(0).get("GDP_LJZ");
            NumberFormat nt = NumberFormat.getPercentInstance();//获取百分数实例
            nt.setMinimumFractionDigits(1);
        for (int i = 0; i < list1.size(); i++) {
            float qyGDP_LJZ=(float)list1.get(i).get("GDP_LJZ");
            dataNames.add(i,list1.get(i).get("AREA_NAME")+","+nt.format(qyGDP_LJZ/sumGDP_LJZ));
            PageData pageData =new PageData();
            pageData.put("name",list1.get(i).get("AREA_NAME")+","+nt.format(qyGDP_LJZ/sumGDP_LJZ));
            pageData.put("value",Double.valueOf(String.format("%.2f", Double.parseDouble(list1.get(i).get("GDP_LJZ").toString()))));
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

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title totalOutPutvalue1
     * @Author Strive_Li
     * @Description 生产总值占比 珠江和长江三角洲
     * @Date 2020/8/12 17:49
     */
    public List<PageData> totalOutPutvalue1(PageData pd) throws Exception {
        List<PageData> listSum= (List<PageData>) dao.findForList("GdpMapper.dataSumAndSpeed1",pd);
        List<PageData> list1= (List<PageData>) dao.findForList("GdpMapper.querydataOverviewByAreaAndYear2",pd);//区域GDP
        List dataNames=new ArrayList<>();//各名称集合
        List<PageData>dataValues=new ArrayList<>();//各数据集合
        if(list1.size()>0){
            double sumGDP_LJZ=(double)listSum.get(0).get("GDP_LJZ");
            NumberFormat nt = NumberFormat.getPercentInstance();//获取百分数实例
            nt.setMinimumFractionDigits(1);
        for (int i = 0; i < list1.size(); i++) {
            float qyGDP_LJZ=Float.parseFloat(list1.get(i).get("GDP_LJZ").toString());
            dataNames.add(i,list1.get(i).get("AREA_NAME")+","+nt.format(qyGDP_LJZ/sumGDP_LJZ));
            PageData pageData =new PageData();
            pageData.put("name",list1.get(i).get("AREA_NAME")+","+nt.format(qyGDP_LJZ/sumGDP_LJZ));
            pageData.put("value",Double.valueOf(String.format("%.2f", Double.parseDouble(list1.get(i).get("GDP_LJZ").toString()))));
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
    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title growthTrend
     * @Author Strive_Li
     * @Description  GDP增长趋势（近五年） 全国和中部六省
     * @Date 2020/8/12 17:49
     */
    public List<PageData> growthTrend(PageData pd) throws Exception {
        List years=getSysYear();
        pd.put("years",years);
        List<PageData> list1= (List<PageData>) dao.findForList("GdpMapper.growthTrend",pd);//区域GDP
        List dataYears=new ArrayList<>();//各名称集合
        List dataValues=new ArrayList<>();//各数据集合
        for (int i = 0; i < list1.size(); i++) {
            dataYears.add(i,list1.get(i).get("INTERVAL_DATE"));
            dataValues.add(i,list1.get(i).get("GDP_LJZ"));
        }
        PageData pageData =new PageData();
        pageData.put("dataYears",dataYears);
        pageData.put("dataValues",dataValues);
        if(list1.size()>0){
            pageData.put("UNIT",list1.get(0).getString("UNIT"));
        }else{
            pageData.put("UNIT","亿元");
        }
        List <PageData>list2=new ArrayList<>();//各区数据
        list2.add(pageData);
        return list2;
    }

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title growthTrend1
     * @Author Strive_Li
     * @Description GDP增长趋势（近五年） 珠江和长江三角洲
     * @Date 2020/8/12 17:49
     */
    public List<PageData> growthTrend1(PageData pd) throws Exception {
        List years=getSysYear();
        pd.put("years",years);
        List<PageData> list1= (List<PageData>) dao.findForList("GdpMapper.growthTrend1",pd);//区域GDP
        List dataYears=new ArrayList<>();//各名称集合
        List dataValues=new ArrayList<>();//各数据集合
        for (int i = 0; i < list1.size(); i++) {
            dataYears.add(i,list1.get(i).get("INTERVAL_DATE"));
            dataValues.add(i,list1.get(i).get("GDP_LJZ"));
        }
        PageData pageData =new PageData();
        pageData.put("dataYears",dataYears);
        pageData.put("dataValues",dataValues);
        if(list1.size()>0){
            pageData.put("UNIT",list1.get(0).getString("UNIT"));
        }else{
            pageData.put("UNIT","亿元");
        }
        List <PageData>list2=new ArrayList<>();//各区数据
        list2.add(pageData);
        return list2;
    }
    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title dataSumAndSpeed
     * @Author Strive_Li
     * @Description GDP排名 全国和中部六省
     * @Date 2020/8/12 17:49
     */
    public List<PageData> ranking(PageData pd) throws Exception {
        List<PageData> list= (List<PageData>) dao.findForList("GdpMapper.querydataOverviewByAreaAndYear8",pd);
        DecimalFormat df = new DecimalFormat("#,###.00");
        for (int i = 0; i <list.size() ; i++) {
          list.get(i).put("GDP_LJZ",df.format(list.get(i).get("GDP_LJZ")));
        }
        pd.put("year",Integer.parseInt(pd.getString("year"))-1);
        List<PageData> list1= (List<PageData>) dao.findForList("GdpMapper.querydataOverviewByAreaAndYear8",pd);
        List <PageData>list2=new ArrayList<>();//各区数据
        for (int i = 0; i <list.size() ; i++) {
            //list.get(i).put("rank",i+1);
            PageData pageData =new PageData();
            for (int j = 0; j <list1.size() ; j++) {
                if(list.get(i).getString("AREA").equals(list1.get(j).getString("AREA"))){
                    pageData.put("rankChage",j-i);//去年减去今年得到名次变化
                    pageData.putAll(list.get(i));
                    pageData.remove("GDP_LJTB");
                    list2.add(pageData);
                }
            }
        }
        return  list2;
    }

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title zjzRanking
     * @Author Strive_Li
     * @Description GDP排名 全国和中部六省
     * @Date 2020/8/12 17:49
     */
    public List<PageData> zjzRanking(PageData pd) throws Exception {
        List<PageData> list= (List<PageData>) dao.findForList("GdpMapper.querydataOverviewByAreaAndYear18",pd);
        DecimalFormat df = new DecimalFormat("0.00");
        for (int i = 0; i <list.size() ; i++) {
            list.get(i).put("GDP_LJTB",df.format(list.get(i).get("GDP_LJTB")));
        }
        pd.put("year",Integer.parseInt(pd.getString("year"))-1);
        List<PageData> list1= (List<PageData>) dao.findForList("GdpMapper.querydataOverviewByAreaAndYear18",pd);
        List <PageData>list2=new ArrayList<>();//各区数据
        for (int i = 0; i <list.size() ; i++) {
            //list.get(i).put("rank",i+1);
            PageData pageData =new PageData();
            for (int j = 0; j <list1.size() ; j++) {
                if(list.get(i).getString("AREA").equals(list1.get(j).getString("AREA"))){
                    pageData.put("rankChage",j-i);//去年减去今年得到名次变化
                    pageData.putAll(list.get(i));
                    list2.add(pageData);
                }
            }
        }
        return  list2;
    }
    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title zjzRanking1
     * @Author Strive_Li
     * @Description GDP排名 珠江和长江三角洲
     * @Date 2020/8/12 17:49
     */
    public List<PageData> zjzRanking1(PageData pd) throws Exception {
        List<PageData> list= (List<PageData>) dao.findForList("GdpMapper.querydataOverviewByAreaAndYear12",pd);//传过来年份数据
        DecimalFormat df = new DecimalFormat("0.00");
        for (int i = 0; i <list.size() ; i++) {
            if(list.get(i).get("GDP_LJTB")!=null && StrUtils.isNotEmpty(list.get(i).get("GDP_LJTB").toString())){
                list.get(i).put("GDP_LJTB",df.format(list.get(i).get("GDP_LJTB")));
            }else{
                list.get(i).put("GDP_LJTB","0.00");
            }

        }
        pd.put("year",Integer.parseInt(pd.getString("year"))-1);
        List<PageData> list1= (List<PageData>) dao.findForList("GdpMapper.querydataOverviewByAreaAndYear12",pd);//传过来上一年份数据
        List <PageData>list2=new ArrayList<>();//各区数据
        for (int i = 0; i <list.size() ; i++) {
            //list.get(i).put("rank",i+1);
            PageData pageData =new PageData();
            for (int j = 0; j <list1.size() ; j++) {
                if(list.get(i).getString("AREA").equals(list1.get(j).getString("AREA"))){
                    pageData.put("rankChage",j-i);//去年减去今年得到名次变化
                    pageData.putAll(list.get(i));
                    list2.add(pageData);
                }
            }
        }
        return  list2;
    }
    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title dataSumAndSpeed1
     * @Author Strive_Li
     * @Description GDP排名 珠江和长江三角洲
     * @Date 2020/8/12 17:49
     */
    public List<PageData> ranking1(PageData pd) throws Exception {
        List<PageData> list= (List<PageData>) dao.findForList("GdpMapper.querydataOverviewByAreaAndYear2",pd);//传过来年份数据
        DecimalFormat df = new DecimalFormat("#,###.00");
        for (int i = 0; i <list.size() ; i++) {
            if(list.get(i).get("GDP_LJZ")!=null && StrUtils.isNotEmpty(list.get(i).get("GDP_LJZ").toString())){
                list.get(i).put("GDP_LJZ",df.format(list.get(i).get("GDP_LJZ")));
            }else{
                list.get(i).put("GDP_LJZ","0");
            }

        }
        pd.put("year",Integer.parseInt(pd.getString("year"))-1);
        List<PageData> list1= (List<PageData>) dao.findForList("GdpMapper.querydataOverviewByAreaAndYear2",pd);//传过来上一年份数据
        List <PageData>list2=new ArrayList<>();//各区数据
        for (int i = 0; i <list.size() ; i++) {
            //list.get(i).put("rank",i+1);
            PageData pageData =new PageData();
            for (int j = 0; j <list1.size() ; j++) {
                if(list.get(i).getString("AREA").equals(list1.get(j).getString("AREA"))){
                    pageData.put("rankChage",j-i);//去年减去今年得到名次变化
                    pageData.putAll(list.get(i));
                    pageData.remove("GDP_LJTB");
                    list2.add(pageData);
                }
            }
        }
        return  list2;
    }
    /**
     *  @title getSysYear
     *  @Author Strive_Li
     *  @Description 获取近来五年年份
     *  @Date 2020/8/13 11:00
     * @param
     *  @return java.lang.String
     *  @throws
     */
    public static List getSysYear() {
        Calendar date = Calendar.getInstance();
        String year = String.valueOf(date.get(Calendar.YEAR));
        List list =new ArrayList();
        int a = Integer.parseInt(year);
        for (int i = 0; i <5 ; i++) {
             a=a-1;
            list.add(a);
        }
        return list;
    }

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getYears
     * @Author Strive_Li
     * @Description 获取年份列表
     * @Date 2020/8/14 14:45
     */
    public List<PageData>  getYears(PageData pd) throws Exception {
        List<PageData>  list= (List<PageData>) dao.findForList("GdpMapper.getYears",pd);
        List list1 =new ArrayList();
        for (int i = 0; i <list.size() ; i++) {
            list1.add(list.get(i).get("INTERVAL_DATE"));
        }
        return  list1;
    }

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getProvinceCityData
     * @Author Strive_Li
     * @Description 获取省市数据
     * @Date 2020/8/15 15:16
     */
    public  List<PageData>  getProvinceCityData(PageData pd) throws Exception {
        List<PageData>  list= (List<PageData>) dao.findForList("GdpMapper.getProvinceCityData",pd);
        List<PageData>  List1 =new ArrayList<>();
        for (int i = 0; i <list.size() ; i++) {
            PageData pageData =new PageData();
            pageData.put("name",list.get(i).get("AREA_NAME"));
            pageData.put("value",list.get(i).getString("REMARK").split("@"));
            List1.add(pageData);
        }
        return  List1;
    }
}
