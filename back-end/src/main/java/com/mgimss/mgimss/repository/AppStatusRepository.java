package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.AppStatus;
import com.mgimss.mgimss.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;

public interface AppStatusRepository extends JpaRepository<AppStatus, Long>{

    @Query(nativeQuery = true, value="select * from app_status  where recordTime >=:time1 and recordTime <=:time2 and uid =:uid")
    LinkedHashSet<AppStatus> findByTimeAndUser(@Param("time1") Date time1, @Param("time2") Date time2,
                                                   @Param("uid") Long uid);
    @Query(nativeQuery = true, value="select avg(present_current * present_voltage) from app_status where  app_id=:app_id")
    Long findAvgPowerByAppliance(@Param("app_id") Long app_id);

    @Query(nativeQuery=true,value="select * from app_status where app_id=:app_id and record_time >=:start_time " +
            "and record_time <=:end_time order by record_time desc limit :count" )
    List<AppStatus> findByApplianceAndCountBetweenTime(@Param("app_id") Long app_id, @Param("count") Long count,
                                                       @Param("start_time") String start_time, @Param("end_time") String end_time);

}
