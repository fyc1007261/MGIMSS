package com.mgimss.mgimss.controller;

import com.google.gson.Gson;
import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.*;
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

    @Autowired
    PendingJobRepository pendingJobRepository;

    @Autowired
    RunningJobRepository runningJobRepository;

    @Autowired
    FinishedJobRepository finishedJobRepository;

    public String get_all_status(){
        List<Appliance> applianceList = applianceRepository.findByUser(Long.valueOf(1));
        // json builder
        StringBuffer buf = new StringBuffer();
        buf.append("{\"data\":[");
        for (Appliance appliance:applianceList){
            buf.append(
                    "{\"id\" : \"" + appliance.getAid() +
                            "\", \"name\" : \"" + appliance.getName() +
                            "\", \"status\" : \"" + ((appliance.getRunningState() == 1) ? "Active" : "Inactive") +
                            "\", \"updated\" : \""+ appliance.getLastSendDataTime() +"\"}"
            );
            buf.append(',');
        }
        buf.deleteCharAt(buf.length()-1);
        buf.append("]}");
        return buf.toString();
    }

    public String get_info_by_id(Long id){
        Appliance appliance = applianceRepository.findByUserAndAid(1L, id);
        String start_time = "Not scheduled", finish_time = "Not scheduled";
        Job job = runningJobRepository.findByApplianceAndUser(id, 1L);
        if (job != null){
            start_time = job.getIntStartTime().toString();
            finish_time = job.getIntStopTime().toString();
        }
        job = finishedJobRepository.findByApplianceAndUser(id, 1L);
        if (job != null){
            start_time = job.getIntStartTime().toString();
            finish_time = job.getIntStopTime().toString();
        }
        job = pendingJobRepository.findByApplianceAndUser(id, 1L);
        if (job != null){
            start_time = job.getIntStartTime().toString();
            finish_time = job.getIntStopTime().toString();
        }


        // json builder
        StringBuilder buf = new StringBuilder();
        buf.append(
                "{\"id\" : \"" + appliance.getAid() +
                        "\", \"name\" : \"" + appliance.getName() +
                        "\", \"status\" : \"" + ((appliance.getRunningState()==1) ? "Active":"Inactive") +
                        "\", \"manufacturer\" : \"" +appliance.getMfrs() +
                        "\", \"parameters\" : \"" +appliance.getRatedParameters() +
                        "\", \"start_time\" : \"" +start_time +
                        "\", \"finish_time\" : \"" +finish_time +
                        "\", \"updated\" : \""+ appliance.getLastSendDataTime() +"\"}"
        );
        return buf.toString();
    }
}
