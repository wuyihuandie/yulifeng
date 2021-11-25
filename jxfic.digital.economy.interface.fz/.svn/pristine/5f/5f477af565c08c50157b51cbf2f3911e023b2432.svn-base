package com.zhirong.ncdata.common.entity;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/***********************************************************************
 * 文件说明：数据库基础service
 * 创建信息： 2018-10-9 15:17
 * 变更履历：
 ***********************************************************************/
@Transactional(readOnly = true)
public class CrudService<D extends ICrudDao<T>, T extends DataEntity> extends BaseService implements ICrudService<T> {

  @Autowired
  protected D dao;

  @Override
  public T get(String id) {
    return dao.get(id);
  }

  @Override
  public T get(T t) {
    return dao.get(t);
  }

  @Override
  public List<T> findList(T t) {
    return dao.findList(t);
  }

  @Override
  public Page<T> findPage(T t, Page page) {
    PageHelper.startPage(page.getPage(), page.getLimit());
    List list = dao.findList(t);
    PageInfo pageinfo = new PageInfo(list);
    page.setCount(pageinfo.getTotal());
    page.setList(list);
    return page;
  }

  @Override
  public List<T> findAllList() {
    return dao.findAllList();
  }

  @Transactional(readOnly = false)
  public void insert(T t) {
    dao.insert(t);
  }

  @Transactional(readOnly = false)
  public void update(T t) {
    dao.update(t);
  }

  @Transactional(readOnly = false)
  public void save(T t){
    if(t.isNewRecord()){
      t.preInsert();
      insert(t);
    }else {
      t.preUpdate();
      update(t);
    }
  }

  @Override
  @Transactional(readOnly = false)
  public void delete(String id) {
    dao.delete(id);
  }

  @Override
  @Transactional(readOnly = false)
  public void batchDelete(List<String> idList) {
    dao.batchDelete(idList);
  }
}
