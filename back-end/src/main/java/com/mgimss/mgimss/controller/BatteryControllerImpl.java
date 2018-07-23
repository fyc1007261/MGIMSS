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
import java.util.HashMap;
import java.util.Map;

import static com.mgimss.mgimss.utils.ConnectHardware.sendMessage;
import static com.mgimss.mgimss.utils.ToJson.MapToJson;

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
    public String post_remaining(String time, Long remaining, String uid){

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
        battery.setRemain(remaining);

        //记录log
        BatteryStatus batteryStatus = new BatteryStatus(remaining, recordTime, battery);

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

    public String post_generation(Long time, Long generation, String uid){
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

        solarPower = new SolarPower(new_sid, user, Long.valueOf(3600), generation,time);

//        solarPowerRepository.save(solarPower);
        System.out.println("here got it~");
        return "success";
    }
//java call
    public String obtainSolar(Long time, String option){
        User user;
        String port;
        String host;
        int new_state;
        String send_message;
        String recv_message;

//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        user = (User) auth.getPrincipal();

        user = userRepository.findByUid(1L);

        System.out.println("obtainSolar");




        host = user.getHardwareHost();
        port = user.getHardwarePort();

        Map<String, String> map = new HashMap<>();
        map.put("time", String.valueOf(time));
        map.put("option", option);

        send_message = MapToJson(map);
        recv_message = sendMessage(host, port, send_message);
        System.out.println("get message from server: " + recv_message);
        return recv_message;

    }
}
