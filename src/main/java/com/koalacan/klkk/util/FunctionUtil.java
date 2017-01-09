/**
 * 
 */
package com.koalacan.klkk.util;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.Random;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.NoSuchProviderException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;


/**
 * @author Administrator
 *
 */
public class FunctionUtil {
	private static Logger logger = Logger.getRootLogger();
	private static final FunctionUtil s_instance = new FunctionUtil();
//	public final String basePath = System.getProperty("user.dir") + File.separator + "image" + File.separator;
	public final String basePath = System.getProperty("webapp.root") + File.separator + "image" + File.separator;
	public final String uploadFilePath = basePath + "upload" +File.separator;
	private final String deleteFilePath = basePath + "deleteBak" +File.separator;
	public final String tmpImagePath = basePath + "tmpImage" +File.separator;

	{
		File file = new File(uploadFilePath);
		if (!file.exists()){
			file.mkdirs();
		}
		file = new File(deleteFilePath);
		if (!file.exists()){
			file.mkdirs();
		}
		
		file = new File(tmpImagePath);
		if (!file.exists()){
			file.mkdirs();
		}
		
	}
	private FunctionUtil(){
		
	}
	
	public static FunctionUtil getInstance(){
		return s_instance;
	}
	
	public String getRandomCode(){
		Random random = new Random();
        String result="";
        for(int i=0;i<6;i++){
            result+=random.nextInt(10);    
        }
        return result;
	}
	
	public boolean sendEmail(String email,String code){
		GetConfigFile getConfigFile = new GetConfigFile();
		StringBuffer sb = new StringBuffer(File.separator);
		sb.append("config").append(File.separator).append("email.properties");
		Properties emailInfo = getConfigFile.getProperties(sb.toString());
		Properties prop = new Properties();
		if (null != emailInfo){
			prop.put("mail.smtp.host", emailInfo.getProperty("emailServer"));
			prop.setProperty("mail.smtp.auth", "true");
			Authenticator authenticator = new Authenticator() {
			    protected PasswordAuthentication getPasswordAuthentication() {
			        return new PasswordAuthentication(emailInfo.getProperty("addresser.account"),emailInfo.getProperty("addresser.password"));     
			    }
			};
			Session session = Session.getDefaultInstance(prop, authenticator);
//			session.setDebug(true);
			try {
				Message message = createEmail(session,emailInfo,email,code);
				if (null == message){
					logger.error("The recipients is null,stop send email.");
					return false;
				}
				Transport.send(message);
			} catch (NoSuchProviderException e) {
				logger.error("create message failed:" + e.getMessage());
				e.printStackTrace();
				return false;
			} catch (MessagingException e) {
				logger.error("send failed:" + e.getMessage());
				e.printStackTrace();
				return false;
			}
			return true;
		} else {
			logger.error("get email config info Failed,can't send email!");
			return false;
		}
	}
	
	public MimeMessage createEmail(Session session,Properties emailInfo,String email,String code) {
		MimeMessage message = new MimeMessage(session);
		try {
			message.setFrom(new InternetAddress(emailInfo.getProperty("addresser.account")));
			InternetAddress receiver = new InternetAddress(email);
			message.setRecipient(Message.RecipientType.TO, receiver);
			message.setSubject(new String(emailInfo.getProperty("email.subject").getBytes("ISO-8859-1"), "utf-8") + code);
			
			StringBuffer content = new StringBuffer();
			content.append(new String(emailInfo.getProperty("email.hello").getBytes("ISO-8859-1"), "utf-8")).append("</br>");
			content.append(new String(emailInfo.getProperty("email.timeLimit").getBytes("ISO-8859-1"), "utf-8")).append("</br>");
			content.append(new String(emailInfo.getProperty("email.message").getBytes("ISO-8859-1"), "utf-8")).append("</br>");
			message.setContent(content.toString(), "text/html;charset=UTF-8");
			message.setSentDate(new Date());
		} catch (MessagingException e) {
			logger.error("create email info Failed:" + e.getMessage());
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			logger.error("The characters garbled:" + e.getMessage());
			e.printStackTrace();
		}

		return message;
	}
	
	public boolean moveFile(String srcFileName){
//		URL url = this.getClass().getResource("/");
//		System.out.println(FileSystems.getDefault().getRootDirectories());
//		System.out.println(Thread.currentThread().getContextClassLoader().getResource(""));
		Path srcFile =  FileSystems.getDefault().getPath(uploadFilePath + srcFileName);
		Path newFile =  FileSystems.getDefault().getPath(deleteFilePath + srcFileName);
		try {
			if (Files.exists(srcFile)){
				Files.move(srcFile, newFile);
			} else {
				logger.warn("源文件不存在:" + srcFile);
				return false;
			}
			
			if (Files.exists(newFile)){
				return true;
			} else {
				logger.warn("新文件不存在:" + newFile);
				return false;
			}
		} catch (IOException e) {
			logger.error("复制文件异常:" + e.getMessage());
			e.printStackTrace();
		}
		return false;
	}
	
	public boolean deletePicture(String srcFileName){
		Path srcFile =  FileSystems.getDefault().getPath(uploadFilePath + srcFileName);
		try {
			if (Files.exists(srcFile)){
				return Files.deleteIfExists(srcFile);
			} else {
				logger.warn("删除图片失败，源文件不存在:" + srcFile);
				return false;
			}
			
		} catch (IOException e) {
			logger.error("删除图片失败:" + e.getMessage());
			e.printStackTrace();
		}
		return false;
	}
	
	public static void main(String[] args) {
//		FunctionUtil.getInstance().moveFile("dd");
//		System.out.println(System.getProperty("user.dir"));
//		System.out.println(System.getProperty("webapp.root"));
		findIntSum();
	}
	
	private static void findIntSum() {
		int number = 9;
		if (number < 1 || number > 100) {
			System.out.println("NONE");
			return;
		}
		List<String> list = new ArrayList<String>();
		for (int i = 1; i <= number / 2; i++) {
			for (int j = i + 1; j < number; j++) {
				StringBuffer result = new StringBuffer();
				if ((i + j) * (j - i + 1) == number * 2) {
					result.append(i);
					for (int t = i + 1; t <= j; t++) {
						result.append(" ").append(t);
					}
					list.add(result.toString());
				}
			}
		}
		if (list.size() > 0){
			String value = list.toString();
			System.out.println(value.substring(1,value.length()-1));
		} else {
			System.out.println("NONE");
		}
	}
	
	
}
