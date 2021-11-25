package com.example.demo.init;

import com.example.demo.controller.xx;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

@Component
public class testInit implements InitializingBean {
    @Override
    public void afterPropertiesSet() throws Exception {
        xx.a="我草无情";
    }
}
