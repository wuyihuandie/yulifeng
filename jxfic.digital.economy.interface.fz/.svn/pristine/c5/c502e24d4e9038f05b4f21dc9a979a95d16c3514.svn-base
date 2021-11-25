package com.zhirong.ncdata.controller;


import com.github.pagehelper.StringUtil;
import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.service.UserService;

import com.zhirong.ncdata.utils.Constant;
import com.zhirong.ncdata.utils.RedisUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;


/**
 * @Author 黄宇豪
 * @Description 登录方法
 * @Date 13:32 2020/8/9
 * @Param
 * @return
 **/
@Controller
public class UserController extends BaseController{
    @Autowired
    private UserService userService;
    @Autowired
    private RedisUtils redisUtils;
    /**
     * @Author 黄宇豪
     * @Description 项目运行时的首页
     * @Date 17:32 2020/8/8
     * @Param [request, url]
     * @return org.springframework.web.servlet.ModelAndView
     **/
    @RequestMapping("/toLogin")
    public ModelAndView toLogin(){
        ModelAndView mv = new ModelAndView("index");
        return mv;
    }
    /**
     * @Author 黄宇豪
     * @Description 登录验证
     * @Date 13:31 2020/8/9
     * @Param [request, url]
     * @return java.lang.String
     **/
    @ResponseBody
    @RequestMapping(value = "/login_login",produces = "text/html;charset=UTF-8")
    public String login_login(){
        PageData pd = this.getPageData();
        HashMap map = new HashMap();
        try {
            String pwd = "";
            if(StringUtil.isNotEmpty(pd.getString("username")) && StringUtil.isNotEmpty(pd.getString("password"))){
                pwd = Constant.encodePasswordMD5(pd.getString("username"), pd.getString("password"));
            }
            pd.put("pwd", pwd);
            PageData user = userService.queryUserList(pd);//校验登录
            if(user==null){
                map.put("status","2");//用户名或密码错误
                map.put("msg","用户名或密码错误");
            }else{
                map.put("status","1");//登录成功
                map.put("msg","登录成功");
                String token = this.get32UUID();//用户唯一标识token
                //登录信息数据插入缓存（set中的参数含义：key值，user对象，缓存存在时间（long类型），时间单位）
                redisUtils.set(token,new Gson().toJson(user),Long.valueOf(Constant.SYS_LOGIN_TIME),TimeUnit.MINUTES);
                map.put("token",token);
                map.put("user",user);
            }
        }catch (Exception e){
            e.printStackTrace();
            map.put("status","999");//系统异常
            map.put("msg","系统异常");
        }
        return new Gson().toJson(map);
    }
}
