/**
 * 
 */
package com.koalacan.klkk.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.koalacan.core.service.CommonService;
import com.koalacan.klkk.model.ResponseMessage;

/**
 * @author Administrator
 *
 */
public interface UploadService<T> extends CommonService<T, Long> {

	ResponseMessage saveImage(MultipartFile  file,HttpServletRequest request);
	ResponseMessage saveTmpImage(MultipartFile  file,HttpServletRequest request);
	ResponseMessage deleteImage(String id);
}
