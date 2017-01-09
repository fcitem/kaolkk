package com.koalacan.klkk.controller;

import java.io.PrintWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.koalacan.klkk.model.OfficialAccount;
import com.koalacan.klkk.model.RequestParamEntity;
import com.koalacan.klkk.model.ResponseMessage;
import com.koalacan.klkk.service.OfficialAccountService;

@Controller
@RequestMapping("/officialAccount")
public class OfficialAccountController {
	
	@Autowired
	private OfficialAccountService<OfficialAccount> officialAccountService;
	
	@RequestMapping(value = "/add",method = RequestMethod.POST)
	@ResponseBody
	public void addOfficialAccount(@RequestBody OfficialAccount officialAccount,PrintWriter pw){
		ResponseMessage rm = officialAccountService.addOfficialAccount(officialAccount);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	@RequestMapping(value = "/update",method = RequestMethod.PUT)
	@ResponseBody
	public void updateOfficialAccout(@RequestBody OfficialAccount officialAccount,PrintWriter pw){
		ResponseMessage rm = officialAccountService.updateOfficialAccount(officialAccount);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	@RequestMapping(value = "/delete",method = RequestMethod.DELETE,consumes="application/json")
	@ResponseBody
	public void deleteOfficialAccout(@RequestBody RequestParamEntity request,PrintWriter pw){
		ResponseMessage rm = officialAccountService.deleteOfficialAccount(request.getIds());
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	@RequestMapping(value = "/allOfficialAccount",method = RequestMethod.GET)
	public void getAllOfficialAccount(OfficialAccount officialAccount,PrintWriter pw){
		ResponseMessage rm = officialAccountService.getAllOfficialAccount(officialAccount);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	@RequestMapping(value = "/headerFocus",method = RequestMethod.GET)
	public void getHeaderFocus(OfficialAccount officialAccount,PrintWriter pw){
		ResponseMessage rm = officialAccountService.getHeaderFocus(officialAccount);
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
	@RequestMapping(value = "/foucus/cancle",method = RequestMethod.DELETE,consumes="application/json")
	@ResponseBody
	public void cancleOfficialAccoutFocus(@RequestBody RequestParamEntity request,PrintWriter pw){
		ResponseMessage rm = officialAccountService.cancleOfficialAccoutFocus(request.getIds());
		pw.write(rm.toJson(rm));
		pw.close();
	}
	
}
