package com.zhirong.ncdata.utils;

import com.github.pagehelper.PageInfo;

import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;

public class Verification {

    private static final String STATUS = "status";
    private static final String TOKEN = "token";
    private static final String KEYNO = "KeyNo";
    private static final String DEVICEID = "deviceId";
    private static final String VERSION = "version";
    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";

    public static void EncodesearchKey(Map pd, String Encode){
        pd.put("searchKey", pd.get(Encode)==null? "":pd.get(Encode));
        pd.remove(Encode);
        pd.put(DEVICEID,"123");
        pd.put(TOKEN,md5(pd.get(KEYNO)+""+pd.get(DEVICEID)));
    }

    public static Map setPageParameter2(Map pd){
        try {
            pd.put("pageSize", pd.get("showCount")==null ? "10" : pd.get("showCount"));
            pd.put("pageIndex", pd.get("currentPage")==null ? "1" : pd.get("currentPage"));
        } catch (Exception e) {}
        return pd;

    }
    public static void DecodesearchKey(Map pd,String Decode){
        if(!Decode.trim().equals("")){
            pd.put(Decode, pd.get("searchKey")+"");
        }
        pd.remove("searchKey");
        pd.remove(DEVICEID);
        pd.remove(TOKEN);
    }
    public static Boolean StatusIsSuccess(Map<String,Object> map){
        if(null==map || map.isEmpty()){
            return false;
        }else{
            //if("调用成功".equals(map.get(STATUS))){
            if("1".equals(map.get(STATUS))){
                return true;
            }else{
                return false;
            }
        }
    }

    public static final String ENCODEING_TRYPE ="UTF-8";
    public final static String md5(String s) {
        try {

            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            byte[] btInput = s.getBytes(ENCODEING_TRYPE);
            mdInst.update(btInput);
            byte[] md = mdInst.digest();
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < md.length; i++) {
                int val = ((int) md[i]) & 0xff;
                if (val < 16)
                    sb.append("0");
                sb.append(Integer.toHexString(val));

            }
            return sb.toString();
        } catch (Exception e) {
            return null;
        }
    }
    public static PageInfo getPage(Map<String,Object> dataMap){
        Map<String,Object> Paging=(Map<String, Object>)dataMap.get("Paging");

        /*Page page=new Page();
        page.setShowCount(Integer.parseInt(Paging.get("ShowCount").toString()));
        page.setCurrentPage(Integer.parseInt(Paging.get("CurrentPage").toString()));
        page.setCurrentResult(Integer.parseInt(Paging.get("CurrentResult").toString()));
        page.setTotalPage(Integer.parseInt(Paging.get("TotalPage").toString()));
        page.setTotalResult(Integer.parseInt(Paging.get("TotalResult").toString()))*/

        PageInfo page=new PageInfo();
        page.setPageSize(Integer.parseInt(Paging.get("ShowCount").toString()));
        page.setPageNum(Integer.parseInt(Paging.get("CurrentPage").toString()));
        //page.setSize(Integer.parseInt(Paging.get("CurrentResult").toString()));
        page.setPages(Integer.parseInt(Paging.get("TotalPage").toString()));
        page.setTotal(Integer.parseInt(Paging.get("TotalResult").toString()));
        return page;

    }
    public static Map<String,Object> Success(){
        Map<String,Object> map =new HashMap<String,Object>();
        map.put("status", "1");
        map.put("version", "v1.0");
        map.put("message", "success");
        return map;

    }


    /*
     * 错误信息条件判断
     */
    public static Map<String,Object> ResultMessage(int status){
        Map<String,Object> map =new HashMap<String,Object>();
        switch(status){
            case(0):
                map.put("status", "0");
                map.put("version", "v1.0");
                map.put("message", "参数错误！");
                break;

            case(1):
                map.put("status", "1");
                map.put("version", "v1.0");
                map.put("message", "success");
                break;

            case(2):
                map.put("status", "2");
                map.put("version", "v1.0");
                map.put("message", "用户ID未知");
                break;

            case(3):
                map.put("status", "3");
                map.put("version", "v1.0");
                map.put("message", "原始密码错误");
                break;
            case(4):
                map.put("status", "4");
                map.put("version", "v1.0");
                map.put("message", "该邮箱已注册");
                break;
            case(5):
                map.put("status", "5");
                map.put("version", "v1.0");
                map.put("message", "密码错误");
                break;
            case(6):
                map.put("status", "6");
                map.put("version", "v1.0");
                map.put("message", "用户不存在");
                break;
            case(7):
                map.put("status", "7");
                map.put("version", "v1.0");
                map.put("message", "激活失败！您的激活地址有误");
                break;
            case(8):
                map.put("status", "8");
                map.put("version", "v1.0");
                map.put("message", "验证码过期");
                break;
            case(9):
                map.put("status", "9");
                map.put("version", "v1.0");
                map.put("message", "验证码错误");
                break;
            case(10):
                map.put("status", "10");
                map.put("version", "v1.0");
                map.put("message", "到底了");
                break;
        }
        return map;
    }

}
