package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;


public interface RunningJobRepository extends JpaRepository<Job, Long> {

    @Query(nativeQuery = true, value = "select * from job where uid =:uid  and status = 1")
    ArrayList<Job> findByUid(@Param("uid") Long uid);

    @Query(nativeQuery = true, value = "select * from job where job_id =:jobId  and status = 1")
    Job findByJobId(@Param("jobId") Long jobId);

    @Query(nativeQuery = true, value = "select * from job where app_id =:appId  and status = 1")
    Job findByAppliance(@Param("appId") Long appId);

    @Query(nativeQuery = true, value = "select * from job where aid=:aid and uid=:uid")
    Job findByApplianceAndUser(@Param("aid") Long aid, @Param("uid") Long uid);
}