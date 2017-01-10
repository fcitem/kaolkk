package com.koalacan.klkk.service.impl;

import com.koalacan.klkk.mapperDao.BookMapper;
import com.koalacan.klkk.model.Book;
import com.koalacan.klkk.model.BookExample;
import com.koalacan.klkk.service.BookService;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    BookMapper mapper;

    @Override
    public long countByExample(BookExample example) {
        return mapper.countByExample(example);
    }

    @Override
    public int deleteByExample(BookExample example) {
        return mapper.deleteByExample(example);
    }

    @Override
    public int insert(Book record) {
        return mapper.insert(record);
    }

    @Override
    public int insertSelective(Book record) {
        return mapper.insertSelective(record);
    }

    @Override
    public List<Book> selectByExampleWithBLOBs(BookExample example) {
        return mapper.selectByExampleWithBLOBs(example);
    }

    @Override
    public List<Book> selectByExample(BookExample example) {
        return mapper.selectByExample(example);
    }

    @Override
    public int updateByExampleSelective(@Param("record") Book record, @Param("example") BookExample example) {
        return mapper.updateByExampleSelective(record,example);
    }

    @Override
    public int updateByExampleWithBLOBs(@Param("record") Book record, @Param("example") BookExample example) {
        return mapper.updateByExampleWithBLOBs(record,example);
    }

    @Override
    public int updateByExample(@Param("record") Book record, @Param("example") BookExample example) {
        return mapper.updateByExample(record,example);
    }
}