package com.zhirong.ncdata.utils.echars;

import lombok.Data;

import java.io.Serializable;

/**
 * @author Pop
 * @date 2019/5/8 21:19
 */
@Data
public class EChartsBase implements Serializable {
    protected String name;
    protected String type;
    protected String[] data;
}
