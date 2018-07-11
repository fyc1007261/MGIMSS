package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created by sang on 2017/1/10.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    @Query("select u from User u where u.uid =:uid")
    User findByUid(@Param("uid") Long uid);
}
