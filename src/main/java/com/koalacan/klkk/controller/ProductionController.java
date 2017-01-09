/**
 * 
 */
package com.koalacan.klkk.controller;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.koalacan.klkk.model.Production;
import com.koalacan.klkk.model.ResponseMessage;
import com.koalacan.klkk.model.User;
import com.koalacan.klkk.service.ProductionService;

/**
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/production")
public class ProductionController {

	private static Logger logger = Logger.getRootLogger();
	@Autowired
	private ProductionService<Production> productionService;
	
	//根据userId获取我的作品
	@RequestMapping(value = "/myAllProduct/{userId}/{page}/{pageSize}",method = RequestMethod.GET)
	@ResponseBody
	public void getProduct(@PathVariable String userId,@PathVariable int page,@PathVariable int pageSize, PrintWriter pw) {
		ResponseMessage rm = productionService.getProductionByUserId(userId,page,pageSize);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//我的作品添加
	@RequestMapping(value = "/production",method = RequestMethod.POST)
	@ResponseBody
	public void saveProduction(@RequestBody Production production, PrintWriter pw) {
		ResponseMessage rm = productionService.saveProduction(production);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//我的作品修改
	@RequestMapping(value = "/production",method = RequestMethod.PUT)
	@ResponseBody
	public void updateProduction(@RequestBody Production production, PrintWriter pw) {
		ResponseMessage rm = productionService.updateProduction(production);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//我的作品提交
	@RequestMapping(value = "/commit/{id}",method = RequestMethod.POST)
	@ResponseBody
	public void commit(@PathVariable String id, PrintWriter pw) {
		ResponseMessage rm = productionService.commitProduction(id);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//根据id获取我的作品
	@RequestMapping(value = "/product/{id}",method = RequestMethod.GET)
	@ResponseBody
	public void getProductById(@PathVariable String id, PrintWriter pw) {
		ResponseMessage rm = productionService.getProductById(id);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//获取首页未出版的
	@RequestMapping(value = "/mainPage/unpublished",method = RequestMethod.GET)
	@ResponseBody
	public void getMainPageUnpublished(PrintWriter pw) {
		ResponseMessage rm = productionService.getUnpublished();
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//获取首页已出版的
	@RequestMapping(value = "/mainPage/published",method = RequestMethod.GET)
	@ResponseBody
	public void getMainPagePublished(PrintWriter pw) {
		ResponseMessage rm = productionService.getPublished();
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//获取首页焦点作品
	@RequestMapping(value = "/mainPage/focus",method = RequestMethod.GET)
	@ResponseBody
	public void getIndexFocus(PrintWriter pw) {
		ResponseMessage rm = productionService.getIndexFocus();
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//获取所有未出版的
	@RequestMapping(value = "/allUnpublished/{page}/{pageSize}",method = RequestMethod.GET)
	@ResponseBody
	public void getAllUnpublished(@PathVariable int page,@PathVariable int pageSize,PrintWriter pw) {
		ResponseMessage rm = productionService.getAllProductByCommit(false, page, pageSize);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	//获取所有已出版的
	@RequestMapping(value = "/allPublished/{page}/{pageSize}",method = RequestMethod.GET)
	@ResponseBody
	public void getAllPublished(@PathVariable int page,@PathVariable int pageSize,PrintWriter pw) {
		ResponseMessage rm = productionService.getAllProductByCommit(true, page, pageSize);
		pw.write(rm.toJson(rm));
		pw.close();
	}
}
