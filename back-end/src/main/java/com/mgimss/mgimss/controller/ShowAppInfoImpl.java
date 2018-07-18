package com.mgimss.mgimss.controller;


import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.mgimss.mgimss.utils.TimeToString;


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
                        "\", \"power\" : \"" +appliance.getPower() +
                        "\", \"start_time\" : \"" +start_time +
                        "\", \"finish_time\" : \"" +finish_time +
                        "\", \"updated\" : \""+ appliance.getLastSendDataTime() +"\"}"
        );
        return buf.toString();
    }

    public String get_jobs(){
        List<Job> jobList = runningJobRepository.findByUid(1L);
        jobList.addAll(pendingJobRepository.findByUid(1L));
        // json builder
        StringBuffer buf = new StringBuffer();
        buf.append("{\"data\":[");
        for (Job job: jobList){
            buf.append(
                    "{\"id\" : \"" + job.getJobId() +
                    "\", \"status\" : \"" + (job.getStatus()==0?"Pending":"Running") +
                    "\", \"duration\" : \"" + (job.getLastTime()/60) + "min" +
                    "\", \"app_name\" : \""+ job.getAppliance().getName() +"\"}"
            );
            buf.append(',');
        }
        buf.deleteCharAt(buf.length()-1);
        buf.append("]}");
        return buf.toString();
    }

    public String get_job_by_id(Long id) {
        TimeToString timeToString = new TimeToString();
        Job job = runningJobRepository.findByJobId(id);
        if (job==null)
            job = pendingJobRepository.findByJobId(id);
        StringBuilder buf = new StringBuilder();
        buf.append(
                "{\"id\" : \"" + job.getJobId() +
                        "\", \"Appliance\" : \"" + job.getAppliance().getName() +
                        "\", \"Status\" : \"" + (job.getStatus()==0?"Pending":"Running") +
                        "\", \"Start after\" : \"" + timeToString.LongToString(job.getIntStartTime()) +
                        "\", \"Finish by\" : \"" + timeToString.LongToString(job.getIntStopTime()) +
                        "\", \"Duration\" : \"" +(job.getLastTime()/60) +
                        "\", \"Scheduled at\" : \"" +timeToString.LongToString(job.getIntTrueStopTime()) +
                        "\", \"Power\" : \""+ job.getPerPower() +"\"}"
        );
        return buf.toString();
    }
}
