package com.mgimss.mgimss.appliance;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface ApplianceProcessing {

    @RequestMapping("/post_appliance")
    String get_current_status(String time, int id, String name,
                              float voltage, float current, int status);

    @RequestMapping("/test")
    String test();

}
