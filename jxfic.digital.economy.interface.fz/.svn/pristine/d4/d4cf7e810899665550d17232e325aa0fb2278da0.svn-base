package com.zhirong.ncdata.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.zhirong.ncdata.common.utils.IdGen;
import org.apache.commons.lang.StringUtils;

import java.util.Date;

/***********************************************************************
 * 文件说明：用于数据库实体
 * 创建信息： 2018-10-9 15:24
 * 变更履历：
 ***********************************************************************/
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DataEntity<T> extends BaseEntity<T> {

  private User createBy;  // 创建者
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
  private Date createDate;  // 创建日期
  private User updateBy;  // 更新者
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
  private Date updateDate;  // 更新日期
  private String remarks;   // 备注
  @JsonIgnore
  private String isDelete;   // 是否删除
  private String dbName;

  public DataEntity() {
    super();
    this.isDelete = "0";
    dbName = "mysql";
  }

  public DataEntity(String id) {
    super(id);
    this.isDelete = "0";
    dbName = "mysql";
  }

  @JsonIgnore
  private boolean newRecord = false;

  public boolean isNewRecord(){
    return newRecord || StringUtils.isBlank(id);
  }

  public void preInsert(){
    if(StringUtils.isBlank(id)){
      setId(IdGen.uuid());
    }
    // todo 当前用户功能引入后，改为当前用户
    createBy = new User("1");
    createDate = new Date();
    updateBy = new User("1");
    updateDate = new Date();
  }

  public void preUpdate(){
    // todo 当前用户功能引入后，改为当前用户
    createBy = new User("1");
    createDate = new Date();
    updateBy = new User("1");
    updateDate = new Date();
  }

  public User getCreateBy() {
    return createBy;
  }

  public void setCreateBy(User createBy) {
    this.createBy = createBy;
  }

  public Date getCreateDate() {
    return createDate;
  }

  public void setCreateDate(Date createDate) {
    this.createDate = createDate;
  }

  public User getUpdateBy() {
    return updateBy;
  }

  public void setUpdateBy(User updateBy) {
    this.updateBy = updateBy;
  }

  public Date getUpdateDate() {
    return updateDate;
  }

  public void setUpdateDate(Date updateDate) {
    this.updateDate = updateDate;
  }

  public String getRemarks() {
    return remarks;
  }

  public void setRemarks(String remarks) {
    this.remarks = remarks;
  }

  public String getIsDelete() {
    return isDelete;
  }

  public void setIsDelete(String isDelete) {
    this.isDelete = isDelete;
  }

  public String getDbName() {
    return dbName;
  }

  public void setDbName(String dbName) {
    this.dbName = dbName;
  }

  public void setNewRecord(boolean newRecord) {
    this.newRecord = newRecord;
  }
}
