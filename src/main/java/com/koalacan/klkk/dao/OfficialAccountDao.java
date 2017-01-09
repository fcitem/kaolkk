/**
 * 
 */
package com.koalacan.klkk.dao;

import java.io.Serializable;

import com.koalacan.core.dao.CommonDao;
import com.koalacan.klkk.model.OfficialAccount;

/**
 * @author Administrator
 *
 */
public interface OfficialAccountDao extends CommonDao<OfficialAccount, Serializable> {
	Object[] getAllOfficialAccount(OfficialAccount officialAccount);
	Object[] getHeaderFocus(OfficialAccount officialAccount);
}
