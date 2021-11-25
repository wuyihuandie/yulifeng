package com.zhirong.ncdata.service.entDistribution;

import com.github.pagehelper.PageInfo;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;
import com.zhirong.ncdata.service.index.DigitalEconomyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

/**
 * @author yanfeifan
 * @Package com.zhirong.ncdata.service.entDistribution
 * @Description 产业园区
 * @date 2020/8/24 11:25
 */
@Service
public class IndustrialParkService {

    @Resource(name = "daoSupport")
    private DaoSupport dao;



    /**
     * 根据id查询产业园区介绍
     * @param pd
     * @return PageData
     * @throws Exception
     */
    public PageData queryIndustrialParkJSById(PageData pd) throws Exception {
        //根据id查询产业园区介绍
        PageData queryIndustrialParkJSById = (PageData) dao.findForObject("IndustrialParkMapper.queryIndustrialParkJSById",pd);
        return queryIndustrialParkJSById;
    }

    /**
     * 产业园区产业分布
     * @param pd
     * @return List<PageData>
     * @throws Exception
     */
    public List<PageData> queryIndustrialParkCYFB(PageData pd) throws Exception {
        List<PageData> queryIndustrialParkCYFB = (List<PageData>) dao.findForList("IndustrialParkMapper.queryIndustrialParkCYFB",pd);
        return queryIndustrialParkCYFB;
    }

    /**
     * 产业园区地理分布
     * @param pd
     * @return Map<String,Object>
     * @throws Exception
     */
    public Map<String,Object> queryIndustrialParkDLFB(PageData pd) throws Exception {
        Map<String,Object> map = new HashMap<>();
        List<Map<String,Object>> mapList = new ArrayList<>();
        //产业园区地区分组
        List<PageData> queryIndustrialParkGroupByArea = queryIndustrialParkGroupByArea(pd);
        //产业园经纬度
        List<PageData> queryIndustrialParkLoAndLa = queryIndustrialParkLoAndLa(pd);
        //产业园主导产业分组
        List<PageData> queryIndustrialParkZDCY = queryIndustrialParkZDCY(pd);
        for (PageData pageData : queryIndustrialParkGroupByArea) {
            Map<String,Object> maps = new HashMap<>();
            //根据地区查询此地区细分产业的产业园数量
            List<PageData> queryIndustrialParkZDCYByArea = (List<PageData>) dao.findForList("IndustrialParkMapper.queryIndustrialParkZDCYByArea",pageData);
            maps.put(pageData.getString("AREA_NAME"),queryIndustrialParkZDCYByArea);
            mapList.add(maps);
        }
        map.put("leftDataList",queryIndustrialParkZDCY);
        map.put("IndustrialParkLoAndLa",queryIndustrialParkLoAndLa);
        map.put("dataList",queryIndustrialParkGroupByArea);
        map.put("subdivideIndustrialPark",mapList);
        return map;
    }

    /**
     * 产业园区地区分组
     * @param pd
     * @return Map<String,Object>
     * @throws Exception
     */
    public List<PageData> queryIndustrialParkGroupByArea(PageData pd) throws Exception {
        //产业园区地区分组
        List<PageData> queryIndustrialParkGroupByArea = (List<PageData>) dao.findForList("IndustrialParkMapper.queryIndustrialParkGroupByArea",pd);
        return queryIndustrialParkGroupByArea;
    }

    /**
     * 产业园经纬度
     * @param pd
     * @return Map<String,Object>
     * @throws Exception
     */
    public List<PageData> queryIndustrialParkLoAndLa(PageData pd) throws Exception {
        //产业园区地区分组
        List<PageData> queryIndustrialParkLoAndLa = (List<PageData>) dao.findForList("IndustrialParkMapper.queryIndustrialParkLoAndLa",pd);
        return queryIndustrialParkLoAndLa;
    }

    /**
     * 产业园主导产业分组
     * @param pd
     * @return Map<String,Object>
     * @throws Exception
     */
    public List<PageData> queryIndustrialParkZDCY(PageData pd) throws Exception {
        //产业园区地区分组
        List<PageData> queryIndustrialParkZDCY = (List<PageData>) dao.findForList("IndustrialParkMapper.queryIndustrialParkZDCY",pd);
        return queryIndustrialParkZDCY;
    }

    /**
     * 产业园区发展情况
     * @param pd
     * @return Map<String,Object>
     * @throws Exception
     */
    public Map<String,Object> queryIndustrialParkFZQK(PageData pd) throws Exception {
        Map<String,Object> map = new HashMap<>();
        List<Object> numList = new ArrayList<>();
        List<String> getYear = new ArrayList<>();
        List<PageData> queryIndustrialParkFZQK = (List<PageData>) dao.findForList("IndustrialParkMapper.queryIndustrialParkFZQK",pd);
        for (PageData pageData : queryIndustrialParkFZQK) {
            numList.add(pageData.get("gdpNum")==null?"null":pageData.get("gdpNum"));
            getYear.add(pageData.getString("YEAR")==null?"null":pageData.getString("YEAR"));
        }
        map.put("numList",numList);
        map.put("dataNames",getYear);
        return map;
    }

    /**
     * 产业园区排名头部总数
     * @param pd
     * @return Map<String,Object>
     * @throws Exception
     */
    public Map<String,Object> queryIndustrialParkPM(PageData pd) throws Exception {
        Map<String,Object> map = new HashMap<>();
        pd.put("state","1");
        //产业园企业总数
        List<PageData> queryIndustrialParkGroupByArea = queryIndustrialParkGroupByArea(pd);
        //企业总数
        Double sumEnttotal = 0.0;
        //总面积
        Double sumMj = 0.0;
        //总注册资本
        Double sumRegcap = 0.0;
        for (PageData pageData : queryIndustrialParkGroupByArea) {
            //每个地区产业园的企业总数
            Double sumEnttotalGroupByArea = Double.valueOf((Double) (pageData.get("sumEnttotalGroupByArea") == null?0.0:pageData.get("sumEnttotalGroupByArea")));
            //每个地区产业园的总面积
            Double sumMjGroupByArea = Double.valueOf((Double) (pageData.get("sumMjGroupByArea") == null?0.0:pageData.get("sumMjGroupByArea")));
            //每个地区产业园的总注册资本
            Double sumRegcapGroupByArea = Double.valueOf((Double) (pageData.get("sumRegcapGroupByArea") == null?0.0:pageData.get("sumRegcapGroupByArea")));
            sumEnttotal +=sumEnttotalGroupByArea;
            sumMj +=sumMjGroupByArea;
            sumRegcap +=sumRegcapGroupByArea;
        }
        map.put("sumEnttotal",sumEnttotal);
        map.put("sumMj",sumMj);
        map.put("sumRegcap",sumRegcap);
        return map;
    }

    /**
     * 产业园区排名列表
     * @param pd
     * @return Map<String,Object>
     * @throws Exception
     */
    public List<PageData> queryIndustrialParkPMList(PageData pd) throws Exception {
        List<PageData> list = (List<PageData>)dao.findForList("IndustrialParkMapper.queryIndustrialParkPMList",pd);
        return list;
    }
}
