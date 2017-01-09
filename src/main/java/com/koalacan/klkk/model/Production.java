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
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

/**
 * @author Administrator
 *
 */
@Entity
public class Production extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(length = 32)
	@GeneratedValue(generator="paymentableGenerator")
	@GenericGenerator(name = "paymentableGenerator", strategy = "uuid")
	private String id;
	@Column(length=20,nullable=false)
	private String name;//作品名称
	@Column(length=1)
	private String status;//0=已有写作计划 1=写作中 2=书稿已完成
	@Column(length=20,nullable=false)
	private String productionType;//作品类型
	@Column(length=20,nullable=false)
	private String totalWord;//全书字数
	@Column(length=100)
	private String recommendMyself;//我的一句话推荐
	@Column(length=200)
	private String targerReader;//目标读者
	@Column(length=200)
	private String introductionContent;//内容简介
	@Column(length=200)
	private String introductionAuthor;//作者简介
	@Column(length=200)
	private String bookCatalogue;//图书目录
	@Column(length=1000)
	private String sampleChapter;//样章
	@Column
	private boolean isCommit;//草稿=0，提交=1
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, targetEntity = User.class)
	@JoinColumn(name = "user_id")
	private User user;//关联用户-manager
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, targetEntity = User.class)
	@JoinColumn
	private User displayUser;//作者自己
	
	@Column(length=5)
	private String completeYear;//计划完成时间年
	@Column(length=3)
	private String completeMonth;//计划完成时间月
	@Column(length=3)
	private String completeWeek;//计划完成时间周
	@Column(length=5)
	private String completeProcess;//完成进度
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, targetEntity = Image.class)
	@JoinColumn(name = "image_id")
	private Image image;//关联图片对象
	
	@Transient
	private String userId;//临时获取用户ID
	@Transient
	private String imageId;//临时获取图片ID
	
	@Column(length=200)
	private String characterSet;//人物角色设定
	
	@Column(length=200)
	private String plotSet;//情节设定
	
	@Column
	private boolean isMainPageDisplay;//是否主页显示
	
	@Column(length=10)
	private int sort;//排序
	
	@Column(length=150)
	private String url;//跳转到当当网URL
	
	@Column
	private boolean isDelete;//是否删除
	
	@Column(length=1)
	private String pass = "0";//1=审核通过 0=审核未通过 
	
	@Column(length=20)
	private String focusTitle;//焦点标题
	
	@Column(length=150)
	private String focusDesc;//焦点描述
	
	@Column(length=10)
	private String indexFocusSort;//首页焦点排序
	
	@Column(length=200)
	private String editorRecommend;//编辑推荐

	@Column(length=200)
	private String hasPublishDesc;//首页底部出版浮层显示信息
	
	@Column(length=200)
	private String advertising;//广告语
	
	@Column(length=200)
	private String sellingPoint;//本书卖点
	
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
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getProductionType() {
		return productionType;
	}
	public void setProductionType(String productionType) {
		this.productionType = productionType;
	}
	public String getTotalWord() {
		return totalWord;
	}
	public void setTotalWord(String totalWord) {
		this.totalWord = totalWord;
	}
	public String getRecommendMyself() {
		return recommendMyself;
	}
	public void setRecommendMyself(String recommendMyself) {
		this.recommendMyself = recommendMyself;
	}
	public String getTargerReader() {
		return targerReader;
	}
	public void setTargerReader(String targerReader) {
		this.targerReader = targerReader;
	}
	public String getIntroductionContent() {
		return introductionContent;
	}
	public void setIntroductionContent(String introductionContent) {
		this.introductionContent = introductionContent;
	}
	public String getIntroductionAuthor() {
		return introductionAuthor;
	}
	public void setIntroductionAuthor(String introductionAuthor) {
		this.introductionAuthor = introductionAuthor;
	}
	public String getBookCatalogue() {
		return bookCatalogue;
	}
	public void setBookCatalogue(String bookCatalogue) {
		this.bookCatalogue = bookCatalogue;
	}
	public String getSampleChapter() {
		return sampleChapter;
	}
	public void setSampleChapter(String sampleChapter) {
		this.sampleChapter = sampleChapter;
	}
	public boolean isCommit() {
		return isCommit;
	}
	public void setCommit(boolean isCommit) {
		this.isCommit = isCommit;
	}

	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getCompleteYear() {
		return completeYear;
	}
	public void setCompleteYear(String completeYear) {
		this.completeYear = completeYear;
	}
	public String getCompleteMonth() {
		return completeMonth;
	}
	public void setCompleteMonth(String completeMonth) {
		this.completeMonth = completeMonth;
	}
	public String getCompleteWeek() {
		return completeWeek;
	}
	public void setCompleteWeek(String completeWeek) {
		this.completeWeek = completeWeek;
	}
	public String getCompleteProcess() {
		return completeProcess;
	}
	public void setCompleteProcess(String completeProcess) {
		this.completeProcess = completeProcess;
	}
	public Image getImage() {
		return image;
	}
	public void setImage(Image image) {
		this.image = image;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getImageId() {
		return imageId;
	}
	public void setImageId(String imageId) {
		this.imageId = imageId;
	}
	public String getCharacterSet() {
		return characterSet;
	}
	public void setCharacterSet(String characterSet) {
		this.characterSet = characterSet;
	}
	public String getPlotSet() {
		return plotSet;
	}
	public void setPlotSet(String plotSet) {
		this.plotSet = plotSet;
	}
	
	public boolean isMainPageDisplay() {
		return isMainPageDisplay;
	}
	public void setMainPageDisplay(boolean isMainPageDisplay) {
		this.isMainPageDisplay = isMainPageDisplay;
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
	
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public String getFocusTitle() {
		return focusTitle;
	}
	public void setFocusTitle(String focusTitle) {
		this.focusTitle = focusTitle;
	}
	public String getFocusDesc() {
		return focusDesc;
	}
	public void setFocusDesc(String focusDesc) {
		this.focusDesc = focusDesc;
	}
	public String getIndexFocusSort() {
		return indexFocusSort;
	}
	public void setIndexFocusSort(String indexFocusSort) {
		this.indexFocusSort = indexFocusSort;
	}
	public String getEditorRecommend() {
		return editorRecommend;
	}
	public void setEditorRecommend(String editorRecommend) {
		this.editorRecommend = editorRecommend;
	}
	public String getHasPublishDesc() {
		return hasPublishDesc;
	}
	public void setHasPublishDesc(String hasPublishDesc) {
		this.hasPublishDesc = hasPublishDesc;
	}
	public String getAdvertising() {
		return advertising;
	}
	public void setAdvertising(String advertising) {
		this.advertising = advertising;
	}
	public String getSellingPoint() {
		return sellingPoint;
	}
	public void setSellingPoint(String sellingPoint) {
		this.sellingPoint = sellingPoint;
	}
	public User getDisplayUser() {
		return displayUser;
	}
	public void setDisplayUser(User displayUser) {
		this.displayUser = displayUser;
	}


}
