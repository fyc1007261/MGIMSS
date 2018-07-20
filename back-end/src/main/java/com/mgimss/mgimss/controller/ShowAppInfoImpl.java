package com.mgimss.mgimss.controller;


import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.repository.*;
import com.mgimss.mgimss.utils.TimeToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

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
        List<Appliance> applianceList = applianceRepository.findByUser(1L);
        if (applianceList.size() == 0){
            return "{\"data\":[]}";
        }
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
        Long app_id = appliance.getAppId();
        String start_time = "Not scheduled", finish_time = "Not scheduled";
        Long sta=0L, fin=0L;
        Job job = runningJobRepository.findByAppliance(app_id);
        if (job != null){
            sta = job.getIntStartTime();
            fin = job.getIntStopTime();
        }
        job = finishedJobRepository.findByAppliance(app_id);
        if (job != null){
            sta = job.getIntStartTime();
            fin = job.getIntStopTime();
        }
        job = pendingJobRepository.findByAppliance(app_id);
        if (job != null){
            sta = job.getIntStartTime();
            fin = job.getIntStopTime();
        }
        if (sta != 0L){
            // there is a job
            TimeToString timeToString = new TimeToString();
            start_time = timeToString.LongToString(sta, ' ');
            finish_time = timeToString.LongToString(fin, ' ');
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
        if (jobList.size() == 0 ){
            return "{\"data\":[]}";
        }
        buf.append("{\"data\":[");
        for (Job job: jobList){
            buf.append(
                    "{\"id\" : \"" + job.getJobId() +
                    "\", \"status\" : \"" + (job.getStatus()==0?"Pending":"Running") +
                    "\", \"duration\" : \"" +(job.getLastTime()<9223372036854775L? job.getLastTime()/60 : "Not available")+
                    "\", \"app_id\" : \"" + job.getAppliance().getAid()+
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
                        "\", \"Start after\" : \"" + timeToString.LongToString(job.getIntStartTime(), 'T') +
                        "\", \"Finish by\" : \"" + timeToString.LongToString(job.getIntStopTime(), 'T') +
                        "\", \"Duration\" : \"" +(job.getLastTime()<9223372036854775L? job.getLastTime()/60 : 0)+
                        "\", \"Scheduled at\" : \"" +timeToString.LongToString(job.getIntTrueStartTime(), ' ') +
                        "\", \"Power\" : \""+ job.getPerPower() +"\"}"
        );
        return buf.toString();
    }

}
