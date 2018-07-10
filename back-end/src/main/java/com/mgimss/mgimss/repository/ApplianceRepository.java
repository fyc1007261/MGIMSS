package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ApplianceRepository extends JpaRepository<Appliance, Long> {

    @Query("select a from Appliance a where a.user = user")
    List<Appliance> findByUser(@Param("user") User user);

    @Query("select a from Appliance a where a.user = user and a.aid = aid")
    Appliance findByUserAndAid(@Param("user") User user, @Param("aid") Long aid);

    @Query("select a from Appliance a where a.user = user and a.runningState = 1")
    List<Appliance> findByUserAndState(@Param("user") User user, @Param("runningState") Long runningState);
}