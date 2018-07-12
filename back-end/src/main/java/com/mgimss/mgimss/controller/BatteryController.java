package com.mgimss.mgimss.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public interface BatteryController {
    //python calls
    @RequestMapping("/battery/post_remaining")
    String post_remaining(String time, Long remain, String uid);

    //java calls
    @RequestMapping("/battery/get_remaining")
    Long  get_remaining();

    //python calls
    @RequestMapping("/battery/post_generation")
    String post_generation(String time, Long generation, String uid);
}
