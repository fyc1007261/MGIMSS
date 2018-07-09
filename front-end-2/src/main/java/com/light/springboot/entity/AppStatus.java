package com.light.springboot.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@IdClass(AppStatus.AppStatusId.class)
public class AppStatus {

    @Id
    @ManyToOne
    @JoinColumns(value={
            @JoinColumn(name="uid"),
            @JoinColumn(name="aid")
    })
    private Appliance appliance;

    @Id
    private Date recordTime;
    private float presentVoltage;
    private float presentCurrent;

    public static class AppStatusId implements Serializable {
        private Appliance appliance;
        private Date recordTime;

        public Appliance getAppliance() {
            return appliance;
        }

        public void setAppliance(Appliance appliance) {
            this.appliance = appliance;
        }

        public void setRecordTime(Date recordTime) {
            this.recordTime = recordTime;
        }

        public Date getRecordTime() {
            return recordTime;
        }
    }

    public AppStatus(){

    }

    public AppStatus(Appliance appliance, Date recordTime,
                     float presentVoltage, float presentCurrent){
        this.appliance = appliance;
        this.recordTime = recordTime;
        this.presentVoltage = presentVoltage;
        this.presentCurrent = presentCurrent;
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
