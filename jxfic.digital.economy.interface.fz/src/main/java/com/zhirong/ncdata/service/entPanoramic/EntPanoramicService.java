package com.zhirong.ncdata.service.entPanoramic;

import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * @Classname entPanoramicService
 * @Description 企业全景
 * @Author Strive_Li
 * @Date 2020/8/27 10:35
 */
@Service
public class EntPanoramicService {
    @Resource(name = "daoSupport")
    private DaoSupport dao;

    /**
     * 根据pripid查询企业所属产业类别
     *
     * @param pd
     * @return
     * @throws Exception
     */
    public PageData getEntChainByPripid(String regno) throws Exception {
        //根据pripid查询企业所属产业类别
        PageData entMsg = (PageData) dao.findForObject("EntPanoramicMapper.getEntChainByPripid", regno);
        return entMsg;
    }
    /**
     * @param keyword
     * @param page
     * @return java.util.Map
     * @throws
     * @title getSearchWideByTableDetails
     * @Author Strive_Li
     * @Description 查询本地表中获取企业数据
     * @Date 2020/11/3 14:40
     */
    public  List<PageData> getSearchWideByTableDetails(String keyword, int page) {
        List<PageData> jsonMap = new ArrayList<>();
        try {
            jsonMap= (List<PageData>) dao.findForList("EntPanoramicMapper.getSearchWideByTableDetails", keyword);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonMap;
    }

    /**
     * @param keyword
     * @param page
     * @return int
     * @throws
     * @title getSearchWideByTableDetailsCount
     * @Author Strive_Li
     * @Description 查询企业数量
     * @Date 2020/11/3 16:49
     */
    public  int getSearchWideByTableDetailsCount(String keyword) {
        int a=0;
        try {
             a=(int) dao.findForObject("EntPanoramicMapper.getSearchWideByTableDetailsCount", keyword);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return a;
    }
    /**
     * @param pd
     * @return com.zhirong.ncdata.common.entity.PageData
     * @throws
     * @title getEntMsg
     * @Author Strive_Li
     * @Description 获取企业信息
     * @Date 2020/8/27 10:44
     */
    public PageData getEntMsg(PageData pd) throws Exception {
        //根据pripid查询企业信息
        PageData entMsg = (PageData) dao.findForObject("EntPanoramicMapper.getEntMsg", pd);
        return entMsg;
    }

    /**
     * @param pd
     * @return com.zhirong.ncdata.common.entity.PageData
     * @throws
     * @title getHistogramData
     * @Author Strive_Li
     * @Description 经营情况, 企业利润数据, 企业缴税
     * @Date 2020/8/27 14:05
     */
    public PageData getHistogramData(PageData pd) throws Exception {
        List<PageData> entMsg = (List<PageData>) dao.findForList("EntPanoramicMapper.getHistogramData", pd);
        PageData pageData = new PageData();
        List yearList = new ArrayList();//年度
        List title = new ArrayList();//标题
        title.add("营业收入");
        title.add("企业利润");
        title.add("增长率");
        List businessList = new ArrayList();//营业收入
        List profitList = new ArrayList();//企业利润
        List payList = new ArrayList();//缴税
        List rateList = new ArrayList();//增长率
        DecimalFormat df1 = new DecimalFormat("0.00");
        for (int i = 0; i < entMsg.size(); i++) {
            yearList.add(entMsg.get(i).getString("ANCHEYEAR"));
            businessList.add(df1.format(entMsg.get(i).get("VENDINC")));
            profitList.add(df1.format(entMsg.get(i).get("PROGRO")));
            payList.add(df1.format(entMsg.get(i).get("RATGRO")));
            if (i != entMsg.size() - 1) {
                DecimalFormat df = new DecimalFormat("0.0");
                BigDecimal old = new BigDecimal(entMsg.get(i).get("VENDINC").toString());//去年营业收入
                BigDecimal now = new BigDecimal(entMsg.get(i + 1).get("VENDINC").toString());//今年营业收入
                String ZZL = df.format((now.doubleValue() - old.doubleValue()) / old.doubleValue());
                rateList.add(ZZL);
            }
            pageData.put("yearList", yearList);
            pageData.put("title", title);
            pageData.put("businessList", businessList);
            pageData.put("profitList", profitList);
            pageData.put("payList", payList);
            pageData.put("rateList", rateList);
        }
        return pageData;
    }

    /**
     * @param pd
     * @return com.zhirong.ncdata.common.entity.PageData
     * @throws
     * @title getEntScore
     * @Author Strive_Li
     * @Description 获取企业分数
     * @Date 2020/8/27 17:37
     */
    public PageData getEntScore(PageData pd) throws Exception {
        //根据pripid查询企业信息
        List<PageData> entMsg = (List<PageData>) dao.findForList("EntPanoramicMapper.getEntScore", pd);
        PageData pageData = new PageData();
        int SUMDF = 0;
        for (int i = 0; i < entMsg.size(); i++) {
            SUMDF += Integer.parseInt(entMsg.get(i).getString("DF"));
        }
        pageData.put("entScoreXq", entMsg);
        pageData.put("SUMDF", SUMDF);
        return pageData;
    }

    /**
     * @param pd
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     * @throws
     * @title getEntNews
     * @Author Strive_Li
     * @Description 获取新闻舆情
     * @Date 2020/8/28 16:05
     */
    public List<PageData> getEntNews(PageData pd) throws Exception {
        //根据pripid查询企业信息
        List<PageData> entMsg = (List<PageData>) dao.findForList("EntPanoramicMapper.getEntNews", pd);
        return entMsg;
    }

    /**
     * @param pd
     * @throws Exception
     * @title getPRIPID
     * @Author yanff
     * @Description 获取PRIPID
     * @Date 2020/9/3 16:05
     */
    public PageData getPRIPID(PageData pd) throws Exception {
        PageData getPRIPID = (PageData) dao.findForObject("EntPanoramicMapper.getPRIPID", pd);
        return getPRIPID;
    }
}
