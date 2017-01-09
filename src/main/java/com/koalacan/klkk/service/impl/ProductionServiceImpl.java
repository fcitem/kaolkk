/**
 * 
 */
package com.koalacan.klkk.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.koalacan.core.service.imp.CommonServiceImp;
import com.koalacan.klkk.dao.ProductionDao;
import com.koalacan.klkk.dao.UploadDao;
import com.koalacan.klkk.dao.UserDao;
import com.koalacan.klkk.model.Image;
import com.koalacan.klkk.model.Production;
import com.koalacan.klkk.model.ResponseMessage;
import com.koalacan.klkk.model.User;
import com.koalacan.klkk.model.datamodel.ProductionData;
import com.koalacan.klkk.service.ProductionService;
import com.koalacan.klkk.util.FunctionUtil;
import com.koalacan.klkk.util.ObjectConvertion;

/**
 * @author Administrator
 *
 */
@Service
@Transactional
public class ProductionServiceImpl<T> extends CommonServiceImp<T, Long>implements ProductionService<T> {

	private static Logger logger = Logger.getRootLogger();
	
	@Autowired
	ProductionDao productionDao;
	@Autowired
	UserDao userDao;
	@Autowired
	UploadDao uploadDao;

	private ResponseMessage isValid(Production production,boolean isUpdate){
		ResponseMessage rm = new ResponseMessage(false);
		if (null == production){
			rm.setMessage("不能获取到我的作品信息");
			return rm;
		}
		
		if (StringUtils.isBlank(production.getName()) || production.getName().length() > 20){
			rm.setMessage("作品名称不能为空，且长度不能超过20位");
			return rm;
		}
		
		if (StringUtils.isBlank(production.getProductionType()) || production.getProductionType().length() > 20){
			rm.setMessage("作品类型不能为空，且长度不能超过20位");
			return rm;
		}
		
		if (StringUtils.isBlank(production.getTotalWord()) || production.getTotalWord().length() > 20){
			rm.setMessage("全书字数不能为空，且长度不能超过20位");
			return rm;
		}
		
		if (StringUtils.isBlank(production.getStatus()) || production.getStatus().length() != 1){
			rm.setMessage("作品状态不能为空，且长度为1位");
			return rm;
		}
		if ("1".equals(production.getStatus()) || "0".equals(production.getStatus())){
			if (StringUtils.isBlank(production.getCompleteYear()) || production.getCompleteYear().length() > 5){
				rm.setMessage("计划完成时间年不能为空，且长度不能超过5位");
				return rm;
			}
			if (StringUtils.isBlank(production.getCompleteMonth()) || production.getCompleteMonth().length() > 3){
				rm.setMessage("计划完成时间月不能为空，且长度不能超过3位");
				return rm;
			}
			if (StringUtils.isBlank(production.getCompleteWeek()) || production.getCompleteWeek().length() > 3){
				rm.setMessage("计划完成时间周不能为空，且长度不能超过3位");
				return rm;
			}
			if ("1".equals(production.getStatus())){
				if (StringUtils.isBlank(production.getCompleteProcess()) || production.getCompleteProcess().length() > 5){
					rm.setMessage("当前完成进度不能为空，且长度不能超过3位");
					return rm;
				}
			}
		}
		
		if (StringUtils.isNotBlank(production.getRecommendMyself()) && production.getRecommendMyself().length() > 100){
			rm.setMessage("我的一句话推荐长度不能超过100位");
			return rm;
		}
		
		if (StringUtils.isBlank(production.getTargerReader()) || production.getTargerReader().length() > 200){
			rm.setMessage("目标读者不能为空，且长度不能超过200位");
			return rm;
		}
		
		if (StringUtils.isBlank(production.getIntroductionContent()) || production.getIntroductionContent().length() > 200){
			rm.setMessage("内容简介不能为空，且长度不能超过200");
			return rm;
		}
		
		if ("1".equals(production.getStatus()) || "2".equals(production.getStatus())){
			if (StringUtils.isBlank(production.getIntroductionAuthor()) || production.getIntroductionAuthor().length() > 200){
				rm.setMessage("作者简介不能为空，且长度不能超过200位");
				return rm;
			}
		}
		
		if (StringUtils.isNotBlank(production.getBookCatalogue()) && production.getBookCatalogue().length() > 200){
			rm.setMessage("图书目录长度不能超过200位");
			return rm;
		}
		
		if (StringUtils.isNotBlank(production.getSampleChapter()) && production.getSampleChapter().length() > 1000){
			rm.setMessage("样章长度不能超过1000位");
			return rm;
		}
		if (isUpdate && StringUtils.isBlank(production.getId())){
			rm.setMessage("作品id为空，不能更新");
			return rm;
		}
		
		rm.setStatus(true);
		return rm;
	}

