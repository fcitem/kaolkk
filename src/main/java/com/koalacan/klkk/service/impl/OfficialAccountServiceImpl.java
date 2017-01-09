/**
 * 
 */
package com.koalacan.klkk.service.impl;



import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.koalacan.core.service.imp.CommonServiceImp;
import com.koalacan.klkk.dao.OfficialAccountDao;
import com.koalacan.klkk.dao.UploadDao;
import com.koalacan.klkk.dao.UserDao;
import com.koalacan.klkk.model.Image;
import com.koalacan.klkk.model.OfficialAccount;
import com.koalacan.klkk.model.ResponseMessage;
import com.koalacan.klkk.model.User;
import com.koalacan.klkk.service.OfficialAccountService;
import com.koalacan.klkk.util.FunctionUtil;

/**
 * @author Administrator
 *
 */
@Service
@Transactional
public class OfficialAccountServiceImpl<T> extends CommonServiceImp<T, Long>
		implements OfficialAccountService<T> {
	
	private static Logger logger = Logger.getRootLogger();
	
	@Autowired
	OfficialAccountDao officialAccountDao;
	@Autowired
	UploadDao uploadDao;
	@Autowired
	UserDao userDao;

	@Override
	public ResponseMessage addOfficialAccount(OfficialAccount officialAccount) {
		ResponseMessage rm = validateField(officialAccount);
		if (rm.isStatus()){
			rm.setStatus(false);
			//图片验证
			 Image tmpImage = officialAccount.getImage();
			 if (null != tmpImage){
				 if (StringUtils.isNotBlank(tmpImage.getId())){
					 Image image = uploadDao.getByPK(Image.class, tmpImage.getId());
					 if (null != image){
						 officialAccount.setImage(image);
					 } else {
						 rm.setMessage("公众号关联的图片信息有误");
						 return rm;
					 }
				 }
			 }
			 
			 //操作用户验证
			 User tmpUser = officialAccount.getUser();
			 if (null == tmpUser){
				 rm.setMessage("当前操作用户不能获取，请刷新页面重试");
				 return rm;
			 }
			 if (StringUtils.isBlank(tmpUser.getId())){
				 rm.setMessage("当前操作的用户ID为空，请刷新页面重试");
				 return rm;
			 }
			 User user = userDao.getByPK(User.class, tmpUser.getId());
			 if (null == user){
				 rm.setMessage("当前操作的用户已经不存在，请重新登录");
				 return rm;
			 }
			 officialAccount.setUser(user);
			 
			 Date Date = new Date();
			 officialAccount.setFirstSaveDate(Date);
			 officialAccount.setModifyDate(Date);
			 officialAccount.setId(null);
			 try {
				 officialAccountDao.save(officialAccount);
				 rm.setDataModel(officialAccount);
				 rm.setStatus(true);
			} catch (Exception e) {
				String msg = "增加公众号失败：" + e.getMessage();
				rm.setMessage(msg);
				logger.error(msg);
			}
		}
		return rm;
	}

	private ResponseMessage validateField(OfficialAccount officialAccount){
		ResponseMessage rm = new ResponseMessage();
		if (null == officialAccount){
			rm.setMessage("不能获取公众号的基本信息");
			return rm;
		}
		
		if (StringUtils.isNotBlank(officialAccount.getTitle()) && officialAccount.getTitle().length() > 100){
			rm.setMessage("公众号标题信息长度不能超过100，当前长度是：" + officialAccount.getTitle().length());
			return rm;
		}
		
		if (StringUtils.isNotBlank(officialAccount.getTitleDesc()) && officialAccount.getTitleDesc().length() > 200){
			rm.setMessage("公众号标题信息简介长度不能超过200，当前长度是：" + officialAccount.getTitleDesc().length());
			return rm;
		}
		
		if (StringUtils.isNotBlank(officialAccount.getUrl()) && officialAccount.getUrl().length() > 1000){
			rm.setMessage("公众号连接地址长度不能超过1000，当前长度是：" + officialAccount.getUrl().length());
			return rm;
		}
		
		rm.setStatus(true);
		return rm;
	}

	@Override
	public ResponseMessage updateOfficialAccount(OfficialAccount officialAccount) {
		ResponseMessage rm = validateField(officialAccount);
		if (rm.isStatus()){
			rm.setStatus(false);
			if (StringUtils.isBlank(officialAccount.getId())){
				rm.setMessage("公众号的ID为空，保存失败");
				return rm;
			}
			
			OfficialAccount srcOfficialAccount = officialAccountDao.getByPK(OfficialAccount.class, officialAccount.getId());
			if (null == srcOfficialAccount){
				rm.setMessage("不存在此ID：" + officialAccount.getId() + "的公众号的，保存失败");
				return rm;
			}
			
			//验证图片
			Image tmpImage = officialAccount.getImage();
			 if (null != tmpImage){
				 if (StringUtils.isNotBlank(tmpImage.getId())){
					 Image image = uploadDao.getByPK(Image.class, tmpImage.getId());
					 if (null != image){
						 Image oldImage = srcOfficialAccount.getImage();
						 if (null != oldImage && StringUtils.isNotBlank(oldImage.getId())){
							 if (!oldImage.getId().equals(image.getId())){
								 srcOfficialAccount.setImage(image);
								 oldImage.setIsDelete(true);
								 uploadDao.merge(oldImage);
								 if (StringUtils.isNotBlank(oldImage.getName())){
										FunctionUtil.getInstance().moveFile(oldImage.getName());
									}
							 }
						 } else {
							 srcOfficialAccount.setImage(image);
						 }
					 } else {
						 rm.setMessage("公众号关联的图片信息有误");
						 return rm;
					 }
				 }
			 }
			 
			 //验证当前用户
			 User user = officialAccount.getUser();
			 if (null == user){
				 rm.setMessage("不能获取当前操作的用户，请重新登录");
				 return rm;
			 }
			 if (StringUtils.isBlank(user.getId())){
				 rm.setMessage("不能获取当前操作的用户的ID，请重新登录");
				 return rm;
			 }
			 User newUser = userDao.getByPK(User.class, user.getId());
			 if (null == newUser){
				 rm.setMessage("不存在此ID的用户：" + user.getId() + "，请重新登录");
				 return rm;
			 }
			 srcOfficialAccount.setUser(user);
			 srcOfficialAccount.setModifyDate(new Date());
			 srcOfficialAccount.setTitle(officialAccount.getTitle());
			 srcOfficialAccount.setTitleDesc(officialAccount.getTitleDesc());
			 srcOfficialAccount.setUrl(officialAccount.getUrl());
			 srcOfficialAccount.setSort(officialAccount.getSort());
			 srcOfficialAccount.setFocus(officialAccount.isFocus());
			 srcOfficialAccount.setFocusSort(officialAccount.getFocusSort());
			 
			 try {
				 officialAccountDao.merge(srcOfficialAccount);
				 rm.setDataModel(srcOfficialAccount);
				 rm.setStatus(true);
			} catch (Exception e) {
				String msg = "编辑公众号失败：" + e.getMessage();
				rm.setMessage(msg);
				logger.error(msg);
			}
		}
		return rm;
	}

	@Override
	public ResponseMessage getAllOfficialAccount(OfficialAccount officialAccount) {
		ResponseMessage rm = new ResponseMessage();
		try {
			Object[] officialAccountObj = officialAccountDao.getAllOfficialAccount(officialAccount);
			List<OfficialAccount> officialAccounts = (List<OfficialAccount>) officialAccountObj[0];
			rm.setDataList(officialAccounts.toArray());
			rm.setTotal((int)officialAccountObj[1]);
			rm.setStatus(true);
		} catch (Exception e) {
			rm.setMessage(e.getMessage());
			e.printStackTrace();
		}
		return rm;
	}

	@Override
	public ResponseMessage getHeaderFocus(OfficialAccount officialAccount) {
		ResponseMessage rm = new ResponseMessage();
		try {
			Object[] officialAccountObj = officialAccountDao.getHeaderFocus(officialAccount);
			List<OfficialAccount> officialAccounts = (List<OfficialAccount>) officialAccountObj[0];
			rm.setDataList(officialAccounts.toArray());
			rm.setTotal((int)officialAccountObj[1]);
			rm.setStatus(true);
		} catch (Exception e) {
			rm.setMessage(e.getMessage());
			e.printStackTrace();
		}
		return rm;
	}

	@Override
	public ResponseMessage deleteOfficialAccount(List<String> ids) {
		ResponseMessage rm = new ResponseMessage();
		if (null != ids && ids.size() > 0){
			Set<String> notExistId = new HashSet<>();
			Set<String> failed = new HashSet<>();
			for(String id : ids){
				OfficialAccount officialAccount = officialAccountDao.getByPK(OfficialAccount.class, id);
				if (null != officialAccount){
					officialAccount.setDelete(true);
					try {
						officialAccountDao.save(officialAccount);
					} catch (Exception e) {
						failed.add(officialAccount.getTitle());
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
	public ResponseMessage cancleOfficialAccoutFocus(List<String> ids) {
		ResponseMessage rm = new ResponseMessage();
		if (null != ids && ids.size() > 0){
			Set<String> notExistId = new HashSet<>();
			Set<String> failed = new HashSet<>();
			for(String id : ids){
				OfficialAccount officialAccount = officialAccountDao.getByPK(OfficialAccount.class, id);
				if (null != officialAccount){
					officialAccount.setFocus(false);
					try {
						officialAccountDao.save(officialAccount);
					} catch (Exception e) {
						failed.add(officialAccount.getTitle());
						logger.error("删除失败：" + e.getMessage());
						e.printStackTrace();
					}
				} else {
					notExistId.add(id);
				}
			}
			
			StringBuffer msg = new StringBuffer();
			if (failed.size() > 0){
				msg.append(failed).append("，取消焦点图显示失败").append("<br/>");
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

}
