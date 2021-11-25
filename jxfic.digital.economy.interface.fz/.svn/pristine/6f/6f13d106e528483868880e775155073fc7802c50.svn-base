package com.zhirong.ncdata;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * @Author 黄宇豪
 * @Description 打包部署的启动类
 * @Date 16:35 2020/8/19
 * @Param 
 * @return 
 **/
public class SpringBootStartApplication extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        // 注意这里要指向原先用main方法执行的Application启动类
        //NcdataApplication为spring boot项目本身的启动类
        return builder.sources(NcdataApplication.class);
    }
}
