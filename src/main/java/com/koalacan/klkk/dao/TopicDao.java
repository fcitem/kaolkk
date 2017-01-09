package com.koalacan.klkk.dao;

import java.io.Serializable;
import java.util.List;

import com.koalacan.core.dao.CommonDao;
import com.koalacan.klkk.model.Production;
import com.koalacan.klkk.model.Topic;

public interface TopicDao extends CommonDao<Topic, Serializable> {
	List<Topic> getTopicByUserId(String userId);
	Object[] getAllTopicByPage(int page ,int pageSize);
	Object[] getAllTopicByPage(Topic topic,int page ,int pageSize);
	Object[] getTopicFoucsByPage(int page ,int pageSize);
}
