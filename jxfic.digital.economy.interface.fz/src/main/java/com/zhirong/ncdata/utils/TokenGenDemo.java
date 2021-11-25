package com.zhirong.ncdata.utils;

import com.alibaba.fastjson.JSON;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.exception.MessageException;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TokenGenDemo {
    public static final String AES_KEY = Constant.QCC_AES_KEY;//企查查AES密钥
    public static final String AES_IV = Constant.QCC_AES_IV;//企查查AES IV
    public static final String KEY = Constant.QCC_KEY;//企查查公司key
    public static final String SECRET_KEY = Constant.QCC_SECRET_KEY;//企查查公司秘钥
    public static final String USERNAME = Constant.QCC_USERNAME;//企查查公司用户名
    public static final String URL = "https://pro.qcc.com/api/yj";//企查查地址
    public static final long TOKEN_EXPIRY_SEC = 5;//token的失效秒数

    public static final String ROLE_ADMIN = "admin";
    public static final String ROLE_STAFF = "staff";

    /**
     * 生成第三方加密Token
     *
     * @param loginName
     * @return
     * @throws Exception
     */
    public static String generateToken(String loginName) throws Exception {
        return generateToken(loginName, null, null, null);
    }

    /**
     * 生成第三方加密Token
     *
     * @param loginName
     * @param role
     * @return
     * @throws Exception
     */
    public static String generateToken(String loginName, String role) throws Exception {
        return generateToken(loginName, role, null, null);
    }

    /**
     * 生成第三方加密Token
     *
     * @param loginName
     * @param role
     * @param name
     * @param email
     * @return
     * @throws Exception
     */
    public static String generateToken(String loginName, String role, String name, String email) throws Exception {
        if (StringUtils.isBlank(loginName)) {
            throw new MessageException("用户名或ID不能为空");
        }
        Map<String, String> result = new HashMap<String, String>();
        result.put("loginName", loginName);
        if (StringUtils.isBlank(name)) {
            result.put("name", loginName);
        } else {
            result.put("name", name);
        }
        if (StringUtils.isNotBlank(role)) {
            if (!(ROLE_ADMIN.equals(role) || ROLE_STAFF.equals(role))) {
                throw new MessageException("角色不正确");
            }
        } else {
            role = ROLE_STAFF;
        }
        result.put("role", role);
        result.put("email", email == null ? "" : email);
        result.put("timespan", String.valueOf(System.currentTimeMillis() / 1000));

        String content = JSON.toJSONString(result);
        return AesUtil.encrypt(content, AES_KEY, AES_IV);
    }

    /**
     * 解密Token
     *
     * @param token
     * @return
     * @throws Exception
     */
    public static Map<String, String> decryptToken(String token) throws Exception {
        String content = AesUtil.decrypt(token, AES_KEY, AES_IV);
        Map<String, String> map = JSON.parseObject(content, Map.class);
        long timespan = Long.valueOf(map.get("timespan"));
        if (TOKEN_EXPIRY_SEC > 0 && ((System.currentTimeMillis() / 1000) - timespan > TOKEN_EXPIRY_SEC)) {
            throw new MessageException("Token失效");
        }
        return map;
    }

    /**
     * 获取请求头
     * @return
     */
    public static Map getHeader(){
        String Timespan = Long.toString(System.currentTimeMillis() / 1000L);//精确到秒的Unix时间戳
        String Token = DigestUtils.md5Hex(KEY + Timespan + SECRET_KEY).toUpperCase();//验证加密值（key+Timespan+SecretKey组成的32位md5加密的大写字符串）
        Map header = new HashMap();
        header.put("Token", Token);
        header.put("Timespan", Timespan);
        return header;
    }

    public static void main(String[] args) throws Exception {
        String token = TokenGenDemo.generateToken(USERNAME);
        String a = URLDecoder.decode(token, "utf-8");
        String b = URLEncoder.encode(token, "utf-8");
        System.out.println(token);
        System.out.println(a);
        System.out.println(b);
        System.out.println(getHttpUrl(""));
        Map<String, String> map = TokenGenDemo.decryptToken(token);
        System.out.println(map);
    }

    /**
     * @param
     * @return java.lang.String
     * @throws
     * @title getHttpUrl
     * @Author Strive_Li
     * @Description 得到Url
     * @Date 2020/8/28 11:30
     */
    public static String getHttpUrl(String returnUrl) {
        String url = "https://pro-plugin.qichacha.com/plugin-login?";
        try {
            String token = TokenGenDemo.generateToken(USERNAME);//登录用户名
            token = URLEncoder.encode(token, "utf-8");
            returnUrl = URLEncoder.encode(returnUrl, "utf-8");
            url = url + "key=" + KEY + "&token=" + token + "&returnUrl=" + returnUrl;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return url;
    }

    /**
     * @return java.lang.String
     * @Author 黄宇豪
     * @Description 获取企查查企业信息
     * @Date 11:51 2020/8/31
     * @Param [returnUrl]
     **/
    public static Map getSearchWide(String keyword) {
        String url = URL + "/ECIV4/SearchWide";
        Map jsonMap = new HashMap();
        try {
            String type = "name";//查询维度，default(查询所有字段)， name(查询公司名，注册号和信用代码)，englishname(英文名) address(公司地址)， opername(法人)， econkind(公司类型)， scope(经营范围)， status(状态)， belongorg(登记机关)，featurelist(产品，特性)
            keyword = URLEncoder.encode(keyword, "utf-8");
            String param = "key=" + KEY + "&keyword=" + keyword + "&type=" + type;
            Map header = getHeader();
            String result = HttpRequest.sendGetHeader(url, param, header);//http请求
            jsonMap = new Gson().fromJson(result, new TypeToken<PageData>() {
            }.getType());//json字符串转对象
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonMap;
    }

    /**
     * @return java.lang.String
     * @Author 黄宇豪
     * @Description 获取企查查企业信息
     * @Date 11:51 2020/8/31
     * @Param [returnUrl]
     **/
    public static Map getSearchWideByDetails(String keyword, int page) {
        String url = URL + "/ECIV4/SearchWide";
        Map jsonMap = new HashMap();
        try {
            String type = "name";//查询维度，default(查询所有字段)， name(查询公司名，注册号和信用代码)，englishname(英文名) address(公司地址)， opername(法人)， econkind(公司类型)， scope(经营范围)， status(状态)， belongorg(登记机关)，featurelist(产品，特性)
            keyword = URLEncoder.encode(keyword, "utf-8");
            String param = "key=" + KEY + "&keyword=" + keyword + "&type=" + type + "&pageIndex=" + page;
            Map header = getHeader();
            String result = HttpRequest.sendGetHeader(url, param, header);//http请求
            jsonMap = new Gson().fromJson(result, new TypeToken<PageData>() {
            }.getType());//json字符串转对象
            List<Map<String, Object>> mapList = new ArrayList<>();
            if (jsonMap.get("Result") != null) {
                mapList = (List<Map<String, Object>>) jsonMap.get("Result");
            }
            for (Map<String, Object> map : mapList) {
                //社会统一信用代码
                String no = map.get("No").toString();
                //获取企业关键字精确获取详细信息
                Map getBasicDetailsByNameMap = getBasicDetailsByName(no);
                if (getBasicDetailsByNameMap.get("Result") != null) {
                    Map detailsResult = (Map) getBasicDetailsByNameMap.get("Result");
                    //注册资本
                    map.put("RegistCapi", detailsResult.get("RegistCapi") == null ? "" : detailsResult.get("RegistCapi"));
                    //企业类型
                    map.put("EconKind", detailsResult.get("EconKind") == null ? "" : detailsResult.get("EconKind"));
                    //地址
                    map.put("Address", detailsResult.get("Address") == null ? "" : detailsResult.get("Address"));
                    //组织机构代码
                    map.put("OrgNo", detailsResult.get("OrgNo") == null ? "" : detailsResult.get("OrgNo"));
                    //企业类型
                    map.put("EntType", detailsResult.get("EntType") == null ? "" : detailsResult.get("EntType"));
                    //图片
                    map.put("ImageUrl", detailsResult.get("ImageUrl") == null ? "" : detailsResult.get("ImageUrl"));
                    //是否上市(0为未上市，1为上市)
                    map.put("IsOnStock", detailsResult.get("IsOnStock") == null ? "" : detailsResult.get("IsOnStock"));

						/*//营业范围
						map.put("Scope",detailsResult.get("Scope")== null?"":detailsResult.get("Scope"));
						//地址
						map.put("Address",detailsResult.get("Address")== null?"":detailsResult.get("Address"));
						//网址
						map.put("WebSite",detailsResult.get("WebSite")== null?"":detailsResult.get("WebSite"));
						//邮箱地址
						map.put("Email",detailsResult.get("Email")== null?"":detailsResult.get("Email"));
						//图片
						map.put("ImageUrl",detailsResult.get("ImageUrl")== null?"":detailsResult.get("ImageUrl"));
						//联系电话
						map.put("ContactNo",detailsResult.get("ContactNo")== null?"":detailsResult.get("ContactNo"));*/
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonMap;
    }

    /**
     * @return java.lang.String
     * @Author yanff
     * @Description 获取企业关键字精确获取详细信息
     * @Date 11:51 2020/9/3
     * @Param No 注册号
     **/
    public static Map getBasicDetailsByName(String No) {
        String url =  URL + "/ECIV4/GetBasicDetailsByName";
        Map jsonMap = new HashMap();
        try {
            No = URLEncoder.encode(No, "utf-8");
            String param = "key=" + KEY + "&keyword=" + No;
            Map header = getHeader();
            String result = HttpRequest.sendGetHeader(url, param, header);//http请求
            jsonMap = new Gson().fromJson(result, new TypeToken<PageData>() {
            }.getType());//json字符串转对象
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonMap;
    }
    /**
     * @return java.lang.String
     * @Author hyming
     * @Description 获取企业关键字精确获取详细信息
     * @Date 11:51 2020/9/3
     * @Param No 注册号
     **/
    public static String getKeyNoByName(String No) {
        String url =  URL + "/ECIV4/SearchWide";
        Map jsonMap = new HashMap();
        Map map = new HashMap();
        List list = new ArrayList();
        String keyno = "";
        try {
            No = URLEncoder.encode(No, "utf-8");
            String param = "key=" + KEY + "&keyword=" + No;
            Map header = getHeader();
            String result = HttpRequest.sendGetHeader(url, param, header);//http请求
            jsonMap = new Gson().fromJson(result, new TypeToken<PageData>() {
            }.getType());//json字符串转对象
            if(!((List) jsonMap.get("Result")).isEmpty()){
                keyno = (String) ((Map) ((List) jsonMap.get("Result")).get(0)).get("KeyNo");
            }else{
                return "error";
            }
            System.out.println("keyno:"+keyno);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return keyno;
    }
    /**
     * @return java.lang.String
     * @Author yanff
     * @Description 获取特殊企业基本信息查询
     * @Date 11:51 2020/9/3
     * @Param No 注册号
     **/
    public static Map getDetails(String keyword) {
        String url =  URL + "/ECIOther/GetDetails";
        Map jsonMap = new HashMap();
        try {
            keyword = URLEncoder.encode(keyword, "utf-8");
            String param = "key=" + KEY + "&keyword=" + keyword;
            Map header = getHeader();
            String result = HttpRequest.sendGetHeader(url, param, header);//http请求
            jsonMap = new Gson().fromJson(result, new TypeToken<PageData>() {
            }.getType());//json字符串转对象
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonMap;
    }

    /**
     * 企查查请求接口
     * @param queryUrl 请求地址 如：/CompanyNews/SearchNews
     * @param parameter 参数 如：searchKey=北京小桔科技有限公司
     * @return
     */
    public static Map SendRequest(String queryUrl,String parameter) {
        String url =  URL + queryUrl;
        Map jsonMap = new HashMap();
        try {
            String param = "key=" + KEY + "&" +parameter;
            Map header = getHeader();
            String result = HttpRequest.sendGetHeader(url, param, header);//http请求

            jsonMap = new Gson().fromJson(result, new TypeToken<PageData>() {
            }.getType());//json字符串转对象
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonMap;
    }
}
