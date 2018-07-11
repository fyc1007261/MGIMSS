package com.mgimss.mgimss.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class BatteryStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bsId;

    private Long remainingCharge;

    private Date recordTime;

    @OneToOne
    @JoinColumn(name="bid")
    private Battery battery;

    public BatteryStatus(){
    }
    public BatteryStatus(Long remainingCharge, Date recordTime, Battery battery){
        this.remainingCharge = remainingCharge;
        this.recordTime = recordTime;
        this.battery = battery;
    }

    public Long getBsId() {
        return bsId;
    }

    public void setBsId(Long bsId) {
        this.bsId = bsId;
    }

    public Long getRemainingCharge() {
        return remainingCharge;
    }

    public void setRemainingCharge(Long remainingCharge) {
        this.remainingCharge = remainingCharge;
    }

    public Long getRemaining() {
        return remainingCharge;
    }

    public void setRemaining(Long remaining) {
        this.remainingCharge = remaining;
    }

    public Date getRecordTime() {
        return recordTime;
    }

    public void setRecordTime(Date recordTime) {
        this.recordTime = recordTime;
    }

    public Battery getBattery() {
        return battery;
    }

    public void setBattery(Battery battery) {
        this.battery = battery;
    }

}
