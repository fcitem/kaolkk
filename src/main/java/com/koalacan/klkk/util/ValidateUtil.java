/**
 * 
 */
package com.koalacan.klkk.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;

/**
 * @author Administrator
 *
 */
public class ValidateUtil {

	private static final ValidateUtil s_instance = new ValidateUtil();
	
	private ValidateUtil(){
		
	}
	
	public static ValidateUtil getInstance(){
		return s_instance;
	}
	
	public boolean isValidEmail(String email){
		if (StringUtils.isBlank(email)){
			return false;
		}
		Pattern p =  Pattern.compile("\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*");
		Matcher m = p.matcher(email);
		return m.matches();
	}
	
	public boolean isValidPhone(String phone){
		if (StringUtils.isBlank(phone)){
			return false;
		}
		Pattern p =  Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0-9]))\\d{8}$");
		Matcher m = p.matcher(phone);
		return m.matches();
	}
	
	public static void main(String[] args) {
		System.out.println(s_instance.isValidPhone("18108086026"));
	}
}
