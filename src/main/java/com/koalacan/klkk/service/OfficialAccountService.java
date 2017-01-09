/**
 * 
 */
package com.koalacan.klkk.service;

import java.util.List;

import com.koalacan.core.service.CommonService;
import com.koalacan.klkk.model.OfficialAccount;
import com.koalacan.klkk.model.ResponseMessage;

/**
 * @author Administrator
 *
 */
public interface OfficialAccountService<T> extends CommonService<T, Long> {
	ResponseMessage addOfficialAccount(OfficialAccount officialAccount);
	ResponseMessage updateOfficialAccount(OfficialAccount officialAccount);
	ResponseMessage getAllOfficialAccount(OfficialAccount officialAccount);
	ResponseMessage getHeaderFocus(OfficialAccount officialAccount);
	ResponseMessage deleteOfficialAccount(List<String> ids);
	ResponseMessage cancleOfficialAccoutFocus(List<String> ids);
}
