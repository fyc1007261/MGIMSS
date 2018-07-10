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

    @Query("select j from Job j where j.user.uid = uid")
    ArrayList<Job> findByUid(@Param("uid") Long id);

    @Query("select j from Job j where j.jobId = jobId")
    Job findByJobId(@Param("jobId") Long jobId);

    @Query("select j from Job j where j.user = user and j.appliance = appliance")
    Job findByUserAndAppliance(@Param("user") User user, @Param("appliance") Appliance appliance);

}