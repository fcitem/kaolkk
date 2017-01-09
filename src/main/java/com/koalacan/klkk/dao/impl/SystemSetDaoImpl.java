package com.koalacan.klkk.dao.impl;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.koalacan.core.dao.imp.CommonDaoImp;
import com.koalacan.klkk.dao.SystemSetDao;
import com.koalacan.klkk.model.SystemSet;

@Repository
public class SystemSetDaoImpl extends CommonDaoImp<SystemSet, Serializable> implements SystemSetDao {

	@Override
	public List<SystemSet> getSystemSetDefaultValue() {
		String hql = "select systemset from SystemSet as systemset";
		
		return super.getEntityManager().createQuery(hql).getResultList();
	}


}
