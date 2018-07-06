package com.light.springboot.repository;

import com.light.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by sang on 2017/1/10.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
