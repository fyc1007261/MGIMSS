package com.mgimss.mgimss.controller;


import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.User;
import com.mgimss.mgimss.repository.*;
import com.mgimss.mgimss.utils.GetUserContext;
import com.mgimss.mgimss.utils.TimeToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mgimss.mgimss.utils.TimeToString;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;


import java.util.Date;
import java.util.List;

@RestController
public class ShowAppInfoImpl implements ShowAppInfo {
    @Autowired
    public ApplianceRepository applianceRepository;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public PendingJobRepository pendingJobRepository;

    @Autowired
    public RunningJobRepository runningJobRepository;

    @Autowired
    public FinishedJobRepository finishedJobRepository;

    @Autowired
    public GestureRepository gestureRepository;

    @Autowired
    public GetUserContext getUserContext;

    public String get_all_status(HttpServletResponse response){
        try{
            User user = getUserContext.getUser();
            List<Appliance> applianceList = applianceRepository.findByUser(user.getUid());
            if (applianceList.size() == 0){
                return "{\"data\":[]}";
            }
            // json builder
            StringBuffer buf = new StringBuffer();
            buf.append("{\"data\":[");
            for (Appliance appliance:applianceList){
                Job job = runningJobRepository.findByAppliance(appliance.getAppId());
                Long runtime = 0L;
                if (job!=null){
                    Long start = job.getIntStartTime();
                    Date now = new Date();
                    runtime = (now.getTime()/1000 - start)/60;
                }
                buf.append(
                        "{\"id\" : \"" + appliance.getAid() +
                                "\", \"name\" : \"" + appliance.getName() +
                                "\", \"status\" : \"" + ((appliance.getRunningState() == 1) ? "Active" : "Inactive") +
                                "\", \"mfrs\" : \"" + appliance.getMfrs()+
                                "\", \"runtime\" : \"" + runtime + "min"+
                                "\", \"power\" : \"" + appliance.getPower() +
                                "\", \"updated\" : \""+ appliance.getLastSendDataTime() +"\"}"
                );
                buf.append(',');
            }
            buf.deleteCharAt(buf.length()-1);
            buf.append("]}");
            response.addHeader("Access-Control-Allow-Origin", "*");
            return buf.toString();
        }
        catch (Exception ex){
            return "{\"data\":[]}";
        }
    }

    public String get_info_by_id(Long id, HttpServletResponse response){
        User user = getUserContext.getUser();
        Appliance appliance = applianceRepository.findByUserAndAid(user.getUid(), id);
        Long app_id = appliance.getAppId();
        String start_time = "Not scheduled", finish_time = "Not scheduled";
        Long sta=0L, fin=0L;
        Job job = runningJobRepository.findByAppliance(app_id);
        Long runtime = 0L;
        if (job != null){
            sta = job.getIntStartTime();
            fin = job.getIntStopTime();
            Date now = new Date();
            runtime = (now.getTime()/1000 - sta)/60;
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

        String gname = gestureRepository.findByNameAndUid(appliance.getName(),appliance.getUser().getUid());
        if (gname == null)
        {
            gname = "none";
        }
        // json builder
        StringBuilder buf = new StringBuilder();
        buf.append("{\"data\":[");
        buf.append(
                "{\"id\" : \"" + appliance.getAid() +
                        "\", \"name\" : \"" + appliance.getName() +
                        "\", \"status\" : \"" + ((appliance.getRunningState()==1) ? "Active":"Inactive") +
                        "\", \"manufacturer\" : \"" +appliance.getMfrs() +
                        "\", \"power\" : \"" +appliance.getPower() +
                        "\", \"runtime\" : \"" +runtime + "min"+
                        "\", \"start time\" : \"" +start_time +
                        "\", \"finish time\" : \"" +finish_time +
                        "\", \"gesture\" : \"" +gname +
                        "\", \"updated\" : \""+ appliance.getLastSendDataTime() +"\"}"
        );
        buf.append("]}");
        response.addHeader("Access-Control-Allow-Origin", "*");
        return buf.toString();
    }

    public String get_jobs(HttpServletResponse response){
        User user = getUserContext.getUser();
        List<Job> jobList = runningJobRepository.findByUid(user.getUid());
        jobList.addAll(pendingJobRepository.findByUid(user.getUid()));
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
        response.addHeader("Access-Control-Allow-Origin", "*");
        return buf.toString();
    }

    public String get_job_by_id(Long id, HttpServletResponse response) {
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
        response.addHeader("Access-Control-Allow-Origin", "*");
        return buf.toString();
    }

    public String get_jobs1_by_id(Long id){
        Job job = runningJobRepository.findByJobId(id);
        if (job==null)
            job = pendingJobRepository.findByJobId(id);
        if (job.getSimulatio1data() == null)
        {
            return "1";
        }
        return job.getSimulatio1data();
    }


    public  String get_jobs2_by_id(Long id){
        Job job = runningJobRepository.findByJobId(id);
        if (job==null)
            job = pendingJobRepository.findByJobId(id);
        if (job.getSimulatio2data() == null)
        {
            return "1";
        }
        return job.getSimulatio2data();
    }

}
