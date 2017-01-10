package com.koalacan.klkk.model;

public class Chapter {
    private String bookId;

    private String bookKey;

    private String preChapterId;

    private String preChapterKey;

    private String chapterKey;

    private String title;

    private String pics;

    private String chapterId;

    private String description;

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

    public String getPreChapterId() {
        return preChapterId;
    }

    public void setPreChapterId(String preChapterId) {
        this.preChapterId = preChapterId == null ? null : preChapterId.trim();
    }

    public String getPreChapterKey() {
        return preChapterKey;
    }

    public void setPreChapterKey(String preChapterKey) {
        this.preChapterKey = preChapterKey == null ? null : preChapterKey.trim();
    }

    public String getChapterKey() {
        return chapterKey;
    }

    public void setChapterKey(String chapterKey) {
        this.chapterKey = chapterKey == null ? null : chapterKey.trim();
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

    public String getChapterId() {
        return chapterId;
    }

    public void setChapterId(String chapterId) {
        this.chapterId = chapterId == null ? null : chapterId.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }
}