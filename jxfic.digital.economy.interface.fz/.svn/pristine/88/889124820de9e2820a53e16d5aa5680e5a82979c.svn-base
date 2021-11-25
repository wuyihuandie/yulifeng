package com.zhirong.ncdata.service.entDistribution;

import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @Author 黄宇豪
 * @Description 企业分布
 * @Date 11:40 2020/8/22
 * @Param 
 * @return 
 **/
@Service
public class EntDistributionService {
	
    @Resource(name = "daoSupport")
    private DaoSupport dao;

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getHyfb
     * @Author Strive_Li
     * @Description 行业分布
     * @Date 2020/8/24 11:50
     */
       public PageData getHyfb(PageData pd) throws Exception {
           PageData barpd = new PageData();
           List<PageData> list = (List<PageData>)dao.findForList("EntDistributionMapper.getHyfb",pd);
           String dataNames[] = new String[list.size()];//饼图legend名称
           List<PageData> dataValues = new ArrayList<PageData>();
           int sumCount=0;//所有总数
           int qtCount=0;//其他行业总数
           for (int i = 0; i < list.size(); i++) {
               sumCount+=Integer.parseInt(list.get(i).get("COUNT").toString());
           }
           double sum= Double.valueOf(sumCount);//int转为double
           for(int i = 0;i<list.size();i++){
               if((Integer.parseInt(list.get(i).get("COUNT").toString())/sum)>0.05){
               PageData dataValuesName = new PageData();
               dataNames[i] = list.get(i).getString("CHAIN_NAME");
               dataValuesName.put("name",list.get(i).getString("CHAIN_NAME"));
               dataValuesName.put("value",Integer.parseInt(list.get(i).get("COUNT").toString()));
               dataValues.add(dataValuesName);
               }else{
                   qtCount+=Integer.parseInt(list.get(i).get("COUNT").toString());
               }
           }
           List<String> list1= new ArrayList(Arrays.asList(dataNames));//数组转为集合
           list1=removeNull(list1);
           list1.add("其他行业");
           PageData dataValuesName = new PageData();
           dataValuesName.put("name","其他行业");
           dataValuesName.put("value",qtCount);
           dataValues.add(dataValuesName);
           barpd.put("dataNames",list1);
           barpd.put("dataValues",dataValues);
           return barpd;
    }

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getHyys
     * @Author Strive_Li
     * @Description 行业营收
     * @Date 2020/8/24 15:40
     */
    public List<PageData> getHyys(PageData pd) throws Exception {
        List<PageData> list = (List<PageData>)dao.findForList("EntDistributionMapper.getHyys",pd);
        List dataNames=new ArrayList<>();
        double sum=0;//所有行业企业总数
        for (int i = 0; i < list.size(); i++) {
            sum+=Double.parseDouble(list.get(i).get("COUNT").toString());
        }
        if(sum>0){
            double qthy=0;//其他行业
            double qthyHyys=0;//其他行业
            for (int i = 0; i < list.size(); i++) {
                if((Double.parseDouble(list.get(i).get("COUNT").toString())/sum)>0.05){
                    dataNames.add(list.get(i).getString("CHAIN_NAME"));
                }else{
                    if( list.get(i).get("HYYS")!=null && list.get(i).get("HYYS").toString()!="" ){
                        qthyHyys=Double.parseDouble(list.get(i).get("HYYS").toString());
                    }else{
                        qthyHyys=0;
                    }
                    qthy+=Double.parseDouble(list.get(i).get("COUNT").toString());
                    list.remove(i);
                    i--;
                }
            }
            PageData pageData = new PageData();
            pageData.put("HYYS",qthyHyys);
            pageData.put("COUNT",(int)qthy);
            pageData.put("CHAIN_NAME","其他行业");
            list.add(pageData);
        }
        List<PageData> data=new ArrayList<>();
        List dataHyys=new ArrayList<>(); //行业营收
        List dataCount=new ArrayList<>(); //企业数量
        PageData pageData = new PageData();
        dataNames.add("其他行业");
        pageData.put("dataNames",dataNames);
        for (int i = 0; i < list.size(); i++) {
            if(list.get(i).get("HYYS")!=null && list.get(i).get("HYYS").toString()!="" ){
                dataHyys.add(list.get(i).get("HYYS"));
            }else{
                dataHyys.add(0.0);
            }
            dataCount.add(list.get(i).get("COUNT"));
        }
        pageData.put("dataHyys",dataHyys);
        pageData.put("dataCount",dataCount);
        data.add(pageData);
        return data;
    }

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getEnterpriseSite
     * @Author Strive_Li
     * @Description 得到企业坐标
     * @Date 2020/8/25 10:49
     */
    public List<PageData> getEnterpriseSite(PageData pd) throws Exception {
        pd.put("item", getChainIdList(pd));//所有上一年相关产业链集合
        List<PageData> pripids = (List<PageData>) dao.findForList("EntDistributionMapper.getEnterpriseSite", pd);//获取抚州市所有的企业
        return pripids;
    }
    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getWlwqyfb
     * @Author Strive_Li
     * @Description 物联网企业分布
     * @Date 2020/8/24 15:40
     */
    public List<PageData> getWlwqyfb(PageData pd) throws Exception {
//        pd.put("item", getChainIdList(pd));//所有相关上一年产业链集合
//        List<PageData> list2 = (List<PageData>) dao.findForList("EntDistributionMapper.getEntMsg", pd);//获取抚州市区域分布情况
        List<PageData> list2 = (List<PageData>) dao.findForList("EntDistributionMapper.getWlwqyfb", pd);//获取抚州市区域分布情况
        for (int i = 0; i < list2.size(); i++) {
            double ZLRZE=Double.parseDouble(list2.get(i).get("ZLRZE").toString());
            double COUNT=Double.parseDouble(list2.get(i).get("COUNT").toString());
            NumberFormat nt = NumberFormat.getPercentInstance();//获取百分数实例
            nt.setMinimumFractionDigits(1);
            list2.get(i).put("bfb",nt.format(ZLRZE/COUNT));
        }
        return list2;
    }

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getSjzl
     * @Author Strive_Li
     * @Description 得到数据总览
     * @Date 2020/8/26 10:28
     */
    public PageData getSjzl(PageData pd) throws Exception {
       PageData list4 = new PageData();
        pd.put("jxItem", getJxChainIdList(pd));//所有相关江西省上一年产业链集合
        List<PageData> list2 = (List<PageData>) dao.findForList("EntDistributionMapper.getQySjzl", pd);//获取抚州市企业数量,全省企业排名
        List<PageData> list3 = (List<PageData>) dao.findForList("EntDistributionMapper.getHySjzl", pd);//获取抚州市行业营收,全省行业营收排名
        for (int i = 0; i <list2.size() ; i++) {
            if("3610".equals(list2.get(i).getString("AREA"))){
                list4.put("QYSL",list2.get(i));
            }
        }
        for (int i = 0; i <list3.size() ; i++) {
            if("3610".equals(list3.get(i).getString("AREA"))){
                list4.put("HYYS",list3.get(i));
            }
        }
        return list4;
    }
    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getEntList
     * @Author Strive_Li
     * @Description 获取企业列表
     * @Date 2020/8/25 15:55
     */
    public List<PageData> getEntList(PageData pd) throws Exception {
      /*  pd.put("itemOld", getChainIdList(pd));//所有上一年相关产业链集合
        pd.put("itemNow", getChainIdListNow(pd));//所有当前年相关产业链集合
        List<PageData> list2=new ArrayList<>();
        List<PageData> list3=new ArrayList<>();
        if(getChainIdList(pd).size()>0){
             list2 = (List<PageData>) dao.findForList("EntDistributionMapper.getEntListOld", pd);//获取抚州市区域上一年的企业数量
        }
        if (getChainIdListNow(pd).size()>0){
             list3 = (List<PageData>) dao.findForList("EntDistributionMapper.getEntListNow", pd);//获取抚州市区域当前年的企业数量
        }
        List<PageData> list4=new ArrayList<>();//最终返回页面数据集合
        for (int i = 0; i < list3.size(); i++) {//当前年
            PageData pageData =new PageData();
            pageData.putAll(list3.get(i));
            for (int j = 0; j < list2.size(); j++) {//去年
                if(list3.get(i).getString("REGORG").equals(list2.get(j).getString("REGORG"))){
                    double oldCount= Double.parseDouble(list2.get(j).get("COUNT").toString());//去年
                    double newCount= Double.parseDouble(list3.get(i).get("COUNT").toString());//当前年
                    int newNum =(int)(newCount-oldCount);//新增用户
                    DecimalFormat df = new DecimalFormat("#.00");
                    String ZS=df.format((newNum/newCount)*100);
                    pageData.put("newNum",newNum);
                    pageData.put("ZS",ZS);
                    list4.add(pageData);
                }
            }
        }*/
        DecimalFormat df = new DecimalFormat("0.00");
        List<PageData> list4=(List<PageData>) dao.findForList("EntDistributionMapper.getEntListFz", pd);//获取各个县区企业发展
        for (int i = 0; i <list4.size() ; i++) {
            list4.get(i).put("ZS",df.format(list4.get(i).get("ZS")));
        }
        return list4;
    }

    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getChainIdList
     * @Author Strive_Li
     * @Description 获取顶级上一年所有子级产业链集合(比如今年是2020 则得到2019年的子链集合)
     * @Date 2020/8/25 15:57
     */
    public List getChainIdList(PageData pd) throws Exception {
        List lists = new ArrayList();//存放所有产业链编号
        List list = (List) dao.findForList("EntDistributionMapper.getChainId2", pd);//得到等级为2产业链编号
        pd.put("item", list);
        for (int i = 0; i < list.size(); i++) {
            lists.add(list.get(i));
        }
        if(list.size()>0){
        for (int i = 0; i < 3; i++) {
            if(!"[]".equals(pd.get("item").toString())){
            List list1 = (List) dao.findForList("EntDistributionMapper.getChainIds", pd);//得到等级为3,4,5产业链编号
            pd.put("item", list1);
            for (int j = 0; j < list1.size(); j++) {
                lists.add(list1.get(j));
            }
        }
        }
        }
        return  lists;
    }
    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getChainIdList
     * @Author Strive_Li
     * @Description 获取顶级上一年所有子级产业链集合(比如今年是2020 则得到2019年的子链集合)
     * @Date 2020/8/25 15:57
     */
    public List getJxChainIdList(PageData pd) throws Exception {
        List lists = new ArrayList();//存放所有产业链编号
        List list = (List) dao.findForList("EntDistributionMapper.getJxChainId2", pd);//得到等级为2产业链编号
        pd.put("item", list);
        for (int i = 0; i < list.size(); i++) {
            lists.add(list.get(i));
        }
        for (int i = 0; i < 3; i++) {
            List list1 = (List) dao.findForList("EntDistributionMapper.getJxChainIds", pd);//得到等级为3,4,5产业链编号
            pd.put("item", list1);
            for (int j = 0; j < list1.size(); j++) {
                lists.add(list1.get(j));
            }
        }
        return  lists;
    }
    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getChainIdListNow
     * @Author Strive_Li
     * @Description 获取顶级当前年所有子级产业链集合(比如今年是2020 则得到2020年的子链集合)
     * @Date 2020/8/25 15:57
     */
    public List getChainIdListNow(PageData pd) throws Exception {
        List lists = new ArrayList();//存放所有产业链编号
        List list = (List) dao.findForList("EntDistributionMapper.getChainId2Now", pd);//得到等级为2产业链编号
        pd.put("item", list);
        for (int i = 0; i < list.size(); i++) {
            lists.add(list.get(i));
        }
        if(list.size()>0){
        for (int i = 0; i < 3; i++) {
            if(!"[]".equals(pd.get("item").toString())){
                List list1 = (List) dao.findForList("EntDistributionMapper.getChainIdsNow", pd);//得到等级为3,4,5产业链编号
                pd.put("item", list1);
                for (int j = 0; j < list1.size(); j++) {
                    lists.add(list1.get(j));
                }
            }
        }
        }
        return  lists;
    }

    /**
     * @param oldList
     * @return java.util.List<T>
     * @throws
     * @title removeNull
     * @Author Strive_Li
     * @Description 去除集合为空的元素
     * @Date 2020/9/8 14:39
     */
    public static <T> List<T> removeNull(List<? extends T> oldList) {
        oldList.removeAll(Collections.singleton(null));
        return (List<T>) oldList;
    }

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getEntListByAreaCount
     * @Author Strive_Li
     * @Description 根据企业数量,区域,新增数量得到企业列表
     * @Date 2020/9/10 15:59
     */
    public List<PageData> getEntListByAreaCount(PageData pd) throws Exception {
        List<PageData> pripids = (List<PageData>) dao.findForList("EntDistributionMapper.getEntListByAreaCount", pd);//根据企业数量,区域,新增数量得到企业列表
        return pripids;
    }
}
