package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.AppStatusRepository;
import com.mgimss.mgimss.repository.ApplianceRepository;
import com.mgimss.mgimss.repository.PendingJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class DeleteJob {
    @Autowired
    PendingJobRepository pendingJobRepository;
    @Autowired
    AppStatusRepository appStatusRepository;
    @Autowired
    ApplianceRepository applianceRepository;
    @RequestMapping("/deleteJob")
    public void deleteJob( String name ) {
        User user;
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        user = (User) auth.getPrincipal();
        Appliance appliance = applianceRepository.findByNameAndUid(name,user.getUid());


    }
}
