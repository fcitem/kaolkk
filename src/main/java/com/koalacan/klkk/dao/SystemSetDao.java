package com.koalacan.klkk.dao;

import java.io.Serializable;
import java.util.List;

import com.koalacan.core.dao.CommonDao;
import com.koalacan.klkk.model.SystemSet;

public interface SystemSetDao extends CommonDao<SystemSet, Serializable> {

	List<SystemSet> getSystemSetDefaultValue();
}
