package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.AI.Speechgenrate;
import com.mgimss.mgimss.entity.*;
import com.mgimss.mgimss.repository.*;
import com.mgimss.mgimss.AI.DataTest;
import com.mgimss.mgimss.utils.GetUserContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
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

    @Autowired
    ApplianceRepository applianceRepository;

    @Autowired
    SensorRepository sensorRepository;

    @Autowired
    public GetUserContext getUserContext;
    //python calls
    public String post_remaining(String time, Long remaining, String uid,Long light_intensity,float distance,float humidity,float temperature,String tigan){

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
        Boolean sensorCharge = false;
        Boolean distanceCharge = false;
        Boolean temperatureCharge = false;
        if (distance < 0)
            distance = (float)10.0;
        try {
            if(light_intensity > 800)
            {
                DataTest.usersensor.put(user.getUid(),true);
                List<Sensor> sensorapp = sensorRepository.find2ByNameAndUid(0L,user.getUid());
                for (int ii = 0 ;ii<sensorapp.size();ii++)
                {
                    open_close_appliance2(sensorapp.get(ii).getAid(),"off");
                }
            }
            else
            {
                if (DataTest.usersensor.get(user.getUid()))
                {
                    sensorCharge = true;
                }
                DataTest.usersensor.put(user.getUid(),false);
            }
            if (sensorCharge == true) {
                List<Sensor> sensorapp = sensorRepository.find2ByNameAndUid(0L,user.getUid());
                for (int ii = 0 ;ii<sensorapp.size();ii++)
                {
                    open_close_appliance2(sensorapp.get(ii).getAid(),"on");
                }
                Speechgenrate.voice("当前光照过暗，是否要开启照明设备");
            }

            if(distance > 5.0)
            {
                DataTest.userdistance.put(user.getUid(),true);
                List<Sensor> sensorapp = sensorRepository.find2ByNameAndUid(1L,user.getUid());
                for (int ii = 0 ;ii<sensorapp.size();ii++)
                {
                    open_close_appliance2(sensorapp.get(ii).getAid(),"off");
                }
            }
            else
            {
                if (DataTest.userdistance.get(user.getUid()))
                {
                    distanceCharge = true;
                }
                DataTest.userdistance.put(user.getUid(),false);
            }
            if (distanceCharge == true) {
                List<Sensor> sensorapp = sensorRepository.find2ByNameAndUid(1L,user.getUid());
                for (int ii = 0 ;ii<sensorapp.size();ii++)
                {
                    open_close_appliance2(sensorapp.get(ii).getAid(),"on");
                }
                Speechgenrate.voice("发现有人靠近，是否要开启照明设备");
            }

            if(temperature < 32)
            {
                DataTest.usertemperature.put(user.getUid(),true);
                List<Sensor> sensorapp = sensorRepository.find2ByNameAndUid(2L,user.getUid());
                for (int ii = 0 ;ii<sensorapp.size();ii++)
                {
                    open_close_appliance2(sensorapp.get(ii).getAid(),"off");
                }
            }
            else
            {
                if (DataTest.usertemperature.get(user.getUid()))
                {
                    temperatureCharge = true;
                }
                DataTest.usertemperature.put(user.getUid(),false);
            }
            if (temperatureCharge == true) {
                List<Sensor> sensorapp = sensorRepository.find2ByNameAndUid(2L,user.getUid());
                for (int ii = 0 ;ii<sensorapp.size();ii++)
                {
                    open_close_appliance2(sensorapp.get(ii).getAid(),"on");
                }
                Speechgenrate.voice("温度过高，是否要开启空调");
            }

            if( tigan.equals("down"))
            {
                List<Sensor> sensorapp = sensorRepository.find2ByNameAndUid(3L,user.getUid());
                for (int ii = 0 ;ii<sensorapp.size();ii++)
                {
                    open_close_appliance2(sensorapp.get(ii).getAid(),"on");
                }
                //open_close_appliance2(0L,"on");
            }
            if( tigan.equals("up"))
            {
                List<Sensor> sensorapp = sensorRepository.find2ByNameAndUid(3L,user.getUid());
                for (int ii = 0 ;ii<sensorapp.size();ii++)
                {
                    open_close_appliance2(sensorapp.get(ii).getAid(),"off");
                }
                //open_close_appliance2(0L,"off");
            }
        }
        catch (Exception e)
        {
            System.out.println("语音合成失败");
        }
//        if (LEDstatus == Long.valueOf(1))
//        {
//            open_close_appliance(Long.valueOf(0));
//        }
        System.out.println(light_intensity);
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

        user = getUserContext.getUser();

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
    public String open_close_appliance(Long aid){
        User user;
        String port;
        String host;
        String option;
        int new_state;
        String send_message;
        String recv_message;

//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        user = (User) auth.getPrincipal();

        user = getUserContext.getUser();

        Appliance appliance = applianceRepository.findByUserAndAid(user.getUid(), aid);
        if (appliance == null){
            return "err: no appliance";
        }
        if (appliance.getRunningState() == 0)
        {
            option = "on";
        }
        else
        {
            option = "off";
        }
        host = user.getHardwareHost();
        port = user.getHardwarePort();

        Map<String, String> map = new HashMap<>();
        map.put("id", String.valueOf(aid));
        map.put("option", option);

        send_message = MapToJson(map);
        recv_message = sendMessage(host, port, send_message);
        System.out.println("get message from server: " + recv_message);
        return recv_message;

    }

    public String open_close_appliance2(Long aid, String option){
        User user;
        String port;
        String host;
        int new_state;
        String send_message;
        String recv_message;

//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        user = (User) auth.getPrincipal();

        user = getUserContext.getUser();

        System.out.println("APPLIANCE");
        if(option.equals("on")) new_state = 1;
        else if (option.equals("off")) new_state = 0;
        else return "err: wrong option string";

        Appliance appliance = applianceRepository.findByUserAndAid(user.getUid(), aid);
        if (appliance == null){
            return "err: no appliance";
        }

        host = user.getHardwareHost();
        port = user.getHardwarePort();

        Map<String, String> map = new HashMap<>();
        map.put("id", String.valueOf(aid));
        map.put("option", option);

        send_message = MapToJson(map);
        recv_message = sendMessage(host, port, send_message);
        System.out.println("get message from server: " + recv_message);
        return recv_message;

    }
}
