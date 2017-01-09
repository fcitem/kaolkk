/**
 * 
 */
package com.koalacan.klkk.controller;

import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.koalacan.klkk.model.ResponseMessage;
import com.koalacan.klkk.model.Topic;
import com.koalacan.klkk.model.User;
import com.koalacan.klkk.model.datamodel.UserData;
import com.koalacan.klkk.service.UserService;


/**
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/user")
public class UserController {
	
	private static Logger logger = Logger.getRootLogger();
	
	@Autowired
	private UserService<User> userService;
	
	//注册
	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	@ResponseBody
	public void addUser(@RequestBody User user, PrintWriter pw, HttpSession session) {
		ResponseMessage rm = userService.addUser(user, session);
		if (rm.isStatus()){
			String sessionId = session.getId();
			session.setAttribute(sessionId, rm.getDataModel());
		}
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//验证邮箱
	@RequestMapping(value = "/activeUser", method = RequestMethod.POST)
	@ResponseBody
	public void activeUser(@RequestBody User user, PrintWriter pw){
		ResponseMessage rm = userService.activeUser(user);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//重发验证码
	@RequestMapping(value = "/reSendCode", method = RequestMethod.POST)
	@ResponseBody
	public void reSendCodeToEmail(@RequestBody User user, PrintWriter pw) {
		ResponseMessage rm = userService.reSendCodeToEmail(user);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//登录
	@RequestMapping(value = "/login",method = RequestMethod.POST)
	@ResponseBody
	public void login(@RequestBody User user, PrintWriter pw,HttpSession session) {
		ResponseMessage rm = userService.login(user,false);
		if (rm.isStatus()){
			String sessionId = session.getId();
			session.setAttribute(sessionId, rm.getDataModel());
		}
		pw.write(rm.toJson(rm));
		pw.close();
	}

	//检测用户是否登录，如果登录返回最新用户数据
	@RequestMapping(value = "/isLogin",method = RequestMethod.GET)
	public void isLogin(HttpSession session, PrintWriter pw) {
		String sessionId = session.getId();
		Object obj = session.getAttribute(sessionId);
		ResponseMessage rm = null;
		if (obj != null){
			String userId = ((UserData)obj).getId();
			rm = userService.isLogin(userId);
		} else {
			rm = new ResponseMessage();
		}
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//退出登录
	@RequestMapping(value = "/exist",method = RequestMethod.POST)
	public void exist(HttpSession session, PrintWriter pw) {
		String sessionId = session.getId();
		session.removeAttribute(sessionId);
		ResponseMessage rm = new ResponseMessage();
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//找回密码
	@RequestMapping(value = "/findPassword",method = RequestMethod.POST)
	@ResponseBody
	public void findPassword(@RequestBody User user, PrintWriter pw,HttpSession session) {
		ResponseMessage rm = userService.findPassword(user, session);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//重置密码
	@RequestMapping(value = "/resetPassword",method = RequestMethod.POST)
	@ResponseBody
	public void resetPassword(@RequestBody User user, PrintWriter pw) {
		ResponseMessage rm = userService.resetPassword(user);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//检查邮件是否存在
	@RequestMapping(value = "/isEmailExist",method = RequestMethod.POST)
	@ResponseBody
	public void isEmailExist(@RequestBody User user, PrintWriter pw) {
		ResponseMessage rm = new ResponseMessage(false);
		if (null == user){
			rm.setMessage("不能获取到用户的参数。");
		} else {
			if (StringUtils.isBlank(user.getEmail())){
				rm.setMessage("邮箱为空");
			} else {
				if (userService.isEmailExist(user.getEmail())){
					rm.setMessage("该邮箱已存在");
				} else {
					rm.setStatus(true);
				}
			}
		}
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//更新用户
	@RequestMapping(value = "/updateUser",method = RequestMethod.PUT)
	@ResponseBody
	public void updateUser(@RequestBody User user, PrintWriter pw) {
		ResponseMessage rm = userService.updateUser(user);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	
	//获取出版人
	@RequestMapping(value = "/publisher/{page}/{pageSize}",method = RequestMethod.GET)
	@ResponseBody
	public void getPublisher(@PathVariable int page,@PathVariable int pageSize,PrintWriter pw) {
		ResponseMessage rm = userService.getPublisher(page,pageSize);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//根据用户的ID获取选题
	@RequestMapping(value = "/topic/{userId}",method = RequestMethod.GET)
	@ResponseBody
	public void getTopic(@PathVariable String userId, PrintWriter pw) {
		ResponseMessage rm = userService.getTopicByUserId(userId);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//添加主题
	@RequestMapping(value = "/addToppic",method = RequestMethod.POST)
	@ResponseBody
	public void addToppic(@RequestBody Topic topic,PrintWriter pw) {
		ResponseMessage rm = userService.addOrUpdateToppic(topic, false);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//获取选题
	@RequestMapping(value = "/topic/{page}/{pageSize}",method = RequestMethod.GET)
	@ResponseBody
	public void getAllTopicByPage(@PathVariable int page,@PathVariable int pageSize,PrintWriter pw) {
		ResponseMessage rm = userService.getTopicFocus(page,pageSize,false);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//更新主题
	@RequestMapping(value = "/updateToppic",method = RequestMethod.PUT)
	@ResponseBody
	public void updateToppic(@RequestBody Topic topic,PrintWriter pw,HttpServletRequest request) {
		ResponseMessage rm = userService.addOrUpdateToppic(topic, true);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//更新电话号码
	@RequestMapping(value = "/updateUserPhone", method = RequestMethod.PUT)
	@ResponseBody
	public void updateUserPhone(@RequestBody User user, PrintWriter pw) {
		ResponseMessage rm = userService.updateUserPhone(user);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//更新用户身份
	@RequestMapping(value = "/updateUserStatus", method = RequestMethod.PUT)
	@ResponseBody
	public void updateUserStatus(@RequestBody User user, PrintWriter pw) {
		ResponseMessage rm = userService.updateUserStatus(user);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//根据用户电话号码增加用户
	@RequestMapping(value = "/addUser/phone", method = RequestMethod.POST)
	@ResponseBody
	public void addUserByPhone(@RequestBody User user, PrintWriter pw) {
		ResponseMessage rm = userService.addUserByPhone(user);
		pw.write(rm.toJson(rm));
		pw.close();
	}
}
