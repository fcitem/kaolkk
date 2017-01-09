/**
 * 
 */
package com.koalacan.klkk.model.datamodel;


import javax.persistence.Column;

import com.koalacan.klkk.model.BaseModel;

/**
 * @author Administrator
 *
 */
public class ProductionData extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2631652583076181494L;

	private String id;
	private String name;// 作品名称
	private String status;// 0=已有写作计划 1=写作中 2=书稿已完成
	private String productionType;// 作品类型
	private String totalWord;// 全书字数
	private String recommendMyself;// 我的一句话推荐
	private String targerReader;// 目标读者
	private String introductionContent;// 内容简介
	private String introductionAuthor;// 作者简介
	private String bookCatalogue;// 图书目录
	private String sampleChapter;// 样章
	private boolean isCommit;// 草稿=0，提交=1
	private String completeYear;// 计划完成时间年
	private String completeMonth;// 计划完成时间月
	private String completeWeek;// 计划完成时间周
	private String completeProcess;// 完成进度
	private String userId;// 临时获取用户ID
	private String imageId;// 临时获取图片ID
	private String pictureName;// 图片名字
	private String characterSet;// 人物角色设定
	private String plotSet;// 情节设定
	private String url;//跳转到当当网URL
	private String focusTitle;//焦点标题
	private String focusDesc;//焦点描述
	private String editorRecommend;//编辑推荐
	private String hasPublishDesc;//首页底部出版浮层显示信息
	private String username;//用户姓名
	private String email;//用户姓名
	private String advertising;//广告语
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

	public String getPictureName() {
		return pictureName;
	}

	public void setPictureName(String pictureName) {
		this.pictureName = pictureName;
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

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

}
