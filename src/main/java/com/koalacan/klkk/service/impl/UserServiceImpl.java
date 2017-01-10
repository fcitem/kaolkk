/**
 * 
 */
package com.koalacan.klkk.service.impl;


import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.koalacan.core.service.imp.CommonServiceImp;
import com.koalacan.core.util.CommonUtil;
import com.koalacan.klkk.dao.SystemSetDao;
import com.koalacan.klkk.dao.TopicDao;
import com.koalacan.klkk.dao.UploadDao;
import com.koalacan.klkk.dao.UserDao;
import com.koalacan.klkk.model.Image;
import com.koalacan.klkk.model.ResponseMessage;
import com.koalacan.klkk.model.SystemSet;
import com.koalacan.klkk.model.Topic;
import com.koalacan.klkk.model.User;
import com.koalacan.klkk.model.datamodel.UserData;
import com.koalacan.klkk.service.UserService;
import com.koalacan.klkk.util.FunctionUtil;
import com.koalacan.klkk.util.ModelCheckUtil;
import com.koalacan.klkk.util.ObjectConvertion;
import com.koalacan.klkk.util.ValidateUtil;



/**
 * @author Administrator
 *
 */
@Service
@Transactional
public class UserServiceImpl<T> extends CommonServiceImp<T, Long> implements UserService<T> {
	
	private static Logger logger = Logger.getRootLogger();
	
	@Autowired
	UserDao userDao;
	@Autowired
	TopicDao topicDao;
	@Autowired
	UploadDao uploadDao;
	@Autowired
	SystemSetDao systemSetDao;

	@Override
	public ResponseMessage isValid(User user,HttpSession session) {
		ResponseMessage rm = new ResponseMessage();
		
		if (null == user){
			rm.setMessage("不能获取到用户信息的值");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getRandomCode())){
			rm.setMessage("验证码不能为空");
			return rm;
		}
		
