package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.entity.*;
import com.mgimss.mgimss.repository.BatteryStatusRepository;
import com.mgimss.mgimss.repository.BattetyRepository;
import com.mgimss.mgimss.repository.SolarPowerRepository;
import com.mgimss.mgimss.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class BatteryControllerImpl implements BatteryController{

    @Autowired
    BatteryStatusRepository batteryStatusRepository;

    @Autowired
    BattetyRepository battetyRepository;

    @Autowired
    SolarPowerRepository solarPowerRepository;

    @Autowired
    UserRepository userRepository;

    //python calls
    public String post_remaining(String time, Long remain, String uid){

        User user;
        Battery battery;
        Date recordTime;

        user = userRepository.findByUid(Long.valueOf(uid));

        battery = battetyRepository.findByUser(user.getUid());

        if (battery == null){
            return "err: no such battery";
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            recordTime = sdf.parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
            return "err: encounter error when formatting date";
        }

        //更新电池剩余电量
        battery.setRemain(remain);

        //记录log
        BatteryStatus batteryStatus = new BatteryStatus(remain, recordTime, battery);

        battetyRepository.save(battery);
        batteryStatusRepository.save(batteryStatus);

        return "success";
    }

    //java class
    public Long get_remaining(){

        User user;
        Battery battery;
        Long remainingCharge;

        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        user = (User) auth.getPrincipal();

        battery = battetyRepository.findByUser(user.getUid());
        if (battery == null){
            return Long.valueOf(-1);
        }
        remainingCharge = battery.getRemain();

        return remainingCharge;
    }

    public String post_generation(String time, Long generation, String uid){
        User user;
        Long new_sid;
        Long count;
        SolarPower solarPower;

        user = userRepository.findByUid(Long.valueOf(uid));


        count = solarPowerRepository.findCount(user.getUid());
        if (count.equals(Long.valueOf(0))){
            new_sid = Long.valueOf(0);
        }
        else
            new_sid = solarPowerRepository.findMaxSidByUid(user.getUid()) + 1;

        System.out.println("complete sid: "+ new_sid + user.getUid());

        solarPower = new SolarPower(new_sid, user, Long.valueOf(1800), generation);

//        solarPowerRepository.save(solarPower);
        System.out.println("here got it~");
        return "success";
    }
}
