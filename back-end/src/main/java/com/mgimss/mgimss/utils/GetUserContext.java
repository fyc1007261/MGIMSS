package com.mgimss.mgimss.utils;

import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class GetUserContext {
    @Autowired
    UserRepository userRepository;


    public static GetUserContext getUserContext;

    @PostConstruct
    public void init(){
        getUserContext = this;
    }

    public User getUser(){
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        if (auth==null)
            return null;
        return (User) auth.getPrincipal();
//        return getUserContext.userRepository.findByUid(1L);
    }
}
