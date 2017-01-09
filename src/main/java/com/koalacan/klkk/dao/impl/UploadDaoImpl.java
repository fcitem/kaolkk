/**
 * 
 */
package com.koalacan.klkk.dao.impl;

import java.io.Serializable;

import org.springframework.stereotype.Repository;

import com.koalacan.core.dao.imp.CommonDaoImp;
import com.koalacan.klkk.dao.UploadDao;
import com.koalacan.klkk.model.Image;

/**
 * @author Administrator
 *
 */
@Repository
public class UploadDaoImpl extends CommonDaoImp<Image, Serializable> implements UploadDao{

}
