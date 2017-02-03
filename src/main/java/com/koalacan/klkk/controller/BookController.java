package com.koalacan.klkk.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping("book")
public class BookController {
	
	HashMap<String,Object> map=new HashMap<String,Object>();

	/**
	 * @author fengchao
	 * @date 2017年2月3日
	 * 注释 新增书籍
	 */
	@RequestMapping("addbook")
	public void Bookadd(MultipartFile photo,HttpServletResponse response){
		String path=System.getProperty("webapp.root");
		String filename=System.currentTimeMillis()+".jpg";
		path=path+"bookImg"+File.separator+filename;
		File targetfile=new File(path);
		try {
			photo.transferTo(targetfile);
			map.put("status", "success");
			map.put("data", filename);
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}
		ObjectMapper mapper=new ObjectMapper();
		try {
			response.getWriter().print(mapper.writeValueAsString(map));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@RequestMapping("bookphoto")
	public void BookPhotoadd(MultipartFile photo,HttpServletResponse response,HttpServletRequest request){
		String path=request.getServletContext().getRealPath("/");
		String filename=System.currentTimeMillis()+".jpg";
		path=path+"bookImg"+File.separator+filename;
		File targetfile=new File(path);
		try {
			if(!targetfile.exists()){
				targetfile.createNewFile();
			}
			photo.transferTo(targetfile);
			map.put("status", "success");
			map.put("data", filename);
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}
		ObjectMapper mapper=new ObjectMapper();
		try {
			response.getWriter().print(mapper.writeValueAsString(map));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
