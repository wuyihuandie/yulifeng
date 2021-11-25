package com.zhirong.ncdata.interceptor;

import com.google.gson.Gson;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.utils.*;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;

/**
 * @Author 黄宇豪
 * @Description mvc拦截器
 * @Date 17:46 2020/8/8
 * @Param
 * @return
 **/
public class LoginInterceptor implements HandlerInterceptor {
    @Autowired
    private RedisUtils redisUtils;
    private final long REUSE_TIME = 60L;//接口请求过期时间为60秒
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        //在这里写拦截内容
        //允许跨域,不能放在postHandle内
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Credentials", "true");
        response.addHeader("Access-Control-Max-Age", "3600");
        if (request.getMethod().equals("OPTIONS")) {
            response.addHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,TRACE,OPTIONS,PATCH");
            response.addHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");
        }
        String path = request.getServletPath();//获取请求的地址
        String nologin = Constant.SYS_NOLOGIN_URL;//以不需要登录的url
        String nologinType="1";//1 请求的url需要验证登录 2 不需要
        if(StrUtils.isNotEmpty(nologin)){//判断请求的path是否在配置的不需要验证登录的url中
            String nologins[] = nologin.split(";");
            for(String nologinUrl : nologins){
                if(path.equals(nologinUrl)){
                    nologinType="2";
                    break;
                }
            }
        }
        if(nologinType.equals("2")){//直接放行
            return true;
        }else{//验证登录
            PageData pd = new PageData(request);
            if(pd.get("token")!=null && StrUtils.isNotEmpty(pd.getString("token")) &&
                    pd.get("requestTime")!=null && StrUtils.isNotEmpty(pd.getString("requestTime")) &&
                    pd.get("sign")!=null && StrUtils.isNotEmpty(pd.getString("sign")) &&
                    pd.get("param")!=null)//验证必传参数
            {
                String token = pd.getString("token");
                String requestTime = pd.getString("requestTime");
                String sign = pd.getString("sign");
                //查询缓存中是否存在token
                boolean tokenHasKey = redisUtils.exists(token);
                if(!tokenHasKey){//若不存在token
                    HashMap map = new HashMap();
                    map.put("status","10003");
                    map.put("msg","token失效");
                    returnMsg(response,new Gson().toJson(map));//返回结果
                    return false;
                }else{
                    String signs = DigestUtils.md5Hex(token+requestTime);
                    //String signs = Constant.encodePasswordMD5(token,requestTime);
                    if(!signs.equals(sign)){
                        HashMap map = new HashMap();
                        map.put("status","10004");
                        map.put("msg","sign签名错误");
                        returnMsg(response,new Gson().toJson(map));//返回结果
                        return false;
                    }else{
                        try{
                            long times = Long.valueOf(requestTime);
                            Date date = new Date(times);
                        }catch (Exception e){
                            e.printStackTrace();
                            HashMap map = new HashMap();
                            map.put("status","10005");
                            map.put("msg","requestTime时间戳格式错误");
                            returnMsg(response,new Gson().toJson(map));//返回结果
                            return false;
                        }
                        long times = Long.valueOf(requestTime);
                        Date timeDate = new Date(times);
                        Date nowTime = new Date();
                        long interval = (nowTime.getTime()-timeDate.getTime())/1000;//相差时间 秒
                        if(interval>REUSE_TIME){
                            HashMap map = new HashMap();
                            map.put("status","10006");
                            map.put("msg","请求时间超出允许范围");
                            returnMsg(response,new Gson().toJson(map));//返回结果
                            return false;
                        }else{
                            //查询缓存中是否存在sign+请求地址
                            String keys = sign+path;
                            boolean signHasKey = redisUtils.exists(keys);
                            if(signHasKey){//存在：拿请求参数判断redis里是否存在,如果存在则是重发的调用
                                HashMap map = new HashMap();
                                map.put("status","10007");
                                map.put("msg","重复调用接口");
                                returnMsg(response,new Gson().toJson(map));//返回结果
                                return false;
                            }else{//不存在,把key为sign+请求地址 value为requestTime，放入redis中，过期时间为60秒，防止重发调用
                                redisUtils.set(keys,requestTime,REUSE_TIME, TimeUnit.SECONDS);
                                try{
                                    new ParamJsonToMap().toMap(pd.get("param").toString());
                                }catch (Exception e){
                                    e.printStackTrace();
                                    HashMap map = new HashMap();
                                    map.put("status","10008");
                                    map.put("msg","param参数json格式错误");
                                    returnMsg(response,new Gson().toJson(map));//返回结果
                                    return false;
                                }
                                return true;
                            }
                        }
                    }
                }
            }else{
                HashMap map = new HashMap();
                map.put("status","10002");
                map.put("msg","缺少必要参数");
                returnMsg(response,new Gson().toJson(map));//返回结果
                return false;
            }
        }

    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
    //拦截返回结果
    public void returnMsg (HttpServletResponse response,String msg) throws IOException {
        //设置编码格式
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        response.setStatus(401);//返回错误码给前端，判断错误类型
        PrintWriter pw = response.getWriter();
        pw.write(msg);
        pw.flush();
        pw.close();
    }
}
