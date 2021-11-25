package com.zhirong.ncdata.init;

import com.zhirong.ncdata.utils.Constant;
import com.zhirong.ncdata.utils.SecurityHelper;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import org.springframework.util.ClassUtils;
import org.springframework.web.context.ServletContextAware;

import javax.servlet.ServletContext;
import java.io.File;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 初始化系统参数
 *
 * @ClassName: DefaultXmlInit
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date 2016年6月13日 下午4:34:30
 *
 */
@Component
public class DefaultXmlInit implements InitializingBean, ServletContextAware {

	@Override
	public void setServletContext(ServletContext servletContext) {
		try {
		//	String applicationPath = servletContext.getRealPath("/");
			String applicationPath = ClassUtils.getDefaultClassLoader().getResource("").getPath();
			applicationPath=URLDecoder.decode(applicationPath, "utf-8");
			applicationPath = applicationPath
					+ "sysconfig.xml";

			SAXReader reader = new SAXReader();
			File file = new File(applicationPath);
			Document document = reader.read(file);
			Element root = document.getRootElement();

			// 获取defaultConfigs系统默认配置参数
			Element defaultConfigsElement = root.element("defaultConfigs");

			String activeConfig=defaultConfigsElement.elementText("activeConfig");

			// 设置系统默认配置
			List<Element> childElements = defaultConfigsElement.elements();
			for (Element child : childElements) {
				if(null !=activeConfig && activeConfig.equals(child.attributeValue("name"))){
					initConstant(child);
				}
			}
			// 设置系统日志配置
			Element syslogElement = root.element("syslog");
			Constant.setSYS_LOG_DATABASELOGTYPE(syslogElement.elementTextTrim("databaseLogType"));
			Constant.setSYS_LOG_LOGGRADE(syslogElement.elementTextTrim("loggrade"));
			System.out.println("^_^^_^^_^^_^^_^^_^^_^^_^^_^^_^ load sysconfig.xml success! ^_^^_^^_^^_^^_^^_^^_^^_^^_^^_^");
		} catch (Exception e) {
			System.err.print("********************** load sysconfig.xml error!!!!!! **********************");
		}

	}
	/**
	 * @Author 黄宇豪
	 * @Description 初始化参数赋值
	 * @Date 14:42 2020/8/9
	 * @Param [child]
	 * @return void
	 **/
	private void initConstant(Element child) throws Exception{
		Constant.setSYS_DFC_PROVINCESHORTCODE(child.elementTextTrim("provinceShortCode"));//区域短编码
		Constant.setSYS_DFC_PROVINCECODE(child.elementTextTrim("provinceCode"));//区域长编码
		Constant.setSYS_DFC_PROVINCECODENAME(child.elementTextTrim("provinceCodeName"));//区域名称
		Constant.setDEPARUPLOADPATH(child.elementTextTrim("deparUploadPath"));//FTP地址
		Constant.setSysLoginTime(child.elementTextTrim("loginTime"));//登录缓存时间
		Constant.setSysNologinUrl(child.elementTextTrim("noLoginUrl"));//可以不需要登录的url
		Constant.setQccAesKey(child.elementTextTrim("qccAesKey"));//企查查AES密钥
		Constant.setQccAesIv(child.elementTextTrim("qccAesIV"));//企查查AES IV
		Constant.setQccKey(child.elementTextTrim("qccKey"));//企查查公司key
		Constant.setQccSecretKey(child.elementTextTrim("qccSecretKey"));//企查查公司秘钥
		Constant.setQccUsername(child.elementTextTrim("qccUserName"));//企查查公司用户名
	}

	/**
	 *
	 * @Title: 字符串替换
	 * @Description: TODO(这里用一句话描述这个方法的作用)
	 * @param @param replace 需要替换的内容
	 * @param @param repStr 替换的内容
	 * @param @param sourStr 需要替换的字符串
	 * @param @return  参数说明
	 * @return String    返回类型
	 * @throws
	 */
	private String replaceStr(String replace,String repStr,String sourStr){
		try {
			if(null != sourStr && !sourStr.isEmpty()){
				return sourStr.replaceAll(replace, repStr);
			}
		} catch (Exception e) {
		}
		return "";
	}

	@Override
	public void afterPropertiesSet() throws Exception {

	}

}
