package com.mgimss.mgimss.controller;

import com.mgimss.mgimss.entity.Appliance;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

@RestController
public interface OperateAppliance {

    //python calls
    @RequestMapping("/appliance/post_appliance")
    String post_appliance_status(String time, String id, String voltage, String current, String uid);

    //python calls
    @RequestMapping("/appliance/notify_status_change")
    String notify_status_change(String id, String mode, String uid);

    //java calls
    @RequestMapping("/appliance/request_status")
    String request_appliances_status(String aid, String count, Date end_time, HttpServletRequest request, HttpServletResponse response);

    @RequestMapping("/appliance/modify_appliance")
    String modify_appliance(Long aid, String mfrs, Long power,String gesture);

    //java calls
    @RequestMapping("/appliance/add_appliance")
    String add_appliance(String name, String mfrs, Long perPower,String gesture);

    //java calls
    @RequestMapping("/appliance/delete_appliance")
    String delete_appliance(Long aid);

    //java calls
    @RequestMapping("/appliance/switch_appliance")
    String switch_appliance(Long aid, String option);

    //java calls
    @RequestMapping("/appliance/get_appliances")
    List<Appliance> get_appliances();



}
