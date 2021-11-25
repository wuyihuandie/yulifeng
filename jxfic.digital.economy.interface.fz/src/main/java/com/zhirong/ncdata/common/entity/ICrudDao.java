package com.zhirong.ncdata.common.entity;

import java.util.List;

/***********************************************************************
 * 文件说明：数据库基础dao
 * 创建信息： 2018-10-9 15:22
 * 变更履历：
 ***********************************************************************/
public interface ICrudDao<T> extends BaseDao {
  T get(String id);
  T get(T t);
  List<T> findList(T t);
  Page<T> findPage(T t, Page page);
  List<T> findAllList();
  void insert(T t);
  void update(T t);
  void save(T t);
  void delete(String id);
  void batchDelete(List<String> idList);
}
