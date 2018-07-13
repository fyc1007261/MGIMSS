package com.mgimss.mgimss.entity;

import com.mgimss.mgimss.businessModel.Time;

import javax.persistence.*;
import java.util.List;

@Entity
public class Job
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long jobId;

    private Long intStopTime;
    private Long intStartTime;
    private Long intTrueStopTime;
    private Long intTrueStartTime;
    private Long lastTime;
    private Long perPower;
    private int  status;


    @ManyToOne
    @JoinColumn(name="appId")
    private Appliance appliance;

    @ManyToOne
    @JoinColumn(name="uid")
    private User user;


    public Job(){
    }


    public Job(Long intStartTime, Long intStopTime, Long intTrueStartTime, Long intTrueStopTime,
                Long lastTime, Long perPower, int  status, Appliance appliance, User user){
        this.intStartTime = intStartTime;
        this.intStopTime = intStopTime;
        this.intTrueStartTime = intTrueStartTime;
        this.intTrueStopTime = intTrueStopTime;
        this.lastTime = lastTime;
        this.perPower = perPower;
        this.status = status;
        this.appliance = appliance;
        this.user = user;
    }

    public void setPerPower(Long perPower)
    {
        this.perPower = perPower;
    }
    public Long getPerPower()
    {
        return this.perPower;
    }
    public void setIntStartTime(Long intStartTime)
    {
        this.intStartTime = intStartTime;
    }
    public Long getIntStartTime()
    {
        return this.intStartTime;
    }
    public void setIntStopTime(Long intStopTime)
    {
        this.intStopTime = intStopTime;
    }
    public Long getIntStopTime()
    {
        return this.intStopTime;
    }
    public void setIntTrueStopTime(Long intTrueStopTime)
    {
        this.intTrueStopTime = intTrueStopTime;
    }
    public Long getIntTrueStopTime()
    {
        return this.intTrueStopTime;
    }
    public void setIntTrueStartTime(Long intTrueStartTime)
    {
        this.intTrueStartTime = intTrueStartTime;
    }
    public Long getIntTrueStartTime()
    {
        return this.intTrueStartTime;
    }
    public void setLastTime(Long lastTime)
    {
        this.lastTime = lastTime;
    }
    public Long getLastTime()
    {
        return this.lastTime;
    }

    public Appliance getAppliance() { return appliance; }
    public void setAppliance(Appliance jobId) { this.appliance = appliance; }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    //    public void myinit(Long intStopTime, Long intStartTime, Long intTrueStopTime, Long lastTime, Long perPower, Long jobId)
//    {
////        setIntStartTime(intStartTime);
////        setIntStopTime(intStopTime);
////        setIntTrueStopTime(intTrueStopTime);
////        setJobId(jobId);
////        setLastTime(lastTime);
////        setPerPower(perPower);
////        System.out.println("jobId:"+jobId);
//    }
}
