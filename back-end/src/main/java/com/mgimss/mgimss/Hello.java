package com.mgimss.mgimss;
import com.mgimss.mgimss.classes.ApplianceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Hello{
    @Autowired
    ApplianceRepository applianceRepository;


    @RequestMapping("/post_appliance")
    String hello(String name, float voltage, float current, int status){

        return name + " " + voltage + " " + current + " " + status;
    }
}