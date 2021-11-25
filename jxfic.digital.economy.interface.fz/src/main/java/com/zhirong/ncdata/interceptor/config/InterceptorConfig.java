package com.zhirong.ncdata.interceptor.config;

import com.zhirong.ncdata.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @program: jxfic
 * @description: 拦截器配置类
 * @author:
 * @create: 2019-07-01 14:07
 **/
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    //在此处，将拦截器注册为一个 Bean,即可在拦截器中使用@Autowired
    @Bean
    public LoginInterceptor getLoginInterceptor() {
        return new LoginInterceptor();
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(getLoginInterceptor()).
                addPathPatterns("/**")/*.excludePathPatterns("/toLogin")*/;
    }
}
