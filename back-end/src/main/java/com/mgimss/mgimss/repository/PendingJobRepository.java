package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;


public interface PendingJobRepository extends JpaRepository<Job, Long> {

    @Query(nativeQuery = true, value = "select * from job where uid =:uid")
    ArrayList<Job> findByUid(@Param("uid") Long id);
    @Query(nativeQuery = true, value = "select * from job where app_id =:appId")
    Job findByAppliance(@Param("appId") Long appId);
    @Query(nativeQuery = true, value = "select * from job where aid=:aid and uid=:uid")
    Job findByApplianceAndUser(@Param("aid") Long aid, @Param("uid") Long uid);
}