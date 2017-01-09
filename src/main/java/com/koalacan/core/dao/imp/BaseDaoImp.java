package com.koalacan.core.dao.imp;

import com.koalacan.core.dao.BaseDao;

public class BaseDaoImp<T> extends CommonDaoImp<T, Long> implements BaseDao<T> {

	public BaseDaoImp(Class<T> objectClass) {
		super();
	}
}
