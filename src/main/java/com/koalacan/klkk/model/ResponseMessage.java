/**
 * 
 */
package com.koalacan.klkk.model;


/**
 * @author Administrator
 *
 */
public class ResponseMessage extends BaseModel {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private boolean status;
	private String message;
	private Object dataModel;
	private Object[] dataList;
	private int total;
	private boolean success = true;
	
	public ResponseMessage() {
		
	}
	
	public ResponseMessage(boolean status) {
		this.status = status;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}

	public Object getDataModel() {
		return dataModel;
	}

	public void setDataModel(Object dataModel) {
		this.dataModel = dataModel;
	}

	public Object[] getDataList() {
		return dataList;
	}

	public void setDataList(Object[] dataList) {
		this.dataList = dataList;
	}


	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}


}
