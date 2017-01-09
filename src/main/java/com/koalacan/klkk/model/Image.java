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

import org.hibernate.annotations.GenericGenerator;

/**
 * @author Administrator
 *
 */
@Entity
public class Image extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(length = 32)
	@GeneratedValue(generator = "paymentableGenerator")
	@GenericGenerator(name = "paymentableGenerator", strategy = "uuid")
	private String id;
	@Column(length = 20)
	private String name;
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, targetEntity = User.class)
	@JoinColumn
	private User userId;
	@Column
	private Date uploadDate;
	@Column
	private Date modifyDate;
	@Column
	private Boolean isDelete;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, targetEntity = User.class)
	@JoinColumn
	private User managerId;
	
	@Column
	private Date managerModifyDate;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
	}

	public Date getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(Date uploadDate) {
		this.uploadDate = uploadDate;
	}

	public Date getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public Image clone(Image image) {
		Image cloneImage = new Image();
		cloneImage.setId(image.getId());
		cloneImage.setName(image.getName());
		return cloneImage;
	}

	public Boolean getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Boolean isDelete) {
		this.isDelete = isDelete;
	}

	public User getManagerId() {
		return managerId;
	}

	public void setManagerId(User managerId) {
		this.managerId = managerId;
	}

	public Date getManagerModifyDate() {
		return managerModifyDate;
	}

	public void setManagerModifyDate(Date managerModifyDate) {
		this.managerModifyDate = managerModifyDate;
	}

}
