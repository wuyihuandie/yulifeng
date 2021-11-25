package com.zhirong.ncdata.service.qyhydfx;

import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @title
 * @Author Strive_Li
 * @Description 企业活跃度分析
 */
@Service
public class QyhydfxService {
	
    @Resource(name = "daoSupport")
    private DaoSupport dao;

    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getMyqyCyByYear
     * @Author Strive_Li
     * @Description 民营企业增加值(三产)
     * @Date 2020/10/30 11:13
     */
    public List getMyqyCyByYear(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getMyqyCyByYear", pd);
    }


    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getQyCyByYear
     * @Author Strive_Li
     * @Description 江西企业总数(三产)
     * @Date 2020/10/30 11:15
     */
    public List getQyCyByYear(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getQyCyByYear", pd);
    }

    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getIndBusYear
     * @Author Strive_Li
     * @Description  江西个体工商户三产总数
     * @Date 2020/10/30 11:15
     */
    public List getIndBusYear(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getIndBusYear", pd);
    }

    /**
     * @param pd
     * @return java.util.List<java.util.Map < java.lang.String, java.lang.Object>>
     * @throws
     * @title getIndustry
     * @Author Strive_Li
     * @Description  查询（外资，内资，农专）三产总数 year，type（1：内资，2：外资，3：农专）
     * @Date 2020/10/30 11:16
     */
    public List<Map<String, Object>> getIndustry(PageData pd) throws Exception {
        return (List<Map<String, Object>>) dao.findForList("QyhydfxMapper.getIndustry", pd);
    }

    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getMyqyclClty
     * @Author Strive_Li
     * @Description 江西民营企业分区域存量
     * @Date 2020/10/30 13:57
     */
    public List getMyqyclClty(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getMyqyclClty", pd);
    }

    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getMyqyzlClty
     * @Author Strive_Li
     * @Description 江西民营企业分区域增量
     * @Date 2020/10/30 13:58
     */
    public List getMyqyzlClty(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getMyqyzlClty", pd);
    }

    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getMyqyzdxClty
     * @Author Strive_Li
     * @Description 江西民营企业分区域注销量
     * @Date 2020/10/30 13:58
     */
    public List getMyqyzdxClty(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getMyqyclClty", pd);
    }

    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getMyqyRevokeClty
     * @Author Strive_Li
     * @Description  江西民营企业分区域吊销
     * @Date 2020/10/30 13:58
     */
    public List getMyqyRevokeClty(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getMyqyRevokeClty", pd);
    }
    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getQyclClty
     * @Author Strive_Li
     * @Description  江西企业分区域存量
     * @Date 2020/10/30 13:58
     */
    public List getQyclClty(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getQyclClty", pd);
    }
    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getQyzlClty
     * @Author Strive_Li
     * @Description  江西企业分区域增量
     * @Date 2020/10/30 13:58
     */
    public List getQyzlClty(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getQyzlClty", pd);
    }
    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getQyzdxClty
     * @Author Strive_Li
     * @Description  江西企业分区域注销量
     * @Date 2020/10/30 13:58
     */
    public List getQyzdxClty(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getQyzdxClty", pd);
    }
    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getQyRevokeClty
     * @Author Strive_Li
     * @Description  江西企业分区域吊销量
     * @Date 2020/10/30 13:58
     */
    public List getQyRevokeClty(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getQyRevokeClty", pd);
    }

    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getIndBusclClty
     * @Author Strive_Li
     * @Description 江西个体工商户分区域存量
     * @Date 2020/10/30 14:10
     */
    public List getIndBusclClty(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getIndBusclClty", pd);
    }
    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getIndBusclClty
     * @Author Strive_Li
     * @Description 江西个体工商户分区域增量
     * @Date 2020/10/30 14:10
     */
    public List getIndBuszlClty(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getIndBuszlClty", pd);
    }
    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getIndBusclClty
     * @Author Strive_Li
     * @Description 江西个体工商户分区域注销量
     * @Date 2020/10/30 14:10
     */
    public List getIndBuszdxClty(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getIndBuszdxClty", pd);
    }
    /**
     * @param pd
     * @return java.util.List
     * @throws
     * @title getIndBusclClty
     * @Author Strive_Li
     * @Description 江西个体工商户分区域注销量
     * @Date 2020/10/30 14:10
     */
    public List getIndBusRevokeClty(PageData pd) throws Exception {
        return (List) dao.findForList("QyhydfxMapper.getIndBusRevokeClty", pd);
    }

    /**
     * @param pd
     * @return java.util.List<java.util.Map < java.lang.String, java.lang.Object>>
     * @throws
     * @title getIndustryActive
     * @Author Strive_Li
     * @Description 查询（外资，内资，农专）三产总数
     * @Date 2020/10/30 14:18
     */
    public List<Map<String, Object>> getIndustryActive(PageData pd) throws Exception {
        return (List<Map<String, Object>>) dao.findForList("QyhydfxMapper.getIndustryActive", pd);
    }
    /**
     * @Author 黄宇豪
     * @Description 获取数据
     * @Date 11:06 2020/10/30
     * @Param [param]
     * @return java.util.List<java.util.Map>
     **/
    public List<Map> getSaData(Map param) throws Exception {
        return (List<Map>) dao.findForList("QyhydfxMapper.getSaData", param);
    }
    /**
     * @Author 黄宇豪
     * @Description 查询历年状况
     * @Date 11:18 2020/10/30
     * @Param [param]
     * @return java.util.List<java.util.Map>
     **/
    public List<Map> getIndustryOfYearInfo(Map param) throws Exception {
        return (List<Map>) dao.findForList("QyhydfxMapper.getIndustryOfYearInfo", param);
    }
    /**
     * @Author 黄宇豪
     * @Description 查询历年状况
     * @Date 11:18 2020/10/30
     * @Param [param]
     * @return java.util.List<java.util.Map>
     **/
    public List<Map> getIndustryByYear(Map param) throws Exception {
        return (List<Map>) dao.findForList("QyhydfxMapper.getIndustryByYear", param);
    }
    /**
     * @Author 黄宇豪
     * @Description 获取年份
     * @Date 11:29 2020/10/30
     * @Param [param]
     * @return java.util.List<java.util.Map>
     **/
    public List<String> getMyqyYears() throws Exception {
        return (List<String>) dao.findForList("QyhydfxMapper.getMyqyYears", null);
    }
}
