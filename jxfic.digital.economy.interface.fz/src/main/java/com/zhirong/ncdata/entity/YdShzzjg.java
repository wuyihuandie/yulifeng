package com.zhirong.ncdata.entity;

/**
 * (YdShzzjg)实体类
 *
 * @author Pop
 * @since 2019-07-15 16:26:24
 */
public class YdShzzjg extends DataEntity<YdShzzjg> {

    //填报单位
    private String unit;
    private String unitEncoding;

    public String getUnitEncoding() {
        return unitEncoding;
    }

    public void setUnitEncoding(String unitEncoding) {
        this.unitEncoding = unitEncoding;
    }

    //时间
    private String time;
    //关联YD_ALCONTACT的ID
    private String alcontId;
    //职位类型(1为会长,2为执行会长,3为副会长,4为理事,5为会员,6为专职人员,7为理事,8为顾问)
    private String post;
    //姓名
    private String name;
    //公司名称
    private String companyname;
    //职务
    private String duct;
    //联系电话
    private String phone;
    //PDF路径
    private String pdfurl;


    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getAlcontId() {
        return alcontId;
    }

    public void setAlcontId(String alcontId) {
        this.alcontId = alcontId;
    }

    public String getPost() {
        return post;
    }

    public void setPost(String post) {
        this.post = post;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompanyname() {
        return companyname;
    }

    public void setCompanyname(String companyname) {
        this.companyname = companyname;
    }

    public String getDuct() {
        return duct;
    }

    public void setDuct(String duct) {
        this.duct = duct;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPdfurl() {
        return pdfurl;
    }

    public void setPdfurl(String pdfurl) {
        this.pdfurl = pdfurl;
    }
}