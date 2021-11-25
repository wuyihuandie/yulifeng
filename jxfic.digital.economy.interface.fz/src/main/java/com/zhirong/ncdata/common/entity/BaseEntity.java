package com.zhirong.ncdata.common.entity;

import lombok.Data;

import java.io.Serializable;

/***********************************************************************
 * 文件说明：基类
 * 创建信息： 2018-10-8 11:31
 * 变更履历：
 ***********************************************************************/
@Data
public class BaseEntity<T> implements Serializable {

  private static final long serialVersionUID = -7191798263175556759L;

  protected String id;        // 主键
//  protected Map<String, String> sqlMap; // 自定义SQL（SQL标识，SQL内容）
//  protected User currentUser; // 当前用户
//
//
  public BaseEntity() {
  }

  public BaseEntity(String id) {
    this.id = id;
  }
//
//  @JsonIgnore
//  @XmlTransient
//  public User getCurrentUser() {
//    if(currentUser == null){
//      currentUser = UserUtils.getUser();
//    }
//    return currentUser;
//  }
}
