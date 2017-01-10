package com.koalacan.klkk.model;

import java.util.ArrayList;
import java.util.List;

public class SectionExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public SectionExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andBookIdIsNull() {
            addCriterion("BOOK_ID is null");
            return (Criteria) this;
        }

        public Criteria andBookIdIsNotNull() {
            addCriterion("BOOK_ID is not null");
            return (Criteria) this;
        }

        public Criteria andBookIdEqualTo(String value) {
            addCriterion("BOOK_ID =", value, "bookId");
            return (Criteria) this;
        }

        public Criteria andBookIdNotEqualTo(String value) {
            addCriterion("BOOK_ID <>", value, "bookId");
            return (Criteria) this;
        }

        public Criteria andBookIdGreaterThan(String value) {
            addCriterion("BOOK_ID >", value, "bookId");
            return (Criteria) this;
        }

        public Criteria andBookIdGreaterThanOrEqualTo(String value) {
            addCriterion("BOOK_ID >=", value, "bookId");
            return (Criteria) this;
        }

        public Criteria andBookIdLessThan(String value) {
            addCriterion("BOOK_ID <", value, "bookId");
            return (Criteria) this;
        }

        public Criteria andBookIdLessThanOrEqualTo(String value) {
            addCriterion("BOOK_ID <=", value, "bookId");
            return (Criteria) this;
        }

        public Criteria andBookIdLike(String value) {
            addCriterion("BOOK_ID like", value, "bookId");
            return (Criteria) this;
        }

        public Criteria andBookIdNotLike(String value) {
            addCriterion("BOOK_ID not like", value, "bookId");
            return (Criteria) this;
        }

        public Criteria andBookIdIn(List<String> values) {
            addCriterion("BOOK_ID in", values, "bookId");
            return (Criteria) this;
        }

        public Criteria andBookIdNotIn(List<String> values) {
            addCriterion("BOOK_ID not in", values, "bookId");
            return (Criteria) this;
        }

        public Criteria andBookIdBetween(String value1, String value2) {
            addCriterion("BOOK_ID between", value1, value2, "bookId");
            return (Criteria) this;
        }

        public Criteria andBookIdNotBetween(String value1, String value2) {
            addCriterion("BOOK_ID not between", value1, value2, "bookId");
            return (Criteria) this;
        }

        public Criteria andBookKeyIsNull() {
            addCriterion("BOOK_KEY is null");
            return (Criteria) this;
        }

        public Criteria andBookKeyIsNotNull() {
            addCriterion("BOOK_KEY is not null");
            return (Criteria) this;
        }

        public Criteria andBookKeyEqualTo(String value) {
            addCriterion("BOOK_KEY =", value, "bookKey");
            return (Criteria) this;
        }

        public Criteria andBookKeyNotEqualTo(String value) {
            addCriterion("BOOK_KEY <>", value, "bookKey");
            return (Criteria) this;
        }

        public Criteria andBookKeyGreaterThan(String value) {
            addCriterion("BOOK_KEY >", value, "bookKey");
            return (Criteria) this;
        }

        public Criteria andBookKeyGreaterThanOrEqualTo(String value) {
            addCriterion("BOOK_KEY >=", value, "bookKey");
            return (Criteria) this;
        }

        public Criteria andBookKeyLessThan(String value) {
            addCriterion("BOOK_KEY <", value, "bookKey");
            return (Criteria) this;
        }

        public Criteria andBookKeyLessThanOrEqualTo(String value) {
            addCriterion("BOOK_KEY <=", value, "bookKey");
            return (Criteria) this;
        }

        public Criteria andBookKeyLike(String value) {
            addCriterion("BOOK_KEY like", value, "bookKey");
            return (Criteria) this;
        }

        public Criteria andBookKeyNotLike(String value) {
            addCriterion("BOOK_KEY not like", value, "bookKey");
            return (Criteria) this;
        }

        public Criteria andBookKeyIn(List<String> values) {
            addCriterion("BOOK_KEY in", values, "bookKey");
            return (Criteria) this;
        }

        public Criteria andBookKeyNotIn(List<String> values) {
            addCriterion("BOOK_KEY not in", values, "bookKey");
            return (Criteria) this;
        }

        public Criteria andBookKeyBetween(String value1, String value2) {
            addCriterion("BOOK_KEY between", value1, value2, "bookKey");
            return (Criteria) this;
        }

        public Criteria andBookKeyNotBetween(String value1, String value2) {
            addCriterion("BOOK_KEY not between", value1, value2, "bookKey");
            return (Criteria) this;
        }

        public Criteria andChapterIdIsNull() {
            addCriterion("CHAPTER_ID is null");
            return (Criteria) this;
        }

        public Criteria andChapterIdIsNotNull() {
            addCriterion("CHAPTER_ID is not null");
            return (Criteria) this;
        }

        public Criteria andChapterIdEqualTo(String value) {
            addCriterion("CHAPTER_ID =", value, "chapterId");
            return (Criteria) this;
        }

        public Criteria andChapterIdNotEqualTo(String value) {
            addCriterion("CHAPTER_ID <>", value, "chapterId");
            return (Criteria) this;
        }

        public Criteria andChapterIdGreaterThan(String value) {
            addCriterion("CHAPTER_ID >", value, "chapterId");
            return (Criteria) this;
        }

        public Criteria andChapterIdGreaterThanOrEqualTo(String value) {
            addCriterion("CHAPTER_ID >=", value, "chapterId");
            return (Criteria) this;
        }

        public Criteria andChapterIdLessThan(String value) {
            addCriterion("CHAPTER_ID <", value, "chapterId");
            return (Criteria) this;
        }

        public Criteria andChapterIdLessThanOrEqualTo(String value) {
            addCriterion("CHAPTER_ID <=", value, "chapterId");
            return (Criteria) this;
        }

        public Criteria andChapterIdLike(String value) {
            addCriterion("CHAPTER_ID like", value, "chapterId");
            return (Criteria) this;
        }

        public Criteria andChapterIdNotLike(String value) {
            addCriterion("CHAPTER_ID not like", value, "chapterId");
            return (Criteria) this;
        }

        public Criteria andChapterIdIn(List<String> values) {
            addCriterion("CHAPTER_ID in", values, "chapterId");
            return (Criteria) this;
        }

        public Criteria andChapterIdNotIn(List<String> values) {
            addCriterion("CHAPTER_ID not in", values, "chapterId");
            return (Criteria) this;
        }

        public Criteria andChapterIdBetween(String value1, String value2) {
            addCriterion("CHAPTER_ID between", value1, value2, "chapterId");
            return (Criteria) this;
        }

        public Criteria andChapterIdNotBetween(String value1, String value2) {
            addCriterion("CHAPTER_ID not between", value1, value2, "chapterId");
            return (Criteria) this;
        }

        public Criteria andChapterKeyIsNull() {
            addCriterion("CHAPTER_KEY is null");
            return (Criteria) this;
        }

        public Criteria andChapterKeyIsNotNull() {
            addCriterion("CHAPTER_KEY is not null");
            return (Criteria) this;
        }

        public Criteria andChapterKeyEqualTo(String value) {
            addCriterion("CHAPTER_KEY =", value, "chapterKey");
            return (Criteria) this;
        }

        public Criteria andChapterKeyNotEqualTo(String value) {
            addCriterion("CHAPTER_KEY <>", value, "chapterKey");
            return (Criteria) this;
        }

        public Criteria andChapterKeyGreaterThan(String value) {
            addCriterion("CHAPTER_KEY >", value, "chapterKey");
            return (Criteria) this;
        }

        public Criteria andChapterKeyGreaterThanOrEqualTo(String value) {
            addCriterion("CHAPTER_KEY >=", value, "chapterKey");
            return (Criteria) this;
        }

        public Criteria andChapterKeyLessThan(String value) {
            addCriterion("CHAPTER_KEY <", value, "chapterKey");
            return (Criteria) this;
        }

        public Criteria andChapterKeyLessThanOrEqualTo(String value) {
            addCriterion("CHAPTER_KEY <=", value, "chapterKey");
            return (Criteria) this;
        }

        public Criteria andChapterKeyLike(String value) {
            addCriterion("CHAPTER_KEY like", value, "chapterKey");
            return (Criteria) this;
        }

        public Criteria andChapterKeyNotLike(String value) {
            addCriterion("CHAPTER_KEY not like", value, "chapterKey");
            return (Criteria) this;
        }

        public Criteria andChapterKeyIn(List<String> values) {
            addCriterion("CHAPTER_KEY in", values, "chapterKey");
            return (Criteria) this;
        }

        public Criteria andChapterKeyNotIn(List<String> values) {
            addCriterion("CHAPTER_KEY not in", values, "chapterKey");
            return (Criteria) this;
        }

        public Criteria andChapterKeyBetween(String value1, String value2) {
            addCriterion("CHAPTER_KEY between", value1, value2, "chapterKey");
            return (Criteria) this;
        }

        public Criteria andChapterKeyNotBetween(String value1, String value2) {
            addCriterion("CHAPTER_KEY not between", value1, value2, "chapterKey");
            return (Criteria) this;
        }

        public Criteria andPreSectionIdIsNull() {
            addCriterion("PRE_SECTION_ID is null");
            return (Criteria) this;
        }

        public Criteria andPreSectionIdIsNotNull() {
            addCriterion("PRE_SECTION_ID is not null");
            return (Criteria) this;
        }

        public Criteria andPreSectionIdEqualTo(String value) {
            addCriterion("PRE_SECTION_ID =", value, "preSectionId");
            return (Criteria) this;
        }

        public Criteria andPreSectionIdNotEqualTo(String value) {
            addCriterion("PRE_SECTION_ID <>", value, "preSectionId");
            return (Criteria) this;
        }

        public Criteria andPreSectionIdGreaterThan(String value) {
            addCriterion("PRE_SECTION_ID >", value, "preSectionId");
            return (Criteria) this;
        }

        public Criteria andPreSectionIdGreaterThanOrEqualTo(String value) {
            addCriterion("PRE_SECTION_ID >=", value, "preSectionId");
            return (Criteria) this;
        }

        public Criteria andPreSectionIdLessThan(String value) {
            addCriterion("PRE_SECTION_ID <", value, "preSectionId");
            return (Criteria) this;
        }

        public Criteria andPreSectionIdLessThanOrEqualTo(String value) {
            addCriterion("PRE_SECTION_ID <=", value, "preSectionId");
            return (Criteria) this;
        }

        public Criteria andPreSectionIdLike(String value) {
            addCriterion("PRE_SECTION_ID like", value, "preSectionId");
            return (Criteria) this;
        }

        public Criteria andPreSectionIdNotLike(String value) {
            addCriterion("PRE_SECTION_ID not like", value, "preSectionId");
            return (Criteria) this;
        }

        public Criteria andPreSectionIdIn(List<String> values) {
            addCriterion("PRE_SECTION_ID in", values, "preSectionId");
            return (Criteria) this;
        }

        public Criteria andPreSectionIdNotIn(List<String> values) {
            addCriterion("PRE_SECTION_ID not in", values, "preSectionId");
            return (Criteria) this;
        }

        public Criteria andPreSectionIdBetween(String value1, String value2) {
            addCriterion("PRE_SECTION_ID between", value1, value2, "preSectionId");
            return (Criteria) this;
        }

        public Criteria andPreSectionIdNotBetween(String value1, String value2) {
            addCriterion("PRE_SECTION_ID not between", value1, value2, "preSectionId");
            return (Criteria) this;
        }

        public Criteria andPreSectionKeyIsNull() {
            addCriterion("PRE_SECTION_KEY is null");
            return (Criteria) this;
        }

        public Criteria andPreSectionKeyIsNotNull() {
            addCriterion("PRE_SECTION_KEY is not null");
            return (Criteria) this;
        }

        public Criteria andPreSectionKeyEqualTo(String value) {
            addCriterion("PRE_SECTION_KEY =", value, "preSectionKey");
            return (Criteria) this;
        }

        public Criteria andPreSectionKeyNotEqualTo(String value) {
            addCriterion("PRE_SECTION_KEY <>", value, "preSectionKey");
            return (Criteria) this;
        }

        public Criteria andPreSectionKeyGreaterThan(String value) {
            addCriterion("PRE_SECTION_KEY >", value, "preSectionKey");
            return (Criteria) this;
        }

        public Criteria andPreSectionKeyGreaterThanOrEqualTo(String value) {
            addCriterion("PRE_SECTION_KEY >=", value, "preSectionKey");
            return (Criteria) this;
        }

        public Criteria andPreSectionKeyLessThan(String value) {
            addCriterion("PRE_SECTION_KEY <", value, "preSectionKey");
            return (Criteria) this;
        }

        public Criteria andPreSectionKeyLessThanOrEqualTo(String value) {
            addCriterion("PRE_SECTION_KEY <=", value, "preSectionKey");
            return (Criteria) this;
        }

        public Criteria andPreSectionKeyLike(String value) {
            addCriterion("PRE_SECTION_KEY like", value, "preSectionKey");
            return (Criteria) this;
        }

        public Criteria andPreSectionKeyNotLike(String value) {
            addCriterion("PRE_SECTION_KEY not like", value, "preSectionKey");
            return (Criteria) this;
        }

        public Criteria andPreSectionKeyIn(List<String> values) {
            addCriterion("PRE_SECTION_KEY in", values, "preSectionKey");
            return (Criteria) this;
        }

        public Criteria andPreSectionKeyNotIn(List<String> values) {
            addCriterion("PRE_SECTION_KEY not in", values, "preSectionKey");
            return (Criteria) this;
        }

        public Criteria andPreSectionKeyBetween(String value1, String value2) {
            addCriterion("PRE_SECTION_KEY between", value1, value2, "preSectionKey");
            return (Criteria) this;
        }

        public Criteria andPreSectionKeyNotBetween(String value1, String value2) {
            addCriterion("PRE_SECTION_KEY not between", value1, value2, "preSectionKey");
            return (Criteria) this;
        }

        public Criteria andSectionKeyIsNull() {
            addCriterion("SECTION_KEY is null");
            return (Criteria) this;
        }

        public Criteria andSectionKeyIsNotNull() {
            addCriterion("SECTION_KEY is not null");
            return (Criteria) this;
        }

        public Criteria andSectionKeyEqualTo(String value) {
            addCriterion("SECTION_KEY =", value, "sectionKey");
            return (Criteria) this;
        }

        public Criteria andSectionKeyNotEqualTo(String value) {
            addCriterion("SECTION_KEY <>", value, "sectionKey");
            return (Criteria) this;
        }

        public Criteria andSectionKeyGreaterThan(String value) {
            addCriterion("SECTION_KEY >", value, "sectionKey");
            return (Criteria) this;
        }

        public Criteria andSectionKeyGreaterThanOrEqualTo(String value) {
            addCriterion("SECTION_KEY >=", value, "sectionKey");
            return (Criteria) this;
        }

        public Criteria andSectionKeyLessThan(String value) {
            addCriterion("SECTION_KEY <", value, "sectionKey");
            return (Criteria) this;
        }

        public Criteria andSectionKeyLessThanOrEqualTo(String value) {
            addCriterion("SECTION_KEY <=", value, "sectionKey");
            return (Criteria) this;
        }

        public Criteria andSectionKeyLike(String value) {
            addCriterion("SECTION_KEY like", value, "sectionKey");
            return (Criteria) this;
        }

        public Criteria andSectionKeyNotLike(String value) {
            addCriterion("SECTION_KEY not like", value, "sectionKey");
            return (Criteria) this;
        }

        public Criteria andSectionKeyIn(List<String> values) {
            addCriterion("SECTION_KEY in", values, "sectionKey");
            return (Criteria) this;
        }

        public Criteria andSectionKeyNotIn(List<String> values) {
            addCriterion("SECTION_KEY not in", values, "sectionKey");
            return (Criteria) this;
        }

        public Criteria andSectionKeyBetween(String value1, String value2) {
            addCriterion("SECTION_KEY between", value1, value2, "sectionKey");
            return (Criteria) this;
        }

        public Criteria andSectionKeyNotBetween(String value1, String value2) {
            addCriterion("SECTION_KEY not between", value1, value2, "sectionKey");
            return (Criteria) this;
        }

        public Criteria andTitleIsNull() {
            addCriterion("TITLE is null");
            return (Criteria) this;
        }

        public Criteria andTitleIsNotNull() {
            addCriterion("TITLE is not null");
            return (Criteria) this;
        }

        public Criteria andTitleEqualTo(String value) {
            addCriterion("TITLE =", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotEqualTo(String value) {
            addCriterion("TITLE <>", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleGreaterThan(String value) {
            addCriterion("TITLE >", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleGreaterThanOrEqualTo(String value) {
            addCriterion("TITLE >=", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleLessThan(String value) {
            addCriterion("TITLE <", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleLessThanOrEqualTo(String value) {
            addCriterion("TITLE <=", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleLike(String value) {
            addCriterion("TITLE like", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotLike(String value) {
            addCriterion("TITLE not like", value, "title");
            return (Criteria) this;
        }

        public Criteria andTitleIn(List<String> values) {
            addCriterion("TITLE in", values, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotIn(List<String> values) {
            addCriterion("TITLE not in", values, "title");
            return (Criteria) this;
        }

        public Criteria andTitleBetween(String value1, String value2) {
            addCriterion("TITLE between", value1, value2, "title");
            return (Criteria) this;
        }

        public Criteria andTitleNotBetween(String value1, String value2) {
            addCriterion("TITLE not between", value1, value2, "title");
            return (Criteria) this;
        }

        public Criteria andPicsIsNull() {
            addCriterion("PICS is null");
            return (Criteria) this;
        }

        public Criteria andPicsIsNotNull() {
            addCriterion("PICS is not null");
            return (Criteria) this;
        }

        public Criteria andPicsEqualTo(String value) {
            addCriterion("PICS =", value, "pics");
            return (Criteria) this;
        }

        public Criteria andPicsNotEqualTo(String value) {
            addCriterion("PICS <>", value, "pics");
            return (Criteria) this;
        }

        public Criteria andPicsGreaterThan(String value) {
            addCriterion("PICS >", value, "pics");
            return (Criteria) this;
        }

        public Criteria andPicsGreaterThanOrEqualTo(String value) {
            addCriterion("PICS >=", value, "pics");
            return (Criteria) this;
        }

        public Criteria andPicsLessThan(String value) {
            addCriterion("PICS <", value, "pics");
            return (Criteria) this;
        }

        public Criteria andPicsLessThanOrEqualTo(String value) {
            addCriterion("PICS <=", value, "pics");
            return (Criteria) this;
        }

        public Criteria andPicsLike(String value) {
            addCriterion("PICS like", value, "pics");
            return (Criteria) this;
        }

        public Criteria andPicsNotLike(String value) {
            addCriterion("PICS not like", value, "pics");
            return (Criteria) this;
        }

        public Criteria andPicsIn(List<String> values) {
            addCriterion("PICS in", values, "pics");
            return (Criteria) this;
        }

        public Criteria andPicsNotIn(List<String> values) {
            addCriterion("PICS not in", values, "pics");
            return (Criteria) this;
        }

        public Criteria andPicsBetween(String value1, String value2) {
            addCriterion("PICS between", value1, value2, "pics");
            return (Criteria) this;
        }

        public Criteria andPicsNotBetween(String value1, String value2) {
            addCriterion("PICS not between", value1, value2, "pics");
            return (Criteria) this;
        }

        public Criteria andPublishTimeIsNull() {
            addCriterion("PUBLISH_TIME is null");
            return (Criteria) this;
        }

        public Criteria andPublishTimeIsNotNull() {
            addCriterion("PUBLISH_TIME is not null");
            return (Criteria) this;
        }

        public Criteria andPublishTimeEqualTo(Integer value) {
            addCriterion("PUBLISH_TIME =", value, "publishTime");
            return (Criteria) this;
        }

        public Criteria andPublishTimeNotEqualTo(Integer value) {
            addCriterion("PUBLISH_TIME <>", value, "publishTime");
            return (Criteria) this;
        }

        public Criteria andPublishTimeGreaterThan(Integer value) {
            addCriterion("PUBLISH_TIME >", value, "publishTime");
            return (Criteria) this;
        }

        public Criteria andPublishTimeGreaterThanOrEqualTo(Integer value) {
            addCriterion("PUBLISH_TIME >=", value, "publishTime");
            return (Criteria) this;
        }

        public Criteria andPublishTimeLessThan(Integer value) {
            addCriterion("PUBLISH_TIME <", value, "publishTime");
            return (Criteria) this;
        }

        public Criteria andPublishTimeLessThanOrEqualTo(Integer value) {
            addCriterion("PUBLISH_TIME <=", value, "publishTime");
            return (Criteria) this;
        }

        public Criteria andPublishTimeIn(List<Integer> values) {
            addCriterion("PUBLISH_TIME in", values, "publishTime");
            return (Criteria) this;
        }

        public Criteria andPublishTimeNotIn(List<Integer> values) {
            addCriterion("PUBLISH_TIME not in", values, "publishTime");
            return (Criteria) this;
        }

        public Criteria andPublishTimeBetween(Integer value1, Integer value2) {
            addCriterion("PUBLISH_TIME between", value1, value2, "publishTime");
            return (Criteria) this;
        }

        public Criteria andPublishTimeNotBetween(Integer value1, Integer value2) {
            addCriterion("PUBLISH_TIME not between", value1, value2, "publishTime");
            return (Criteria) this;
        }

        public Criteria andNeedPayIsNull() {
            addCriterion("NEED_PAY is null");
            return (Criteria) this;
        }

        public Criteria andNeedPayIsNotNull() {
            addCriterion("NEED_PAY is not null");
            return (Criteria) this;
        }

        public Criteria andNeedPayEqualTo(Integer value) {
            addCriterion("NEED_PAY =", value, "needPay");
            return (Criteria) this;
        }

        public Criteria andNeedPayNotEqualTo(Integer value) {
            addCriterion("NEED_PAY <>", value, "needPay");
            return (Criteria) this;
        }

        public Criteria andNeedPayGreaterThan(Integer value) {
            addCriterion("NEED_PAY >", value, "needPay");
            return (Criteria) this;
        }

        public Criteria andNeedPayGreaterThanOrEqualTo(Integer value) {
            addCriterion("NEED_PAY >=", value, "needPay");
            return (Criteria) this;
        }

        public Criteria andNeedPayLessThan(Integer value) {
            addCriterion("NEED_PAY <", value, "needPay");
            return (Criteria) this;
        }

        public Criteria andNeedPayLessThanOrEqualTo(Integer value) {
            addCriterion("NEED_PAY <=", value, "needPay");
            return (Criteria) this;
        }

        public Criteria andNeedPayIn(List<Integer> values) {
            addCriterion("NEED_PAY in", values, "needPay");
            return (Criteria) this;
        }

        public Criteria andNeedPayNotIn(List<Integer> values) {
            addCriterion("NEED_PAY not in", values, "needPay");
            return (Criteria) this;
        }

        public Criteria andNeedPayBetween(Integer value1, Integer value2) {
            addCriterion("NEED_PAY between", value1, value2, "needPay");
            return (Criteria) this;
        }

        public Criteria andNeedPayNotBetween(Integer value1, Integer value2) {
            addCriterion("NEED_PAY not between", value1, value2, "needPay");
            return (Criteria) this;
        }

        public Criteria andPriceIsNull() {
            addCriterion("PRICE is null");
            return (Criteria) this;
        }

        public Criteria andPriceIsNotNull() {
            addCriterion("PRICE is not null");
            return (Criteria) this;
        }

        public Criteria andPriceEqualTo(Integer value) {
            addCriterion("PRICE =", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceNotEqualTo(Integer value) {
            addCriterion("PRICE <>", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceGreaterThan(Integer value) {
            addCriterion("PRICE >", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceGreaterThanOrEqualTo(Integer value) {
            addCriterion("PRICE >=", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceLessThan(Integer value) {
            addCriterion("PRICE <", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceLessThanOrEqualTo(Integer value) {
            addCriterion("PRICE <=", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceIn(List<Integer> values) {
            addCriterion("PRICE in", values, "price");
            return (Criteria) this;
        }

        public Criteria andPriceNotIn(List<Integer> values) {
            addCriterion("PRICE not in", values, "price");
            return (Criteria) this;
        }

        public Criteria andPriceBetween(Integer value1, Integer value2) {
            addCriterion("PRICE between", value1, value2, "price");
            return (Criteria) this;
        }

        public Criteria andPriceNotBetween(Integer value1, Integer value2) {
            addCriterion("PRICE not between", value1, value2, "price");
            return (Criteria) this;
        }

        public Criteria andWordcountIsNull() {
            addCriterion("WORDCOUNT is null");
            return (Criteria) this;
        }

        public Criteria andWordcountIsNotNull() {
            addCriterion("WORDCOUNT is not null");
            return (Criteria) this;
        }

        public Criteria andWordcountEqualTo(Integer value) {
            addCriterion("WORDCOUNT =", value, "wordcount");
            return (Criteria) this;
        }

        public Criteria andWordcountNotEqualTo(Integer value) {
            addCriterion("WORDCOUNT <>", value, "wordcount");
            return (Criteria) this;
        }

        public Criteria andWordcountGreaterThan(Integer value) {
            addCriterion("WORDCOUNT >", value, "wordcount");
            return (Criteria) this;
        }

        public Criteria andWordcountGreaterThanOrEqualTo(Integer value) {
            addCriterion("WORDCOUNT >=", value, "wordcount");
            return (Criteria) this;
        }

        public Criteria andWordcountLessThan(Integer value) {
            addCriterion("WORDCOUNT <", value, "wordcount");
            return (Criteria) this;
        }

        public Criteria andWordcountLessThanOrEqualTo(Integer value) {
            addCriterion("WORDCOUNT <=", value, "wordcount");
            return (Criteria) this;
        }

        public Criteria andWordcountIn(List<Integer> values) {
            addCriterion("WORDCOUNT in", values, "wordcount");
            return (Criteria) this;
        }

        public Criteria andWordcountNotIn(List<Integer> values) {
            addCriterion("WORDCOUNT not in", values, "wordcount");
            return (Criteria) this;
        }

        public Criteria andWordcountBetween(Integer value1, Integer value2) {
            addCriterion("WORDCOUNT between", value1, value2, "wordcount");
            return (Criteria) this;
        }

        public Criteria andWordcountNotBetween(Integer value1, Integer value2) {
            addCriterion("WORDCOUNT not between", value1, value2, "wordcount");
            return (Criteria) this;
        }

        public Criteria andSectionIdIsNull() {
            addCriterion("SECTION_ID is null");
            return (Criteria) this;
        }

        public Criteria andSectionIdIsNotNull() {
            addCriterion("SECTION_ID is not null");
            return (Criteria) this;
        }

        public Criteria andSectionIdEqualTo(String value) {
            addCriterion("SECTION_ID =", value, "sectionId");
            return (Criteria) this;
        }

        public Criteria andSectionIdNotEqualTo(String value) {
            addCriterion("SECTION_ID <>", value, "sectionId");
            return (Criteria) this;
        }

        public Criteria andSectionIdGreaterThan(String value) {
            addCriterion("SECTION_ID >", value, "sectionId");
            return (Criteria) this;
        }

        public Criteria andSectionIdGreaterThanOrEqualTo(String value) {
            addCriterion("SECTION_ID >=", value, "sectionId");
            return (Criteria) this;
        }

        public Criteria andSectionIdLessThan(String value) {
            addCriterion("SECTION_ID <", value, "sectionId");
            return (Criteria) this;
        }

        public Criteria andSectionIdLessThanOrEqualTo(String value) {
            addCriterion("SECTION_ID <=", value, "sectionId");
            return (Criteria) this;
        }

        public Criteria andSectionIdLike(String value) {
            addCriterion("SECTION_ID like", value, "sectionId");
            return (Criteria) this;
        }

        public Criteria andSectionIdNotLike(String value) {
            addCriterion("SECTION_ID not like", value, "sectionId");
            return (Criteria) this;
        }

        public Criteria andSectionIdIn(List<String> values) {
            addCriterion("SECTION_ID in", values, "sectionId");
            return (Criteria) this;
        }

        public Criteria andSectionIdNotIn(List<String> values) {
            addCriterion("SECTION_ID not in", values, "sectionId");
            return (Criteria) this;
        }

        public Criteria andSectionIdBetween(String value1, String value2) {
            addCriterion("SECTION_ID between", value1, value2, "sectionId");
            return (Criteria) this;
        }

        public Criteria andSectionIdNotBetween(String value1, String value2) {
            addCriterion("SECTION_ID not between", value1, value2, "sectionId");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}