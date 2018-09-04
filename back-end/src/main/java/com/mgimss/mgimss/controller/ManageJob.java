package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.AI.DataTest;
import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.*;
import com.mgimss.mgimss.utils.GetUserContext;
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
    @Autowired
    UserRepository userRepository;

    @Autowired
    RunningJobRepository runningJobRepository;
    @Autowired
    public GetUserContext getUserContext;
    @RequestMapping("schedule/create_job")
    public String createJob(Long startTime ,Long stopTime, Long lastTime, Long aid) {
        User user;
//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        user = (User) auth.getPrincipal();
        user = getUserContext.getUser();
        Appliance appliance = applianceRepository.findByUserAndAid(user.getUid(), aid);

        // judge whether the job already exists
        if (pendingJobRepository.findByAppliance(appliance.getAppId()) != null || runningJobRepository.findByAppliance(appliance.getAppId())!=null){
            return "This appliance is already in the schedule list. Please switch off the appliance" +
                    "first or modify the schedule instead.";
        }

        Optional<Double> pPower = appStatusRepository.findAvgPowerByAppliance(appliance.getAppId());
        Long perPower;
        if (!pPower.isPresent()){
            perPower = appliance.getPower();
        }
        else perPower = Math.round(pPower.get());
        Job job;
        job = new Job(startTime, stopTime, Long.valueOf(0), Long.valueOf(0), lastTime,
                perPower, 0, appliance, user);
        pendingJobRepository.save(job);
        return "success";
    }

    @RequestMapping("schedule/delete_job")
    public String deleteJob( Long jid ) {
//        User user;
//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        user = (User) auth.getPrincipal();
        pendingJobRepository.deleteByJid(jid);
        return "success";
    }

    @RequestMapping("schedule/modify_job")
    public String modifyJob(Long startTime, Long stopTime, Long lastTime, Long jid ) {
//        deleteJob(aid);
//        createJob(startTime, stopTime, lastTime, aid);
        Job job = pendingJobRepository.findByJobId(jid);
        if(job==null)
            return "Job not exist.";
        job.setIntStartTime(startTime);
        job.setIntStopTime(stopTime);
        job.setIntTrueStartTime(0L);
        job.setIntTrueStopTime(0L);
        pendingJobRepository.saveAndFlush(job);
        return "success";
    }
}
