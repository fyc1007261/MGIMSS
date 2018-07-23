package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.businessModel.CreateUserThread;
import com.mgimss.mgimss.businessModel.CreateSolarThread;
import com.mgimss.mgimss.AI.UserMapping;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.ArrayList;
import java.util.List;

@RestController
public class Beginschedule
{
    @Autowired
    PendingJobRepository pendingJobRepository;

    @Autowired
    RunningJobRepository runningJobRepository;

    @Autowired
    FinishedJobRepository finishedJobRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BattetyRepository battetyRepository;

    @Autowired
    SolarPowerRepository solarPowerRepository;

    @RequestMapping("/schedule/begin")
    public void begin() {
//        User user;
//        //当前用户
//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        user = (User) auth.getPrincipal();
        System.out.println("create thread");
        Long uid = 1L;
        Thread myThread1 = new CreateUserThread(uid,pendingJobRepository,runningJobRepository,finishedJobRepository,userRepository,battetyRepository,solarPowerRepository);     // 创建一个新的线程  myThread1  此线程进入新建状态// 创建一个新的线程 myThread2 此线程进入新建状态
        UserMapping.usermapping.put(uid,myThread1);
        UserMapping.usermapping.get(uid).start();                     // 调用start()方法使得线程进入就绪状态         // 调用start()方法使得线程进入就绪
//		new Timer().schedule(new test(clientId1),4000);
//		new Timer().schedule(new test(clientId2),24000);

    }

    @RequestMapping("/schedule/solar")
    public void beginSolar() {
//        User user;
//        //当前用户
//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        user = (User) auth.getPrincipal();
        System.out.println("create solar");
        Long uid = 1L;
                            // 调用start()方法使得线程进入就绪状态         // 调用start()方法使得线程进入就绪
//		new Timer().schedule(new test(clientId1),4000);
//		new Timer().schedule(new test(clientId2),24000);
        Thread myThread2 = new CreateSolarThread(uid,pendingJobRepository,runningJobRepository,finishedJobRepository,userRepository,battetyRepository,solarPowerRepository);     // 创建一个新的线程  myThread1  此线程进入新建状态// 创建一个新的线程 myThread2 此线程进入新建状态
        ;
        myThread2.start();
    }
}
