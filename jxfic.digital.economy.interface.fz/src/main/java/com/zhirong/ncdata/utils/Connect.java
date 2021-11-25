package com.zhirong.ncdata.utils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.Map;

public class Connect {

    public static Map<String, Object> sendConnectByPdToMap(String url, Map parameters,String Method){
        String result="";

        if(Method.toUpperCase().equals("POST")){
            result= sendPost(url, parameters);
        }else if(Method.toUpperCase().equals("GET")){
            result= sendGet(url, parameters);
        }
        Gson gson= new Gson();
        Map<String, Object> list = gson.fromJson(result,new TypeToken<Map<String,Object>>(){}.getType());
        return list;
    }

    public static String sendGet(String url, Map<String, String> parameters) {
        String content = "";
        StringBuffer sb = new StringBuffer();
        String params = "";

        try {
            if (parameters != null && parameters.size() > 0) {
                String name;
                Iterator var6;
                if (parameters.size() == 1) {
                    var6 = parameters.keySet().iterator();

                    while(var6.hasNext()) {
                        name = (String)var6.next();
                        sb.append(name).append("=").append(URLEncoder.encode(parameters.get(name) == null ? "" : (String)parameters.get(name), "UTF-8"));
                    }

                    params = sb.toString();
                } else {
                    var6 = parameters.keySet().iterator();

                    while(var6.hasNext()) {
                        name = (String)var6.next();
                        sb.append(name).append("=").append(URLEncoder.encode(parameters.get(name) == null ? "" : (String)parameters.get(name), "UTF-8")).append("&");
                    }

                    name = sb.toString();
                    params = name.substring(0, name.length() - 1);
                }
            }

            Document html = Jsoup.connect(url + "?" + params).timeout(30000).get();
            content = html.text();
            return content;
        } catch (Exception e) {
            e.printStackTrace();
            return "ss";
        }
    }

    public static String sendPost(String url, Map<String, String> parameters) {
        String result = "";
        BufferedReader in = null;
        PrintWriter out = null;
        StringBuffer sb = new StringBuffer();
        String params = "";

        try {
            if (parameters != null && parameters.size() > 0) {
                String temp_params;
                Iterator var8;
                if (parameters.size() == 1) {
                    var8 = parameters.keySet().iterator();

                    while(var8.hasNext()) {
                        temp_params = (String)var8.next();
                        sb.append(temp_params).append("=").append(URLEncoder.encode(parameters.get(temp_params) == null ? "" : (String)parameters.get(temp_params), "UTF-8"));
                    }

                    params = sb.toString();
                } else {
                    var8 = parameters.keySet().iterator();

                    while(var8.hasNext()) {
                        temp_params = (String)var8.next();
                        sb.append(temp_params).append("=").append(URLEncoder.encode(parameters.get(temp_params) == null ? "" : (String)parameters.get(temp_params), "UTF-8")).append("&");
                    }

                    temp_params = sb.toString();
                    params = temp_params.substring(0, temp_params.length() - 1);
                }
            }

            URL connURL = new URL(url);
            HttpURLConnection httpConn = (HttpURLConnection)connURL.openConnection();
            httpConn.setRequestProperty("Accept", "*/*");
            httpConn.setRequestProperty("Connection", "Keep-Alive");
            httpConn.setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android 4.4.2; ZTE STAR Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile MQQBrowser/6.8 TBS/036887 Safari/537.36 MicroMessenger/6.3.18.800 NetType/WIFI Language/zh_CN");
            httpConn.setRequestMethod("POST");
            httpConn.setDoInput(true);
            httpConn.setDoOutput(true);
            httpConn.setUseCaches(false);
            out = new PrintWriter(httpConn.getOutputStream());
            out.write(params);
            out.flush();

            String line;
            for(in = new BufferedReader(new InputStreamReader(httpConn.getInputStream(), "UTF-8")); (line = in.readLine()) != null; result = result + line) {
                ;
            }
        } catch (Exception var18) {
            var18.printStackTrace();
        } finally {
            try {
                if (out != null) {
                    out.close();
                }

                if (in != null) {
                    in.close();
                }
            } catch (IOException var17) {
                var17.printStackTrace();
            }

        }

        return result;
    }
}
