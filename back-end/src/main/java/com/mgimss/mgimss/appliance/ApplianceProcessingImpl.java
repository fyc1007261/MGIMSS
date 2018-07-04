package com.mgimss.mgimss.appliance;

import com.mgimss.mgimss.classes.ApplianceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplianceProcessingImpl implements ApplianceProcessing {
    @Autowired
    ApplianceRepository applianceRepository;

    public String get_current_status(String time, int id, String name,
                                     float voltage, float current, int status)
    {
        return time+"\n"+id+' '+name+' '+voltage+' '+current+' '+status;
    }

    public String test(){
        return "hahahhaha";
    }
}
