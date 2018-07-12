package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.SolarPower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface SolarPowerRepository extends JpaRepository<SolarPower, Long>{
    @Query(nativeQuery = true, value="select max(sid) from solar_power where uid =:uid ")
    Long findMaxSidByUid(@Param("uid") Long uid);

    @Query(nativeQuery = true, value = "select forecastData from solar_power where uid =:uid order by sid")
    ArrayList<Long> findAllDataByUid(@Param("uid") Long uid);

    @Query(nativeQuery = true, value="select count(*) from solar_power where uid =:uid")
    Long findCount(@Param("uid") Long uid);
}
