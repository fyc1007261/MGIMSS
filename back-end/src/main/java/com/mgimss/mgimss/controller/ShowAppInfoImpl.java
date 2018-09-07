package com.mgimss.mgimss.controller;


import com.mgimss.mgimss.entity.Appliance;
import com.mgimss.mgimss.entity.Job;
import com.mgimss.mgimss.entity.Sensor;
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
    public SensorRepository sensorRepository;

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


    //java calls
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
                String rtime;
                if (job!=null){
                    Long start = job.getIntStartTime();
                    Date now = new Date();
                    runtime = (now.getTime()/1000 - start)/60;
                    rtime = runtime + " min";
                }
                else {
                    rtime = "pending";
                }
                buf.append(
                        "{\"id\" : \"" + appliance.getAid() +
                                "\", \"name\" : \"" + appliance.getName() +
                                "\", \"status\" : \"" + ((appliance.getRunningState() == 1) ? "Active" : "Inactive") +
                                "\", \"runtime\" : \"" + rtime+
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
            response.addHeader("Access-Control-Allow-Origin", "*");
            return "{\"data\":[]}";
        }
    }

    //java calls
    public String get_info_by_id(Long id, HttpServletResponse response){
        User user = getUserContext.getUser();
        Appliance appliance = applianceRepository.findByUserAndAid(user.getUid(), id);
        Long app_id = appliance.getAppId();
        String start_time = "Not scheduled", finish_time = "Not scheduled";
        Long sta=0L, fin=0L;
        Job job = runningJobRepository.findByAppliance(app_id);
        Long runtime = 0L;
        String rtime;
        if (job != null){
            sta = job.getIntStartTime();
            fin = job.getIntStopTime();
            Date now = new Date();
            runtime = (now.getTime()/1000 - sta)/60;
            rtime = runtime + " min";
        }
        else {
            rtime = "pending";
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
            start_time = (start_time.equals("Null"))?  "Not scheduled" :  start_time;
            finish_time = (finish_time.equals("Null"))?  "Not scheduled" :  finish_time;
        }

        String gname = gestureRepository.findByNameAndUid(appliance.getName(),appliance.getUser().getUid());
        if (gname == null)
        {
            gname = "none";
        }
        String s1name;
        Sensor sensor1 = sensorRepository.findByAidAndUidandSensorid(0L,appliance.getUser().getUid(),appliance.getAid());
        if (sensor1 == null)
        {
            s1name = "Inactive";
        }
        else
        {
            s1name = "Active";
        }

        String s2name;
        Sensor sensor2 = sensorRepository.findByAidAndUidandSensorid(1L,appliance.getUser().getUid(),appliance.getAid());
        if (sensor2 == null)
        {
            s2name = "Inactive";
        }
        else
        {
            s2name = "Active";
        }

        String s3name;
        Sensor sensor3 = sensorRepository.findByAidAndUidandSensorid(2L,appliance.getUser().getUid(),appliance.getAid());
        if (sensor3 == null)
        {
            s3name = "Inactive";
        }
        else
        {
            s3name = "Active";
        }

        String s4name;
        Sensor sensor4 = sensorRepository.findByAidAndUidandSensorid(3L,appliance.getUser().getUid(),appliance.getAid());
        if (sensor4 == null)
        {
            s4name = "Inactive";
        }
        else
        {
            s4name = "Active";
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
                        "\", \"runtime\" : \"" +rtime+
                        "\", \"start time\" : \"" +start_time +
                        "\", \"finish time\" : \"" +finish_time +
                        "\", \"gesture\" : \"" +gname +
                        "\", \"s1name\" : \"" +s1name +
                        "\", \"s2name\" : \"" +s2name +
                        "\", \"s3name\" : \"" +s3name +
                        "\", \"s4name\" : \"" +s4name +
                        "\", \"updated\" : \""+ appliance.getLastSendDataTime() +"\"}"
        );
        buf.append("]}");
        response.addHeader("Access-Control-Allow-Origin", "*");
        return buf.toString();
    }

    //java calls
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

    //java calls
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

    //simulator calls
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

    //simulator calls
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
