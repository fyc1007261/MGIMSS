package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;


public interface SensorRepository extends JpaRepository<Sensor, Long>{

    @Query(nativeQuery = true, value="select * from sensor where sensorid  =:sensorid and uid =:uid")
    List<Sensor> find2ByNameAndUid(@Param("sensorid") Long sensorid, @Param("uid") Long uid);

    @Query(nativeQuery = true, value="select * from sensor where sensorid  =:sensorid and uid =:uid and aid =:aid")
    Sensor findByAidAndUidandSensorid(@Param("sensorid") Long sensorid, @Param("uid") Long uid,@Param("aid") Long aid);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value="delete from sensor where senid =:senid" )
    int deleteByGname(@Param("senid") Long senid);
}
