/**
 * 
 */
package com.koalacan.klkk.service;


import java.util.List;

import javax.servlet.http.HttpSession;

import com.koalacan.core.service.CommonService;
import com.koalacan.klkk.model.ResponseMessage;
import com.koalacan.klkk.model.SystemSet;
import com.koalacan.klkk.model.Topic;
import com.koalacan.klkk.model.User;

/**
 * @author Administrator
 *
 */
public interface UserService<T> extends CommonService<T, Long> {

	boolean isEmailExist(String email);
	ResponseMessage isValid(User user,HttpSession session);
	boolean sendCodeToEmail(User user);
	ResponseMessage login(User user,boolean isManagerLogin);
	ResponseMessage findPassword(User user,HttpSession session);
	ResponseMessage resetPassword(User user);
	ResponseMessage updateUser(User user);
	ResponseMessage addUser(User user,HttpSession session);
	ResponseMessage getPublisher(int page, int pageSize);
	ResponseMessage addOrUpdateToppic(Topic topic,boolean isUpdateTopic);
	ResponseMessage reSendCodeToEmail(User user);
	ResponseMessage activeUser(User user);
	ResponseMessage updateUserPhone(User user);
	ResponseMessage getTopicByUserId(String userId);
	ResponseMessage getAllTopicByPage(int page, int pageSize);
	ResponseMessage isLogin(String userId);
	ResponseMessage updateUserStatus(User user);
	ResponseMessage getAllTopicByPage(Topic topic,int page ,int pageSize);
	ResponseMessage addTopicByManage(Topic topic);
	ResponseMessage updateTopicByManage(Topic topic);
	ResponseMessage updateTopicCheck(List<String> ids,boolean isPass);
	ResponseMessage deleteTopic(List<String> ids);
	ResponseMessage getTopicFocus(int page ,int pageSize,boolean isManage);
	ResponseMessage cancleTopicFoucsDisplay(List<String> ids);
	ResponseMessage getAllUser(User user);
	ResponseMessage addUserByManager(User user);
	ResponseMessage updateUserByManager(User user);
	ResponseMessage deleteUser(List<String> ids);
	ResponseMessage setManager(List<String> ids,boolean isManager);
	ResponseMessage addSystemSet(SystemSet systemSet);
	ResponseMessage updateSystemSet(SystemSet systemSet);
	ResponseMessage getSystemSetDefaultValue();
	ResponseMessage addUserByPhone(User user);
	ResponseMessage getAllPubliser();
}
