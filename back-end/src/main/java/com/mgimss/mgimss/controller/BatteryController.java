package com.mgimss.mgimss.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public interface BatteryController {
    //python calls
    @RequestMapping("/battery/post_remaining")
    String post_remaining(String time, Long remain, String uid,Long light_intensity,float distance,float humidity,float temperature,String tigan);

    //java calls
    @RequestMapping("/battery/get_remaining")
    Long  get_remaining();

    //python calls
    @RequestMapping("/battery/nothing")
    String post_generation(Long time, Long generation, String uid);

    //python calls
    @RequestMapping("/battery/obtainSolar")
    public String obtainSolar(Long aid, String option);
}
