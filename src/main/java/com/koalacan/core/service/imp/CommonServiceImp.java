package com.koalacan.core.service.imp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.koalacan.core.dao.CommonDao;
import com.koalacan.core.service.CommonService;
import com.koalacan.core.util.CommonUtil;
import com.koalacan.core.util.JSONHandleUtil;

import net.sf.json.JSONObject;

@Service
@Transactional
public class CommonServiceImp<T, PK extends Serializable> implements CommonService<T, PK>  {

	
	
	@Autowired
	private CommonDao<T, Serializable> commonDao;

	public void setCommonDao(CommonDao<T, Serializable> commonDao) {
		this.commonDao = commonDao;
	}

	/**
	 * @param object
	 */
	public T save(T object) {

		return commonDao.save(object);
	}

	/**
	 * @param object
	 */
	public T merge(T object) {

		return commonDao.merge(object);
	}

	/**
	 * @param pk
	 */

	public T get(PK pk) {

		return commonDao.get(pk);
	}

	/**
	 * @param pk
	 */

	public T getByPK(Class<T> objectClass, Object pk) {

		return commonDao.getByPK(objectClass, pk);
	}

	/**
	 * @param object
	 */

	public void deleteByPK(Class<T> objectClass, Object pk) {
		commonDao.delete(getByPK(objectClass, pk));
	}

	/**
	 * @param object
	 */
	public void delete(T object) {
		commonDao.delete(object);
	}

	/**
	 * @param pageBean
	 */
	public Object[] getAllByPage(String className, int page, int pageSize,
			String searchString, String groupBy, String orderColum,
			boolean desc, String joinFetch) {

		return commonDao.getAllByPage(className, page, pageSize, searchString,
				groupBy, orderColum, desc, joinFetch);
	}

	/**
	 * @param hql
	 * @param pageBean
	 */
	public List<T> findAllByHql(String hql) {
		// TODO: implement
		return commonDao.findAllByHql(hql);
	}

	public List<T> getAllObject(String className) {
		return commonDao.getAllObject(className);
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getAllJsonObjectBypage(Class<?> objectClass, int page,
			int pageSize, String searchString, String groupBy,
			String orderColum, boolean desc, String joinFetch,int joinFechSize) {
		String className = objectClass.getSimpleName();
		if (page < 0) {
			page = 1;
		}
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> jsonList = new ArrayList<String>();
		Object[] objct = getAllByPage(className, page, pageSize, searchString,
				groupBy, orderColum, desc, joinFetch);
		Integer totals = (Integer) objct[1];
		if (totals > 0) {
			List<Object> objectList = (List<Object>) objct[0];
			for (Object object : objectList) {
			
				String jsonStr = JSONHandleUtil.readJsonObject(object, objectClass, joinFechSize);
				jsonList.add(jsonStr);
			}
			map.put("total", totals);
			map.put("rows", jsonList);
		} else {
			map.put("total", 0);
			map.put("rows", jsonList);
		}
		JSONObject jsonObject = JSONObject.fromObject(map);
		return jsonObject.toString();

	}

	
	@Override
	public String getAllJsonObjectList(Class<?> objectClass) {
		String className = objectClass.getSimpleName();
		List<Object> objectList = (List<Object>) getAllObject(className);
		String jsonStr = "[";
		if (objectList.size() > 0) {
			for (Object object : objectList) {
				jsonStr += JSONHandleUtil.readJsonObject(object, objectClass, 3)+ ",";
			}
			jsonStr = jsonStr.substring(0, jsonStr.length() - 1) + "]";
		} else {
			jsonStr = "[]";
		}
		return jsonStr;
	}
	@Override
	public String getAllJsonObjectListPy(Class<?> objectClass) {
		String className = objectClass.getSimpleName();
		List<Object> objectList = (List<Object>) getAllObject(className);
		String jsonStr = "[";
		if (objectList.size() > 0) {
			for (Object object : objectList) {
				jsonStr += JSONHandleUtil.readJsonObjectPy(object, objectClass, 3)+ ",";
			}
			jsonStr = jsonStr.substring(0, jsonStr.length() - 1) + "]";
		} else {
			jsonStr = "[]";
		}
		return jsonStr;
	}	
	
	public Object getCascadeObjectByPK(String clazz, String joinFetch,
			Object pk) {
		String lowString=CommonUtil.startNameLowerCase(clazz);
		
		String hql=" select "+lowString+" from "+clazz+" as "+lowString+joinFetch+" where "+lowString+".id="+pk.toString();
		return findAllByHql(hql).get(0);
	}

	@Override
	public EntityManager getEtityManger() {
		
		return commonDao.getEntityManager();
	}

	@Override
	public Object[] getAllByPage(String hql, String hqlTotal, int page,
			int pageSize) {
		// TODO Auto-generated method stub
		return commonDao.getAllByPage(hql, hqlTotal, page, pageSize);
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getAllJsonObjectBypag(Class<?> objectClass,String hql, String hqlTotal, int page,
			int pageSize,int joinFechSize) {		
		if (page < 0) {
			page = 1;
		}
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> jsonList = new ArrayList<String>();
		Object[] objct = getAllByPage(hql, hqlTotal, page, pageSize);
		Integer totals = (Integer) objct[1];
		if (totals > 0) {
			List<Object> objectList = (List<Object>) objct[0];
			for (Object object : objectList) {
			
				String jsonStr = JSONHandleUtil.readJsonObject(object, objectClass, joinFechSize);
				jsonList.add(jsonStr);
			}
			map.put("total", totals);
			map.put("rows", jsonList);
		} else {
			map.put("total", 0);
			map.put("rows", jsonList);
		}
		JSONObject jsonObject = JSONObject.fromObject(map);
		return jsonObject.toString();
	}
	
	
	
	
//	@Override
//	public void excute(String bussnessCode, List<Object> list) throws IllegalArgumentException, IllegalAccessException, InvocationTargetException, SecurityException, NoSuchMethodException {
//		
//		String methodName = getMethodName( bussnessCode);
//		if (methodName != null && !methodName.equals("")) {
//			Method method = this.getClass().getMethod(methodName,new Class[] { List.class});
//			method.invoke(this, new Object[] { list });
//		}
//	}
//
//	private String getMethodName(String bussnessCode) {
//		
//		return null;
//	}

}
