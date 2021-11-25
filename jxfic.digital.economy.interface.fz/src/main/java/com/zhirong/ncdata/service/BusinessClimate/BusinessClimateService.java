package com.zhirong.ncdata.service.BusinessClimate;

import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * @author yanfeifan
 * @Description  营商环境Service
 * @date 2020/9/5 10:14
 */
@Service
public class BusinessClimateService {

    @Resource(name = "daoSupport")
    private DaoSupport dao;

    /**@param pd
    * @throws Exception
    * @Author yanfeifan
    * @Description  各地营商环境得分及类型
     * */
    public List<PageData> queryBusinessClimateByScoreAndType(PageData pd) throws Exception {
        List<PageData> queryBusinessClimateByScoreAndType = (List<PageData>) dao.findForList("BusinessClimateMapper.queryBusinessClimateByScoreAndType", pd);//获取抚州市所有的企业
        return queryBusinessClimateByScoreAndType;
    }

    /**@param pd
     * @throws Exception
     * @Author yanfeifan
     * @Description  各地市子环境加权得分及排名
     * */
    public List<PageData> queryBusinessClimateByWeightedScoresAndRankings(PageData pd) throws Exception {
        List<PageData> queryBusinessClimateByWeightedScoresAndRankings = (List<PageData>) dao.findForList("BusinessClimateMapper.queryBusinessClimateByWeightedScoresAndRankings", pd);//获取抚州市所有的企业
        return queryBusinessClimateByWeightedScoresAndRankings;
    }

    /**@param pd
     * @throws Exception
     * @Author yanfeifan
     * @Description  查询所有各地市子环境营商环境指标ID
     * */
    public List<PageData> queryBusinessClimateByZhjIndexId(PageData pd) throws Exception {
        List<PageData> queryBusinessClimateByZhjIndexId = (List<PageData>) dao.findForList("BusinessClimateMapper.queryBusinessClimateByZhjIndexId", pd);//获取抚州市所有的企业
        return queryBusinessClimateByZhjIndexId;
    }

    /**
     * @param pd
     * @return com.zhirong.ncdata.common.entity.PageData
     * @throws
     * @title getIndexXq
     * @Author Strive_Li
     * @Description 获取微观问卷指标、宏观指标详情
     * @Date 2020/9/5 11:02
     */
    public PageData getIndexXq(PageData pd) throws Exception {
        if("1".equals(pd.getString("type"))){//微观问卷指标
//            pd.put("firstName","微观问卷");
//            pd.put("secondName","营商环境总体评价");
//            pd.put("thirdName","六大子环境");
            pd.put("firstId","10001");
            pd.put("secondId","10002");
            pd.put("thirdId","10003");
        }else{//宏观指标
//            pd.put("firstName","宏观指标");
//            pd.put("secondName","民营经济发展指标");
//            pd.put("thirdName","五大子环境");
            pd.put("firstId","10012");
            pd.put("secondId","10004");
            pd.put("thirdId","10005");
        }
        List<PageData> IndexXq = (List<PageData>) dao.findForList("BusinessClimateMapper.getIndexXqNew",pd);
        PageData pageData =new PageData();
        PageData radarPageData =new PageData();
        PageData capsulePageData =new PageData();
        List<PageData> questionPageData =new ArrayList<>();
        List radarName =new ArrayList(); //雷达名称
        List radarValue =new ArrayList(); //雷达值
        for (int i = 0; i <IndexXq.size(); i++) {
            NumberFormat percentInstance = NumberFormat.getPercentInstance();
            percentInstance.setMaximumFractionDigits(2); // 保留小数两位
            if("3".equals(IndexXq.get(i).getString("zbjb"))){//雷达图
                radarName.add(IndexXq.get(i).get("name").toString()+","+percentInstance.format(IndexXq.get(i).get("score_zb")));
                radarValue.add(IndexXq.get(i).get("score_zb").toString());
            }
            if("1".equals(IndexXq.get(i).getString("zbjb"))){//指标权重
                capsulePageData.put("name",IndexXq.get(i).get("name").toString());
                if("10001".equals(IndexXq.get(i).get("id").toString())){
                    capsulePageData.put("wgvalue",percentInstance.format(IndexXq.get(i).get("score_zb")));
                }else{
                    capsulePageData.put("hgvalue",percentInstance.format(IndexXq.get(i).get("score_zb")));
                }
            }
            if("2".equals(IndexXq.get(i).getString("zbjb"))){//指标权重
                PageData pageData1 = new PageData();
                pageData1.put("name", IndexXq.get(i).get("name").toString());
                pageData1.put("value", IndexXq.get(i).get("score_zb"));
                questionPageData.add(pageData1);
            }
        }
        radarPageData.put("name",radarName);
        radarPageData.put("value",radarValue);
        pageData.put("radar",radarPageData);//雷达图
        pageData.put("capsule",capsulePageData);//胶囊图
        pageData.put("question",questionPageData);//?显示数据
        return pageData;
    }

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getYshjYears
     * @Author Strive_Li
     * @Description 获取营商环境年度
     * @Date 2020/9/10 10:07
     */
    public List<PageData>  getYshjYears(PageData pd) throws Exception {
        List<PageData>  list= (List<PageData>) dao.findForList("BusinessClimateMapper.getYshjYears",pd);
        List list1 =new ArrayList();
        for (int i = 0; i <list.size() ; i++) {
            list1.add(list.get(i).get("year"));
        }
        return  list1;
    }
}
