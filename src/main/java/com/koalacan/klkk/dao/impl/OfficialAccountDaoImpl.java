/**
 * 
 */
package com.koalacan.klkk.dao.impl;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.koalacan.core.dao.imp.CommonDaoImp;
import com.koalacan.klkk.dao.OfficialAccountDao;
import com.koalacan.klkk.model.OfficialAccount;

/**
 * @author Administrator
 *
 */
@Repository
public class OfficialAccountDaoImpl extends CommonDaoImp<OfficialAccount, Serializable>implements OfficialAccountDao {

	@Override
	public Object[] getAllOfficialAccount(OfficialAccount officialAccount) {
		StringBuffer hql = new StringBuffer("from OfficialAccount officialAccount where officialAccount.isDelete!=true");
		if (StringUtils.isNotBlank(officialAccount.getTitle())){
			hql.append(" and officialAccount.title like '%" + officialAccount.getTitle() +"%'");
		}
		if (StringUtils.isNotBlank(officialAccount.getTitleDesc())){
			hql.append(" and officialAccount.titleDesc like '%" + officialAccount.getTitleDesc() +"%'");
		}
		String hqlTotal = "select count(*) " + hql.toString();
		hql.append(" order by officialAccount.sort");
		int page = Integer.parseInt(officialAccount.getPage());
		int pageSize = Integer.parseInt(officialAccount.getLimit());
		return super.getAllByPage(hql.toString(), hqlTotal, page, pageSize);
	}

	@Override
	public Object[] getHeaderFocus(OfficialAccount officialAccount) {
		String hql = "select officialAccount from OfficialAccount officialAccount where officialAccount.isDelete!=true and officialAccount.focus=true order by officialAccount.focusSort";
		String hqlTotal = "select count(*) from OfficialAccount officialAccount where officialAccount.isDelete!=true and officialAccount.focus=true";
		int page = Integer.parseInt(officialAccount.getPage());
		int pageSize = Integer.parseInt(officialAccount.getLimit());
		return super.getAllByPage(hql, hqlTotal, page, pageSize);
	}

	

}
