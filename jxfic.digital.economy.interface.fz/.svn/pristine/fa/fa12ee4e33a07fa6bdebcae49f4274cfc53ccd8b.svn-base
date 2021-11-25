package com.zhirong.ncdata.service.industrialChain;

import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @title
 * @Author Strive_Li
 * @Description 产业链分析
 * @Date 2020/8/12 10:49
 */
@Service
public class IndustrialChainService {
	
    @Resource(name = "daoSupport")
    private DaoSupport dao;

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
        List<PageData>  list= (List<PageData>) dao.findForList("IndustrialChainMapper.getYears",pd);
        List list1 =new ArrayList();
        for (int i = 0; i <list.size() ; i++) {
            list1.add(list.get(i).get("YEAR"));
        }
        return  list1;
    }
    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getTopIndustrialChains
     * @Author Strive_Li
     * @Description 获取顶层产业链
     * @Date 2020/8/14 14:45
     */
    public List<PageData>  getTopIndustrialChains(PageData pd) throws Exception {
        return (List<PageData>) dao.findForList("IndustrialChainMapper.getTopIndustrialChains",pd);
    }
    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getDataLayers
     * @Author Strive_Li
     * @Description 得到中间数据层信息
     * @Date 2020/8/18 11:38
     */
    public List<PageData> getDataLayers(PageData pd) throws Exception {
        List<PageData> list=(List<PageData>) dao.findForList("IndustrialChainMapper.getDataLayers",pd);//中间第一层数据以及总的数据 等级为2
        int dataSum=0; //数据层所有的总数
        for (int i = 0; i < list.size(); i++) {
            PageData pageData =new PageData();
            pageData.put("CHAIN_ID",list.get(i).get("CHAIN_ID"));
            pageData.put("CHAIN_LEVEL",list.get(i).get("CHAIN_LEVEL"));
            pageData.put("YEAR",pd.get("YEAR"));//年度
            pageData.put("AREA",pd.get("AREA"));//区域
            List <PageData>list2=(List<PageData>) dao.findForList("IndustrialChainMapper.getDataLayers",pageData);//中间第二层数据 等级为3
            int sum=(int) dao.findForObject("IndustrialChainMapper.getSum",pageData);//获取数量
            dataSum=dataSum+sum;
            for (int j = 0; j < list2.size(); j++) {
                pageData.clear();
                pageData.put("CHAIN_ID",list2.get(j).get("CHAIN_ID"));
                pageData.put("CHAIN_LEVEL",list2.get(j).get("CHAIN_LEVEL"));
                pageData.put("YEAR",pd.get("YEAR"));//年度
                pageData.put("AREA",pd.get("AREA"));//区域
                List <PageData>list3=(List<PageData>) dao.findForList("IndustrialChainMapper.getDataLayers",pageData);//中间第三层数据 等级为4
                sum=(int) dao.findForObject("IndustrialChainMapper.getSum",pageData);//获取数量
                dataSum=dataSum+sum;
                list2.get(j).put("LOWERDATA",list3);
                for (int k = 0; k <list3.size(); k++) {
                    pageData.clear();
                    pageData.put("CHAIN_ID",list3.get(k).get("CHAIN_ID"));
                    pageData.put("CHAIN_LEVEL",list3.get(k).get("CHAIN_LEVEL"));
                    pageData.put("YEAR",pd.get("YEAR"));//年度
                    pageData.put("AREA",pd.get("AREA"));//区域
                    List <PageData>list4=(List<PageData>) dao.findForList("IndustrialChainMapper.getDataLayers",pageData);//中间第四层数据 等级为5
                    sum=(int) dao.findForObject("IndustrialChainMapper.getSum",pageData);//获取数量
                    dataSum=dataSum+sum;
                    list3.get(k).put("LOWERDATA",list4);
                }
            }
            list.get(i).put("LOWERDATA",list2);
            list.get(i).put("dataSum",dataSum);
        }
        return list;
    }

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getEnterpriseList
     * @Author Strive_Li
     * @Description 获取右侧企业列表
     * @Date 2020/8/19 9:27
     */
    public List<PageData> getEnterpriseList(PageData pd) throws Exception {
        List list = new ArrayList();//存放产业链编号(本级以及子级)
        list.add(pd.getString("CHAIN_ID"));//等级为2的产业链编号
        List list1 = (List) dao.findForList("IndustrialChainMapper.getChainIds", pd);//获取产业链编号(本级以及子级 等级为3)
        if (list1.size() > 0) {
            for (int i = 0; i < list1.size(); i++) {
                list.add(list1.get(i));//添加等级为3的产业链编号
            }
            pd.put("items", list1);
            List list2 = (List) dao.findForList("IndustrialChainMapper.getChainIds1", pd);//获取产业链编号(本级以及子级 等级为4)
            if (list2.size() > 0) {
                for (int i = 0; i < list2.size(); i++) {
                    list.add(list2.get(i));//添加等级为4的产业链编号
                }
                pd.put("items", list2);
                List list3 = (List) dao.findForList("IndustrialChainMapper.getChainIds1", pd);//获取产业链编号(本级以及子级 等级为5)
                if (list3.size() > 0) {
                    for (int i = 0; i < list3.size(); i++) {
                        list.add(list3.get(i));//添加等级为5的产业链编号
                    }
                }
            }
        }
        pd.put("list",list);//将所有产业链编号存入其中*/
        List<PageData>  areaList = (List<PageData> ) dao.findForList("IndustrialChainMapper.getAreaList", pd);//获取区域编码
        String area = pd.get("AREA").toString();
        if(!area.endsWith("0000")&&area.endsWith("00")){
            pd.put("REGORG",area.substring(0,4));
        }
        List<PageData>  list4 = (List<PageData> ) dao.findForList("IndustrialChainMapper.getEntMsg", pd);//获取企业信息

        for (int i = 0; i <list4.size() ; i++) {
            for (int j = 0; j <areaList.size() ; j++) {
                if(areaList.get(j).getString("PRIPID").equals(list4.get(i).getString("PRIPID"))){
                    list4.get(i).put("AREA_NAME",areaList.get(j).getString("AREA_NAME"));
                }
            }
        }
        return list4;
    }
    
    /**
     * @param :AREA (区域编号)
     *        2:YEAR (年度时间)
     *        3:CHAIN_ID (产业链编号) 
     *        4:CONDITION (排序条件: RATGRO(纳税总额),VENDINC(营业总收入),EMPNUM(从业人数)) 
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getEnterpriseListByCondition
     * @Author 谌思宇
      * @Description 根据条件 获取 右侧企业列表  
     * @Date 2020/9/23 16:44
     */
    public List<PageData> getEnterpriseListByCondition(PageData pd) throws Exception {
        /*String area = pd.get("AREA").toString();
        if(!area.endsWith("0000")&&area.endsWith("00")){
            pd.put("REGORG",area.substring(0,4));
        }*/
        List<PageData>  list4 = (List<PageData> ) dao.findForList("IndustrialChainMapper.getEntMsgByCondition", pd);//获取企业信息
        return list4;
    }

    /**
     * 重点项目清单查询
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getKeyProjectlist(PageData pd) throws Exception {
        String area = pd.get("AREA").toString();
        if(!area.endsWith("0000")&&area.endsWith("00")){
            pd.put("AREA",area.substring(0,4));
        }
        List<PageData>  list4 = (List<PageData> ) dao.findForList("IndustrialChainMapper.getKeyProjectlist", pd);
        return list4;
    }

    /**
     * 政策清单查询
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getPolicylist(PageData pd) throws Exception {
        List<PageData>  list4 = (List<PageData> ) dao.findForList("IndustrialChainMapper.getPolicylist", pd);
        return list4;
    }

    /**
     * 产业链图获取
     * @param pd
     * @return
     * @throws Exception
     */
    public List<PageData> getIndustryChainDatas(PageData pd) throws Exception {
        List<PageData>  list = (List<PageData> ) dao.findForList("IndustrialChainMapper.getIndustryChainDatas", pd);
        for(PageData chain : list){
            List<PageData> entList = (List<PageData> ) dao.findForList("IndustrialChainMapper.getEntByChainId", chain);
            chain.put("entList",entList);
        }
        return list;
    }

    public List<PageData> getEnterpriseBychainIdList(PageData pd) throws Exception {
        List<PageData>  list = (List<PageData> ) dao.findForList("IndustrialChainMapper.getEnterpriseBychainIdList", pd);//获取企业信息
        return list;
    }
}
