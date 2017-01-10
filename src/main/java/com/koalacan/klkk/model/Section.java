package com.koalacan.klkk.model;

public class Section {
    private String bookId;

    private String bookKey;

    private String chapterId;

    private String chapterKey;

    private String preSectionId;

    private String preSectionKey;

    private String sectionKey;

    private String title;

    private String pics;

    private Integer publishTime;

    private Integer needPay;

    private Integer price;

    private Integer wordcount;

    private String sectionId;

    private String content;

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId == null ? null : bookId.trim();
    }

    public String getBookKey() {
        return bookKey;
    }

    public void setBookKey(String bookKey) {
        this.bookKey = bookKey == null ? null : bookKey.trim();
    }

    public String getChapterId() {
        return chapterId;
    }

    public void setChapterId(String chapterId) {
        this.chapterId = chapterId == null ? null : chapterId.trim();
    }

    public String getChapterKey() {
        return chapterKey;
    }

    public void setChapterKey(String chapterKey) {
        this.chapterKey = chapterKey == null ? null : chapterKey.trim();
    }

    public String getPreSectionId() {
        return preSectionId;
    }

    public void setPreSectionId(String preSectionId) {
        this.preSectionId = preSectionId == null ? null : preSectionId.trim();
    }

    public String getPreSectionKey() {
        return preSectionKey;
    }

    public void setPreSectionKey(String preSectionKey) {
        this.preSectionKey = preSectionKey == null ? null : preSectionKey.trim();
    }

    public String getSectionKey() {
        return sectionKey;
    }

    public void setSectionKey(String sectionKey) {
        this.sectionKey = sectionKey == null ? null : sectionKey.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getPics() {
        return pics;
    }

    public void setPics(String pics) {
        this.pics = pics == null ? null : pics.trim();
    }

    public Integer getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(Integer publishTime) {
        this.publishTime = publishTime;
    }

    public Integer getNeedPay() {
        return needPay;
    }

    public void setNeedPay(Integer needPay) {
        this.needPay = needPay;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getWordcount() {
        return wordcount;
    }

    public void setWordcount(Integer wordcount) {
        this.wordcount = wordcount;
    }

    public String getSectionId() {
        return sectionId;
    }

    public void setSectionId(String sectionId) {
        this.sectionId = sectionId == null ? null : sectionId.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }
}