package com.zhirong.ncdata.service;

import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.HashMap;


@Service
public class UserService {
    @Resource(name = "daoSupport")
    private DaoSupport dao;
    /**
     * @Author 黄宇豪
     * @Description 登录验证
     * @Date 13:36 2020/8/9
     * @Param [pd]
     * @return java.util.List<com.zhirong.ncdata.common.entity.PageData>
     **/
    public PageData queryUserList(PageData pd) throws Exception {
        return  (PageData) dao.findForObject("UserMapper.queryUserList",pd);
    }
}
