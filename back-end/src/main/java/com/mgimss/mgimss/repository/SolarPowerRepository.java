package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.SolarPower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface SolarPowerRepository extends JpaRepository<SolarPower, SolarPower.SolarPowerId>{
    @Query(nativeQuery = true, value="select max(fid) from SolarPower S where S.uid = uid ")
    Long findMaxFidByUid(@Param("uid") Long uid);

    @Query(nativeQuery = true, value = "select S.forecastData from SolarPower S where S.uid = uid order by sid")
    ArrayList<Long> findAllDataByUid(@Param("uid") Long uid);

    @Query("select count(s) from SolarPower s")
    Long findCount();
}
