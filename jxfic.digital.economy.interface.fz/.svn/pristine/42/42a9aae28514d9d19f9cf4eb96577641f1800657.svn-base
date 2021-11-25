package com.zhirong.ncdata.utils;

import java.io.BufferedReader;
import java.io.Reader;
import java.sql.Clob;

public class ClobUtil {
    public static String ClobToString(Clob clob){
        try {
            String reString = "";
            Reader is = clob.getCharacterStream();// 得到流
            BufferedReader br = new BufferedReader(is);
            String s = br.readLine();
            StringBuffer sb = new StringBuffer();
            while (s != null) {// 执行循环将字符串全部取出付值给StringBuffer由StringBuffer转成STRING
                sb.append(s);
                s = br.readLine();
            }
            reString = sb.toString();
            return reString;
        } catch (Exception e) {
            return null;
        }

    }

    public static String stripHtml(String content) {
        // <p>段落替换为换行
        content = content.replaceAll("<p .*?>", "");
        // <br><br/>替换为换行
        content = content.replaceAll("<br\\s*/?>", "");
        // 去掉其它的<>之间的东西
        content = content.replaceAll("\\<.*?>", "");
        // 去掉空格
        content = content.replaceAll("&nbsp;", "");
        // 还原HTML
        // content = HTMLDecoder.decode(content);
        return content;
    }
    public static String ToHtml(String content2) {
        // 去掉空格
        content2 = content2.replaceAll("&nbsp;", "<br/>");
        // 还原HTML
        return content2;
    }
}
