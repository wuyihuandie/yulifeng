package com.zhirong.ncdata.utils;

/**
 * @program: jxfic.wwww
 * @description: 给章炎开发的单位转换类
 * @author: 范凌轩
 * @create: 2019-07-15 17:14
 **/
public class NumberUtils {

    // 1000,000,000;
    private static final String WAN = "万";
    private static final String YI = "亿";
    private static final String POINT = ".";
    public static String format(Integer src){
        return format(String.valueOf(src));
    }
    public static String format(String src){
        int len = src.length();
        StringBuilder result = new StringBuilder();
        if(len>=9){

            String pre = src.substring(0,len-8);
            String savePoint=src.substring(len-8,len-6);
            result.append(pre).append(POINT).append(savePoint).append(YI);
        }else if(len>4){

            String pre = src.substring(0,len-4);
            String savePoint=src.substring(len-4,len-2);
            result.append(pre).append(POINT).append(savePoint).append(WAN);
        }else {
            result.append(src);
        }
        return result.toString();
    }

    public static void main(String[] args) {
        System.out.println(format("10000000000"));
        System.out.println(format(10000));
    }
}
