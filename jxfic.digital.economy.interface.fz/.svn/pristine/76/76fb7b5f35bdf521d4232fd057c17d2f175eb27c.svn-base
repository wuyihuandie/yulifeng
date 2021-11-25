package com.zhirong.ncdata.utils;

public class RandomNumberUtil {

    /**
     * 随机密码 纯数字
     * @return
     */
    public static String randomNumber(){
        int number = (int) (Math.random() * 100000000);
        String number_str = String.valueOf(number);
        if(number_str.length() > 6){
            number_str = number_str.substring(0,6);
        }else if(number_str.length() < 6){
            do{
                number_str = "0" + number_str;
            }while (number_str.length() != 6);
        }
        return number_str;
    }
}
