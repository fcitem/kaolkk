/**
 * 
 */
package com.koalacan.klkk.dao;

import java.io.Serializable;
import java.util.List;

import com.koalacan.core.dao.CommonDao;
import com.koalacan.klkk.model.User;

/**
 * @author Administrator
 *
 */
public interface UserDao extends CommonDao<User, Serializable> {

	List<User> getUsersByUserEmail(String email);
	List<User> getUsersByEmail(String email);
	List<User> getUsersByEmailAndPassword(User user);
	Object[] getPublisher(int page ,int pageSize);
	Object[] getAllUser(User user);
	List<User> getUserByPhone(String phone);
	List<User> getAllPubliser();
	List<User> getAllUserNoPage(String status);
}
