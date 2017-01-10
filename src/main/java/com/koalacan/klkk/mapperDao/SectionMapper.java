package com.koalacan.klkk.mapperDao;

import com.koalacan.klkk.model.Section;
import com.koalacan.klkk.model.SectionExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SectionMapper {
    int countByExample(SectionExample example);

    int deleteByExample(SectionExample example);

    int insert(Section record);

    int insertSelective(Section record);

    List<Section> selectByExampleWithBLOBs(SectionExample example);

    List<Section> selectByExample(SectionExample example);

    int updateByExampleSelective(@Param("record") Section record, @Param("example") SectionExample example);

    int updateByExampleWithBLOBs(@Param("record") Section record, @Param("example") SectionExample example);

    int updateByExample(@Param("record") Section record, @Param("example") SectionExample example);
}