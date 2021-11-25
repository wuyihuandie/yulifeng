package com.zhirong.ncdata.common.entity;

import com.zhirong.ncdata.common.utils.Reflections;
import com.zhirong.ncdata.common.utils.StringUtils;
import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * 数据Entity类
 * @author
 * @version 2014-05-16
 */
@Data
public abstract class TreeEntity<T> extends DataEntity<T> {

	protected T parent;	// 父级编号
	protected String parentIds; // 所有父级编号
	protected String name; 	// 机构名称
	protected Integer sort;		// 排序

    protected String isTreeSelect; // 是否为树形选择框获取数据

	public TreeEntity() {
		super();
		this.sort = 30;
	}

	public TreeEntity(String id) {
		super(id);
	}

	/**
	 * 父对象，只能通过子类实现，父类实现mybatis无法读取
	 * @return
	 */
//	@JsonBackReference
	@NotNull
	public abstract T getParent();

	/**
	 * 父对象，只能通过子类实现，父类实现mybatis无法读取
	 * @return
	 */
	public abstract void setParent(T parent);

	public String getParentId() {
		String id = null;
		if (parent != null){
			id = (String) Reflections.getFieldValue(parent, "id");
		}
		return StringUtils.isNotBlank(id) ? id : "0";
	}

}
