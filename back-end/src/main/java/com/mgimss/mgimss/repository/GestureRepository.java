package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.Gesture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;


public interface GestureRepository extends JpaRepository<Gesture, Long>{

    @Query(nativeQuery = true, value="select * from gesture where gname  =:gname")
    Gesture findByGname(@Param("gname") String gname);

    @Query(nativeQuery = true, value="select gname from gesture where name  =:name and uid =:uid")
    String findByNameAndUid(@Param("name") String name,@Param("uid") Long uid);

    @Query(nativeQuery = true, value="select * from gesture where name  =:name and uid =:uid")
    Gesture find2ByNameAndUid(@Param("name") String name,@Param("uid") Long uid);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value="delete from gesture where gname =:gname" )
    int deleteByGname(@Param("gname") String gname);
}
