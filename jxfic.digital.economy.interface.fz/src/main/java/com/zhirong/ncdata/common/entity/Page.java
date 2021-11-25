package com.zhirong.ncdata.common.entity;

import com.zhirong.ncdata.utils.ParamJsonToMap;
import com.zhirong.ncdata.utils.StrUtils;
import lombok.Data;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @Author 黄宇豪
 * @Description 分页插件
 * @Date 16:59 2020/8/8
 * @Param
 * @return
 **/
@Data
public class Page<T> {
    private Long count;  // 总数
    private List<T> list;  // 数据
    private Integer page;  // 当前页面
    private Integer limit;  // 每页数据条数
    PageData map = null;
    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public PageData getPageData() {
        return map;
    }

    public void setPageData(PageData map) {
        this.map = map;
    }

    public Page(HttpServletRequest request) {
        PageData pd = new PageData(request);
        PageData newpd = new ParamJsonToMap().toMap(pd.getString("param"));//参数封装在param中
        if(newpd.get("page")!=null && StrUtils.isNotEmpty(newpd.getString("page"))){
            page = Integer.valueOf(newpd.get("page").toString());
        }else {
            page=1;
        }
        if(newpd.get("limit")!=null && StrUtils.isNotEmpty(newpd.getString("limit"))){
            limit = Integer.valueOf(newpd.get("limit").toString());
        }else{
            limit =10;
        }

        map = pd;
    }
}
