/**
 * 
 */
package com.koalacan.klkk.model.datamodel;

import com.koalacan.klkk.model.BaseModel;

/**
 * @author Administrator
 *
 */
public class TopicData extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4008267553038255097L;

	private String id;
	private String content;// 主题内容
	private String userId;// 关联用户对象
	private String userName;
	private String userEmail;
	private String headerMsg;
	private String pictureName;
	private String productionType;//作品类型

	public String getPictureName() {
		return pictureName;
	}

	public void setPictureName(String pictureName) {
		this.pictureName = pictureName;
	}

	public String getHeaderMsg() {
		return headerMsg;
	}

	public void setHeaderMsg(String headerMsg) {
		this.headerMsg = headerMsg;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getProductionType() {
		return productionType;
	}

	public void setProductionType(String productionType) {
		this.productionType = productionType;
	}

}
