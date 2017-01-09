/**
 * 
 */
package com.koalacan.klkk.controller;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.koalacan.klkk.model.Production;
import com.koalacan.klkk.model.RequestParamEntity;
import com.koalacan.klkk.model.ResponseMessage;
import com.koalacan.klkk.model.SystemSet;
import com.koalacan.klkk.model.Topic;
import com.koalacan.klkk.model.User;
import com.koalacan.klkk.model.datamodel.UserData;
import com.koalacan.klkk.service.ProductionService;
import com.koalacan.klkk.service.UserService;

/**
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/manage")
public class ManageController {

	@Autowired
	private UserService<User> userService;
	@Autowired
	private ProductionService<Production> productionService;
	
	//登录
	@RequestMapping(value = "/login",method = RequestMethod.POST)
	@ResponseBody
	public void login(@RequestBody User user, PrintWriter pw,HttpSession session) {
		ResponseMessage rm = userService.login(user,true);
		if (rm.isStatus()){
			UserData managerUser = (UserData) rm.getDataModel();
			if (managerUser.isManager()){
				String sessionId = session.getId();
				session.setAttribute(sessionId, rm.getDataModel());
			} else {
				rm.setStatus(false);
				rm.setMessage("你没有权限登录管理系统");
			}
		}
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//获取所有作品
	@RequestMapping(value = "/allProduct",method = RequestMethod.GET)
	@ResponseBody
	public void getAllProductByPage(HttpServletRequest request,PrintWriter pw) {
		int pagesize = Integer.parseInt((String) request.getParameter("limit"));
		int page = Integer.parseInt((String) request.getParameter("page"));
		String name = request.getParameter("name");
		String status = request.getParameter("status");
		String productionType = request.getParameter("productionType");
		String commit = request.getParameter("commit");
		String completeYear = request.getParameter("completeYear");
		String completeMonth = request.getParameter("completeMonth");
		String completeWeek = request.getParameter("completeWeek");
		String pass = request.getParameter("pass");
		
		Production production = new Production();
		production.setName(name);
		production.setStatus(status);
		production.setProductionType(productionType);
		production.setCompleteYear(completeYear);
		production.setCompleteMonth(completeMonth);
		production.setCompleteWeek(completeWeek);
		production.setPass(pass);
		
		ResponseMessage rm = productionService.getAllProduct(production,commit,page,pagesize);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-获取未出版作品/已出版作品
	@RequestMapping(value = "/publish/{isUnpublish}",method = RequestMethod.GET)
	public void getUnpublish( Production production,@PathVariable boolean isUnpublish,PrintWriter pw) {
		ResponseMessage rm = productionService.getProductByManager(production, isUnpublish, true);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-获取首页焦点信息
	@RequestMapping(value = "/product/focus",method = RequestMethod.GET)
	@ResponseBody
	public void getProductFoucsByPage(HttpServletRequest request,PrintWriter pw) {
		int pagesize = Integer.parseInt((String) request.getParameter("limit"));
		int page = Integer.parseInt((String) request.getParameter("page"));
		
		ResponseMessage rm = productionService.getProductFoucsByPage(page,pagesize,true);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-首页焦点修改
	@RequestMapping(value = "/product/focus",method = RequestMethod.PUT)
	@ResponseBody
	public void updateProductFoucusMsg(@RequestBody Production production, PrintWriter pw) {
		ResponseMessage rm = productionService.updateProductionFoucusMsg(production);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-首页焦点删除(取消主页显示)
	@RequestMapping(value = "/product/focus",method = RequestMethod.DELETE,consumes="application/json")
	@ResponseBody
	public void cancleIndexFocusDispaly(@RequestBody RequestParamEntity request, PrintWriter pw) {
		ResponseMessage rm = productionService.cancleIndexFocusDispaly(request.getIds());
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统作品添加
	@RequestMapping(value = "/production",method = RequestMethod.POST)
	@ResponseBody
	public void addProductionByManage(@RequestBody Production production, PrintWriter pw) {
		ResponseMessage rm = productionService.addProductionByManage(production);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统作品修改
	@RequestMapping(value = "/production",method = RequestMethod.PUT)
	@ResponseBody
	public void updateProductionByManage(@RequestBody Production production, PrintWriter pw) {
		ResponseMessage rm = productionService.updateProductionByManage(production);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统作品审核
	@RequestMapping(value = "/production/{pass}",method = RequestMethod.PUT)
	@ResponseBody
	public void updateProductCheck(@RequestBody RequestParamEntity request,@PathVariable boolean pass, PrintWriter pw) {
		ResponseMessage rm = productionService.updateProductCheck(request.getIds(),pass);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统作品删除
	@RequestMapping(value = "/product/delete",method = RequestMethod.DELETE,consumes="application/json")
	@ResponseBody
	public void deleteProduct(@RequestBody RequestParamEntity request, PrintWriter pw) {
		ResponseMessage rm = productionService.deleteProduct(request.getIds());
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//获取所有选题
	@RequestMapping(value = "/topic",method = RequestMethod.GET)
	@ResponseBody
	public void getAllTopicByPage(HttpServletRequest request,PrintWriter pw) {
		int pagesize = Integer.parseInt((String) request.getParameter("limit"));
		int page = Integer.parseInt((String) request.getParameter("page"));
		String productionType = request.getParameter("productionType");
		String content = request.getParameter("content");
		String pass = request.getParameter("pass");
		
		Topic topic = new Topic();
		topic.setProductionType(productionType);
		topic.setContent(content);
		topic.setPass(pass);
		
		ResponseMessage rm = userService.getAllTopicByPage(topic, page, pagesize);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-选题增加
	@RequestMapping(value = "/topic",method = RequestMethod.POST)
	@ResponseBody
	public void addTopicByManage(@RequestBody Topic topic, PrintWriter pw) {
		ResponseMessage rm = userService.addTopicByManage(topic);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-选题修改
	@RequestMapping(value = "/topic",method = RequestMethod.PUT)
	@ResponseBody
	public void updateTopicByManage(@RequestBody Topic topic, PrintWriter pw) {
		ResponseMessage rm = userService.updateTopicByManage(topic);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-选题审核
	@RequestMapping(value = "/topic/{pass}",method = RequestMethod.PUT)
	@ResponseBody
	public void updateTopicCheck(@RequestBody RequestParamEntity request,@PathVariable boolean pass, PrintWriter pw) {
		ResponseMessage rm = userService.updateTopicCheck(request.getIds(),pass);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-选题删除
	@RequestMapping(value = "/topic",method = RequestMethod.DELETE,consumes="application/json")
	@ResponseBody
	public void deleteTopic(@RequestBody RequestParamEntity request, PrintWriter pw) {
		ResponseMessage rm = userService.deleteTopic(request.getIds());
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-出版人获取焦点信息
	@RequestMapping(value = "/topic/focus",method = RequestMethod.GET)
	@ResponseBody
	public void getTopicFoucs(HttpServletRequest request,PrintWriter pw) {
		int pagesize = Integer.parseInt((String) request.getParameter("limit"));
		int page = Integer.parseInt((String) request.getParameter("page"));
		
		ResponseMessage rm = userService.getTopicFocus(page,pagesize,true);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-出版人取消焦点信息
	@RequestMapping(value = "/topic/focus",method = RequestMethod.DELETE)
	@ResponseBody
	public void cancleTopicFoucsDisplay(@RequestBody RequestParamEntity request,PrintWriter pw) {
		ResponseMessage rm = userService.cancleTopicFoucsDisplay(request.getIds());
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-获取所有用户
	@RequestMapping(value = "/user",method = RequestMethod.GET)
	public void getAllUser( User user,PrintWriter pw) {
		ResponseMessage rm = userService.getAllUser(user);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-获取所有出版人
	@RequestMapping(value = "/allPublisher",method = RequestMethod.GET)
	public void getAllPubliser( User user,PrintWriter pw) {
		ResponseMessage rm = userService.getAllPubliser();
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-增加用户
	@RequestMapping(value = "/user",method = RequestMethod.POST)
	@ResponseBody
	public void addUser(@RequestBody User user,PrintWriter pw) {
		ResponseMessage rm = userService.addUserByManager(user);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-编辑用户
	@RequestMapping(value = "/user",method = RequestMethod.PUT)
	@ResponseBody
	public void updateUser(@RequestBody User user,PrintWriter pw) {
		ResponseMessage rm = userService.updateUserByManager(user);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-删除用户
	@RequestMapping(value = "/user",method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteUser(@RequestBody RequestParamEntity request,PrintWriter pw) {
		ResponseMessage rm = userService.deleteUser(request.getIds());
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//管理系统-设置管理员
	@RequestMapping(value = "/user/{isMnager}",method = RequestMethod.PUT)
	@ResponseBody
	public void setManager(@RequestBody RequestParamEntity request,@PathVariable boolean isMnager, PrintWriter pw) {
		ResponseMessage rm = userService.setManager(request.getIds(),isMnager);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//系统设置-add
	@RequestMapping(value = "/systemSet",method = RequestMethod.POST)
	@ResponseBody
	public void addSystemSet(@RequestBody SystemSet systemSet, PrintWriter pw) {
		ResponseMessage rm = userService.addSystemSet(systemSet);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//系统设置-update
	@RequestMapping(value = "/systemSet",method = RequestMethod.PUT)
	@ResponseBody
	public void updateSystemSet(@RequestBody SystemSet systemSet, PrintWriter pw) {
		ResponseMessage rm = userService.updateSystemSet(systemSet);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//系统设置-get
	@RequestMapping(value = "/systemSet",method = RequestMethod.GET)
	@ResponseBody
	public void getSystemSet(PrintWriter pw) {
		ResponseMessage rm = userService.getSystemSetDefaultValue();
		pw.write(rm.toJson(rm));
		pw.close();
	}
}
