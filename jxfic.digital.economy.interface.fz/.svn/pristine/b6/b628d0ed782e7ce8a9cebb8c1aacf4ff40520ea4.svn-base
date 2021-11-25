package com.zhirong.ncdata.service.QueryEnt;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.zhirong.ncdata.common.entity.PageData;
import com.zhirong.ncdata.dao.DaoSupport;

@Service
public class QueryEntService {

	@Resource(name = "daoSupport")
	private DaoSupport dao;

	public List<PageData> getInFormationDriven(PageData pd) throws Exception{
		return (List<PageData>) dao.findForList("QueryEntMapper.queryzrDataSzjjdmb",pd);
	}


	public List<PageData> findDataSzjjqygxbByCustomize(PageData pd) throws Exception{
		return (List<PageData>) dao.findForList("QueryEntMapper.findDataSzjjqygxbByCustomize",pd);
	}
	public List<String> findDataSzjjqygxbEntname(PageData pd) throws Exception{
		return (List<String>) dao.findForList("QueryEntMapper.findDataSzjjqygxbEntname",pd);
	}
	public int insertDataSzjjqygxbByEntname(Map map) throws Exception{
		return (int) dao.update("QueryEntMapper.insertDataSzjjqygxbByEntname",map);
	}

}
