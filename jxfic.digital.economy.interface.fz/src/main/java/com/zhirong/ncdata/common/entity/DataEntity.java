package com.zhirong.ncdata.common.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.zhirong.ncdata.common.utils.IdGen;
import com.zhirong.ncdata.entity.User;
import lombok.Data;
import org.apache.commons.lang.StringUtils;

import java.util.Date;

/***********************************************************************
 * 文件说明：用于数据库实体
 * 创建信息：李晋 2018-10-9 15:24
 * 变更履历：
 ***********************************************************************/
@Data
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
}
