/**
 * 
 */
package com.koalacan.klkk.model.datamodel;

import com.koalacan.klkk.model.BaseModel;

/**
 * @author Administrator 返回给前台的数据对象
 */
public class UserData extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	private String username;// 真实姓名
	private String pseudonym;// 笔名
	private String email;// 邮箱
	private String active;// 是否验证
	private String status;// 0=出版人 1=创作者
	private String phone;// 手机号码
	private String introductionMyselef;// 自我简介
	private String speciality;// 擅长领域
	private String representativeWorks;// 代表作品
	private String pictureName;//图片名字
	private String imageId;//图片id
	private boolean isManager;//是否是管理员
	private String publishType;//出版类型
	private String productionType;//作品类型
	private String topicRequire;//选题要求
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPseudonym() {
		return pseudonym;
	}

	public void setPseudonym(String pseudonym) {
		this.pseudonym = pseudonym;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getIntroductionMyselef() {
		return introductionMyselef;
	}

	public void setIntroductionMyselef(String introductionMyselef) {
		this.introductionMyselef = introductionMyselef;
	}

	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	public String getRepresentativeWorks() {
		return representativeWorks;
	}

	public void setRepresentativeWorks(String representativeWorks) {
		this.representativeWorks = representativeWorks;
	}

	public String getPictureName() {
		return pictureName;
	}

	public void setPictureName(String pictureName) {
		this.pictureName = pictureName;
	}

	public String getImageId() {
		return imageId;
	}

	public void setImageId(String imageId) {
		this.imageId = imageId;
	}

	public boolean isManager() {
		return isManager;
	}

	public void setManager(boolean isManager) {
		this.isManager = isManager;
	}

	public String getPublishType() {
		return publishType;
	}

	public void setPublishType(String publishType) {
		this.publishType = publishType;
	}

	public String getProductionType() {
		return productionType;
	}

	public void setProductionType(String productionType) {
		this.productionType = productionType;
	}

	public String getTopicRequire() {
		return topicRequire;
	}

	public void setTopicRequire(String topicRequire) {
		this.topicRequire = topicRequire;
	}

}
