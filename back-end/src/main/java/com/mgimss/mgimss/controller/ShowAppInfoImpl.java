package com.mgimss.mgimss.controller;

import com.google.gson.Gson;
import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.ApplianceRepository;
import com.mgimss.mgimss.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;

import java.util.List;

@RestController
public class ShowAppInfoImpl implements ShowAppInfo {
    @Autowired
    ApplianceRepository applianceRepository;

    @Autowired
    UserRepository userRepository;
    public String get_all_status(){
        System.out.println("haha");
        User user = userRepository.findByUid(Long.valueOf(1));
        List<Appliance> applianceList = applianceRepository.findByUser(user);
        // json builder
        StringBuffer buf = new StringBuffer();
        buf.append("{\"data\":[");
        for (Appliance appliance:applianceList){
            buf.append(
                    "{\"id\" : \"" + appliance.getAid() +
                            "\", \"name\" : \"" + appliance.getName() +
                            "\", \"status\" : \"" +appliance.getRunningState() +
                            "\", \"updated\" : \""+ appliance.getLastSendDataTime() +"\"}"
            );
            buf.append(',');
        }
        buf.deleteCharAt(buf.length()-1);
        buf.append("]}");
        return buf.toString();
    }

    public String get_info_by_id(Long id){
        return "";
    }
}
