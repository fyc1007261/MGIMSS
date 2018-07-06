package com.mgimss.mgimss.classes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LatestTimeRepository extends JpaRepository<LatestTime, Long> {
    @Query("select obj from LatestTime obj where obj.username=:username")
    LatestTime getByUsername(@Param("username") String username);

}
