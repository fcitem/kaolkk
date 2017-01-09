/**
 * 
 */
package com.koalacan.klkk.service.impl;

import java.io.File;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.koalacan.core.service.imp.CommonServiceImp;
import com.koalacan.klkk.dao.UploadDao;
import com.koalacan.klkk.dao.UserDao;
import com.koalacan.klkk.model.Image;
import com.koalacan.klkk.model.ResponseMessage;
import com.koalacan.klkk.model.User;
import com.koalacan.klkk.service.UploadService;
import com.koalacan.klkk.util.FunctionUtil;

/**
 * @author Administrator
 *
 */
@Service
@Transactional
public class UploadServiceImpl<T> extends CommonServiceImp<T, Long>implements UploadService<T> {

	private static Logger logger = Logger.getRootLogger();
	
	@Autowired
	UserDao userDao;
	
	@Autowired
	UploadDao uploadDao;
	
	@Override
	public ResponseMessage saveImage(MultipartFile file, HttpServletRequest request) {
		ResponseMessage rm = new ResponseMessage();
		String fileName = file.getOriginalFilename();
		if (StringUtils.isBlank(fileName)){
			rm.setMessage("上传文件名字为空");
			return rm;
			
		}
		
		boolean isManagerOption = false;
		String uploadUserId = "";
		String managerId = (String) request.getParameter("managerId");
		if (StringUtils.isNotBlank(managerId)){
			isManagerOption= true;
			uploadUserId = managerId;
		} else {
			String userId = (String) request.getParameter("userId");
			if (StringUtils.isBlank(userId)){
				rm.setMessage("不能获取上传人的信息");
				return rm;
			}
			uploadUserId = userId;
		}
		
		User user = userDao.getByPK(User.class, uploadUserId);
		if (null == user){
			rm.setMessage("不存在此ID的用户");
			return rm;
		}
		String preId = (String) request.getParameter("imageId");
//		String path = request.getRealPath("/image/upload"); 
		String path = FunctionUtil.getInstance().uploadFilePath; 
		logger.info("basePath:"+FunctionUtil.getInstance().basePath);
		logger.info("path:"+path);
		String suffixName = fileName.substring(fileName.lastIndexOf("."));
		String newFileName = String.valueOf(new Date().getTime()) + suffixName;
		File targetFile = new File(path, newFileName);  
		if(!targetFile.exists()){  
            targetFile.mkdirs();  
        } 
		try {  
            file.transferTo(targetFile); 
            Image image = new Image();
            image.setName(newFileName);
            Date newDate = new Date();
            if (isManagerOption){
            	image.setManagerModifyDate(newDate);
            	image.setManagerId(user);
            } else {
            	image.setUploadDate(newDate);
                image.setModifyDate(newDate);
                image.setUserId(user);
            }
            
            uploadDao.save(image);
            //不断的上传，删除上次上传的图片
            if (StringUtils.isNotBlank(preId)){
            	Image preImage = uploadDao.getByPK(Image.class, preId);
            	if (null != preImage){
            		FunctionUtil.getInstance().deletePicture(preImage.getName());
            		uploadDao.delete(preImage);
            	} else {
            		logger.warn("不能删除原来的图片：图片id:" + preId);
            	}
            }
            rm.setDataModel(image.clone(image));
            rm.setStatus(true);
        } catch (Exception e) {  
            e.printStackTrace();
            rm.setMessage("保存图片失败");
        } 
		return rm;
	}

	@Override
	public ResponseMessage saveTmpImage(MultipartFile file, HttpServletRequest request) {
		ResponseMessage rm = new ResponseMessage();
		String path = FunctionUtil.getInstance().tmpImagePath; 
		logger.info("path:"+path);
		String newFileName = String.valueOf(new Date().getTime());
		File targetFile = new File(path, newFileName);  
		if(!targetFile.exists()){  
            targetFile.mkdirs();  
        } 
		try {  
            file.transferTo(targetFile); 
            Image image = new Image();
            image.setName(newFileName);
            rm.setDataModel(image.clone(image));
            rm.setStatus(true);
        } catch (Exception e) {  
            e.printStackTrace();
            rm.setMessage(e.getMessage());
        }
		
		return rm;
	}

	@Override
	public ResponseMessage deleteImage(String id) {
		ResponseMessage rm = new ResponseMessage();
		if (StringUtils.isBlank(id)){
			rm.setMessage("图片ID不能为空");
			return rm;
		}
		
		Image srcImage = uploadDao.getByPK(Image.class, id);
		
		if (null == srcImage){
			rm.setMessage("不存在此图片的ID信息");
			return rm;
		}
		if (StringUtils.isNotBlank(srcImage.getName())){
			boolean deletetResult = FunctionUtil.getInstance().deletePicture(srcImage.getName());
			if (!deletetResult){
				logger.warn("从硬盘上删除图标失败,文件名：" + srcImage.getName());
			}
		}
		uploadDao.delete(srcImage);
		rm.setStatus(true);
		return rm;
	}

}
