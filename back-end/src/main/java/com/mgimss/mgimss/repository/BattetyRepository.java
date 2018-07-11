package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.Battery;
import com.mgimss.mgimss.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BattetyRepository extends JpaRepository<Battery, Long>{

    @Query(nativeQuery = true, value="select * from battery where uid =:uid")
    Battery findByUser(@Param("uid") Long uid);

}