		if (!user.getRandomCode().equalsIgnoreCase(session.getAttribute("randomCode").toString())){
			rm.setMessage("验证码输入不正确");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getEmail())){
			rm.setMessage("邮箱不能为空");
			return rm;
		}
		
		if (user.getEmail().length() > 30 || !ValidateUtil.getInstance().isValidEmail(user.getEmail())){
			rm.setMessage("请输入正确的邮箱地址，邮箱长度不能超过30位");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getPassword())){
			rm.setMessage("密码不能为空");
			return rm;
		}
		
		if (user.getPassword().length() > 20 || user.getPassword().length() < 6){
			rm.setMessage("密码长度必须在6-20位之间");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getStatus())){
			rm.setMessage("注册类型不能为空");
			return rm;
		}
		
		if (user.getStatus().length() > 2){
			rm.setMessage("注册类型长度不能超过2位");
			return rm;
		}
		
		rm.setStatus(true);
		return rm;
	}

	@Override
	public boolean isEmailExist(String email) {
		List<User> users = userDao.getUsersByEmail(email);
		if (null != users && !users.isEmpty()){
			return true;
		}
		return false;
	}

	@Override
	public boolean sendCodeToEmail(User user) {
		if(StringUtils.isBlank(user.getEmail())){
			logger.error("用户的邮箱为空，不能发送邮件验证码。");
			return false;
		}
		logger.info("start email method:");
		//根据规则30分钟更新一次验证码，30分钟内重复发验证码
		String code  = "";
		boolean isNewCode = false;
		Date srcDate = user.getModifyTime();
		if (null == srcDate){
			code = FunctionUtil.getInstance().getRandomCode();
			isNewCode = true;
		} else {
			Date newDate = new Date();
			long seconds = newDate.getTime() - srcDate.getTime();
			if (seconds/1000/60 > 30){
				 code = FunctionUtil.getInstance().getRandomCode();
				 isNewCode = true;
			} else {
				if (StringUtils.isNotBlank(user.getEmailCode())){
					code = user.getEmailCode();
				} else {
					code = FunctionUtil.getInstance().getRandomCode();
					isNewCode = true;
				}
			}
		}
		logger.info("send email method,email:"+user.getEmail()+",code:"+code);
		if (FunctionUtil.getInstance().sendEmail(user.getEmail(), code)){
			if (isNewCode){
				user.setEmailCode(code);
				user.setModifyTime(new Date());
				userDao.save(user);
			}
			return true;
		}
		logger.info("end send email method:");
		return false;
	}

	@Override
	public ResponseMessage login(User user,boolean isManagerLogin) {
		ResponseMessage rm = new ResponseMessage(false);
		if (null != user){
			
			if (StringUtils.isBlank(user.getEmail())){
				rm.setMessage("用户邮箱为空。");
				return rm;
			}
			
			if (StringUtils.isBlank(user.getPassword())){
				rm.setMessage("用户密码为空。");
				return rm;
			}
			
			String password = CommonUtil.encodePassword(user.getPassword());
			user.setPassword(password);
			List<User> users = userDao.getUsersByEmailAndPassword(user);
			if (null == users || users.isEmpty()){
				logger.warn("邮箱或密码错误,不能从数据库查询用户，邮箱：" + user.getEmail() + ",密码:" + user.getPassword());
				rm.setMessage("邮箱或密码错误。");
				return rm;
			}
			if (users.size() != 1){
				rm.setMessage("存在多个相同的用户名和密码，请联系管理员。");
				return rm;
			}
			rm.setStatus(true);
			rm.setDataModel(ObjectConvertion.userToUserData(users.get(0)));
//			if (isManagerLogin){
//				rm.setDataModel(users.get(0));
//			} else {
//				rm.setDataModel(ObjectConvertion.userToUserData(users.get(0)));
//			}
			return rm;
		} else {
			rm.setMessage("用户对象为空。");
		}
		return rm;
	}

	@Override
	public ResponseMessage findPassword(User user,HttpSession session) {
		ResponseMessage rm = new ResponseMessage();
		
		if (null == user){
			rm.setMessage("用户对象为空");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getEmail())){
			rm.setMessage("邮箱不能为空");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getRandomCode())){
			rm.setMessage("验证码不能为空");
			return rm;
		}
		
		if (!user.getRandomCode().equalsIgnoreCase(session.getAttribute("randomCode").toString())){
			rm.setMessage("验证码输入不正确");
			return rm;
		}
		
		List<User> users = userDao.getUsersByEmail(user.getEmail());
		if (null == users || users.isEmpty()){
			rm.setStatus(true);
			rm.setMessage("该邮箱未注册");
			return rm;
		}
		if (users.size() > 1){
			rm.setMessage("邮箱出现多个，请联系管理员");
			return rm;
		}
		
		User srcUser = users.get(0);
		if (sendCodeToEmail(srcUser)){
			rm.setStatus(true);
//			user.setId(srcUser.getId());
//			rm.setDataModel(srcUser.clone(srcUser));
		} else {
			rm.setMessage("发送邮箱验证码失败。");
		}
			
		return rm;
	}

	@Override
	public ResponseMessage resetPassword(User user) {
		ResponseMessage rm = new ResponseMessage(false);
		if (null == user){
			rm.setMessage("用户对象为空");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getPassword()) || user.getPassword().length()< 6 || user.getPassword().length() > 20){
			rm.setMessage("新密码的长度只能在6到20位");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getEmailCode())){
			rm.setMessage("邮箱验证码为空");
			return rm;
		}
		User srcUser = null;
		if (StringUtils.isNotBlank(user.getId())){
			srcUser = userDao.getByPK(User.class, user.getId());
		} else {
			List<User> users = userDao.getUsersByEmail(user.getEmail());
			if (null == users || users.isEmpty()){
				rm.setMessage("重置密码失败，未查找到此邮箱：" + user.getEmail() +"的数据");
				return rm;
			}
			if (users.size() > 1){
				rm.setMessage("邮箱出现多个，请联系管理员");
				return rm;
			}
			srcUser = users.get(0);
		}
		
		if (null == srcUser){
			rm.setMessage("重置密码失败,未查找到原数据相关记录");
			return rm;
		}
		
		Date srcDate = srcUser.getModifyTime();
		Date newDate = new Date();
		long seconds = newDate.getTime() - srcDate.getTime();
		if (seconds/1000/60 > 30){
			rm.setMessage("有效期时间失效，请重新获取验证码。");
			return rm;
		} else {
			if (user.getEmailCode().equals(srcUser.getEmailCode())){
				String password = CommonUtil.encodePassword(user.getPassword());
				srcUser.setPassword(password);
				srcUser.setModifyTime(newDate);
				srcUser.setEmailCode("");
				userDao.save(srcUser);
				rm.setStatus(true);
				rm.setDataModel(ObjectConvertion.userToUserData(srcUser));
				return rm;
			} else {
				rm.setMessage("邮箱验证码输入错误");
				return rm;
			}
		}
	}

	@Override
	public ResponseMessage updateUser(User user) {
		ResponseMessage rm = checkUpdateUserInfo(user);
		if (rm.isStatus()){
			rm.setStatus(false);
			User srcUser = userDao.getByPK(User.class, user.getId());
			if (null == srcUser){
				rm.setMessage("用户的ID错误");
				return rm;
			}
			//检查图片
			if (StringUtils.isNotBlank(user.getImageId())){
				Image image = null;
				if (null == srcUser.getImage()){
					image = uploadDao.getByPK(Image.class, user.getImageId());
					if (null == image){
						rm.setMessage("不能查询到图片信息，图片ID错误：" + user.getImageId());
						return rm;
					}
					srcUser.setImage(image);
				} else {
					if (!user.getImageId().equals(srcUser.getImage().getId())){
						image = uploadDao.getByPK(Image.class, user.getImageId());
						if (null == image){
							rm.setMessage("不能查询到图片信息，图片ID错误：" + user.getImageId());
							return rm;
						}
						Image srcImage = srcUser.getImage();
						//如果原来有图片，将原来的图片删除标志设为true，同时将与原来的图片移到deletebak文件夹下
						if (null != srcImage && !srcImage.getId().equals(image.getId())){
							srcImage.setIsDelete(true);
							uploadDao.merge(srcImage);
							if (StringUtils.isNotBlank(srcImage.getName())){
								FunctionUtil.getInstance().moveFile(srcImage.getName());
							}
						}
						srcUser.setImage(image);
					}
				}
			}
			
			srcUser.setUsername(user.getUsername());
			srcUser.setPseudonym(user.getPseudonym());
			srcUser.setPhone(user.getPhone());
			srcUser.setIntroductionMyselef(user.getIntroductionMyselef());
			srcUser.setSpeciality(user.getSpeciality());
			srcUser.setRepresentativeWorks(user.getRepresentativeWorks());
			try {
				userDao.merge(srcUser);
				rm.setDataModel(ObjectConvertion.userToUserData(srcUser));
				rm.setStatus(true);
			} catch (Exception e) {
				rm.setMessage("更新用户信息失败!");
				logger.error("更新用户信息失败:" + e.getMessage());
				e.printStackTrace();
			}
		}
		return rm;
	}

	@Override
	public ResponseMessage addUser(User user,HttpSession session) {
		ResponseMessage rm = isValid(user,session);
		if (rm.isStatus()){
			if (isEmailExist(user.getEmail())){
				rm.setStatus(false);
				rm.setMessage("已存在相同的邮箱账号");
			} else {
				try {
					String password = CommonUtil.encodePassword(user.getPassword());
					user.setPassword(password);
					userDao.save(user);
					if (StringUtils.isBlank(user.getId())){
						rm.setStatus(false);
						rm.setMessage("注册用户失败");
						return rm;
					}
					logger.info("start email:");
					//保存成功之后发送验证码到邮箱，同时保存到数据库
					boolean isSuccess = sendCodeToEmail(user);
					logger.info("end email result:"+isSuccess);
					rm.setDataModel(ObjectConvertion.userToUserData(user));
				} catch (Exception e) {
					rm.setStatus(false);
					rm.setMessage(e.getMessage());
					e.printStackTrace();
				}
			}
		}
		return rm;
	}
	
	private ResponseMessage checkUpdateUserInfo(User user){
		ResponseMessage rm = new ResponseMessage();
		if (null == user){
			rm.setMessage("不能获取到用户的修改信息");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getId())){
			rm.setMessage("用户的ID为空");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getUsername()) || user.getUsername().length() > 20){
			rm.setMessage("真实姓名不能为空，且长度不能超过20位");
			return rm;
		}
		
		if (StringUtils.isNotBlank(user.getPseudonym()) && user.getPseudonym().length() > 20){
			rm.setMessage("笔名长度不能超过20位");
			return rm;
		}
		
		if (StringUtils.isNotBlank(user.getPhone()) && !ValidateUtil.getInstance().isValidPhone(user.getPhone())){
			rm.setMessage("请填写正确的手机号码");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getIntroductionMyselef()) || user.getIntroductionMyselef().length() > 200){
			rm.setMessage("个人简介不能为空，且长度不能超过200位");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getSpeciality()) || user.getSpeciality().length() > 200){
			rm.setMessage("擅长领域长度不能为空，且不能超过200位");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getRepresentativeWorks()) || user.getRepresentativeWorks().length() > 200){
			rm.setMessage("代表作品不能为空，且长度不能超过200位");
			return rm;
		}
		rm.setStatus(true);
		return rm;
	}

	@Override
	public ResponseMessage getPublisher(int page, int pageSize) {
		ResponseMessage rm = new ResponseMessage();
		try {
			Object[] obj = userDao.getPublisher(page, pageSize);
			Object[] userData = covertObjectToUserData(obj);
			rm.setDataList(userData);
			rm.setTotal((int)obj[1]);
			rm.setStatus(true);
		} catch (Exception e) {
			logger.error("获取出版人失败:"+e.getMessage());
			rm.setMessage("获取出版人失败！");
			e.printStackTrace();
		}
		
		return rm;
	}

	@Override
	public ResponseMessage addOrUpdateToppic(Topic topic,boolean isUpdateTopic) {
		ResponseMessage rm = isValidTopic(topic);
		if (rm.isStatus()){
			
			User srcUser = userDao.getByPK(User.class, topic.getUserId());
			if (null == srcUser){
				rm.setMessage("用户的id错误");
				return rm;
			}
			
			topic.setUser(srcUser);
			
			Date date = new Date();
			if (isUpdateTopic){
				if (StringUtils.isBlank(topic.getId())){
					rm.setStatus(false);
					rm.setMessage("修改选题的ID不能为空");
					return rm;
				}
				Topic srcTopic = topicDao.getByPK(Topic.class, topic.getId());
				
				if (null == srcTopic){
					rm.setStatus(false);
					rm.setMessage("修改选题的ID错误，不能修改");
					return rm;
				}
				srcTopic.setContent(topic.getContent());
				srcTopic.setModifyDate(date);
				topicDao.save(srcTopic);
				rm.setDataModel(ObjectConvertion.TopicToTopicData(srcTopic));
			} else {
				topic.setSaveDate(date);
				topic.setModifyDate(date);
				topicDao.save(topic);
				rm.setDataModel(ObjectConvertion.TopicToTopicData(topic));
			}
		}
		return rm;
	}
	
	private ResponseMessage isValidTopic(Topic topic){
		ResponseMessage rm = new ResponseMessage();
		if (null == topic){
			rm.setMessage("不能获取到发布选题的相关信息");
			return rm;
		}
		
		if (StringUtils.isBlank(topic.getContent()) || topic.getContent().length() > 200){
			rm.setMessage("发布选题内容不能为空,且长度不能超过200位");
			return rm;
		}
		
		if (StringUtils.isBlank(topic.getUserId())){
			rm.setMessage("不能获取到当前登录人的信息");
			return rm;
		}
		
		rm.setStatus(true);
		return rm;
	}

	@Override
	public ResponseMessage reSendCodeToEmail(User user) {
		ResponseMessage rm = new ResponseMessage();
		
		if (null == user){
			rm.setMessage("不能获取参数信息");
			return rm;
		}
		User srcUser = null;
		if (StringUtils.isNotBlank(user.getId())){
			srcUser = userDao.getByPK(User.class, user.getId());
		} else {
			if (StringUtils.isNotBlank(user.getEmail())){
				List<User> users = userDao.getUsersByEmail(user.getEmail());
				if (null == users || users.isEmpty()){
					rm.setMessage("此邮件不存在");
					return rm;
				}
				
				if (users.size() > 1){
					rm.setMessage("此邮件存在多个，请联系管理员");
					return rm;
				}
				srcUser = users.get(0);
			} else {
				rm.setMessage("邮箱不能为空");
				return rm;
			}
		}
		
		if (null == srcUser){
			logger.warn("不能从数据库获得对象，ID为:" + user.getId());
			rm.setMessage("不能找到用户对象，id错误。");
			return rm;
		}
		
		if (StringUtils.isBlank(srcUser.getEmail())){
			logger.warn("用户的邮箱为空，不能发送邮件，ID为:" + user.getId());
			rm.setMessage("用户的邮箱为空，不能发送邮件。");
			return rm;
		}
		
		if (sendCodeToEmail(srcUser)){
			rm.setStatus(true);
		} else {
			rm.setMessage("发送验证码到邮件失败");
		}
		
		return rm;
	}

	@Override
	public ResponseMessage activeUser(User user) {
		ResponseMessage rm = new ResponseMessage();
		
		if (StringUtils.isBlank(user.getEmailCode())){
			rm.setMessage("不能获取到验证码");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getId())){
			rm.setMessage("不能获取到用户的ID信息");
			return rm;
		}
		
		User srcUser = userDao.getByPK(User.class, user.getId());
		
		if (null == srcUser){
			logger.warn("不能从数据库获得对象，ID为:" + user.getId());
			rm.setMessage("不能找到用户对象，id错误");
			return rm;
		}
		
