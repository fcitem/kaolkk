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
 *
 */
@Entity
public class Topic extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4121757905272759916L;
	
	@Id
	@Column(length = 32)
	@GeneratedValue(generator="paymentableGenerator")
	@GenericGenerator(name = "paymentableGenerator", strategy = "uuid")
	private String id;
	@Column(length=200)
	private String content;//主题内容
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, targetEntity = User.class)
	@JoinColumn
	private User displayUser;//关联显示用户
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, targetEntity = User.class)
	@JoinColumn
	private User user;//关联用户对象-通常是管理员信息
	@Column
	private Date saveDate;//保存日期
	@Column
	private Date modifyDate;//修改日期
	
	@Column
	private boolean isHeaderDisplay = true;//是否滚动显示
	
	@Column
	private boolean isDelete;//删除
	
	@Column(length=200)
	private String headerMsg;//主题焦点内容
	
	@Column(length=20)
	private String productionType;//作品类型
	
	@Column(length=1)
	private String pass = "0";//1=审核通过 0=审核未通过 
	
	@Column(length=10)
	private String sort;//排序
	
	@Column(length=10)
	private String indexFocusSort;//焦点排序
	
	public boolean isDelete() {
		return isDelete;
	}
	public void setDelete(boolean isDelete) {
		this.isDelete = isDelete;
	}
	public boolean isHeaderDisplay() {
		return isHeaderDisplay;
	}
	public void setHeaderDisplay(boolean isHeaderDisplay) {
		this.isHeaderDisplay = isHeaderDisplay;
	}
	@Transient
	private String userId;
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

	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Date getSaveDate() {
		return saveDate;
	}
	public void setSaveDate(Date saveDate) {
		this.saveDate = saveDate;
	}
	public Date getModifyDate() {
		return modifyDate;
	}
	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}
	public String getHeaderMsg() {
		return headerMsg;
	}
	public void setHeaderMsg(String headerMsg) {
		this.headerMsg = headerMsg;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getProductionType() {
		return productionType;
	}
	public void setProductionType(String productionType) {
		this.productionType = productionType;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	public String getIndexFocusSort() {
		return indexFocusSort;
	}
	public void setIndexFocusSort(String indexFocusSort) {
		this.indexFocusSort = indexFocusSort;
	}
	public User getDisplayUser() {
		return displayUser;
	}
	public void setDisplayUser(User displayUser) {
		this.displayUser = displayUser;
	}
	
}