	@Override
	public ResponseMessage getProductionByUserId(String userId,int page ,int pageSize) {
		ResponseMessage rm = new ResponseMessage();
		if (StringUtils.isBlank(userId)){
			rm.setMessage("用户的ID为空");
			return rm;
		}
		
		try {
			Object[]  product = productionDao.getProductionByUserId(userId,page,pageSize);
			Object[] productionData = covertObjectToProductionData(product);
			rm.setDataList(productionData);
			rm.setTotal((int)product[1]);
			rm.setStatus(true);
		} catch (Exception e) {
			rm.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return rm;
	}

	@Override
	public ResponseMessage getPublished() {
		ResponseMessage rm = new ResponseMessage();
		try {
			Object[] products = productionDao.getMainPageProductionByCommit(true);
			Object[] productionData = covertObjectToProductionData(products);
			rm.setDataList(productionData);
			rm.setTotal((int)products[1]);
			rm.setStatus(true);
//			if (null != products && !products.isEmpty()){
//				List<ProductionData> productionDatas = new ArrayList<>();
//				for (Production product : products){
//					productionDatas.add(ObjectConvertion.productionToProductionData(product));
//				}
//				rm.setDataList(productionDatas.toArray());
//				rm.setStatus(true);
//			}
		} catch (Exception e) {
			rm.setMessage(e.getMessage());
		}
		
		return rm;
	}

	@Override
	public ResponseMessage getUnpublished() {
		ResponseMessage rm = new ResponseMessage();
		try {
			Object[] products = productionDao.getMainPageProductionByCommit(false);
			Object[] productionData = covertObjectToProductionData(products);
			rm.setDataList(productionData);
			rm.setTotal((int)products[1]);
			rm.setStatus(true);
//			if (null != products && !products.isEmpty()){
//				List<ProductionData> productionDatas = new ArrayList<>();
//				for (Production product : products){
//					productionDatas.add(ObjectConvertion.productionToProductionData(product));
//				}
//				rm.setDataList(productionDatas.toArray());
//				rm.setStatus(true);
//			}
		} catch (Exception e) {
			rm.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return rm;
	}

	@Override
	public ResponseMessage getAllProductByCommit(boolean iscommit,int page ,int pageSize) {
		ResponseMessage rm = new ResponseMessage();
		try {
			Object[] product = productionDao.getProductionByCommit(page, pageSize, iscommit);
			Object[] productionData = covertObjectToProductionData(product);
			rm.setDataList(productionData);
			rm.setTotal((int)product[1]);
			rm.setStatus(true);
		} catch (Exception e) {
			rm.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return rm;
	}

	@Override
	public ResponseMessage getProductById(String id) {
		ResponseMessage rm = new ResponseMessage();
		if (StringUtils.isBlank(id)){
			rm.setMessage("id为空");
			return rm;
		}
		try {
			Production production = productionDao.getByPK(Production.class, id);
			if (null == production){
				rm.setMessage("id错误，不能查出数据");
				return rm;
			}
			rm.setDataModel(ObjectConvertion.productionToProductionData(production));
			rm.setStatus(true);
		} catch (Exception e) {
			rm.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return rm;
	}

	@Override
	public ResponseMessage saveProduction(Production production) {
		ResponseMessage rm = isValid(production,false);
		if (rm.isStatus()){
			rm.setStatus(false);
			String userId = production.getUserId();
			if (StringUtils.isBlank(userId)){
				rm.setMessage("用户的ID不能为空");
				return rm;
			}
			User user = userDao.getByPK(User.class, userId);
			if (null == user){
				rm.setMessage("不能查询到用户，ID错误：" + userId);
				return rm;
			}
			production.setUser(user);
			
			String imageId = production.getImageId();
			if (StringUtils.isNotBlank(imageId)){
				Image image = uploadDao.getByPK(Image.class, imageId);;
				if (null == image){
					rm.setMessage("不能查询到图片信息，图片ID错误：" + imageId);
					return rm;
				}
				production.setImage(image);
			}
			production.setCommit(false);
			production.setId(null);
			productionDao.save(production);
			rm.setDataModel(ObjectConvertion.productionToProductionData(production));
			rm.setStatus(true);
		}
		
		return rm;
	}

	@Override
	public ResponseMessage updateProduction(Production production) {
		ResponseMessage rm = isValid(production,true);
		//先处理字段验证
		if (rm.isStatus()){
			//处理关联字段验证，默认设置状态为false
			rm.setStatus(false);
			String id = production.getId();
			if (StringUtils.isBlank(id)){
				rm.setMessage("作品的ID不能为空");
				return rm;
			}
			Production srcProduction = productionDao.getByPK(Production.class, id);
			if (null == srcProduction){
				rm.setMessage("作品的ID错误");
				return rm;
			}
			if (srcProduction.isCommit()){
				rm.setMessage("已经提交了的作品不能修改");
				return rm;
			}
			//上传用户
			String userId = production.getUserId();
			if (StringUtils.isBlank(userId)){
				rm.setMessage("用户的ID不能为空");
				return rm;
			}
			User user = userDao.getByPK(User.class, userId);
			if (null == user){
				rm.setMessage("不能查询到用户，ID错误：" + userId);
				return rm;
			}
			srcProduction.setUser(user);
			
			//上传图像
			String imageId = production.getImageId();
			if(StringUtils.isBlank(imageId)){
				//如果新上传图像为空，暂时不做处理，保留原来的对象
//				srcProduction.setImage(null);
			} else {
				Image image = uploadDao.getByPK(Image.class, imageId);
				if (null == image){
					rm.setMessage("不能查询到图片信息，图片ID错误：" + imageId);
					return rm;
				}
				Image srcImage = srcProduction.getImage();
				if (srcImage == null){
					srcProduction.setImage(image);
				} else {
					if (!imageId.equals(srcImage.getId())){
						srcProduction.setImage(image);
						srcImage.setIsDelete(true);
						uploadDao.merge(srcImage);
						if (StringUtils.isNotBlank(srcImage.getName())){
							FunctionUtil.getInstance().moveFile(srcImage.getName());
						}
					}
				}
			}
			
			//赋值其他字段
			srcProduction.setName(production.getName());
			srcProduction.setProductionType(production.getProductionType());
			srcProduction.setTotalWord(production.getTotalWord());
			srcProduction.setTargerReader(production.getTargerReader());
			srcProduction.setIntroductionContent(production.getIntroductionContent());
			if ("0".equals(production.getStatus()) || "1".equals(production.getStatus())){
				srcProduction.setCompleteYear(production.getCompleteYear());
				srcProduction.setCompleteMonth(production.getCompleteMonth());
				srcProduction.setCompleteWeek(production.getCompleteWeek());
				if ("0".equals(production.getStatus())){
					srcProduction.setCharacterSet(production.getCharacterSet());
					srcProduction.setPlotSet(production.getPlotSet());
				} else {
					srcProduction.setCompleteProcess(production.getCompleteProcess());
					srcProduction.setIntroductionAuthor(production.getIntroductionAuthor());
					srcProduction.setBookCatalogue(production.getBookCatalogue());
					srcProduction.setSampleChapter(production.getSampleChapter());
				}
			}  else if ("2".equals(production.getStatus())){
				srcProduction.setRecommendMyself(production.getRecommendMyself());
				srcProduction.setIntroductionAuthor(production.getIntroductionAuthor());
				srcProduction.setBookCatalogue(production.getBookCatalogue());
				srcProduction.setSampleChapter(production.getSampleChapter());
			} else {
				rm.setMessage("作品状态无效");
				return rm;
			}
			productionDao.save(srcProduction);
			rm.setDataModel(ObjectConvertion.productionToProductionData(srcProduction));
			rm.setStatus(true);
		}
		
		return rm;
	}
	
	@Override
	public ResponseMessage commitProduction(String id) {
		ResponseMessage rm = new ResponseMessage();
		if (StringUtils.isBlank(id)){
			rm.setMessage("提交的作品的ID不能为空");
			return rm;
		}
		
		Production srcProduction = productionDao.getByPK(Production.class, id);
		if (null == srcProduction){
			rm.setMessage("不存在此作品的ID");
			return rm;
		}
		try {
			srcProduction.setCommit(true);
			productionDao.merge(srcProduction);
			rm.setStatus(true);
		} catch (Exception e) {
			logger.error("提交作品保存失败:" + e.getMessage());
			rm.setMessage("提交作品保存失败！");
		}
		
		return rm;
	}
	
	private Object[] covertObjectToProductionData(Object[] product){
		@SuppressWarnings("unchecked")
		List<Production> products = (List<Production>) product[0];
		List<ProductionData> productionDatas = new ArrayList<>();
		if (null != products && !products.isEmpty()){
			for (Production obj : products){
				productionDatas.add(ObjectConvertion.productionToProductionData(obj));
			}
		}
		return productionDatas.toArray();
	}

	@Override
	public ResponseMessage getAllProduct(Production production,String commit,int page, int pageSize) {
		ResponseMessage rm = new ResponseMessage();
		try {
			Object[] product = productionDao.getAllProduct(production, commit, page, pageSize);
			@SuppressWarnings("unchecked")
			List<Production> products = (List<Production>) product[0];
			rm.setDataList(products.toArray());
			rm.setTotal((int)product[1]);
			rm.setStatus(true);
		} catch (Exception e) {
			rm.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return rm;
	}

	@Override
	public ResponseMessage getProductFoucsByPage(int page, int pageSize,boolean isManage) {
		ResponseMessage rm = new ResponseMessage();
		try {
			Object[] product = productionDao.getProductFoucsByPage(page, pageSize);
			if (isManage){
				@SuppressWarnings("unchecked")
				List<Production> products = (List<Production>) product[0];
				rm.setDataList(products.toArray());
			} else {
				Object[] productionData = covertObjectToProductionData(product);
				rm.setDataList(productionData);
			}
			rm.setTotal((int)product[1]);
			rm.setStatus(true);
		} catch (Exception e) {
			rm.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return rm;
	}

	@Override
	public ResponseMessage updateProductionByManage(Production production) {
		ResponseMessage rm = new ResponseMessage();
		if (production == null){
			rm.setMessage("不能获取作品参数信息");
			return rm;
		}
		
		String id = production.getId();
		if (StringUtils.isBlank(id)){
			rm.setMessage("作品的ID不能为空");
			return rm;
		}
		Production srcProduction = productionDao.getByPK(Production.class, id);
		if (null == srcProduction){
			rm.setMessage("作品的ID错误");
			return rm;
		}
		
		//上传图像
		String imageId = production.getImageId();
		if(StringUtils.isBlank(imageId)){
			//如果新上传图像为空，暂时不做处理，保留原来的对象
//					srcProduction.setImage(null);
		} else {
			Image image = uploadDao.getByPK(Image.class, imageId);
			if (null == image){
				rm.setMessage("不能查询到图片信息，图片ID错误：" + imageId);
				return rm;
			}
			Image srcImage = srcProduction.getImage();
			if (srcImage == null){
				srcProduction.setImage(image);
			} else {
				if (!imageId.equals(srcImage.getId())){
					srcProduction.setImage(image);
					srcImage.setIsDelete(true);
					uploadDao.merge(srcImage);
					if (StringUtils.isNotBlank(srcImage.getName())){
						FunctionUtil.getInstance().moveFile(srcImage.getName());
					}
				}
			}
		}
		
		if(null != production.getDisplayUser()){
			String displayUserId = production.getDisplayUser().getId();
			if (StringUtils.isNotBlank(displayUserId)){
				User displayUser = userDao.getByPK(User.class, displayUserId);
				if (null == displayUser){
					rm.setMessage("不存在当前作品的的ID信息:" + displayUserId);
					return rm;
				}
				srcProduction.setDisplayUser(displayUser);
			}
		}
		
		srcProduction.setName(production.getName());
		srcProduction.setStatus(production.getStatus());
		srcProduction.setProductionType(production.getProductionType());
		srcProduction.setTotalWord(production.getTotalWord());
		srcProduction.setCompleteYear(production.getCompleteYear());
		srcProduction.setCompleteMonth(production.getCompleteMonth());
		srcProduction.setCompleteWeek(production.getCompleteWeek());
		srcProduction.setCompleteProcess(production.getCompleteProcess());
		srcProduction.setRecommendMyself(production.getRecommendMyself());
		srcProduction.setTargerReader(production.getTargerReader());
		srcProduction.setIntroductionContent(production.getIntroductionContent());
		srcProduction.setIntroductionAuthor(production.getIntroductionAuthor());
		srcProduction.setCharacterSet(production.getCharacterSet());
		srcProduction.setPlotSet(production.getPlotSet());
		srcProduction.setBookCatalogue(production.getBookCatalogue());
		srcProduction.setSampleChapter(production.getSampleChapter());
		srcProduction.setMainPageDisplay(production.isMainPageDisplay());
		srcProduction.setCommit(production.isCommit());
		srcProduction.setUrl(production.getUrl());
		srcProduction.setSort(production.getSort());
		srcProduction.setEditorRecommend(production.getEditorRecommend());
		srcProduction.setHasPublishDesc(production.getHasPublishDesc());
		srcProduction.setAdvertising(production.getAdvertising());
		srcProduction.setSellingPoint(production.getSellingPoint());
		
		productionDao.save(srcProduction);
//		rm.setDataModel(ObjectConvertion.productionToProductionData(srcProduction));
		rm.setStatus(true);
		
		return rm;
	}

	@Override
	public ResponseMessage updateProductCheck(List<String> ids,boolean isPass) {
		ResponseMessage rm = new ResponseMessage();
		if (ids !=null && ids.size() > 0){
			Set<String> notExistId = new HashSet<>();
			Set<String> failed = new HashSet<>();
			for (String id : ids){
				if (StringUtils.isNotBlank(id)){
					Production srcProduction = productionDao.getByPK(Production.class, id);
					if (null != srcProduction){
						if (isPass){
							srcProduction.setPass("1");
						} else {
							srcProduction.setPass("0");
						}
						try {
							productionDao.save(srcProduction);
						} catch (Exception e) {
							failed.add(srcProduction.getName());
							logger.error("审核失败：" + e.getMessage());
							e.printStackTrace();
						}
					} else {
						notExistId.add(id);
					}
				}
			}
			StringBuffer msg = new StringBuffer();
			if (failed.size() > 0){
				msg.append(failed).append("，审核失败").append("<br/>");
			}
			if (notExistId.size() > 0){
				msg.append(notExistId).append("，这些ID不存在").append("<br/>");
			}
			
			if (msg.length() == 0){
				rm.setStatus(true);
			}
			
			rm.setMessage(msg.toString());
		} else {
			rm.setMessage("不能获取作品的ID信息");
		}
		return rm;
	}

	@Override
	public ResponseMessage deleteProduct(List<String> ids) {
		ResponseMessage rm = new ResponseMessage();
		if (null != ids && ids.size() > 0){
			Set<String> notExistId = new HashSet<>();
			Set<String> failed = new HashSet<>();
			for(String id : ids){
				Production srcProduction = productionDao.getByPK(Production.class, id);
				if (null != srcProduction){
					srcProduction.setDelete(true);
					try {
						productionDao.save(srcProduction);
					} catch (Exception e) {
						failed.add(srcProduction.getName());
						logger.error("删除失败：" + e.getMessage());
						e.printStackTrace();
					}
				} else {
					notExistId.add(id);
				}
			}
			
			StringBuffer msg = new StringBuffer();
			if (failed.size() > 0){
				msg.append(failed).append("，删除失败").append("<br/>");
			}
			if (notExistId.size() > 0){
				msg.append(notExistId).append("，这些ID不存在").append("<br/>");
			}
			
			if (msg.length() == 0){
				rm.setStatus(true);
			}
			
			rm.setMessage(msg.toString());
		} else {
			rm.setMessage("不能获取到ID");
		}
		return rm;
	}

	@Override
	public ResponseMessage updateProductionFoucusMsg(Production production) {
		ResponseMessage rm = new ResponseMessage();
		if (production == null){
			rm.setMessage("不能获取到相关参数");
			return rm;
		}
		
		if (StringUtils.isBlank(production.getId())){
			rm.setMessage("作品ID不能为空");
			return rm;
		}
		
		Production srcProduction = productionDao.getByPK(Production.class, production.getId());
		if (null == srcProduction){
			rm.setMessage("ID不存在");
			return rm;
		}
		
		//上传图像
		String imageId = production.getImageId();
		if(StringUtils.isBlank(imageId)){
			//如果新上传图像为空，暂时不做处理，保留原来的对象
//			srcProduction.setImage(null);
		} else {
			Image image = uploadDao.getByPK(Image.class, imageId);
			if (null == image){
				rm.setMessage("不能查询到图片信息，图片ID错误：" + imageId);
				return rm;
			}
			Image srcImage = srcProduction.getImage();
			if (srcImage == null){
				srcProduction.setImage(image);
			} else {
				if (!imageId.equals(srcImage.getId())){
					srcProduction.setImage(image);
					srcImage.setIsDelete(true);
					uploadDao.merge(srcImage);
					if (StringUtils.isNotBlank(srcImage.getName())){
						FunctionUtil.getInstance().moveFile(srcImage.getName());
					}
				}
			}
		}
		
		srcProduction.setFocusTitle(production.getFocusTitle());
		srcProduction.setFocusDesc(production.getFocusDesc());
		srcProduction.setIndexFocusSort(production.getIndexFocusSort());
		
		productionDao.save(srcProduction);
		rm.setStatus(true);
		return rm;
	}

	@Override
	public ResponseMessage cancleIndexFocusDispaly(List<String> ids) {
		ResponseMessage rm = new ResponseMessage();
		if (null != ids && ids.size() > 0){
			Set<String> notExistId = new HashSet<>();
			Set<String> failed = new HashSet<>();
			for(String id : ids){
				Production srcProduction = productionDao.getByPK(Production.class, id);
				if (null != srcProduction){
					srcProduction.setMainPageDisplay(false);
					try {
						productionDao.save(srcProduction);
					} catch (Exception e) {
						failed.add(srcProduction.getName());
						logger.error("取消主页显示失败：" + e.getMessage());
						e.printStackTrace();
					}
				} else {
					notExistId.add(id);
				}
			}
			
			StringBuffer msg = new StringBuffer();
			if (failed.size() > 0){
				msg.append(failed).append("，删除失败").append("<br/>");
			}
			if (notExistId.size() > 0){
				msg.append(notExistId).append("，这些ID不存在").append("<br/>");
			}
			
			if (msg.length() == 0){
				rm.setStatus(true);
			}
			
			rm.setMessage(msg.toString());
		} else {
			rm.setMessage("不能获取到ID");
		}
		return rm;
	}

	@Override
	public ResponseMessage getProductByManager(Production production,boolean isUnpublish,boolean isManage) {
		ResponseMessage rm = new ResponseMessage();
		try {
			Object[] product = productionDao.getpublish(production, isUnpublish);
			if (isManage){
				@SuppressWarnings("unchecked")
				List<Production> products = (List<Production>) product[0];
				rm.setDataList(products.toArray());
			} else {
				Object[] productionData = covertObjectToProductionData(product);
				rm.setDataList(productionData);
			}
			rm.setTotal((int)product[1]);
			rm.setStatus(true);
		} catch (Exception e) {
			rm.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return rm;
	}

	@Override
	public ResponseMessage getIndexFocus() {
		ResponseMessage rm = new ResponseMessage();
		try {
			Object[] product = productionDao.getIndexFocus();
			Object[] productionData = covertObjectToProductionData(product);
			rm.setDataList(productionData);
			rm.setTotal((int)product[1]);
			rm.setStatus(true);
		} catch (Exception e) {
			rm.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return rm;
	}

	@Override
	public ResponseMessage addProductionByManage(Production production) {
		ResponseMessage rm = new ResponseMessage();
		if (StringUtils.isBlank(production.getUserId())){
			rm.setMessage("不能获取当前操作用户的ID");
			return rm;
		}
		
		if (StringUtils.isNotBlank(production.getImageId())){
			Image image = uploadDao.getByPK(Image.class, production.getImageId());
			if (null == image){
				rm.setMessage("当前上传的图片ID错误");
				return rm;
			}
			production.setImage(image);
		}
		
		
		User srcUser = userDao.getByPK(User.class, production.getUserId());
		if (null == srcUser){
			rm.setMessage("不存在当前操作用户的ID，请刷新页面重试");
			return rm;
		}
		production.setUser(srcUser);
		
		if(null != production.getDisplayUser()){
			String displayUserId = production.getDisplayUser().getId();
			if (StringUtils.isNotBlank(displayUserId)){
				User displayUser = userDao.getByPK(User.class, displayUserId);
				if (null == displayUser){
					rm.setMessage("不存在当前作品的的ID信息:" + displayUserId);
					return rm;
				}
				production.setDisplayUser(displayUser);
			}
		}
		
		production.setId(null);
		try {
			productionDao.save(production);
			rm.setStatus(true);
		} catch (Exception e) {
			logger.error("管理系统增加增加作品失败:" + e.getMessage());
			e.printStackTrace();
		}
		return rm;
	}
}
