/**
 * 
 */
package com.koalacan.klkk.model;

import java.io.Serializable;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;

/**
 * @author Administrator
 *
 */
public class BaseModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String limit;
	private String page;
	private String start;
	private boolean enablePage = true;

	public String toJson(Object obj){
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
		JSONObject json = JSONObject.fromObject(obj,jsonConfig);
		return json.toString();
	}
	
	public static void main(String[] args) {
		BaseModel bm = new BaseModel();
		ResponseMessage rm = new ResponseMessage();
		rm.setMessage("中午");
		System.out.println(bm.toJson(rm));
	}

	public String getLimit() {
		return limit;
	}

	public void setLimit(String limit) {
		this.limit = limit;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public boolean isEnablePage() {
		return enablePage;
	}

	public void setEnablePage(boolean enablePage) {
		this.enablePage = enablePage;
	}
	
	
}
