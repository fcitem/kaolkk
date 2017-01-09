/**
 * 
 */
package com.koalacan.klkk.controller;

import java.io.File;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.koalacan.klkk.model.Image;
import com.koalacan.klkk.model.Production;
import com.koalacan.klkk.model.RequestParamEntity;
import com.koalacan.klkk.model.ResponseMessage;
import com.koalacan.klkk.service.UploadService;

/**
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/upload")
public class UploadController {

	private static Logger logger = Logger.getRootLogger();
	
	@Autowired
	private UploadService<Image> uploadService;
	
	//上传图片
	@RequestMapping(value = "/image",method = RequestMethod.POST)
	@ResponseBody
	public void saveImage(@RequestParam(value = "file", required = false)  MultipartFile  file,HttpServletRequest request, PrintWriter pw) {
		ResponseMessage rm = uploadService.saveImage(file, request);
		pw.write(rm.toJson(rm));
	}
	
	//上传图片
	@RequestMapping(value = "/tmpImage",method = RequestMethod.POST)
	@ResponseBody
	public void saveTmpImage(@RequestParam(value = "file", required = false)  MultipartFile  file,HttpServletRequest request, PrintWriter pw) {
		ResponseMessage rm = uploadService.saveTmpImage(file, request);
		pw.write(rm.toJson(rm));
	}
	
	//不保留数据删除图片
	@RequestMapping(value = "/image/{id}",method = RequestMethod.DELETE)
	@ResponseBody
	public void updateTopicCheck(@PathVariable String id, PrintWriter pw) {
		ResponseMessage rm = uploadService.deleteImage(id);
		pw.write(rm.toJson(rm));
		pw.close();
	}
}
