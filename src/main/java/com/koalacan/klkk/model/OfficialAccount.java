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
public class OfficialAccount extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4387444288387041371L;
	
	@Id
	@Column(length = 32)
	@GeneratedValue(generator="paymentableGenerator")
	@GenericGenerator(name = "paymentableGenerator", strategy = "uuid")
	private String id;

	@Column(length=100)
	private String title;//标题
	
	@Column(length=200)
	private String titleDesc;//标题描述
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, targetEntity = Image.class)
	@JoinColumn(name = "image_id")
	private Image image;//关联图片对象
	
	@Column(length=10)
	private int sort;//排序
	
	@Column(length=10)
	private int focusSort;//排序
	
	@Column(length=10)
	private boolean focus;//是否顶部显示
	
	@Column(length=1000)
	private String url;//跳转连接地址
	
	@Column
	private boolean isDelete;//是否删除
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, targetEntity = User.class)
	@JoinColumn(name = "user_id")
	private User user;//关联图片对象
	
	@Column
	private Date firstSaveDate;
	@Column
	private Date modifyDate;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getTitleDesc() {
		return titleDesc;
	}
	public void setTitleDesc(String titleDesc) {
		this.titleDesc = titleDesc;
	}
	public Image getImage() {
		return image;
	}
	public void setImage(Image image) {
		this.image = image;
	}
	public int getSort() {
		return sort;
	}
	public void setSort(int sort) {
		this.sort = sort;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public boolean isDelete() {
		return isDelete;
	}
	public void setDelete(boolean isDelete) {
		this.isDelete = isDelete;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Date getFirstSaveDate() {
		return firstSaveDate;
	}
	public void setFirstSaveDate(Date firstSaveDate) {
		this.firstSaveDate = firstSaveDate;
	}
	public Date getModifyDate() {
		return modifyDate;
	}
	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}
	public boolean isFocus() {
		return focus;
	}
	public void setFocus(boolean focus) {
		this.focus = focus;
	}
	public int getFocusSort() {
		return focusSort;
	}
	public void setFocusSort(int focusSort) {
		this.focusSort = focusSort;
	}
	
}
