package com.zhirong.ncdata;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;
import java.util.UUID;
/**
 * @Author 黄宇豪
 * @Description 启动类
 * @Date 16:35 2020/8/19
 * @Param 
 * @return 
 **/
@ServletComponentScan
@SpringBootApplication
@MapperScan({"com.zhirong.ncdata.mapper", "com.zhirong.ncdata.modules.*.*.dao", "com.zhirong.ncdata.modules.*.dao"})
@EnableScheduling
//@EnableCaching
@Controller
public class NcdataApplication {

	public static void main(String[] args) {
		SpringApplication.run(NcdataApplication.class, args);
	}

}
