package com.zhirong.ncdata.utils;

import java.io.PrintWriter;
import java.io.StringWriter;

public class GetExceptionString {
	//异常信息转化为String
	public String getExceptionText(Exception e){
		String text = "" ;
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		e.printStackTrace(pw);
		text = sw.toString();
		return text;
	}
}
