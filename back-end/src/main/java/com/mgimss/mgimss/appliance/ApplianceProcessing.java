package com.mgimss.mgimss.appliance;

import com.mgimss.mgimss.classes.Appliance;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public interface ApplianceProcessing {

    @RequestMapping("/post_appliance")
    String receive_current_status(String time, int id, String name, String username,
                              float voltage, float current, int status);

    @RequestMapping("/request_status")
    String request_status(String message);

    List<Appliance> get_latest_status(String username);

}
