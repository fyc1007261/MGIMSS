package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.Charge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;

public interface ChargeRepository extends JpaRepository<Charge, Long>{

    @Query(nativeQuery = true, value="select sum(electric_charge) from charge  where record_time >=:time1 and record_time <=:time2 and uid =:uid and opt = 1")
    Long sumSellByTime(@Param("time1") Date time1, @Param("time2") Date time2,
                                   @Param("uid") Long uid);
    @Query(nativeQuery = true, value="select sum(electric_charge) from charge  where record_time >=:time1 and record_time <=:time2 and uid =:uid and opt = -1")
    Long sumBuyByTime(@Param("time1") Date time1, @Param("time2") Date time2,
                       @Param("uid") Long uid);
}
