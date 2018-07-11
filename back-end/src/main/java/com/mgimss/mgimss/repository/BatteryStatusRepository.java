package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.BatteryStatus;
import com.mgimss.mgimss.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.Date;
import java.util.List;

public interface BatteryStatusRepository extends JpaRepository<BatteryStatus, Long>{

    @Query(nativeQuery = true, value="select * from battery_status  where record_time =:time and uid =:uid")
    BatteryStatus findByUserAndRecordTime(@Param("time") Date time, @Param("uid") Long uid);

    @Query(nativeQuery = true, value="select * from battery_status  where uid =:uid")
    List<BatteryStatus> findByUser(@Param("uid") Long uid);

    @Query(nativeQuery = true, value="select * from battery_status  where uid =:uid and record_time >=:time1 and record_time <=:time2")
    List<BatteryStatus> findByUserAndInterval(@Param("uid") Long uid, @Param("time1") Date time1,
                                              @Param("time2") Date time2);
}
