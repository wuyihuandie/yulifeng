package com.zhirong.ncdata.utils;

import com.google.gson.Gson;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

/**
 * @author XieCC
 * @Title: 数据爬取
 * @Package com.zhirong.ncdata.utils
 * @Description: 江西12345 情况通报
 * @date 2020/4/283:45 下午
 */
public class DataScraping {

    private static final Logger logger = LoggerFactory.getLogger(DataScraping.class);


//    @CachePut(value = "emp",key = "#result.status")
//    @Cacheable(value = "emp",key = "#result.status")
    public static String dedicatedData() throws Exception{
        String url="";
        List<Map<String,Object>> data = new ArrayList<>();
        long start = System.currentTimeMillis();
        Document document0 = connect("http://12345.nc.gov.cn/yxtb/qktb/");
        int count=Integer.parseInt(document0.select("body > section > div.container > div:nth-child(3) > a:nth-child(4)").get(0).getElementsByTag("a").attr("href").split("=")[2]);

        for (int ii = 1; ii <= count; ii++) {
            url = "http://12345.nc.gov.cn/yxtb/qktb/index" + ii + ".html";
            Document document = connect(url);
            Elements elements_li = document.select("body > section > div.container > div.article-list > ul > li");
            for (int i = 0; i < elements_li.size(); i++) {
                Map<String,Object> dataMap = new HashMap<>(5);
                Elements elements_span = elements_li.get(i).getElementsByTag("span");
                String Url = "";
                String Text = "";
                String Time = "";
                for (int j = 0; j < elements_span.size(); j++) {
                    if (j == 0) {
                        Url = elements_span.get(j).getElementsByTag("a").attr("href");
                        Text = elements_span.get(j).text();
                    }
                    Time = elements_span.get(j).text();
                }
                // 获取当前时间
                LocalDate today = LocalDate.now();
                String year = String.valueOf(today.getYear());
                String time = Time.substring(0,4);
                if (Objects.equals(year,time)){
                    dataMap.put("url",Url);
                    dataMap.put("text",Text);
                    dataMap.put("date",Time);
                    data.add(dataMap);
                }
                continue;
            }
        }
        long end = System.currentTimeMillis();
        System.out.println(end-start);
        return new Gson().toJson(new ResultData("success","200",data));
    }


    //获取详情页面Document
    public static Document connect(String url) throws IOException {
        Document document = Jsoup.connect(url)
                .timeout(6000)
                .ignoreContentType(true)
                .userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0")
                .get();
        return document;
    }

    public static void main(String[] args) throws Exception {

        Document document0 = connect("http://12345.nc.gov.cn/yxtb/qktb/2020/04/23141333164137.html");
        Element dom = document0.select("body > section > div.article-container").get(0);
        System.out.println(dom);


    }

}
