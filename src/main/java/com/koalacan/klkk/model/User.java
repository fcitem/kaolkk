/**
 * 
 */
package com.koalacan.klkk.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

/**
 * @author Administrator
 *与数据库关联的对象
 */
@Entity
public class User extends BaseModel{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(length = 32)
	@GeneratedValue(generator="paymentableGenerator")
	@GenericGenerator(name = "paymentableGenerator", strategy = "uuid")
	private String id;
	
	@Column(length=20)
	private String username;//真实姓名
	
	@Column(length=20)
	private String pseudonym;//笔名
	
	@Column(length=100)
	private String password;//密码
	
	@Column(length=30)
	private String email;//邮箱
	
	@Transient
	private String randomCode;//随机验证码在
	
	@Column
	private Date modifyTime;//修改时间
	
	@Column(length=6)
	private String emailCode;//邮件验证码
	
	@Column
	private String active = "0";//是否验证
	
	@Column(length=2)
	private String status;//0=出版人 1=创作者
	
	@Column(length=11)
	private String phone;//手机号码
	
	@Column(length=200)
	private String introductionMyselef;//自我简介
	
	@Column(length=200)
	private String speciality;//擅长领域
	
	@Column(length=200)
	private String representativeWorks;//代表作品
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, targetEntity = Image.class)
	@JoinColumn(name = "image_id")
	private Image image;//关联图片对象
	
	@Transient
	private String imageId;//图片id
	
	@Column
	private boolean isManager;//是否是管理员
	@Column
	private boolean isDelete;
	
	@Column(length=20)
	private String publishType;//出版类型
	
	@Column(length=20)
	private String productionType;//作品类型
	
	@Column(length=100)
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRandomCode() {
		return randomCode;
	}
	public void setRandomCode(String randomCode) {
		this.randomCode = randomCode;
	}
	public Date getModifyTime() {
		return modifyTime;
	}
	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}
	public String getEmailCode() {
		return emailCode;
	}
	public void setEmailCode(String emailCode) {
		this.emailCode = emailCode;
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
	public Image getImage() {
		return image;
	}
	public void setImage(Image image) {
		this.image = image;
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
	public boolean isDelete() {
		return isDelete;
	}
	public void setDelete(boolean isDelete) {
		this.isDelete = isDelete;
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
