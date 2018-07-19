package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.DailyPowerConsume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface PowerUseRepository extends JpaRepository<DailyPowerConsume, Long> {

    @Query(nativeQuery = true, value = "select * from daily_power_consume,appliance where TO_DAYS(NOW())-TO_DAYS(date)<=7 and daily_power_consume.app_id=appliance.app_id and uid=:uid")
    List<DailyPowerConsume> find7daysUse(@Param("uid") Long uid);

    @Query(nativeQuery = true, value = "select * from daily_power_consume,appliance where PERIOD_DIFF(date_format(now(),'%Y%m'),date_format(date,'%Y%m'))<7 and daily_power_consume.app_id=appliance.app_id and uid=:uid")
    List<DailyPowerConsume> find7monthsUse(@Param("uid") Long uid);

    @Query(nativeQuery = true, value = "select * from daily_power_consume,appliance where date_format(date,'%Y-%m-%d')=:date1 and daily_power_consume.app_id=appliance.app_id and uid=:uid")
    List<DailyPowerConsume> findByDate(@Param("date1") String date1, @Param("uid") Long uid);

    @Query(nativeQuery = true, value = "select * from daily_power_consume,appliance where date_format(date,'%Y-%m')=:month1 and daily_power_consume.app_id=appliance.app_id and uid=:uid")
    List<DailyPowerConsume> findByMonth(@Param("month1") String month1, @Param("uid") Long uid);

    @Query(nativeQuery = true, value = "select * from daily_power_consume,appliance where date_format(date,'%Y')=:year1 and daily_power_consume.app_id=appliance.app_id and uid=:uid")
    List<DailyPowerConsume> findByYear(@Param("year1") String year1, @Param("uid") Long uid);
}
