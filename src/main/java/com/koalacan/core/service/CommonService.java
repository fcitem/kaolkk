package com.koalacan.core.service;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;

public abstract interface CommonService<T, PK extends Serializable> {

	T save(T object);

	T merge(T object);

	T get(PK pk);

	T getByPK(Class<T> objectClass, Object pk);

	void delete(T object);

	void deleteByPK(Class<T> objectClass, Object pk);

	EntityManager getEtityManger();

	/**
	 * 根据对象名获得所有的对象
	 * 
	 * @param String
	 *            className;
	 */
	List<T> getAllObject(String className);

	Object[] getAllByPage(String className, int page, int pageSize, String searchString, String groupBy,
			String orderColum, boolean desc, String joinFetch);

	/**
	 * 根据传入sql获得对象
	 * 
	 * @param hql
	 * @param pageBean
	 */
	List<T> findAllByHql(String hql);

	/**
	 * 查询分页并将结果转换为JSON字符�?
	 * 
	 * @param objectClass
	 * @param page
	 * @param pageSize
	 * @param searchString
	 * @param groupBy
	 * @param orderColum
	 * @param desc
	 * @param joinFetch
	 * @return
	 */
	String getAllJsonObjectBypage(Class<?> objectClass, int page, int pageSize, String searchString, String groupBy,
			String orderColum, boolean desc, String joinFetch, int joinFechSize);

	String getAllJsonObjectList(Class<?> objectClass);

	/**
	 * 根据主键得到级联的对象
	 * 
	 * @param clazz
	 * @param joinFetch
	 * @param pk
	 * @return
	 */
	public Object getCascadeObjectByPK(String clazz, String joinFetch, Object pk);

	Object[] getAllByPage(String hql, String hqlTotal, int page, int pageSize);

	String getAllJsonObjectBypag(Class<?> objectClass, String hql, String hqlTotal, int page, int pageSize,
			int joinFechSize);

	String getAllJsonObjectListPy(Class<?> objectClass);
}
