package com.zhirong.ncdata.utils;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StrUtils {
	public static final String DEFAULT_DELIM = ";";
	public static final String rex = "[1-2]{1}[0-9]{3}";
	public static final String reg = "^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,6})?$";
	public static boolean isEmpty(Object str) {
		if (str == null) {
			return true;
		}
		return str.toString().trim().length() == 0;
	}

	public static boolean isStrEmpty(String str) {
		if (str == null || "null".equals(str)) {
			return true;
		}
		return str.trim().length() == 0;
	}

	public static boolean isNotEmpty(String str) {
		return !isEmpty(str);
	}

	// 4位正整数验证
	public static boolean is4Number(String str) {
		boolean result = true;
		Pattern pattern = Pattern.compile(rex);
		Matcher match = pattern.matcher(str);
		if (match.matches() == false) {
			result = false;
		}
		return result;
	}

	public static boolean isBlank(String str) {
		boolean result = true;
		if (str != null) {
			for (int i = 0; i < str.length(); i++) {
				if (str.charAt(i) != ' ') {
					result = false;
					break;
				}
			}
		}
		return result;
	}

	public static boolean isNotBlank(String str) {
		return !isBlank(str);
	}

	public static String[] sliptTitle(String titles, String regex) {
		if (isNotEmpty(regex)) {
			return titles.split(regex);
		} else {
			return titles.split(",");
		}
	}

	/**
	 * 把字符串数组连接成一个字符串。 默认的连接 ；
	 * 
	 * @param list
	 * @return
	 */
	public static String join(String[] list) {
		return join(list, DEFAULT_DELIM);
	}

	/**
	 * 把字符串数组连接成一个字符串。
	 * 
	 * @param str
	 * @param delim
	 *            指定的连接
	 * @return
	 */
	public static String join(String[] str, String delim) {
		final int length = str.length;
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < length; i++) {
			buf.append(str[i]);
			if (i != length - 1) {
				buf.append(delim);
			}
		}
		return new String(buf);
	}

	public static String join(List<String> str, String delim) {
		final int length = str.size();
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < length; i++) {
			buf.append(str.get(i));
			if (i != length - 1) {
				buf.append(delim);
			}
		}
		return new String(buf);
	}

	public static String combineStringArraySql(String[] array, String delim) {
		int length = array.length - 1;
		if (delim == null) {
			delim = "";
		}
		StringBuffer result = new StringBuffer(length * 8);
		for (int i = 0; i < length; i++) {
			result.append("'");
			result.append(array[i]);
			result.append("'");
			result.append(delim);
		}
		result.append("'");
		result.append(array[length]);
		result.append("'");
		return result.toString();
	}

	public static Map<String, Object> setNullValue(Map<String, Object> map) {
		for (Map.Entry<String, Object> entry : map.entrySet()) {
			if (entry.getValue() == null) {
				map.put(entry.getKey(), "");
			}
		}
		return map;
	}

	public static List<String> removeDuplicate(List<String> list) {
		HashSet<String> h = new HashSet<String>(list);
		list.clear();
		list.addAll(h);
		return list;
	}

	public static boolean isNumeric(String str) {
		Pattern pattern = Pattern.compile(reg);
		Matcher isNum = pattern.matcher(str);
		if (!isNum.matches()) {
			return false;
		}
		return true;
	}
	//去掉null
	public static String delNull(Object obj){
		if(null == obj){
			return "";
		}
		return obj + "";
	}
	public static boolean isNotNumeric(String str) {
		return !isNumeric(str);
	}

}