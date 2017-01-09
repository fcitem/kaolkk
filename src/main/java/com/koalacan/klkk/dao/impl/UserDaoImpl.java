package com.koalacan.klkk.dao.impl;

import java.io.Serializable;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.koalacan.core.dao.imp.CommonDaoImp;
import com.koalacan.klkk.dao.UserDao;
import com.koalacan.klkk.model.User;


@Repository
public class UserDaoImpl extends CommonDaoImp<User, Serializable> implements UserDao {

	@Override
	public List<User> getUsersByUserEmail(String email) {
		
		String hql = "select user from User as user where user.email='" + email +"'";
		
		return super.getEntityManager().createQuery(hql).getResultList();
	}

	@Override
	public List<User> getUsersByEmail(String email) {
		
		String hql = "select user from User as user where user.isDelete=false and user.email='" + email +"'";
		
		return super.getEntityManager().createQuery(hql).getResultList();
	}

	@Override
	public List<User> getUsersByEmailAndPassword(User user) {
		
		StringBuffer sql = new StringBuffer("select user from User as user where user.isDelete=false ");
		sql.append("and user.email='").append(user.getEmail()).append("' ");
		sql.append("and user.password='").append(user.getPassword()).append("'");

		return super.getEntityManager().createQuery(sql.toString()).getResultList();
	}

	@Override
	public Object[] getPublisher(int page, int pageSize) {
		String hql = "select user from User user where user.isDelete!=true and user.status='0'";
		String hqlTotal = "select count(*) from User user where user.isDelete!=true and user.status='0'";
		return super.getAllByPage(hql, hqlTotal, page, pageSize);
	}

	@Override
	public Object[] getAllUser(User user) {
		StringBuffer hql = new StringBuffer("from User user where user.isDelete!=true");
		if (StringUtils.isNotBlank(user.getUsername())){
			hql.append(" and user.username like '%" + user.getUsername() +"%'");
		}
		if (StringUtils.isNotBlank(user.getEmail())){
			hql.append(" and user.email like '%" + user.getEmail() +"%'");
		}
		if (StringUtils.isNotBlank(user.getActive())){
			hql.append(" and user.active= '" + user.getActive() +"'");
		}
		if (StringUtils.isNotBlank(user.getStatus())){
			hql.append(" and user.status='" + user.getStatus() +"'");
		}
		if (StringUtils.isNotBlank(user.getPhone())){
			hql.append(" and user.phone like '%" + user.getPhone() +"%'");
		}
		String hqlTotal = "select count(*) " + hql.toString();
		int page = Integer.parseInt(user.getPage());
		int pageSize = Integer.parseInt(user.getLimit());
		return super.getAllByPage(hql.toString(), hqlTotal, page, pageSize);
	}

	@Override
	public List<User> getUserByPhone(String phone) {
		
		String hql = "select user from User as user where user.isDelete!=true and user.phone='" + phone +"'";
		
		return super.getEntityManager().createQuery(hql).getResultList();
	}

	@Override
	public List<User> getAllPubliser() {
		String hql = "from User user where user.isDelete!=true and user.status='0'";
		return super.getEntityManager().createQuery(hql).getResultList();
	}

	@Override
	public List<User> getAllUserNoPage(String status) {
		StringBuffer hql = new StringBuffer("from User user where user.isDelete!=true");
		if (StringUtils.isNotBlank(status)){
			hql.append(" and user.status='").append(status).append("'");
		}
		return super.getEntityManager().createQuery(hql.toString()).getResultList();
	}

}
