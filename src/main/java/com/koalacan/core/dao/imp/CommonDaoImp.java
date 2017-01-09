
package com.koalacan.core.dao.imp;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.koalacan.core.dao.CommonDao;
import com.koalacan.core.entity.PageEntity;
import com.koalacan.core.util.CommonUtil;

@Repository("commonDao")
public class CommonDaoImp<T, PK extends Serializable> implements CommonDao<T, PK>{

	private static Logger logger=Logger.getLogger(CommonDaoImp.class);  
	@PersistenceContext
	private EntityManager em;	
	private Class<T> objectClass;

	
	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	public EntityManager getEntityManager() {
		return this.em;
	}

	public void setObjectClass(Class<T> objectClass) {
		this.objectClass = objectClass;
	}
	
	public Class<T> getObjectClass() {
		return objectClass;
	}
	
	

	/**
	 * @param object
	 * @pdOid
	 */
	@Transactional
	public T save(T object) {
		em.persist(object);
		em.flush();
		return object;
	}

	/**
	 * @param object
	 */
	public T merge(T object) {
		em.merge(object);
		return object;
	}

	/**
	 * @param pk
	 */
	public T get(PK pk) {

		return em.find(getObjectClass(), pk);
	}

	/**
	 * @param pk
	 */
	public T getByPK(Class<T> objectClass,Object pk) {
		return em.find(objectClass, pk);
	}
	/**
	 * @param object
	 */
	public void delete(T object) {
		em.remove(em.merge(object));
	}

	/**
	 * @param pk
	 * 
	 */

	public void deleteByPK(Class<T> objectClass,Object pk) {
		em.remove(getByPK(objectClass,pk));
	}

