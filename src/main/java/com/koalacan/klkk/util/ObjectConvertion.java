/**
 * 
 */
package com.koalacan.klkk.util;

import java.util.ArrayList;
import java.util.List;

import com.koalacan.klkk.model.Production;
import com.koalacan.klkk.model.SystemSet;
import com.koalacan.klkk.model.Topic;
import com.koalacan.klkk.model.User;
import com.koalacan.klkk.model.datamodel.ProductionData;
import com.koalacan.klkk.model.datamodel.SystemSetData;
import com.koalacan.klkk.model.datamodel.TopicData;
import com.koalacan.klkk.model.datamodel.UserData;

/**
 * @author Administrator
 *
 */
public class ObjectConvertion {

	public static UserData userToUserData(User user) {
		UserData userData = new UserData();
		
		userData.setId(user.getId());
		userData.setUsername(user.getUsername());
		userData.setPseudonym(user.getPseudonym());
		userData.setEmail(user.getEmail());
		userData.setActive(user.getActive());
		userData.setStatus(user.getStatus());
		userData.setPhone(user.getPhone());
		userData.setIntroductionMyselef(user.getIntroductionMyselef());
		userData.setSpeciality(user.getSpeciality());
		userData.setRepresentativeWorks(user.getRepresentativeWorks());
		userData.setPictureName(user.getImage() != null ? user.getImage().getName() : "");
		userData.setImageId(user.getImage() != null ? user.getImage().getId() : "");
		userData.setManager(user.isManager());
		userData.setPublishType(user.getPublishType());
		userData.setProductionType(user.getProductionType());
		userData.setTopicRequire(user.getTopicRequire());
		
		return userData;
	}

	public static ProductionData productionToProductionData(Production production) {
		ProductionData pd = new ProductionData();
		
		pd.setId(production.getId());
		pd.setName(production.getName());
		pd.setStatus(production.getStatus());
		pd.setProductionType(production.getProductionType());
		pd.setTotalWord(production.getTotalWord());
		pd.setRecommendMyself(production.getRecommendMyself());
		pd.setTargerReader(production.getTargerReader());
		pd.setIntroductionContent(production.getIntroductionContent());
		pd.setIntroductionAuthor(production.getIntroductionAuthor());
		pd.setBookCatalogue(production.getBookCatalogue());
		pd.setSampleChapter(production.getSampleChapter());
		pd.setCommit(production.isCommit());
		pd.setCompleteYear(production.getCompleteYear());
		pd.setCompleteMonth(production.getCompleteYear());
		pd.setCompleteWeek(production.getCompleteWeek());
		pd.setCompleteProcess(production.getCompleteProcess());
		
		pd.setImageId(null != production.getImage() ? production.getImage().getId() : "");
		pd.setPictureName(null != production.getImage() ? production.getImage().getName() : "");
		pd.setCharacterSet(production.getCharacterSet());
		pd.setPlotSet(production.getPlotSet());
		pd.setUrl(production.getUrl());
		pd.setFocusTitle(production.getFocusTitle());
		pd.setFocusDesc(production.getFocusDesc());
		pd.setEditorRecommend(production.getEditorRecommend());
		pd.setHasPublishDesc(production.getHasPublishDesc());
		pd.setAdvertising(production.getAdvertising());
		pd.setSellingPoint(production.getSellingPoint());
		
		//set user info
		if (null != production.getDisplayUser()){
			pd.setUserId( production.getDisplayUser().getId());
			pd.setUsername(production.getDisplayUser().getUsername());
			pd.setEmail(production.getDisplayUser().getEmail());
		}
		
		
		return pd;
	}

	public static TopicData TopicToTopicData(Topic topic){
		TopicData td = new TopicData();
		
		td.setId(topic.getId());
		td.setProductionType(topic.getProductionType());
		td.setContent(topic.getContent());
		if (topic.getDisplayUser() != null){
			td.setUserId(topic.getDisplayUser().getId());
			td.setUserName(topic.getDisplayUser().getUsername());
			td.setUserEmail(topic.getDisplayUser().getEmail());
			td.setPictureName(topic.getDisplayUser().getImage()!= null ? topic.getDisplayUser().getImage().getName() : "");
		}
		td.setHeaderMsg(topic.getHeaderMsg());
		return td;
	}
	
	public static Object[] covertObjectArrayToTopicDataArray(Object[] obj){
		@SuppressWarnings("unchecked")
		List<Topic> topics = (List<Topic>) obj[0];
		List<TopicData> topicDatas = new ArrayList<>();
		if (null != topics && !topics.isEmpty()){
			for (Topic topic : topics){
				topicDatas.add(ObjectConvertion.TopicToTopicData(topic));
			}
		}
		return topicDatas.toArray();
	}
	
	public static SystemSetData systemSetToData(SystemSet ss){
		SystemSetData ssd = new SystemSetData();
		ssd.setId(ss.getId());
		ssd.setVersion(ss.getVersion());
		ssd.setVersionDesc(ss.getVersionDesc());
		
		return ssd;
	}
}
