package com.zhirong.ncdata.utils.echars;

import com.google.gson.annotations.Expose;
import com.zhirong.ncdata.utils.ReflectUtils;
import lombok.Data;
import org.apache.shiro.crypto.hash.Hash;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Pop
 * @date 2019/5/8 20:35
 */
@Data
public class ECharts<T>  {

    private String[] color;
    private Tooltip tooltip;
    private Legend legend;
    private Grid grid;
    private XAxis[] xAxis;
    private YAxis[] yAxis;
    private Series[] series;

    private ECharts(){
        tooltip = new Tooltip();
        grid = new Grid();
        yAxis = new YAxis[]{new YAxis()};
    }

    public static ECharts getInstance(){
        return new ECharts();
    }

    @Expose(serialize = false)
    private transient SeriesType seriesType;

    /**
     * 设计需要echars表格类型，这是一个必填项
     * @param type
     * @return
     */
    public ECharts setSeriesType(SeriesType type){
        this.seriesType = type;
        // todo 策略初始化各个图表
        return this;
    }

    /**
     * 设置X轴的数值
     * @param data
     * @return
     */
    public ECharts setXAxisData(List<String> data){
        this.setXAxisData((String[]) data.toArray());
        return this;
    }
    public ECharts setXAxisData(String[] data){
        List<XAxis> xAxes = new ArrayList<XAxis>();
        XAxis[] xAxes1 = new XAxis[]{};
        XAxis axes = new XAxis();
        axes.setData(data);
        xAxes.add(axes);
        this.xAxis = xAxes.toArray(xAxes1);
        return this;
    }


    /**
     * SeriesData的数据配置
     * mapper 的key是 对象的字段，value是值
     * @param data
     * @param mapper
     * @return
     *
     * User
     *      year height money
     *        10   20    30
     *        20    10   25
     *        41    29    14
     */
    public ECharts setSeriesData(List<T> data,SeriesMapper mapper){
        this.series = parseSeries(data,mapper);
        return this;
    }

    private Series[] parseSeries(List<T> data,SeriesMapper mapper){
        return createSeries(data,mapper.mapRow(new HashMap<String,String>()));
    }
    private Series[] createSeries(List<T> data,Map<String,String> map){
        Series[] series = new Series[map.size()];
        //映射了多少字段，初始化多少in
        int count =0;
        if(data.isEmpty()&&data.size()==0){ return series;}
        if(data.get(0) instanceof Map){
            for(Map.Entry<String,String> entry:map.entrySet()){
                Series ser = new Series();
                ser.setName(entry.getValue());
                ser.setType(seriesType.toString());
                ser.setData(parseMap(data,entry.getKey()));
                series[count] = ser;
                count++;
            }
        }else {
            for(Map.Entry<String,String> entry:map.entrySet()){
                Series ser = new Series();
                ser.setName(entry.getValue());
                ser.setType(seriesType.toString());
                ser.setData(parse(data,entry.getKey()));
                series[count] = ser;
                count++;
            }
        }
        return series;
    }

    private String[] parseMap(List<T> data,String key){
        int len = data.size();
        String[] datas = new String[len];
        List<Map> datat = (List<Map>) data;
        int count = 0;
        for(Map map : datat){
            if(!map.containsKey(key)){continue;}
            datas[count] = String.valueOf(map.get(key));
            count++;
        }
        return datas;
    }

    private String[] parse(List<T> data,String key){
        int len = data.size();
        String[] datas = new String[len];
        for(int i = 0;i<len;i++){
            datas[i]= String.valueOf(ReflectUtils.getValueByField(data.get(i),key));
        }
        return datas;
    }
}


/**
 * 鼠标悬停时的提示框
 */
@Data
class Tooltip implements  Serializable{
    private String trigger;
    private EChartsBase axisPointer;

    public Tooltip() {
        trigger = "axis";
        axisPointer = new EChartsBase();
        axisPointer.setType("shadow");
    }
}

/**
 * 绘图网格，主要用于调整网格的数据显示和样式
 */
@Data
class Grid implements  Serializable{
    private String left="3%";
    private String right="4%";
    private String bottom="3%";
    private boolean containLabel=true;
}

/**
 *
 * 直角坐标系 grid 中的 x 轴，
 * 一般情况下单个 grid 组件最多只能放上下两个 x 轴，
 * 多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠。
 */
@Data
class XAxis extends EChartsBase implements Serializable{
    public XAxis() {
        this.type="category";
        /**
         * 'value' 数值轴，适用于连续数据。
         *
         * 'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
         *
         * 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
         *
         * 'log' 对数轴。适用于对数数据。
         */
    }
}

/**
 * 直角坐标系 grid 中的 y 轴，一般情况下单个 grid 组件最多只能放左右两个 y 轴，
 * 多于两个 y 轴需要通过配置 offset 属性防止同个位置多个 Y 轴的重叠。
 */
@Data
class YAxis extends EChartsBase implements Serializable{
    public YAxis() {
        this.type="value";
        /**
         * 'value' 数值轴，适用于连续数据。
         *
         * 'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
         *
         * 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
         *
         * 'log' 对数轴。适用于对数数据。
         */
    }
}

/**
 * 图例组件展现了不同系列的标记(symbol)，
 * 颜色和名字。可以通过点击图例控制哪些系列不显示。
 */
@Data
class Legend extends EChartsBase implements Serializable{

}

/**
 * 系列列表。每个系列通过 type 决定自己的图表类型
 */
@Data
class Series extends EChartsBase implements Serializable {
    private String stack;//用于将某一类归于一条竖线上
}

