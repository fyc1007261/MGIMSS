package com.mgimss.mgimss.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public interface BatteryController {
    //python calls
    @RequestMapping("/battery/post_remaining")
    String post_remaining(String time, String remaining);

    //java calls
    @RequestMapping("/battery/get_remaining")
    Long  get_remaining();
}
