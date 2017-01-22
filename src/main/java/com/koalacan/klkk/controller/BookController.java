package com.koalacan.klkk.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping("book")
public class BookController {
	
	HashMap<String,Object> map=new HashMap<String,Object>();

	@RequestMapping("addbook")
	public void Bookadd(MultipartFile photo,HttpServletResponse response){
		String path=System.getProperty("webapp.root");
		String filename=System.currentTimeMillis()+".jpg";
		path=path+File.separator+"bookImg"+File.separator+filename;
		File targetfile=new File(path);
		try {
			photo.transferTo(targetfile);
			map.put("status", "success");
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
