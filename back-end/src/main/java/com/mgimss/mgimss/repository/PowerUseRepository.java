package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.DailyPowerConsume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface PowerUseRepository extends JpaRepository<DailyPowerConsume, Long> {

    @Query(nativeQuery = true, value = "select * from daily_power_consume where TO_DAYS(NOW())-TO_DAYS(date)<=7")
    List<DailyPowerConsume> find7daysUse();

    @Query(nativeQuery = true, value = "select * from daily_power_consume where PERIOD_DIFF( date_format( now( ) , '%Y%m' ) , date_format( date, '%Y%m' ) ) < 7")
    List<DailyPowerConsume> find7monthsUse();

    @Query(nativeQuery = true, value = "select * from daily_power_consume where date_format(date,'%Y-%m-%d')=:date1")
    List<DailyPowerConsume> findByDate(@Param("date1") String date1);

    @Query(nativeQuery = true, value = "select * from daily_power_consume where date_format(date,'%Y-%m')=:month1")
    List<DailyPowerConsume> findByMonth(@Param("month1") String month1);
}
