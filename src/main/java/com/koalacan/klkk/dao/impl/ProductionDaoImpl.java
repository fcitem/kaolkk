/**
 * 
 */
package com.koalacan.klkk.dao.impl;

import java.io.Serializable;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.koalacan.core.dao.imp.CommonDaoImp;
import com.koalacan.klkk.dao.ProductionDao;
import com.koalacan.klkk.model.Production;

/**
 * @author Administrator
 *
 */
@Repository
public class ProductionDaoImpl extends CommonDaoImp<Production, Serializable>implements ProductionDao {

	@Override
	public Object[] getProductionByUserId(String userId,int page ,int pageSize) {
		String hql = "select product from Production product where product.isDelete!=true and product.user='" + userId +"'";
		String hqlTotal = "select count(*) from Production product where product.isDelete!=true and product.user='" + userId +"'";
		return super.getAllByPage(hql, hqlTotal, page, pageSize);
	}

	@Override
	public Object[] getMainPageProductionByCommit(boolean iscommit) {
		StringBuffer hql = new StringBuffer("from Production product where product.isDelete!=true and product.pass='1'");
		hql.append(" and product.isCommit=").append(iscommit);
		String hqlTotal = "select count(*) " + hql.toString();
		hql.append(" order by product.sort");
		int pageSize = iscommit ? 10 : 2;
		return super.getAllByPage(hql.toString(), hqlTotal, 1, pageSize);
	}

	@Override
	public Object[] getProductionByCommit(int page ,int pageSize,boolean iscommit) {
		String hql = "select product from Production product where product.isDelete!=true and product.pass='1' and product.isCommit=" + iscommit + "  order by product.sort";
		String hqlTotal = "select count(*) from Production product where product.isDelete!=true and product.pass='1' and product.isCommit=" + iscommit;
		return super.getAllByPage(hql, hqlTotal, page, pageSize);
	}

	@Override
	public Object[] getAllProduct(Production product,String commit,int page, int pageSize) {
//		String hql = "select product from Production product where product.isDelete!=true";
		
		StringBuffer hql = new StringBuffer("from Production product where product.isDelete!=true");
		if (StringUtils.isNotBlank(product.getName())){
			hql.append(" and product.name like'%" + product.getName() + "%'");
		}
		if (StringUtils.isNotBlank(product.getStatus())){
			hql.append(" and product.status like'%" + product.getStatus() + "%'");
		}
		if (StringUtils.isNotBlank(product.getProductionType())){
			hql.append(" and product.productionType like'%" + product.getProductionType() + "%'");
		}
		if (StringUtils.isNotBlank(commit)){
			boolean isCommit = commit.equals("true") ? true : false;
			hql.append(" and product.isCommit =" + isCommit);
		}
		if (StringUtils.isNotBlank(product.getCompleteYear())){
			hql.append(" and product.completeYear like'%" + product.getCompleteYear() + "%'");
		}
		if (StringUtils.isNotBlank(product.getCompleteMonth())){
			hql.append(" and product.completeMonth like'%" + product.getCompleteMonth() + "%'");
		}
		if (StringUtils.isNotBlank(product.getCompleteWeek())){
			hql.append(" and product.completeWeek like'%" + product.getCompleteWeek() + "%'");
		}
		if (StringUtils.isNotBlank(product.getPass())){
			hql.append(" and product.pass='" + product.getPass() + "'");
		}
		
		String hqlTotal = "select count(*) " + hql.toString();
		hql.append(" order by product.sort");
		
		return super.getAllByPage(hql.toString(), hqlTotal, page, pageSize);
	}

	@Override
	public Object[] getProductFoucsByPage(int page, int pageSize) {
		String hql = "select product from Production product where product.isDelete!=true and product.isMainPageDisplay=true and product.pass='1' order by product.indexFocusSort";
		String hqlTotal = "select count(*) from Production product where product.isDelete!=true and product.isMainPageDisplay=true and product.pass='1'";
		return super.getAllByPage(hql, hqlTotal, page, pageSize);
	}

	@Override
	public Object[] getpublish(Production production,boolean isUnpublish) {
		StringBuffer hql = new StringBuffer("from Production production where production.isDelete!=true and production.pass='1'");
		
		if (isUnpublish){
			hql.append(" and production.isCommit=false");
		} else {
			hql.append(" and production.isCommit=true");
		}
		
		String hqlTotal = "select count(*) " + hql.toString();
		hql.append(" order by production.sort");
		int page = Integer.parseInt(production.getPage());
		int pageSize = Integer.parseInt(production.getLimit());
		return super.getAllByPage(hql.toString(), hqlTotal, page, pageSize);
	}

	@Override
	public Object[] getIndexFocus() {
		String hql = "select product from Production product where product.isDelete!=true and product.isMainPageDisplay=true and product.pass='1' order by product.indexFocusSort";
		String hqlTotal = "select count(*) from Production product where product.isDelete!=true and product.isMainPageDisplay=true and product.pass='1'";
		return super.getAllByPage(hql, hqlTotal, 1, 3);
	}

	

}
