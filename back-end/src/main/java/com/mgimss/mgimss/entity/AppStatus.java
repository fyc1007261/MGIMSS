package com.mgimss.mgimss.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class AppStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  Long asId;

    @ManyToOne
    @JoinColumn(name="appId")
    private Appliance appliance;

    private Date recordTime;
    private float presentVoltage;
    private float presentCurrent;

    public AppStatus(){

    }

    public AppStatus(Appliance appliance, Date recordTime,
                     float presentVoltage, float presentCurrent){
        this.appliance = appliance;
        this.recordTime = recordTime;
        this.presentVoltage = presentVoltage;
        this.presentCurrent = presentCurrent;
    }

    public Long getAsId() {
        return asId;
    }

    public void setAsId(Long asId) {
        this.asId = asId;
    }

    public Appliance getAppliance() {
        return appliance;
    }

    public void setAppliance(Appliance appliance) {
        this.appliance = appliance;
    }

    public Date getRecordTime() {
        return recordTime;
    }

    public void setRecordTime(Date recordTime) {
        this.recordTime = recordTime;
    }

    public float getPresentCurrent() {
        return presentCurrent;
    }

    public void setPresentCurrent(float presentCurrent) {
        this.presentCurrent = presentCurrent;
    }

    public float getPresentVoltage() {
        return presentVoltage;
    }

    public void setPresentVoltage(float presentVoltage) {
        this.presentVoltage = presentVoltage;
    }
}
