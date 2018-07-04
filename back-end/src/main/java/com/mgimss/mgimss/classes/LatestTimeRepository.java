package com.mgimss.mgimss.classes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LatestTimeRepository extends JpaRepository<LatestTime, Long> {
    @Query("select obj from LatestTime obj")
    LatestTime getLatestTime();

}
