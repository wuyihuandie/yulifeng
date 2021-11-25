package com.zhirong.ncdata.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/**
 * 该类可以从浏览器请求中提取出cookies并进行对cookis的相关操作
 * @author Administrator
 *
 */
public class CookiesUtil {

    /**
     * 根据名字获取cookie
     *
     * @param cookie cookie对象
     * @return
     */
    public static String getValueByCookie(Cookie cookie){
        String value = "";
        if(null != cookie){
            try {
                value = URLDecoder.decode(new DesCrypt().decrypt(cookie.getValue()),"utf-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return value;
    }

    /**
     * 根据名字获取cookie
     *
     * @param request
     * @param name cookie名字
     * @return
     */
    public static String getValueByName(HttpServletRequest request, String name){
        String value = "";
        Cookie cookie = getCookieByName(request, name);
        if(null != cookie){
            try {
                value = URLDecoder.decode(new DesCrypt().decrypt(cookie.getValue()),"utf-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return value;
    }

    /**
     * 根据名字获取cookie
     *
     * @param request
     * @param name cookie名字
     * @return
     */
    public static Cookie getCookieByName(HttpServletRequest request, String name) {
        Map<String, Cookie> cookieMap = ReadCookieMap(request);
        if (cookieMap.containsKey(name)) {
            Cookie cookie = (Cookie) cookieMap.get(name);
            return cookie;
        } else {
            return null;
        }
    }

    /**
     * 将cookie封装到Map里面
     * @param request
     * @return
     */
    private static Map<String, Cookie> ReadCookieMap(HttpServletRequest request) {
        Map<String, Cookie> cookieMap = new HashMap<String, Cookie>();
        Cookie[] cookies = request.getCookies();
        if (null != cookies) {
            for (Cookie cookie : cookies) {
                cookieMap.put(cookie.getName(), cookie);
            }
        }
        return cookieMap;
    }

    /**
     * 保存Cookies
     * @param response servlet请求
     * @param value 保存值
     */
    public static HttpServletResponse setCookie(HttpServletResponse response, String name, String value, int time) throws Exception {
        // 如果cookie的值中含有中文时，需要对cookie进行编码，不然会产生乱码
        try {
            value = URLEncoder.encode(value, "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        DesCrypt desc = new DesCrypt();
        // new一个Cookie对象,键值对为参数
        Cookie cookie = new Cookie(name, desc.encrypt(value));
        // tomcat下多应用共享
        cookie.setPath("/");
//        cookie.setDomain("192.168.12.101");
        //cookie.setDomain("192.168.1.116");
//        cookie.setDomain("127.0.0.1");
        cookie.setDomain("10.2.75.226");
//        cookie.setDomain("127.0.0.1");
//        cookie.setDomain("59.55.120.97");
        //cookie.setDomain("192.168.10.147");
        cookie.setMaxAge(time);
        // 将Cookie添加到Response中,使之生效
        response.addCookie(cookie); // addCookie后，如果已经存在相同名字的cookie，则最新的覆盖旧的cookie
        return response;
    }

    /**
     * <p>删除无效cookie</p>
     * <p>无效☞1.过时 2.未发布</p>
     * @param request
     * @param response
     * @param deleteKey
     * @param response
     * @param request
     */
    @SuppressWarnings("unused")
    public static void delectCookieByName(HttpServletRequest request, HttpServletResponse response, String deleteKey) throws NullPointerException {
        Map<String, Cookie> cookieMap = ReadCookieMap(request);
        for (String key : cookieMap.keySet()) {
            if(key==deleteKey || key.equals(deleteKey)) {
                Cookie cookie = cookieMap.get(key);
                cookie.setMaxAge(0);//设置cookie有效时间为0
                cookie.setPath("/");//不设置存储路径
                response.addCookie(cookie);
            }
        }
    }



    /**
     *
     * @param response HttpServletResponse类型的响应
     * @param cookie 要设置httpOnly的cookie对象
     */
    public static void addHttpOnlyCookie(HttpServletResponse response,
                                         Cookie cookie) {
        // 判断对象是否存在null的情况
        if (checkObjIsNull(response) || checkObjIsNull(cookie)) {
            return;
        }

        //依次取得cookie中的名称、值、最大生存时间、路径、域和是否为安全协议信息
        String cookieName = cookie.getName();
        String cookieValue = cookie.getValue();
        int maxAge = cookie.getMaxAge();
        String path = cookie.getPath();
        String domain = cookie.getDomain();
        boolean isSecure = cookie.getSecure();

        StringBuffer strBufferCookie = new StringBuffer();
        strBufferCookie.append(cookieName + "=" + cookieValue + ";");

        if (maxAge >= 0) {
            strBufferCookie.append("Max-Age=" + maxAge + ";");
        } else {
            strBufferCookie.append("Max-Age=25;");
        }

        if (!checkObjIsNull(domain)) {
            strBufferCookie.append("domain=" + domain + ";");
        }

        if (!checkObjIsNull(path)) {
            strBufferCookie.append("path=" + path + ";");
        }

        if (isSecure) {
            strBufferCookie.append("HttpOnly;Secure;");
        } else {
            strBufferCookie.append("HttpOnly;");
        }

        response.addHeader("Set-Cookie", strBufferCookie.toString());
    }

    private static boolean checkObjIsNull(Object obj) {
        if (obj == null) {
            return true;
        }
        return false;
    }

}
