package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.AI.DataTest;
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
public class ManageJob {
    @Autowired
    PendingJobRepository pendingJobRepository;
    @Autowired
    AppStatusRepository appStatusRepository;
    @Autowired
    ApplianceRepository applianceRepository;
    @RequestMapping("/createJob")
    public void createJob(Long startTime ,Long stopTime,Long lastTime, String name ) {
        User user;
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        user = (User) auth.getPrincipal();
        Appliance appliance = applianceRepository.findByNameAndUid(name,user.getUid());
        Optional<Long> pPower = appStatusRepository.findAvgPowerByAppliance(appliance.getAppId());
        Long perPower;
        if (!pPower.isPresent()){
            perPower = appliance.getPower();
        }
        else perPower = pPower.get();
        Job job;
        job = new Job(startTime, stopTime, Long.valueOf(0), Long.valueOf(0), lastTime,
                perPower, 0, appliance, user);
        pendingJobRepository.save(job);
    }
    @RequestMapping("/deleteJob")
    public void deleteJob( String name ) {
        User user;
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        user = (User) auth.getPrincipal();
        Appliance appliance = applianceRepository.findByNameAndUid(name,user.getUid());
        pendingJobRepository.deleteByAppliance(appliance.getAppId());

    }
    @RequestMapping("/modifyJob")
    public void modifyJob(Long startTime ,Long stopTime,Long lastTime, String name ) {
        deleteJob(name);
        createJob(startTime,stopTime,lastTime,name);
    }
}
