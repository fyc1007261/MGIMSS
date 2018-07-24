package com.mgimss.mgimss.controller;


import com.mgimss.mgimss.entity.*;
import com.mgimss.mgimss.repository.*;
import com.mgimss.mgimss.utils.GetUserContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.mgimss.mgimss.utils.ConnectHardware.sendMessage;
import static com.mgimss.mgimss.utils.ToJson.MapToJson;

@RestController
public class OperateApplianceImpl implements OperateAppliance {

    @Autowired
    public AppStatusRepository appStatusRepository;

    @Autowired
    public ApplianceRepository applianceRepository;

    @Autowired
    public  UserRepository userRepository;

    @Autowired
    public PendingJobRepository pendingJobRepository;

    @Autowired
    public RunningJobRepository runningJobRepository;

    @Autowired
    public FinishedJobRepository finishedJobRepository;

    @Autowired
    public GestureRepository gestureRepository;

    @Autowired
    public GetUserContext getUserContext;

    //python calls
    public String post_appliance_status(String time, String id, String voltage, String current, String uid)
    {
        //appstatus只记录在运行的电器的信息，如果当前某电器没在运行，则python端不会发来它的信息
        //如果电器运行结束也不会发

        Date recordTime;
        float presentVoltage;
        float presentCurrent;
        User user;
        Long aid;

        //用电器的id
        aid = Long.valueOf(id);

        System.out.println("got in");
        //当前用户
        user = userRepository.findByUid(Long.valueOf(uid));
        //用电器
        Appliance appliance = applianceRepository.findByUserAndAid(user.getUid(), aid);

        if(appliance == null){
            return "err: no such appliance";
        }

        //信息发送时间
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            recordTime = sdf.parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
            return "err: no such appliance";
        }

        System.out.println(recordTime);

        //当前电压/电流
        presentVoltage = Float.valueOf(voltage);
        presentCurrent = Float.valueOf(current);

        //记录入appStatus表
        AppStatus appStatus = new AppStatus(appliance, recordTime, presentVoltage, presentCurrent);
        appStatusRepository.save(appStatus);

