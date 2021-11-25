package com.zhirong.ncdata.controller.demo;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.Page;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.controller.BaseController;
import com.zhirong.ncdata.service.demo.ItemManageService;
import com.zhirong.ncdata.utils.ParamJsonToMap;
import com.zhirong.ncdata.utils.RedisUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @Author 黄宇豪
 * @Description demo方法
 * @Date 17:33 2020/8/8
 * @Param
 * @return
 **/
@Controller
@RequestMapping(value = "/itemManageController")
public class ItemManageController extends BaseController {

    @Autowired
    private ItemManageService itemManageService;
    @Autowired
    private RedisUtils redisUtils;
    /**
     * @Author 黄宇豪
     * @Description 分页查询demo
     * @Date 17:11 2020/8/9
     * @Param []
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/itemListJson",produces = "text/html;charset=UTF-8")
    public /*LayuiResult*/String itemListJson(){
        Page page = this.getPage();
        PageData pd = new ParamJsonToMap().toMap(page.getPageData().getString("param"));//参数封装在param中
        PageHelper.startPage(page.getPage(), page.getLimit());//分页
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        try {
            list = itemManageService.queryItemList(pd);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        PageInfo pageinfo = new PageInfo(list);
        page.setCount(pageinfo.getTotal());
        page.setList(list);
        map.put("data",page);
        //return new LayuiResult(page);//layui返回表格数据
        return new Gson().toJson(map);
    }
    /**
     * @Author 黄宇豪
     * @Description 不分页的查询demo
     * @Date 17:11 2020/8/9
     * @Param []
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/testJson",produces = "text/html;charset=UTF-8")
    public String testJson(){
        PageData pd = new ParamJsonToMap().toMap(this.getPageData().getString("param"));//参数封装在param中
        List<PageData> list = new ArrayList<PageData>();
        HashMap map = new HashMap();
        map.put("status","10001");
        map.put("msg","接口调用成功");
        //根据token 从redis获取用户信息数据
        PageData user = new ParamJsonToMap().toMap(redisUtils.get(this.getPageData().getString("token")).toString());
        try {
            list = itemManageService.queryItemList(pd);
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");
            map.put("msg","接口异常");
        }
        map.put("data",list);
        return new Gson().toJson(map);
    }

}
