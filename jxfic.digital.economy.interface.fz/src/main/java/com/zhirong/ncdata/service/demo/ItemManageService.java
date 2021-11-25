package com.zhirong.ncdata.service.demo;

import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 指标管理
 */
@Service
public class ItemManageService{
	
    @Resource(name = "daoSupport")
    private DaoSupport dao;

    /**
     * 查询指标列表
     * @param page
     * @return
     * @throws Exception
     */
    public List<PageData> queryItemList(PageData pd) throws Exception {
        return  (List<PageData>) dao.findForList("ItemManageMapper.queryItemList",pd);
    }
	

	/**
     * 新增指标
	 *
     * @param item
     * @return
     * @throws Exception
     */
	public int addItem(PageData pd) throws Exception{
		int result = (Integer)dao.save("ItemManageMapper.saveItem", pd);
		return result;
	}

	/**
     * 修改指标
	 *
     * @param item
     * @return
     * @throws Exception
     */
	public int modifyItem(PageData pd) throws Exception{
		int result = (Integer)dao.update("ItemManageMapper.updateItem", pd);
		return result;
	}
	
	/**
     * 删除指标
	 *
     * @param item
     * @return
     * @throws Exception
     */
	public int deleteItem(String id) throws Exception{
		int result = (Integer)dao.delete("ItemManageMapper.deleteItem", id);
		return result;
	}
}
