package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface ApplianceRepository extends JpaRepository<Appliance, Long> {

    @Query(nativeQuery = true, value="select * from appliance where uid =:uid")
    List<Appliance> findByUser(@Param("uid") Long uid);

    @Query(nativeQuery = true, value="select * from appliance where uid =:uid and aid =:aid")
    Appliance findByUserAndAid(@Param("uid") Long uid, @Param("aid") Long aid);

    @Query(nativeQuery = true, value="select * from appliance where uid =:uid and runningState = 1")
    List<Appliance> findByUserAndState(@Param("uid") Long uid);

    @Query(nativeQuery = true, value="select max(aid) from appliance where uid =:uid")
    Long findMaxAidByUid(@Param("uid") Long uid);


    @Query(nativeQuery = true, value = "select * from appliance where name =:name and uid=:uid")
    Appliance findByNameAndUid(@Param("name") String name, @Param("uid") Long uid);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value="delete from appliance where app_id =:app_id")
    int deleteByAppId(@Param("app_id") Long app_id);
}