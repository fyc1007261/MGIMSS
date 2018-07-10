package com.mgimss.mgimss.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.util.Date;

@Entity
public class BatteryStatus {

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