	/**
	 * 
	* @Title: getAllByPage 
	* @Description: TODO(分页方法) 
	* @�?后修改时间：2012-3-15 下午3:59:18
	* @param pageBean
	* @return 对方法的参数进行描述
	* @return Object[] 返回类型
	* @throws
	 */
	public Object[] getAllByPage(PageEntity pageBean) {
		int page = pageBean.getPage();
		int pagesize = pageBean.getPageSize();
		String hql = pageBean.getHql();
		String hqlTotal = pageBean.getHqlTotal();

		if (pagesize < 1) {
			pagesize = 10;
		}
		Object[] objs = new Object[2];
		logger.info("HqlTotal::"+hqlTotal);
		List<?> countlist = em.createQuery(hqlTotal).getResultList();
		int totalCountSize = countlist.size();
		if (totalCountSize == 0) {
			objs[1] = new Integer(0);
		} else if (totalCountSize == 1) {
			if (countlist.get(0) instanceof Number) {
				objs[1] = ((Number) countlist.get(0)).intValue();
			} else {
				objs[1] = countlist.size();
			}
		} else {
			objs[1] = countlist.size();
		}
		if (page * pagesize > (Integer) objs[1]) {
			page = (Integer) objs[1] / pagesize + 1;
		}
		int index = 0;
		if (page < 1) {
			index = 0;
		} else {
			index = (page - 1) * pagesize;
		}
		Query query = em.createQuery(hql);
		query.setFirstResult(index);
		query.setMaxResults(pagesize);
		List<?> list = query.getResultList();		
		objs[0] = list;
		em.clear();
		em.close();
		return objs;

	}
	/**
	 * 
	* @Title: getAllByPage
	* @Description: TODO(分页方法)
	* @�?后修改时间：2012-3-15 下午3:59:44
	* @see com.cdxt.core.dao.CommonDao#getAllByPage(java.lang.String, int, int, java.lang.String, java.lang.String, java.lang.String, boolean, java.lang.String)
	* @param className
	* @param page
	* @param pageSize
	* @param searchString
	* @param groupBy
	* @param orderColum
	* @param desc
	* @param joinFetch
	* @return 对方法的参数进行描述
	* @throws
	 */
	 public Object[] getAllByPage(String className, int page, int pageSize, String searchString, String groupBy, String orderColum, boolean desc, String joinFetch) {
	        String asClassName = CommonUtil.startNameLowerCase(className);
	        //String selectObject= CommonUtil.startNameUpperCase(className);
	        StringBuffer hql = new StringBuffer("SELECT  ");
	        hql.append(asClassName);
	        hql.append(" FROM ");
	        hasGroupBy(className, asClassName, joinFetch, searchString,groupBy, hql);
	        hasOrderColum(orderColum, desc, hql);
	        StringBuffer hqlCount = new StringBuffer("SELECT COUNT(*) FROM ");
	        hasGroupBy(className, asClassName, joinFetch.replaceAll("FETCH ", "").replaceAll("fetch ", ""), searchString,groupBy, hqlCount);
	        PageEntity pageEntity=new PageEntity();
	        pageEntity.setPage(page);
	        pageEntity.setPageSize(pageSize);
	        pageEntity.setHql(hql.toString());
	        pageEntity.setHqlTotal(hqlCount.toString());	        
	        return getAllByPage(pageEntity);
	    }
    /**
     * 
    * @Title: hasOrderColum 
    * @Description: TODO(这里用一句话描述这个方法的作�?) 
    * @�?后修改时间：2012-3-15 下午4:00:20
    * @param orderColum
    * @param desc
    * @param hql 对方法的参数进行描述
    * @return void 返回类型
    * @throws
     */
	private void hasOrderColum(String orderColum, boolean desc, StringBuffer hql) {
		if (orderColum != null && !orderColum.equals("")) {
		    hql.append(" ORDER BY ");
		    hql.append(orderColum);
		    hql.append(desc ? " DESC" : " ASC");
		}
	}
	 /**
	  * 
	 * @Title: hasGroupBy 
	 * @Description: TODO(这里用一句话描述这个方法的作�?) 
	 * @�?后修改时间：2012-3-15 下午4:00:27
	 * @param className
	 * @param asClassName
	 * @param joinFetch
	 * @param searchString
	 * @param groupBy
	 * @param hql 对方法的参数进行描述
	 * @return void 返回类型
	 * @throws
	  */
	 protected void hasGroupBy(String className, String asClassName, String joinFetch, String searchString,String groupBy,StringBuffer hql) {
	        hql.append(className);
	        hql.append(" AS ");
	        hql.append(asClassName);
	        if(joinFetch != null){
	        	hql.append(joinFetch);
	        }
	        if (searchString != null) {
                if (!searchString.trim().equals("")) {
                    hql.append(" WHERE ");
                    hql.append(searchString);
                }
            }
	        if(groupBy!=null){
	        	if(!groupBy.trim().equals("")){
	        		hql.append(" GROUP BY ");
	                hql.append(groupBy);	
	        	}
	        }
	    }

	/**
	 * @param hql
	 * @param pageBean
	 */
	@SuppressWarnings("unchecked")
	public List<T> findAllByHql(String hql) {
		
		return em.createQuery(hql).getResultList();
	}

	/**
	 * 	
	* @Title: getAllObject
	* @Description: TODO(根据对象名称获得对象的list)
	* @�?后修改时间：2012-3-15 下午4:13:00
	* @see com.cdxt.core.dao.CommonDao#getAllObject(java.lang.String)
	* @param className
	* @return 对方法的参数进行描述
	* @throws
	 */
	
	@SuppressWarnings("unchecked")
	public List<T> getAllObject(String className) {
		 String asClassName = CommonUtil.startNameLowerCase(className);
	        String selectObject= CommonUtil.startNameUpperCase(className);
	        StringBuffer hql = new StringBuffer();	     
	        hql.append(" FROM ");
	        hql.append(selectObject);
	        hql.append(" AS ");
	        hql.append(asClassName);
	        System.out.println("hql:"+hql.toString());
		return em.createQuery(hql.toString()).getResultList();
	}


	@Override
	public Object[] getAllByPage(String hql,String hqlTotal, int page, int pageSize) {
		PageEntity pageEntity=new PageEntity();
        pageEntity.setPage(page);
        pageEntity.setPageSize(pageSize);
        pageEntity.setHql(hql);
        pageEntity.setHqlTotal(hqlTotal);
		return getAllByPage(pageEntity);
	}
	
}