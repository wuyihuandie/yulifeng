package com.zhirong.ncdata.utils.echars;

import java.io.Serializable;

/**
 * @author Pop
 * @date 2019/5/8 22:06
 */
public enum  SeriesType implements Serializable {

    BAR("bar");

    private String describe;
    SeriesType(String describe) {
        this.describe = describe;
    }

    @Override
    public String toString() {
        return  describe ;
    }}