//		获取时间，激活
		Date srcDate = srcUser.getModifyTime();
		Date newDate = new Date();
		long seconds = newDate.getTime() - srcDate.getTime();
		if (seconds/1000/60 > 30){
			rm.setMessage("有效期时间失效，请重新获取验证码。");
		} else {
			if (user.getEmailCode().equals(srcUser.getEmailCode())){
				srcUser.setActive("1");
				srcUser.setModifyTime(newDate);
				try {
					userDao.merge(srcUser);
					rm.setDataModel(ObjectConvertion.userToUserData(srcUser));
					rm.setStatus(true);
				} catch (Exception e) {
					logger.error("验证失败：" + e.getMessage());
					rm.setMessage("验证失败");
					e.printStackTrace();
				}
			} else {
				rm.setMessage("验证码错误。");
			}
		}
		
		return rm;
	}

	@Override
	public ResponseMessage updateUserPhone(User user) {
		ResponseMessage rm = new ResponseMessage();
		if (null == user){
			rm.setMessage("不能获取用户的相关信息");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getId())){
			rm.setMessage("用户的ID不能为空");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getPhone())){
			rm.setMessage("请填写用户的电话号码");
			return rm;
		}
		
		if (!ValidateUtil.getInstance().isValidPhone(user.getPhone())){
			rm.setMessage("请填写正确的电话号码");
			return rm;
		}
		
		User srcUser = userDao.getByPK(User.class, user.getId());
		
		if (null == srcUser){
			rm.setMessage("用户的ID不正确");
			return rm;
		}
		
		srcUser.setPhone(user.getPhone());
		try {
			userDao.save(srcUser);
			rm.setStatus(true);
		} catch (Exception e) {
			logger.error("更新电话号码失败：" + e.getMessage());
			rm.setMessage("更新电话号码失败");
		}
		
		return rm;
	}

	@Override
	public ResponseMessage getTopicByUserId(String userId) {
		ResponseMessage rm = new ResponseMessage();
		if (StringUtils.isBlank(userId)){
			rm.setMessage("用户的ID为空");
			return rm;
		}
		List<Topic> topics = topicDao.getTopicByUserId(userId);
		if (null != topics && !topics.isEmpty()){
			rm.setDataModel(ObjectConvertion.TopicToTopicData(topics.get(0)));
		}
		rm.setStatus(true);
		return rm;
	}
	
	@Override
	public ResponseMessage getAllTopicByPage(int page, int pageSize) {
		ResponseMessage rm = new ResponseMessage();
		try {
			Object[] obj = topicDao.getAllTopicByPage(page, pageSize);
			Object[] userData = ObjectConvertion.covertObjectArrayToTopicDataArray(obj);
			rm.setDataList(userData);
			rm.setTotal((int)obj[1]);
			rm.setStatus(true);
		} catch (Exception e) {
			logger.error("获取出版人失败:"+e.getMessage());
			rm.setMessage("获取出版人失败！");
			e.printStackTrace();
		}
		
		return rm;
	}
	
	private Object[] covertObjectToUserData(Object[] obj){
		@SuppressWarnings("unchecked")
		List<User> users = (List<User>) obj[0];
		List<UserData> userDatas = new ArrayList<>();
		if (null != users && !users.isEmpty()){
			for (User user : users){
				userDatas.add(ObjectConvertion.userToUserData(user));
			}
		}
		return userDatas.toArray();
	}

	@Override
	public ResponseMessage isLogin(String userId) {
		ResponseMessage rm = new ResponseMessage();
		if(StringUtils.isBlank(userId)){
			return rm;
		}
		
		User user = userDao.getByPK(User.class, userId);
		if (null == user){
			return rm;
		}
		rm.setStatus(true);
		rm.setDataModel(ObjectConvertion.userToUserData(user));
		return rm;
	}

	@Override
	public ResponseMessage updateUserStatus(User user) {
		ResponseMessage rm = new ResponseMessage();
		if (null == user){
			rm.setMessage("不能获取用户的相关信息");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getId())){
			rm.setMessage("用户的ID不能为空");
			return rm;
		}
		
		if (StringUtils.isBlank(user.getStatus())){
			rm.setMessage("用户的身份信息错误");
			return rm;
		}
		
		User srcUser = userDao.getByPK(User.class, user.getId());
		
		if (null == srcUser){
			rm.setMessage("用户的ID不正确");
			logger.error("更新用户身份信息时输入的ID错误：" + user.getId());
			return rm;
		}
		
		srcUser.setStatus(user.getStatus());
		try {
			userDao.save(srcUser);
			rm.setDataModel(ObjectConvertion.userToUserData(srcUser));
			rm.setStatus(true);
		} catch (Exception e) {
			logger.error("更新用户身份信息失败：" + e.getMessage());
			rm.setMessage("更新用户身份信息失败");
		}
		
		return rm;
	}

	@Override
	public ResponseMessage getAllTopicByPage(Topic topic, int page, int pageSize) {
		ResponseMessage rm = new ResponseMessage();
		try {
			Object[] topicArray = topicDao.getAllTopicByPage(topic, page, pageSize);
			@SuppressWarnings("unchecked")
			List<Topic> topics = (List<Topic>) topicArray[0];
			rm.setDataList(topics.toArray());
			rm.setTotal((int)topicArray[1]);
			rm.setStatus(true);
		} catch (Exception e) {
			rm.setMessage(e.getMessage());
			e.printStackTrace();
		}
		return rm;
	}

	@Override
	public ResponseMessage updateTopicByManage(Topic topic) {
		ResponseMessage rm = new ResponseMessage();
		if (topic == null){
			rm.setMessage("不能获取选题参数信息");
			return rm;
		}
		
		String id = topic.getId();
		if (StringUtils.isBlank(id)){
			rm.setMessage("选题的ID不能为空");
			return rm;
		}
		
		Topic srcTopic = topicDao.getByPK(Topic.class, id);
		if (null == srcTopic){
			rm.setMessage("不存在此选题 的ID信息:" + id);
			return rm;
		}
		
		if(null != topic.getDisplayUser()){
			String displayUserId = topic.getDisplayUser().getId();
			if (StringUtils.isNotBlank(displayUserId)){
				User displayUser = userDao.getByPK(User.class, displayUserId);
				if (null == displayUser){
					rm.setMessage("不存在此选题 用户的ID信息:" + displayUserId);
					return rm;
				}
				srcTopic.setDisplayUser(displayUser);
			}
		}
		
		srcTopic.setProductionType(topic.getProductionType());
		srcTopic.setContent(topic.getContent());
		srcTopic.setHeaderDisplay(topic.isHeaderDisplay());
		srcTopic.setHeaderMsg(topic.getHeaderMsg());
		srcTopic.setSort(topic.getSort());
		srcTopic.setIndexFocusSort(topic.getIndexFocusSort());
		try {
			topicDao.save(srcTopic);
			rm.setStatus(true);
		} catch (Exception e) {
			e.printStackTrace();
			rm.setMessage("修改选题信息失败");
		}
		return rm;
	}

	@Override
	public ResponseMessage updateTopicCheck(List<String> ids, boolean isPass) {
		ResponseMessage rm = new ResponseMessage();
		if (ids !=null && ids.size() > 0){
			Set<String> notExistId = new HashSet<>();
			Set<String> failed = new HashSet<>();
			for (String id : ids){
				if (StringUtils.isNotBlank(id)){
					Topic srcTopic = topicDao.getByPK(Topic.class, id);
					if (null != srcTopic){
						if (isPass){
							srcTopic.setPass("1");
						} else {
							srcTopic.setPass("0");
						}
						try {
							topicDao.save(srcTopic);
						} catch (Exception e) {
							failed.add(srcTopic.getId());
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
	public ResponseMessage deleteTopic(List<String> ids) {
		ResponseMessage rm = new ResponseMessage();
		if (null != ids && ids.size() > 0){
			Set<String> notExistId = new HashSet<>();
			Set<String> failed = new HashSet<>();
			for(String id : ids){
				Topic srcTopic = topicDao.getByPK(Topic.class, id);
				if (null != srcTopic){
					srcTopic.setDelete(true);
					try {
						topicDao.save(srcTopic);
					} catch (Exception e) {
						failed.add(srcTopic.getId());
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
	public ResponseMessage getTopicFocus(int page, int pageSize, boolean isManage) {
		ResponseMessage rm = new ResponseMessage();
		try {
			Object[] topic = topicDao.getTopicFoucsByPage(page, pageSize);
			if (isManage){
				@SuppressWarnings("unchecked")
				List<Topic> topics = (List<Topic>) topic[0];
				rm.setDataList(topics.toArray());
			} else {
				Object[] topicData = ObjectConvertion.covertObjectArrayToTopicDataArray(topic);
				rm.setDataList(topicData);
			}
			rm.setTotal((int)topic[1]);
			rm.setStatus(true);
		} catch (Exception e) {
			rm.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return rm;
	}

	@Override
	public ResponseMessage cancleTopicFoucsDisplay(List<String> ids) {
		ResponseMessage rm = new ResponseMessage();
		if (null != ids && ids.size() > 0){
			Set<String> notExistId = new HashSet<>();
			Set<String> failed = new HashSet<>();
			for(String id : ids){
				Topic topic = topicDao.getByPK(Topic.class, id);
				if (null != topic){
					topic.setHeaderDisplay(false);
					try {
						topicDao.save(topic);
					} catch (Exception e) {
						failed.add(topic.getId());
						logger.error("取消出版人焦点显示失败：" + e.getMessage());
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
	public ResponseMessage getAllUser(User user) {
		ResponseMessage rm = new ResponseMessage();
		try {
			Object[] userObj = null;
			List<User> users = null;
			if (user.isEnablePage()){
				 userObj = userDao.getAllUser(user);
				 users = (List<User>) userObj[0];
				 rm.setTotal((int)userObj[1]);
			} else {
				users =userDao.getAllUserNoPage("");
				rm.setTotal(users.size());
			}
			rm.setDataList(users.toArray());
			rm.setStatus(true);
		} catch (Exception e) {
			rm.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return rm;
	}

	@Override
	public ResponseMessage updateUserByManager(User user) {
		ResponseMessage rm = new ResponseMessage();
		if(null == user){
			rm.setMessage("不能获取用户的参数");
			return rm;
		}
		
		String id = user.getId();
		if (StringUtils.isBlank(id)){
			rm.setMessage("用户的ID未空");
			return rm;
		}
		User srcUser = userDao.getByPK(User.class, id);
		if (null == srcUser){
			rm.setMessage("用户的ID错误");
			return rm;
		}
		//检查图片
		if (StringUtils.isNotBlank(user.getImageId())){
			Image image = null;
			if (null == srcUser.getImage()){
				image = uploadDao.getByPK(Image.class, user.getImageId());
				if (null == image){
					rm.setMessage("不能查询到图片信息，图片ID错误：" + user.getImageId());
					return rm;
				}
				srcUser.setImage(image);
			} else {
				if (!user.getImageId().equals(srcUser.getImage().getId())){
					image = uploadDao.getByPK(Image.class, user.getImageId());
					if (null == image){
						rm.setMessage("不能查询到图片信息，图片ID错误：" + user.getImageId());
						return rm;
					}
					Image srcImage = srcUser.getImage();
					//如果原来有图片，将原来的图片删除标志设为true，同时将与原来的图片移到deletebak文件夹下
					if (null != srcImage && !srcImage.getId().equals(image.getId())){
						srcImage.setIsDelete(true);
						uploadDao.merge(srcImage);
						if (StringUtils.isNotBlank(srcImage.getName())){
							FunctionUtil.getInstance().moveFile(srcImage.getName());
						}
					}
					srcUser.setImage(image);
				}
			}
		}
		
		srcUser.setUsername(user.getUsername());
		srcUser.setPseudonym(user.getPseudonym());
		srcUser.setEmail(user.getEmail());
		srcUser.setActive(user.getActive());
		srcUser.setStatus(user.getStatus());
		srcUser.setPhone(user.getPhone());
		srcUser.setIntroductionMyselef(user.getIntroductionMyselef());
		srcUser.setSpeciality(user.getSpeciality());
		srcUser.setRepresentativeWorks(user.getRepresentativeWorks());
		srcUser.setManager(user.isManager());
		srcUser.setPublishType(user.getPublishType());
		srcUser.setProductionType(user.getProductionType());
		srcUser.setTopicRequire(user.getTopicRequire());
		try {
			userDao.merge(srcUser);
			rm.setStatus(true);
		} catch (Exception e) {
			rm.setMessage("更新用户信息失败!");
			logger.error("管理系统-更新用户信息失败:" + e.getMessage());
			e.printStackTrace();
		}
		return rm;
	}

	@Override
	public ResponseMessage deleteUser(List<String> ids) {
		ResponseMessage rm = new ResponseMessage();
		if (null != ids && ids.size() > 0){
			Set<String> notExistId = new HashSet<>();
			Set<String> failed = new HashSet<>();
			for(String id : ids){
				User srcUser = userDao.getByPK(User.class, id);
				if (null != srcUser){
					srcUser.setDelete(true);
					try {
						userDao.save(srcUser);
					} catch (Exception e) {
						failed.add(srcUser.getUsername());
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
	public ResponseMessage setManager(List<String> ids, boolean isManager) {
		ResponseMessage rm = new ResponseMessage();
		if (ids !=null && ids.size() > 0){
			Set<String> notExistId = new HashSet<>();
			Set<String> failed = new HashSet<>();
			for (String id : ids){
				if (StringUtils.isNotBlank(id)){
					User srcUser = userDao.getByPK(User.class, id);
					if (null != srcUser){
						srcUser.setManager(isManager);
						try {
							userDao.save(srcUser);
						} catch (Exception e) {
							failed.add(srcUser.getUsername());
							logger.error("修改管理员失败：" + e.getMessage());
							e.printStackTrace();
						}
					} else {
						notExistId.add(id);
					}
				}
			}
			StringBuffer msg = new StringBuffer();
			if (failed.size() > 0){
				msg.append(failed).append("，修改管理员失败").append("<br/>");
			}
			if (notExistId.size() > 0){
				msg.append(notExistId).append("，这些ID不存在").append("<br/>");
			}
			
			if (msg.length() == 0){
				rm.setStatus(true);
			}
			
			rm.setMessage(msg.toString());
		} else {
			rm.setMessage("不能获取用户的ID信息");
		}
		return rm;
	}

	@Override
	public ResponseMessage addSystemSet(SystemSet systemSet) {
		ResponseMessage rm = ModelCheckUtil.getInstance().SystemSetCheck(systemSet, false);
		if (rm.isStatus()) {
			rm.setStatus(false);
			try {
				
				List<SystemSet> systemSets = systemSetDao.getSystemSetDefaultValue();
				if (systemSets!=null && systemSets.size() > 0){
					rm.setMessage("系统设置当前只能有一条数据，请刷新页面重试");
					return rm;
				}
				
				String userId = systemSet.getUser().getId();
				User srcUser = userDao.getByPK(User.class, userId);
				if (srcUser == null){
					rm.setMessage("当前操作人的ID不存在");
					return rm;
				}
				systemSet.setId(null);
				systemSet.setUser(srcUser);
				systemSetDao.save(systemSet);
				rm.setStatus(true);
				rm.setDataModel(systemSet);
			} catch (Exception e) {
				rm.setStatus(false);
				rm.setMessage(e.getMessage());
				e.printStackTrace();
			}
		}
		return rm;
	}

	@Override
	public ResponseMessage updateSystemSet(SystemSet systemSet) {
		ResponseMessage rm = ModelCheckUtil.getInstance().SystemSetCheck(systemSet, true);
		if (rm.isStatus()) {
			rm.setStatus(false);
			try {
				
				SystemSet srcSystemSet = systemSetDao.getByPK(SystemSet.class, systemSet.getId());
				if (srcSystemSet == null){
					rm.setMessage("不存在该系统设置的ID信息");
					return rm;
				}
				String userId = systemSet.getUser().getId();
				User srcUser = userDao.getByPK(User.class, userId);
				if (srcUser == null){
					rm.setMessage("当前操作人的ID不存在");
					return rm;
				}
				srcSystemSet.setVersion(systemSet.getVersion());
				srcSystemSet.setVersionDesc(systemSet.getVersionDesc());
				srcSystemSet.setUser(srcUser);
				
				systemSetDao.save(srcSystemSet);
				rm.setStatus(true);
				rm.setDataModel(systemSet);
			} catch (Exception e) {
				rm.setStatus(false);
				rm.setMessage(e.getMessage());
				e.printStackTrace();
			}
		}
		return rm;
	}

	@Override
	public ResponseMessage getSystemSetDefaultValue() {
		ResponseMessage rm = new ResponseMessage();
		List<SystemSet> systemSets = systemSetDao.getSystemSetDefaultValue();
		if (systemSets== null || systemSets.size() == 0){
			rm.setStatus(true);
			return rm;
		}
		rm.setDataModel(ObjectConvertion.systemSetToData(systemSets.get(0)));
		rm.setStatus(true);
		return rm;
	}

	@Override
	public ResponseMessage addUserByPhone(User user) {
		ResponseMessage rm = new ResponseMessage();
		if (StringUtils.isBlank(user.getPhone())){
			rm.setMessage("用户电话号码为空");
			return rm;
		}
		if (!ValidateUtil.getInstance().isValidPhone(user.getPhone())){
			rm.setMessage("请输入一个正确的电话号码");
			return rm;
		}
		
		List<User> users = userDao.getUserByPhone(user.getPhone());
		if (users!= null && users.size() > 0){
			rm.setMessage("已存在此号码的用户，请不要重复提交");
			return rm;
		}
		
		user.setId(null);
		try {
			userDao.save(user);
			rm.setStatus(true);
		} catch (Exception e) {
			logger.error("根据电话号码增加用户失败:" + e.getMessage());
			e.printStackTrace();
		}
		return rm;
	}

	@Override
	public ResponseMessage addUserByManager(User user) {
		ResponseMessage rm = new ResponseMessage();
		try {
			
			if (StringUtils.isNotBlank(user.getImageId())){
				Image image = uploadDao.getByPK(Image.class, user.getImageId());
				if (image == null){
					rm.setMessage("不存在此图片的ID信息");
					return rm;
				}
				user.setImage(image);
			}
			
			user.setId(null);
			userDao.save(user);
			rm.setStatus(true);
		} catch (Exception e) {
			logger.error("管理系统增加增加用户失败:" + e.getMessage());
			e.printStackTrace();
		}
		return rm;
	}

	@Override
	public ResponseMessage addTopicByManage(Topic topic) {
		ResponseMessage rm = new ResponseMessage();
		try {
			if (StringUtils.isBlank(topic.getUserId())){
				rm.setMessage("不能获取当前操作用户的ID");
				return rm;
			}
			User srcUser = userDao.getByPK(User.class, topic.getUserId());
			if (null == srcUser){
				rm.setMessage("不存在当前操作用户的ID，请刷新页面重试");
				return rm;
			}
			topic.setUser(srcUser);
			
			if(null != topic.getDisplayUser()){
				String displayUserId = topic.getDisplayUser().getId();
				if (StringUtils.isNotBlank(displayUserId)){
					User displayUser = userDao.getByPK(User.class, displayUserId);
					if (null == displayUser){
						rm.setMessage("不存在此选题 用户的ID信息:" + displayUserId);
						return rm;
					}
					topic.setDisplayUser(displayUser);
				}
			}
			
			topic.setId(null);
			topicDao.save(topic);
			rm.setStatus(true);
		} catch (Exception e) {
			logger.error("管理系统增加增加选题失败:" + e.getMessage());
			e.printStackTrace();
		}
		return rm;
	}

	@Override
	public ResponseMessage getAllPubliser() {
		ResponseMessage rm = new ResponseMessage();
		List<User> publishers = userDao.getAllPubliser();
		rm.setDataList(publishers.toArray());
		rm.setStatus(true);
		return rm;
	}
}
