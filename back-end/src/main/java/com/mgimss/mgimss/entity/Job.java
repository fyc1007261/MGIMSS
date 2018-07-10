package com.mgimss.mgimss.entity;

import com.mgimss.mgimss.businessModel.Time;

import javax.persistence.*;
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name="uid")
    private User user;
    @ManyToOne
    @JoinColumn(name="aid")
    private Appliance appliance;

    public Job(){
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
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Appliance getAppliance() { return appliance; }
    public void setAppliance(Appliance jobId) { this.appliance = appliance; }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public void myinit(Long intStopTime, Long intStartTime, Long intTrueStopTime, Long lastTime, Long perPower, Long jobId)
    {
//        setIntStartTime(intStartTime);
//        setIntStopTime(intStopTime);
//        setIntTrueStopTime(intTrueStopTime);
//        setJobId(jobId);
//        setLastTime(lastTime);
//        setPerPower(perPower);
//        System.out.println("jobId:"+jobId);
    }
}
