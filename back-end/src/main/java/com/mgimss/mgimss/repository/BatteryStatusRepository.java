package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.BatteryStatus;
import com.mgimss.mgimss.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.Date;
import java.util.List;

public interface BatteryStatusRepository extends JpaRepository<BatteryStatus, BatteryStatus.BatteryStatusId>{

    @Query("select b from BatteryStatus b where b.recordTime = time and b.battery.user = user")
    BatteryStatus findByUserAndRecordTime(@Param("time") Date time, @Param("user") User user);

    @Query("select b from BatteryStatus b where b.battery.user = user")
    List<BatteryStatus> findByUser(@Param("user") User user);

    @Query("select b from BatteryStatus b where b.battery.user = user and b.recordTime >= time1 and b.recordTime <= time2")
    List<BatteryStatus> findByUserAndInterval(@Param("user") User user, @Param("time1") Date time1,
                                              @Param("time2") Date time2);
}
