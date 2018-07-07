package com.light.springboot.repository;

import com.light.springboot.entity.AppStatus;
import com.light.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.LinkedHashSet;

public interface AppStatusRepository extends JpaRepository<AppStatus, Long>{

    @Query("select a from AppStatus a where a.recordTime >= time1 and a.recordTime <= time2 and a.appliance.user = user")
    LinkedHashSet<AppStatus> findByTimeAndUsername(@Param("time1") Date time1, @Param("time2") Date time2,
                                                   @Param("user") User user);
}
