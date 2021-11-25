package com.zhirong.ncdata.utils;



import com.zhirong.ncdata.common.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;


/**
 * @description: about reflect utils
 * @author: Pop
 * @create: 2019-04-23 16:31
 **/
public class ReflectUtils {

    private static final Logger logger = LoggerFactory.getLogger(ReflectUtils.class);

    private static final String _SET="set";
    private static final String _GET="get";

    public static void main(String[] args) throws NoSuchFieldException {

//        Article article = new Article();
//        setValueByMethod(article,"title","test2");
//        System.out.println(getValueByField(article,"title"));
    }

    public static Class<?> getTargetClass(Object target){return target.getClass();}
    /**
     * 通过字段设置值
     * @param target
     * @param fieldName
     * @param value
     */
    public static void setValueByField(Object target,String fieldName,Object value){
        Class<?> clazz = getTargetClass(target);
        try {
            Field field=clazz.getDeclaredField(fieldName);
            field.setAccessible(true);
            field.set(target,value);
        } catch (NoSuchFieldException e) {
            logger.warn(String.format("\"I can not find this method:%s\"",fieldName));
        } catch (IllegalAccessException e) {
            logger.warn(String.format("\"the field %s IllegalAccess or can not invocation\"",fieldName));
        }
    }
    public static Object getValueByField(Object target,String fieldName){
        Class<?> clazz = getTargetClass(target);
        try {
            Field field=clazz.getDeclaredField(fieldName);
            field.setAccessible(true);
            return field.get(target);
        } catch (NoSuchFieldException e) {
            logger.warn(String.format("\"I can not find this method:%s\"",fieldName));
        } catch (IllegalAccessException e) {
            logger.warn(String.format("\"the field %s IllegalAccess or can not invocation\"",fieldName));
        }
        logger.warn(String.format("\"I get null filed : %s\"",fieldName));
        return null;
    }
    public static Object getValueByMethod(Object target,String fieldName){
        try {
            if(StringUtils.isEmpty(fieldName)){return null;}
            Class<?> clazz = getTargetClass(target);
            Method method = clazz.getMethod(_GET+toUpperFirstStr(fieldName));
            return method.invoke(target,null);
        } catch (NoSuchMethodException e) {
            logger.warn(String.format("\"I can not find this method : %s\"",_SET+fieldName));
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.warn(String.format("\"the method %s IllegalAccess or can not invocation\"",fieldName));
        }
        logger.warn(String.format("\"I get null method : %s\"",fieldName));
        return null;
    }

    /**
     * 通过set方法设置值
     * @param target
     * @param fieldName
     * @param values
     */
    public static void setValueByMethod(Object target,String fieldName,Object... values)  {
        if(StringUtils.isEmpty(fieldName)){return ;}
        int len = values.length;
        Class<?>[] parameterTypes = new Class<?>[len];
        for(int i=0;i<len;i++ ){parameterTypes[i]=values[i].getClass();}
        try {
            Class<?> clazz = getTargetClass(target);
            Method method = clazz.getMethod(_SET+toUpperFirstStr(fieldName),parameterTypes);
            method.invoke(target,values);
        } catch (NoSuchMethodException e) {
            logger.warn(String.format("\"I can not find this method : %s\"",_SET+fieldName));
        } catch (IllegalAccessException | InvocationTargetException e) {
            logger.warn(String.format("\"the method %s IllegalAccess or can not invocation\"",fieldName));
        }

    }

    private static String toUpperFirstStr(String src){
        char[] chars = src.toCharArray();
        chars[0]-=32;
        return String.valueOf(chars);
    }
}
