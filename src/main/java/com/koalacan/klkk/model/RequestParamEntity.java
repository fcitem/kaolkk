package com.koalacan.klkk.model;

import java.util.List;

public class RequestParamEntity extends BaseModel{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private List<String> ids;

	public List<String> getIds() {
		return ids;
	}

	public void setIds(List<String> ids) {
		this.ids = ids;
	}

}
