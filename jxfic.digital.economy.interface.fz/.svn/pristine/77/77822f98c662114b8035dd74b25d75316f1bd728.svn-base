package com.zhirong.ncdata.utils;


import java.security.MessageDigest;
import java.util.List;
import java.util.Map;

/**
 * @Author 黄宇豪
 * @Description 系统启动后在DefaultXmlInit.java自动将参数加载到常量中，
 * @Date 17:11 2020/8/8
 * @Param
 * @return
 **/
public class Constant
{

	/***************** 系统配置常量设置 *****************/
	public static String SYS_DFC_PROVINCESHORTCODE = "";//区域短编码
	public static String SYS_DFC_PROVINCECODE = "";//区域长编码
	public static String SYS_DFC_PROVINCECODENAME = "";//区域名称
	public static String DEPARUPLOADPATH = "";//FTP地址
	public static String SYS_LOG_LOGGRADE = "";//日志拦截配置
	public static String SYS_LOG_DATABASELOGTYPE = "";//日志拦截配置
	public static String SYS_LOGIN_TIME = "";//登录缓存时长
	public static String SYS_NOLOGIN_URL = "";//可以不需要登录的url
	public static String DATASOURCE = "mysql";//数据源
	public static String QCC_AES_KEY = "";//企查查AES密钥
	public static String QCC_AES_IV = "";//企查查AES IV
	public static String QCC_KEY = "";//企查查公司key
	public static String QCC_SECRET_KEY = "";//企查查公司秘钥
	public static String QCC_USERNAME = "";//企查查公司用户名

	public static String getSysLoginTime() {
		return SYS_LOGIN_TIME;
	}

	public static void setSysLoginTime(String sysLoginTime) {
		SYS_LOGIN_TIME = sysLoginTime;
	}

	public static String getSysNologinUrl() {
		return SYS_NOLOGIN_URL;
	}

	public static void setSysNologinUrl(String sysNologinUrl) {
		SYS_NOLOGIN_URL = sysNologinUrl;
	}

	public static String getSYS_DFC_PROVINCESHORTCODE() {
		return SYS_DFC_PROVINCESHORTCODE;
	}

	public static void setSYS_DFC_PROVINCESHORTCODE(String SYS_DFC_PROVINCESHORTCODE) {
		SYS_DFC_PROVINCESHORTCODE = SYS_DFC_PROVINCESHORTCODE;
	}

	public static String getSYS_DFC_PROVINCECODE() {
		return SYS_DFC_PROVINCECODE;
	}

	public static void setSYS_DFC_PROVINCECODE(String SYS_DFC_PROVINCECODE) {
		SYS_DFC_PROVINCECODE = SYS_DFC_PROVINCECODE;
	}

	public static String getSYS_DFC_PROVINCECODENAME() {
		return SYS_DFC_PROVINCECODENAME;
	}

	public static void setSYS_DFC_PROVINCECODENAME(String SYS_DFC_PROVINCECODENAME) {
		SYS_DFC_PROVINCECODENAME = SYS_DFC_PROVINCECODENAME;
	}

	public static String getDEPARUPLOADPATH() {
		return DEPARUPLOADPATH;
	}

	public static void setDEPARUPLOADPATH(String DEPARUPLOADPATH) {
		Constant.DEPARUPLOADPATH = DEPARUPLOADPATH;
	}
	public static String getSYS_LOG_LOGGRADE()
	{
		return SYS_LOG_LOGGRADE;
	}

	public static void setSYS_LOG_LOGGRADE(String sYS_LOG_LOGGRADE)
	{
		SYS_LOG_LOGGRADE = sYS_LOG_LOGGRADE;
	}

	public static String getSYS_LOG_DATABASELOGTYPE()
	{
		return SYS_LOG_DATABASELOGTYPE;
	}

	public static void setSYS_LOG_DATABASELOGTYPE(String sYS_LOG_DATABASELOGTYPE)
	{
		SYS_LOG_DATABASELOGTYPE = sYS_LOG_DATABASELOGTYPE;
	}
	public static String getDATASOURCE() {
		return DATASOURCE;
	}

	public static void setDATASOURCE(String DATASOURCE) {
		Constant.DATASOURCE = DATASOURCE;
	}

	public static String getQccAesKey() {
		return QCC_AES_KEY;
	}

	public static void setQccAesKey(String qccAesKey) {
		QCC_AES_KEY = qccAesKey;
	}

	public static String getQccAesIv() {
		return QCC_AES_IV;
	}

	public static void setQccAesIv(String qccAesIv) {
		QCC_AES_IV = qccAesIv;
	}

	public static String getQccKey() {
		return QCC_KEY;
	}

	public static void setQccKey(String qccKey) {
		QCC_KEY = qccKey;
	}

	public static String getQccSecretKey() {
		return QCC_SECRET_KEY;
	}

	public static void setQccSecretKey(String qccSecretKey) {
		QCC_SECRET_KEY = qccSecretKey;
	}

	public static String getQccUsername() {
		return QCC_USERNAME;
	}

	public static void setQccUsername(String qccUsername) {
		QCC_USERNAME = qccUsername;
	}

	public final static String encodePasswordMD5(String username, String password)
	{
		char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };
		try
		{
			byte[] btInput = password.getBytes();
			// 获得MD5摘要算法的 MessageDigest 对象
			MessageDigest mdInst = MessageDigest.getInstance("MD5");
			// 使用指定的字节更新摘要
			mdInst.update(btInput);
			// 获得密文
			byte[] md = mdInst.digest(username.getBytes());
			// 把密文转换成十六进制的字符串形式
			int j = md.length;
			char str[] = new char[j * 2];
			int k = 0;
			for (int i = 0; i < j; i++)
			{
				byte byte0 = md[i];
				str[k++] = hexDigits[byte0 >>> 4 & 0xf];
				str[k++] = hexDigits[byte0 & 0xf];
			}
			return new String(str);
		}
		catch (Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}

}
