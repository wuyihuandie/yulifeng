package com.zhirong.ncdata.utils;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.Iterator;

/**
 * @title Json大小写转换
 * @Author LiXingJun
 * @Date 2020/6/30 16:01
 * @return
 * @throws
 */
public class JsonUtils {
    /**
     * @param args
     * @return void
     * @throws
     * @title main
     * @Author LiXingJun
     * @Description 测试
     * @Date 2020/6/30 16:09
     */
    public static void main(String[] args) {
        String json = "{'JOIN_PARTY_TIME':2010,'MEMBER_NAME':'刘小燕','ORG_ID':'c9e1d4e9479fa17bb51a5cda3702','ORG_NAME':'委网联党支部','SEX':'0','BIRTH_DATE':'1989-05-20','MEMBER_ID':'887a3dc84502b0420b1a9eaccb97','PARTY_CODE':'3607026315010101'}";
        String jsonArray = "[{'num':'成绩', '外语':88, '历史':65, '地理':99, 'object':{'AAAA':'ASCDW','BBBB':'2222','cccc':'3333'}}," +
                "{'num':'兴趣', '外语':28, '历史':45, '地理':19, 'object':{'aaa':'11a11','bbb':'2222','cccc':'3333'}}," +
                "{'num':'爱好', '外语':48, '历史':62, '地理':39, 'object':{'aaa':'11c11','bbb':'2222','cccc':'3333'}}]";

        //重新解析jsonObject中的key，转换为小写的key
        System.out.println(transToLowerObject(json));
        System.out.println(transToArray(jsonArray).toString());
    }

    /**
     * json大写转小写
     * @return JSONObject
     */
    public static JSONObject transToLowerObject(String json) {
        JSONObject jSONArray2 = new JSONObject();
        JSONObject jSONArray1 = JSONObject.fromObject(json);
        Iterator it = jSONArray1.keys();
        while (it.hasNext()) {
            String key = (String) it.next();
            Object object = jSONArray1.get(key);
            if (object.getClass().toString().endsWith("JSONObject")) {
                jSONArray2.accumulate(key.toLowerCase(), transToLowerObject(object.toString()));
            } else if (object.getClass().toString().endsWith("JSONArray")) {
                jSONArray2.accumulate(key.toLowerCase(), transToArray(jSONArray1.getJSONArray(key).toString()));
            } else {
                jSONArray2.accumulate(key.toLowerCase(), object);
            }
        }
        return jSONArray2;
    }

    /**
     * jsonArray转jsonArray
     * @return JSONArray
     */
    public static JSONArray transToArray(String jsonArray) {
        JSONArray jSONArray2 = new JSONArray();
        JSONArray jSONArray1 = JSONArray.fromObject(jsonArray);
        for (int i = 0; i < jSONArray1.size(); i++) {
            Object jArray = jSONArray1.getJSONObject(i);
            if (jArray.getClass().toString().endsWith("JSONObject")) {
                jSONArray2.add(transToLowerObject(jArray.toString()));
            } else if (jArray.getClass().toString().endsWith("JSONArray")) {
                jSONArray2.add(transToArray(jArray.toString()));
            }
        }
        return jSONArray2;
    }
}
