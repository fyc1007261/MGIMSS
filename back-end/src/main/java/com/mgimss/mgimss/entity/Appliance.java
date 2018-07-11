package com.mgimss.mgimss.entity;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


@Entity
public class Appliance {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long appId;

    @ManyToOne
    @JoinColumn(name="uid")
    private User user;

    private Long aid;

    private String name;

    private Date addDate;

    private String mfrs;

    private String ratedParameters;

    private Date lastSendDataTime;

    private int runningState;


    public Appliance(){

    }

    public Appliance(User user, Long aid, String name, Date addDate,
                     String mfrs, String ratedParameters, Date lastSendDataTime,
                     int runningState){
        this.user = user;
        this.aid = aid;
        this.name = name;
        this.addDate = addDate;
        this.mfrs = mfrs;
        this.ratedParameters = ratedParameters;
        this.lastSendDataTime = lastSendDataTime;
        this.runningState = runningState;
    }

    public Long getAppId() {
        return appId;
    }

    public void setAppId(Long appId) {
        this.appId = appId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getAid() {
        return aid;
    }

    public void setAid(Long aid) {
        this.aid = aid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getAddDate() {
        return addDate;
    }

    public void setAddDate(Date addDate) {
        this.addDate = addDate;
    }

    public String getMfrs() {
        return mfrs;
    }

    public void setMfrs(String mfrs) {
        this.mfrs = mfrs;
    }

    public String getRatedParameters() {
        return ratedParameters;
    }

    public void setRatedParameters(String ratedParameters) {
        this.ratedParameters = ratedParameters;
    }

    public Date getLastSendDataTime() {
        return lastSendDataTime;
    }

    public void setLastSendDataTime(Date lastSendDataTime) {
        this.lastSendDataTime = lastSendDataTime;
    }

    public int getRunningState() {
        return runningState;
    }

    public void setRunningState(int runningState) {
        this.runningState = runningState;
    }
}
