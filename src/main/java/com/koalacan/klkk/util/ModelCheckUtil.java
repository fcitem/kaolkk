package com.koalacan.klkk.util;

import org.apache.commons.lang.StringUtils;

import com.koalacan.klkk.model.ResponseMessage;
import com.koalacan.klkk.model.SystemSet;

public class ModelCheckUtil {
	private static final ModelCheckUtil s_instance = new ModelCheckUtil();

	private ModelCheckUtil(){
		
	}

	public static ModelCheckUtil getInstance() {
		return s_instance;
	}
	
	public ResponseMessage SystemSetCheck(SystemSet systemSet,boolean isUpdate){
		ResponseMessage rm = new ResponseMessage();
		if (null == systemSet){
			rm.setMessage("不能获取系统设置参数");
			return rm;
		}
		
		if (null == systemSet.getUser()){
			rm.setMessage("不能获取当前操作人的信息，请重新登录或刷新页面再试。");
			return rm;
		}
		if (StringUtils.isBlank(systemSet.getUser().getId())){
			rm.setMessage("不能获取当前操作人的ID信息，请重新登录或刷新页面再试。");
			return rm;
		}
		
		if (isUpdate){
			if (StringUtils.isBlank(systemSet.getId())){
				rm.setMessage("参数ID为空");
				return rm;
			}
		}
		
		if (StringUtils.isNotBlank(systemSet.getVersion()) && systemSet.getVersion().length() > 10){
			rm.setMessage("版本长度不能超过10位");
			return rm;
		}
		
		if (StringUtils.isNotBlank(systemSet.getVersionDesc()) && systemSet.getVersionDesc().length() > 200){
			rm.setMessage("版本描述信息不能超过200");
			return rm;
		}
		
		rm.setStatus(true);
		
		return rm;
	}
}
