package com.koalacan.klkk.util;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

public class GetConfigFile {

	private static Logger logger = Logger.getRootLogger();
	
	public Properties getProperties(String file){
		Properties prop = new Properties();
		InputStream in = null;
		System.out.println();
		try {
			in = this.getClass().getClassLoader().getResourceAsStream("config/email.properties");
			prop.load(in);
		} catch (FileNotFoundException e) {
			logger.error("get file failed:" + e.getMessage());
			e.printStackTrace();
		} catch (IOException e) {
			logger.error("Read file failed:" + e.getMessage());
			e.printStackTrace();
		} finally {
			if (in != null) {  
                try {  
                    in.close();  
                } catch (IOException e) {  
                    in = null;  
                    logger.error("close io exception:" + e.getMessage());
                }  
            }
		}
		return prop;
	}
//	public static void main(String[] args) {
//		GetConfigFile gf = new GetConfigFile();
//		gf.getProperties("config/email.properties");
//	}
}
