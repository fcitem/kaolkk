/**
 * 
 */
package com.koalacan.klkk.model;

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
public class SystemSet extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(length = 32)
	@GeneratedValue(generator="paymentableGenerator")
	@GenericGenerator(name = "paymentableGenerator", strategy = "uuid")
	private String id;
	
	@Column(length=10)
	private String version;//版本信息
	
	@Column(length=200)
	private String versionDesc;//版本描述
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, targetEntity = User.class)
	@JoinColumn
	private User user;//关联用户对象

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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	

}
