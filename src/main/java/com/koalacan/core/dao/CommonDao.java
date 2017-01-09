
package com.koalacan.core.dao;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;

public abstract interface CommonDao<T, PK extends Serializable>{ 
   
	EntityManager getEntityManager() ;
	/** 
    * @param object
    *  */
   T save(T object);
   /** 
    * @param object
    *  */
   T merge(T object);
   /** 
    * @param pk
    *  */
   T get(PK pk);
   
   /** @param pk
    *  */
   T getByPK(Class<T> objectClass,Object pk);
   /** @param pk
    *  */
   
   void deleteByPK(Class<T> objectClass,Object pk);
   /** @param object
    *  */
   void delete(T object);
  
   /** @param className
    * 
    *  */
   List<T> getAllObject(String className);
   /** @param pageBean
    *  */
   Object[] getAllByPage(String className, int page, int pageSize, String searchString, String groupBy, String orderColum, boolean desc, String joinFetch);
   /**
    * @param pageBean
    * @String hql
    *  */
  List<T> findAllByHql(String hql);
 
  
  Object[] getAllByPage(String hql, String hqlTotal,int page, int pageSize);
  

}