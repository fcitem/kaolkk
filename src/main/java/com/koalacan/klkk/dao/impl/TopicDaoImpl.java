package com.koalacan.klkk.dao.impl;

import java.io.Serializable;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.koalacan.core.dao.imp.CommonDaoImp;
import com.koalacan.klkk.dao.TopicDao;
import com.koalacan.klkk.model.Topic;

@Repository
public class TopicDaoImpl extends CommonDaoImp<Topic, Serializable>implements TopicDao {

	@Override
	public List<Topic> getTopicByUserId(String userId) {
		String hql = "select topic from Topic topic where topic.user='" + userId +"'";
		return super.getEntityManager().createQuery(hql).getResultList();
	}

	@Override
	public Object[] getAllTopicByPage(int page, int pageSize) {
		String hql = "select topic from Topic topic where topic.isHeaderDisplay=true and topic.isDelete=false order by topic.sort";
		String hqlTotal = "select count(*) from Topic topic where topic.isHeaderDisplay=true and topic.isDelete=false";
		return super.getAllByPage(hql, hqlTotal, page, pageSize);
	}

	@Override
	public Object[] getAllTopicByPage(Topic topic, int page, int pageSize) {
		StringBuffer hql = new StringBuffer("from Topic topic where topic.isDelete!=true");
		if (StringUtils.isNotBlank(topic.getProductionType())){
			hql.append(" and topic.productionType like'%" + topic.getProductionType() + "%'");
		}
		if (StringUtils.isNotBlank(topic.getContent())){
			hql.append(" and topic.content like'%" + topic.getContent() + "%'");
		}
		if (StringUtils.isNotBlank(topic.getPass())){
			hql.append(" and topic.pass like'%" + topic.getPass() + "%'");
		}
		String hqlTotal = "select count(*) " + hql.toString();
		hql.append(" order by topic.sort");
		return super.getAllByPage(hql.toString(), hqlTotal, page, pageSize);
	}

	@Override
	public Object[] getTopicFoucsByPage(int page, int pageSize) {
		String hql = "select topic from Topic topic where topic.isDelete!=true and topic.isHeaderDisplay=true and topic.pass='1' order by topic.indexFocusSort";
		String hqlTotal = "select count(*) from Topic topic where topic.isDelete!=true and topic.isHeaderDisplay=true and topic.pass='1'";
		return super.getAllByPage(hql, hqlTotal, page, pageSize);
	}

}
