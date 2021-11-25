package com.zhirong.ncdata.utils;

import java.util.UUID;

public class UuidUtil {

	/**
	 *
	* @Title: get32UUID
	* @Description: TODO(随机生成编号)
	* @param @return  参数说明
	* @return String    返回类型
	* @throws
	 */
	public static String get32UUID() {
		String uuid = UUID.randomUUID().toString().trim().replaceAll("-", "");
		return uuid;
	}

	public static void main(String[] args) {
		System.out.println(get32UUID());
	}
}

