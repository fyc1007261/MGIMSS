package com.mgimss.mgimss.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@IdClass(BatteryStatus.BatteryStatusId.class)
public class BatteryStatus {

    private Long remainingCharge;
    @Id
    private Date recordTime;
    @Id
    @OneToOne
    @JoinColumn(name="bid")
    private Battery battery;

    public static class BatteryStatusId implements Serializable {
        private Battery battery;
        private Date recordTime;

        public Battery getBattery() {
            return battery;
        }

        public void setBattery(Battery battery) {
            this.battery = battery;
        }

        public void setRecordTime(Date recordTime) {
            this.recordTime = recordTime;
        }

        public Date getRecordTime() {
            return recordTime;
        }
    }

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
