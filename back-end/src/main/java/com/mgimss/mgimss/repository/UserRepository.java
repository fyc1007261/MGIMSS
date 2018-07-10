package com.mgimss.mgimss.repository;

import com.mgimss.mgimss.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by sang on 2017/1/10.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
