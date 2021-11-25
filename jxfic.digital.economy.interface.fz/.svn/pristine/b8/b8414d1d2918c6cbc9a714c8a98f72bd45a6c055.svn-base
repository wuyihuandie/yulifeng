package com.zhirong.ncdata.utils;

import com.alibaba.fastjson.JSONObject;
import com.zhirong.ncdata.common.entity.PageData;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/****************************
 *
 *@author Xcc😊
 *@className: RequestLink
 *@createTime: 2019年12月25日 15:27 
 *@description 请求接口获取数据
 *
 *****************************/
public class RequestLink {


    /**
     *
     * @Author Xiechangchun😊
     * @Date 2019/12/25 15:28
     * @param url 请求地址
     * @param parameters 请求参数
     * @param Method 请求方式
     * @param args 参数名称
     * @return : null
     */
    public static Map<String, Object> sendConnectByPdToMap10(String url, PageData parameters, String Method, Object... args){
        StringBuffer sb = new StringBuffer();
        String result="";
        sb.append(url);
        Map<String, Object> list = new HashMap<>();
        try {
            Map<String, String> map = parameters;
            // 设置参数
            for (int i = 0; i < args.length; i++) {
                if (args[i] != null){
                    if(url.indexOf("?") == -1){
                        sb.append("?").append(args[i]).append("=").append(parameters.get(args[i]));
                    }else{
                        sb.append("&").append(args[i]).append("=").append(parameters.get(args[i]));
                    }
                }
            }
            HttpClient client = HttpClientBuilder.create().build();
            //发送get请求
            HttpGet request = new HttpGet(sb+"");
            request.setHeader("referer","http://link.qichacha.com");
            HttpResponse response = client.execute(request);
            /**请求发送成功，并得到响应**/
            if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                /**读取服务器返回过来的json字符串数据**/
                result = EntityUtils.toString(response.getEntity());
                list = JSONObject.parseObject(result);
//                System.out.println("请求返回对的data："+list);
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        if(result == "" || result == null ){
            result = "暂无数据";
            list = JSONObject.parseObject(result);
//            System.out.println("请求返回对的data："+list);
        }
        return list;
    }
}
