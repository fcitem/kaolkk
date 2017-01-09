/**
 * 
 */
package com.koalacan.klkk.dao;

import java.io.Serializable;
import java.util.List;

import com.koalacan.core.dao.CommonDao;
import com.koalacan.klkk.model.Production;

/**
 * @author Administrator
 *
 */
public interface ProductionDao extends CommonDao<Production, Serializable> {

	Object[] getProductionByUserId(String userId,int page ,int pageSize);
	Object[] getMainPageProductionByCommit(boolean iscommit);
	Object[] getProductionByCommit(int page ,int pageSize,boolean iscommit);
	Object[] getAllProduct(Production production,String commit,int page ,int pageSize);
	Object[] getProductFoucsByPage(int page ,int pageSize);
	Object[] getpublish(Production production,boolean isUnpublish);
	Object[] getIndexFocus();
}
