package com.zhirong.ncdata.service.cyyc;

import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

/**
*  @title 产业预测
*  @Author Strive_Li
*  @Date 2020/9/11 9:40
*/
@Service
public class CyycService {

    @Resource(name = "daoSupport")
    private DaoSupport dao;
    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getCyycYears
     * @Author Strive_Li
     * @Date 2020/9/10 10:07
     */
    public List  getCyycYears(PageData pd) throws Exception {
        List list= (List) dao.findForList("CyycMapper.getCyycYears",pd);
        return  list;
    }

    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getCytzyc
     * @Author Strive_Li
     * @Description 产业投资预测
     * @Date 2020/9/11 10:08
     */
    public PageData  getCytzyc(PageData pd) throws Exception {
        List<PageData> list= ( List<PageData>) dao.findForList("CyycMapper.getCytzyc",pd);
        PageData pageData = new PageData();
        List yearList= new ArrayList();//年度列表
        List valueList= new ArrayList();//值
        for (int i = 0; i <list.size() ; i++) {
            yearList.add(list.get(i).get("year").toString());
            valueList.add(list.get(i).get("szjjcyze")+"");
        }
        pageData.put("yearList",yearList);
        pageData.put("valueList",valueList);
        return  pageData;
    }
    /**
     * @param pd
     * @throws
     * @title getCytzyc
     * @Author Strive_Li
     * @Description 产业增加值预测
     * @Date 2020/9/11 10:08
     */
    public PageData  getCyzjzyc(PageData pd) throws Exception {
        List yearLists= (List) dao.findForList("CyycMapper.getCyycYears",pd);//年度列表
        pd.put("parent_dl","ZK01");
        List<PageData> list= ( List<PageData>) dao.findForList("CyycMapper.getCyzjzyc",pd);//第一个产业预测
        pd.put("parent_dl","ZK06");
        List<PageData> list1= ( List<PageData>) dao.findForList("CyycMapper.getCyzjzyc",pd);//第二个产业预测
        List fristSzjjcyzjz= new ArrayList();//第一个产业增加值
        List fristSzjjzzl= new ArrayList();//第一个产业增长值
        List secondSzjjcyzjz= new ArrayList();//第二个产业增加值
        List secondSzjjzzl= new ArrayList();//第二个产业增长值
        for (int i = 0; i <list.size() ; i++) {
            for (int j = 0; j < yearLists.size(); j++) {
                String year1=list.get(i).get("year").toString();
                String year2=yearLists.get(j).toString();
                if(year1.equals(year2)){
                    fristSzjjcyzjz.add(list.get(i).get("szjjcyzjz")+"");
                    fristSzjjzzl.add(list.get(i).getString("szjjzzl"));
                }
            }
        }
        for (int i = 0; i <list1.size() ; i++) {
            for (int j = 0; j < yearLists.size(); j++) {
                String year1=list1.get(i).get("year").toString();
                String year2=yearLists.get(j).toString();
                if(year1.equals(year2)){
                    secondSzjjcyzjz.add(list1.get(i).get("szjjcyzjz")+"");
                    secondSzjjzzl.add(list1.get(i).getString("szjjzzl"));
                }
            }
        }
        List names=( List<PageData>) dao.findForList("CyycMapper.getCyzjzycNames",pd);//名称
        List dataNames=new ArrayList();
        for (int i = 0; i <names.size() ; i++) {
            dataNames.add(names.get(i).toString());
            dataNames.add(names.get(i).toString()+"增长率");
        }
        PageData pageData = new PageData();
        pageData.put("fristSzjjcyzjz",fristSzjjcyzjz);
        pageData.put("fristSzjjzzl",fristSzjjzzl);
        pageData.put("secondSzjjcyzjz",secondSzjjcyzjz);
        pageData.put("secondSzjjzzl",secondSzjjzzl);
        pageData.put("yearLists",yearLists);
        pageData.put("dataNames",dataNames);
        return  pageData;
    }
    /**
     * @param pd
     * @throws
     * @title getScztfzyc
     * @Author Strive_Li
     * @Description 市场主体发展预测
     * @Date 2020/9/11 10:08
     */
    public PageData  getScztfzyc(PageData pd) throws Exception {
        List yearLists= (List) dao.findForList("CyycMapper.getCyycYears",pd);//年度列表
        pd.put("parent_dl","ZK01");
        List<PageData> list= ( List<PageData>) dao.findForList("CyycMapper.getScztfzyc",pd);//第一个产业预测
        pd.put("parent_dl","ZK06");
        List<PageData> list1= ( List<PageData>) dao.findForList("CyycMapper.getScztfzyc",pd);//第一个产业预测
        List fristEnttotalsum= new ArrayList();//第一个数字经济企业数量(户)
        List fristEnttotalxz= new ArrayList();//第一个数字经济企业新增(户)
        List secondEnttotalsum= new ArrayList();//第二个数字经济企业新增(户)
        List secondEnttotalxz= new ArrayList();//第二个数字经济企业新增(户)
        DecimalFormat df = new DecimalFormat("0");
        for (int i = 0; i <list.size() ; i++) {
            for (int j = 0; j < yearLists.size(); j++) {
                String year1=list.get(i).get("year").toString();
                String year2=yearLists.get(j).toString();
                if(year1.equals(year2)){
                    fristEnttotalsum.add(df.format(list.get(i).get("enttotalsum")));
                    fristEnttotalxz.add(list.get(i).getString("enttotalxz"));
                }
            }
        }
        for (int i = 0; i <list1.size() ; i++) {
            for (int j = 0; j < yearLists.size(); j++) {
                String year1=list1.get(i).get("year").toString();
                String year2=yearLists.get(j).toString();
                if(year1.equals(year2)){
                    secondEnttotalsum.add(df.format(list1.get(i).get("enttotalsum")));
                    secondEnttotalxz.add(list1.get(i).getString("enttotalxz"));
                }
            }
        }
        List names=( List<PageData>) dao.findForList("CyycMapper.getCyzjzycNames",pd);//名称
        PageData pageData = new PageData();
        pageData.put("fristEnttotalsum",fristEnttotalsum);
        pageData.put("fristEnttotalxz",fristEnttotalxz);
        pageData.put("secondEnttotalsum",secondEnttotalsum);
        pageData.put("secondEnttotalxz",secondEnttotalxz);
        pageData.put("yearLists",yearLists);
        pageData.put("dataNames",names);
        return  pageData;
    }

    /**
     * @param pd
     * @return com.zhirong.ncdata.common.entity.PageData
     * @throws
     * @title getYqmb
     * @Author Strive_Li
     * @Description 预期目标
     * @Date 2020/9/11 15:35
     */
    public PageData  getYqmb(PageData pd) throws Exception {
        List<PageData> topZb= ( List<PageData>) dao.findForList("CyycMapper.getTopZb",pd);//顶层指标
        for (int i = 0; i < topZb.size(); i++) {
            List<PageData> secondZb=( List<PageData>) dao.findForList("CyycMapper.getSecondZb",topZb.get(i).getString("ITEM_ID"));//第二层指标
            topZb.get(i).put("secondZb",secondZb);
            for (int j = 0; j <secondZb.size() ; j++) {
                List<PageData> secondData=( List<PageData>) dao.findForList("CyycMapper.getSecondData",secondZb.get(i).getString("ITEM_ID"));//第二层指标数据
                secondZb.get(j).put("secondData",secondData);
            }
        }
        List  yearList= ( List) dao.findForList("CyycMapper.getYearListMb",pd);//年度列表
        PageData pageData = new PageData();
        pageData.put("msg",topZb);
        pageData.put("yearList",yearList);
        return  pageData;
    }
}
