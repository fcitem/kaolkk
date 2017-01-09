package com.koalacan.klkk.model.datamodel;

import com.koalacan.klkk.model.BaseModel;

public class SystemSetData extends BaseModel{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String version;//版本信息
	private String versionDesc;//版本描述
	private String userId;//用户id
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getVersionDesc() {
		return versionDesc;
	}
	public void setVersionDesc(String versionDesc) {
		this.versionDesc = versionDesc;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
}
