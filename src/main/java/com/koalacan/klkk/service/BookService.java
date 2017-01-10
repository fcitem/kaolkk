package com.koalacan.klkk.service;

import com.koalacan.klkk.model.Book;
import com.koalacan.klkk.model.BookExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BookService {

    long countByExample(BookExample example);

    int deleteByExample(BookExample example);

    int insert(Book record);

    int insertSelective(Book record);

    List<Book> selectByExampleWithBLOBs(BookExample example);

    List<Book> selectByExample(BookExample example);

    int updateByExampleSelective(@Param("record") Book record, @Param("example") BookExample example);

    int updateByExampleWithBLOBs(@Param("record") Book record, @Param("example") BookExample example);

    int updateByExample(@Param("record") Book record, @Param("example") BookExample example);
}