package com.mgimss.mgimss.controller;


import com.mgimss.mgimss.entity.AppStatus;
import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.mgimss.mgimss.utils.ConnectHardware.sendMessage;
import static com.mgimss.mgimss.utils.ToJson.MapToJson;

@Controller
public class OperateApplianceImpl implements OperateAppliance {

    @Autowired
    AppStatusRepository appStatusRepository;

    @Autowired
    ApplianceRepository applianceRepository;

    @Autowired
    PendingJobRepository pendingJobRepository;

    @Autowired
    RunningJobRepository runningJobRepository;

    @Autowired
    FinishedJobRepository finishedJobRepository;

    //python calls
    public String post_appliance_status(String time, String id, String voltage, String current)
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

        //当前用户
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        user = (User) auth.getPrincipal();

        //用电器
        Appliance appliance = applianceRepository.findByUserAndAid(user, aid);

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
    public String notify_status_change(String id, String mode)
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
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        user = (User) auth.getPrincipal();

        //用电器
        Appliance appliance = applianceRepository.findByUserAndAid(user, aid);

        if(appliance == null){
            return "err: no such appliance";
        }

        //无差错时，用电器更改为新的状态
        newMode = Integer.valueOf(mode);
        appliance.setRunningState(newMode);
        appliance.setLastSendDataTime(send_time);
        if(newMode == 0){
            job = runningJobRepository.findByUserAndAppliance(user, appliance);
            runningJobRepository.delete(job);
            Long curTime = new Date().getTime()/1000;
            job.setIntStopTime(curTime);
            finishedJobRepository.save(job);

        }
        if(newMode == 1){
            job = pendingJobRepository.findByUserAndAppliance(user, appliance);
            pendingJobRepository.delete(job);
            Long curTime = new Date().getTime()/1000;
            job.setIntStartTime(curTime);
            runningJobRepository.save(job);

        }
        applianceRepository.save(appliance);

        return "success";
    }

    //java calls
    public String add_appliance(String name, String mfrs, String ratedParameters)
    {
        User user;
        Long aid;
        Date addDate;
        String port;
        String host;
        String send_message;
        String recv_message;

        //当前用户
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        user = (User) auth.getPrincipal();

        //获得新电器应分配的aid
        Set<Appliance> present_apps = user.getAppliances();
        if (present_apps.size() == 0) aid = Long.valueOf(1);
        else aid = applianceRepository.findMaxAidByUid(user.getUid()) + 1;

        //添加时间
        addDate = new Date();

        Appliance appliance = new Appliance(user, aid, name, addDate, mfrs,
                ratedParameters, null, 0);

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
        return recv_message;
    }

    //java calls
    public String delete_appliance(Long aid)
    {
        User user;
        String port;
        String host;
        String send_message;
        String recv_message;

        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        user = (User) auth.getPrincipal();


        Appliance appliance = applianceRepository.findByUserAndAid(user, aid);
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
        return recv_message;
    }

    //java calls
    public String open_close_appliance(Long aid, String option){
        User user;
        String port;
        String host;
        int new_state;
        String send_message;
        String recv_message;

        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        user = (User) auth.getPrincipal();

        if(option.equals("on")) new_state = 1;
        else if (option.equals("off")) new_state = 0;
        else return "err: wrong option string";

        Appliance appliance = applianceRepository.findByUserAndAid(user, aid);
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
        if (recv_message.contains("err")) return recv_message;

        //当python做完了相应操作没出错时，同步数据库
        appliance.setRunningState(new_state);
        applianceRepository.save(appliance);
        return recv_message;

    }

    public ModelAndView request_appliances_status()
    {
        //向python端发送指令，获得当前在运行的所有用电器信息
        User user;

        //当前用户
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        user = (User) auth.getPrincipal();

        //当前用户所有的电器
        List<Appliance> appliances = applianceRepository.findByUser(user);

        ModelAndView mav = new ModelAndView("appliances");
        mav.addObject("appliances", appliances);
        return mav;
    }


    //java calls
    public List<Appliance> get_appliances(){

        List<Appliance> appliances;
        User user;

        //当前用户
        SecurityContext ctx = SecurityContextHolder.getContext();
        Authentication auth = ctx.getAuthentication();
        user = (User) auth.getPrincipal();

        appliances = applianceRepository.findByUser(user);
        return appliances;
    }
}
