/**
 * 
 */
package com.koalacan.klkk.service;

import java.util.List;

import com.koalacan.core.service.CommonService;
import com.koalacan.klkk.model.Production;
import com.koalacan.klkk.model.ResponseMessage;

/**
 * @author Administrator
 *
 */
public interface ProductionService<T> extends CommonService<T, Long> {

	ResponseMessage saveProduction(Production production);
	ResponseMessage updateProduction(Production production);
	ResponseMessage commitProduction(String id);
	ResponseMessage getProductionByUserId(String userId,int page ,int pageSize);
	ResponseMessage getProductById(String id);
	ResponseMessage getPublished();
	ResponseMessage getUnpublished();
	ResponseMessage getIndexFocus();
	ResponseMessage getAllProductByCommit(boolean commit,int page ,int pageSize);
	ResponseMessage getAllProduct(Production production,String commit,int page ,int pageSize);
	ResponseMessage getProductFoucsByPage(int page ,int pageSize,boolean isManage);
	ResponseMessage addProductionByManage(Production production);
	ResponseMessage updateProductionByManage(Production production);
	ResponseMessage updateProductCheck(List<String> ids,boolean isPass);
	ResponseMessage deleteProduct(List<String> ids);
	ResponseMessage updateProductionFoucusMsg(Production production);
	ResponseMessage cancleIndexFocusDispaly(List<String> ids);
	ResponseMessage getProductByManager(Production production,boolean isUnpublish,boolean isManage);
}