        // return time for client to check for validity
        return "success";
    }

    //python calls
    public String notify_status_change(String id, String mode, String uid)
    {
        //当有用电器开始工作或结束工作时，python会发过来这个请求

        Long aid;
        int newMode;
        User user;
        Date send_time;
        Job job;

        //发送时间
        send_time = new Date();

        //用电器的id
        aid = Long.valueOf(id);

        //当前用户
        user = userRepository.findByUid(Long.valueOf(1));

        //用电器
        Appliance appliance = applianceRepository.findByUserAndAid(user.getUid(), aid);

        if(appliance == null){
            return "err: no such appliance";
        }

        //无差错时，用电器更改为新的状态
        newMode = Integer.valueOf(mode);
        if(newMode == 0){
            job = runningJobRepository.findByAppliance(appliance.getAppId());
            if (job == null) {
                return "err: this running appliance "+aid + " is not in a running job yet";
            }
            appliance.setRunningState(newMode);
            appliance.setLastSendDataTime(send_time);
            job.setAppliance(appliance);
            job.setStatus(2);
            Long curTime = new Date().getTime()/1000;
            job.setIntTrueStopTime(curTime);
            job.setLastTime(job.getIntTrueStopTime() - job.getIntTrueStartTime());
            finishedJobRepository.save(job);

        }
        if(newMode == 1){
            job = pendingJobRepository.findByAppliance(appliance.getAppId());
            appliance.setRunningState(newMode);
            appliance.setLastSendDataTime(send_time);
            if (job == null) {
                Long starttime = new Date().getTime()/1000;
                Optional<Double> pPower = appStatusRepository.findAvgPowerByAppliance(appliance.getAppId());
                Long perPower;
                if (!pPower.isPresent()){
                    perPower = appliance.getPower();
                }
                else perPower = Math.round(pPower.get());
                job = new Job(starttime, Long.MAX_VALUE, starttime, Long.MAX_VALUE, Long.MAX_VALUE,
                        perPower, 1, appliance, user);
            }
            else{

                job.setAppliance(appliance);
                job.setStatus(1);
                Long curTime = new Date().getTime()/1000;
                job.setIntStartTime(curTime);
            }
            runningJobRepository.save(job);
        }
        applianceRepository.save(appliance);

        return "success";
    }

    //java calls
    public String add_appliance(String name, String mfrs, Long power, String gesture, HttpServletResponse response)
    {
        User user;
        Long aid;
        Date addDate;
        String port;
        String host;
        String send_message;
        String recv_message;

        //当前用户
//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        user = (User) auth.getPrincipal();


        user = userRepository.findByUid(Long.valueOf(1));
        if (!gesture.equals( "none"))
        {
            Gesture gest = new Gesture(gesture,name,user);
            gestureRepository.save(gest);
        }
        //获得新电器应分配的aid
        Set<Appliance> present_apps = user.getAppliances();
        if (present_apps.size() == 0) aid = Long.valueOf(1);
        else aid = applianceRepository.findMaxAidByUid(user.getUid()) + 1;

        //添加时间
        addDate = new Date();

        Appliance appliance = new Appliance(user, aid, name, addDate, mfrs,
                power, null, 0);

        host = user.getHardwareHost();
        port = user.getHardwarePort();

        Map<String, String> map = new HashMap<>();
        map.put("id", String.valueOf(aid));
        map.put("name", name);
        map.put("option", "add");

        send_message = MapToJson(map);
        recv_message = sendMessage(host, port, send_message);

        System.out.println("get message from server: " + recv_message);
        if (recv_message.contains("err")) return recv_message;

        //当python做完了相应操作没出错时，同步数据库
        applianceRepository.save(appliance);
        response.addHeader("Access-Control-Allow-Origin", "*");
        return recv_message;
    }

    //java calls
    public String delete_appliance(Long aid, HttpServletResponse response)
    {
        User user;
        String port;
        String host;
        String send_message;
        String recv_message;

        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        user = (User) auth.getPrincipal();

        System.out.println("APPLIANCE");
        Appliance appliance = applianceRepository.findByUserAndAid(user.getUid(), aid);
        if (appliance == null){
            return "err: no appliance";
        }

        host = user.getHardwareHost();
        port = user.getHardwarePort();

        Map<String, String> map = new HashMap<>();
        map.put("id", String.valueOf(aid));
        map.put("option", "delete");

        send_message = MapToJson(map);
        recv_message = sendMessage(host, port, send_message);
        System.out.println("get message from server: " + recv_message);
        if (recv_message.contains("err")) return recv_message;

        //当python做完了相应操作没出错时，同步数据库
        applianceRepository.delete(appliance);
        response.addHeader("Access-Control-Allow-Origin", "*");
        return recv_message;
    }


    public String modify_appliance(Long aid, String mfrs, Long power,String gesture){
        User user;
        //当前用户
//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        user = (User) auth.getPrincipal();
        user = userRepository.findByUid(Long.valueOf(1));
        Appliance appliance = applianceRepository.findByUserAndAid(user.getUid(), aid);
        appliance.setMfrs(mfrs);
        appliance.setPower(power);
        applianceRepository.saveAndFlush(appliance);
        String gest = gestureRepository.findByNameAndUid(appliance.getName(),appliance.getUser().getUid());
        gestureRepository.deleteByGname(gest);

        if (!gesture.equals( "none"))
        {
            Gesture gest2 = new Gesture(gesture,appliance.getName(),user);
            gestureRepository.save(gest2);
        }
        return "success";
    }


    //java calls
    public String switch_appliance(Long aid, String option, HttpServletResponse response){
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

        if(option.equals("on")) new_state = 1;
        else if (option.equals("off")) new_state = 0;
        else return "err: wrong option string";

        Appliance appliance = applianceRepository.findByUserAndAid(user.getUid(), aid);
        if (appliance == null){
            return "err: no appliance";
        }

        // judge whether the appliance is in the pending job list
        if (option.equals("on") && pendingJobRepository.findByAppliance(appliance.getAppId())!=null)
            return "Invalid operation";
        host = user.getHardwareHost();
        port = user.getHardwarePort();

        Map<String, String> map = new HashMap<>();
        map.put("id", String.valueOf(aid));
        map.put("option", option);

        send_message = MapToJson(map);
        recv_message = sendMessage(host, port, send_message);
        System.out.println("get message from server: " + recv_message);
        response.addHeader("Access-Control-Allow-Origin", "*");
        return recv_message;

    }

    //java calls

    public String request_appliances_status(String aid, String count, Date end_time, HttpServletResponse response)
    {
        User user;
        Appliance appliance;
        List<AppStatus> appStatus;
        StringBuffer buf;
        Date start_time;
        String sTime;
        String eTime;

        //当前用户
//        SecurityContext ctx = SecurityContextHolder.getContext();
//        Authentication auth = ctx.getAuthentication();
//        user = (User) auth.getPrincipal();

        user = userRepository.findByUid(1L);

        System.out.println("APPLIANCE");

        //查询电器
        appliance = applianceRepository.findByUserAndAid(user.getUid(), Long.valueOf(aid));

        //查询区间(5s)的开始时间
        start_time = new Date(end_time.getTime() - (long)(5 * 1000 * Long.valueOf(count)));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        sTime = sdf.format(start_time);
        eTime = sdf.format(end_time);

        //count条该电器的最近数据
        appStatus = appStatusRepository.findByApplianceAndCountBetweenTime(appliance.getAppId(), Long.valueOf(count), sTime, eTime);
        buf = new StringBuffer();
        buf.append("{\"status\":[");
        for(AppStatus a : appStatus) {
            buf.append("{\"time\":\"" + a.getRecordTime() +
                        "\",\"current\":" + a.getPresentCurrent() +
                        ",\"voltage\":" + a.getPresentVoltage() +
                        "},"
            );
        }
        if(appStatus.size() > 0)
            buf.deleteCharAt(buf.length() - 1);
        buf.append("]}");
        System.out.println(buf.toString());
        response.addHeader("Access-Control-Allow-Origin", "*");
        return buf.toString();

    }


    //java calls
    public List<Appliance> get_appliances(){

        List<Appliance> appliances;
        User user;

        //当前用户
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        user = (User) auth.getPrincipal();
        System.out.println("APPLIANCE");
        appliances = applianceRepository.findByUser(user.getUid());
        return appliances;
    }
}
