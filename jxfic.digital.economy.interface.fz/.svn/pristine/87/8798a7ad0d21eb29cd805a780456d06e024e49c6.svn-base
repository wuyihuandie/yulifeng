package com.zhirong.ncdata.utils;


import net.sf.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Map;

public class GetLatAndLngByBaidu {

    private static  int count =0;
    private static  int preciseCount =0;

    public int getCount(){
        return count;
    }
    public int getPreciseCount(){
        return preciseCount;
    }
    public static Map getLngAndLat(String address){
        Map map=new HashMap();
        String url = "http://api.map.baidu.com/geocoder/v2/?address="+address+"&output=json&ak=dMXFXXryI9tgBWItDQ4TT22fClO8ic2y";
        try {
            String json = loadJSON(url);
            JSONObject obj = JSONObject.fromObject(json);
            if(obj.get("status").toString().equals("0")){
                double lng=obj.getJSONObject("result").getJSONObject("location").getDouble("lng");
                double lat=obj.getJSONObject("result").getJSONObject("location").getDouble("lat");
                int precise=obj.getJSONObject("result").getInt("precise");
                int comprehension=obj.getJSONObject("result").getInt("comprehension");
                if(precise==0){
                    preciseCount++;
                }else if(precise==1&&comprehension<90){
                    preciseCount++;
                }


                map.put("precise", precise);
                map.put("comprehension", comprehension);
                map.put("lng", getDecimal(lng));
                map.put("lat", getDecimal(lat));
                count++;

            }else{
               // LogUtil.debug("未找到相匹配的经纬度！");
                System.out.println("未找到相匹配的经纬度！");
            }
        }catch (Exception e){
           // LogUtil.error("未找到相匹配的经纬度，请检查地址");
            System.out.println("未找到相匹配的经纬度！");
        }
        return map;
    }
    public static double getDecimal(double num) {
        if (Double.isNaN(num)) {
            return 0;
        }
        BigDecimal bd = new BigDecimal(num);
        num = bd.setScale(6, BigDecimal.ROUND_HALF_UP).doubleValue();
        return num;
    }

    public static String loadJSON (String url) {
        StringBuilder json = new StringBuilder();
        try {
            URL oracle = new URL(url);
            URLConnection yc = oracle.openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(
                    yc.getInputStream(),"UTF-8"));
            String inputLine = null;
            while ( (inputLine = in.readLine()) != null) {
                json.append(inputLine);
            }
            in.close();
        } catch (MalformedURLException e) {
        } catch (IOException e) {
        }
        return json.toString();
    }
}
