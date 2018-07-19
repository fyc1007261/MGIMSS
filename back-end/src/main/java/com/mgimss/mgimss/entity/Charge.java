package com.mgimss.mgimss.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Charge {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  Long cId;

    @ManyToOne
    @JoinColumn(name="uid")
    private User user;

    private Date recordTime;

    private Long opt;

    private Long electricCharge;

    public Charge(){

    }

    public Charge(User user, Date recordTime,Long opt,Long electricCharge){
        this.user = user;
        this.recordTime = recordTime;
        this.opt = opt;
        this.electricCharge = electricCharge;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public Long getcId() {
        return cId;
    }

    public void setcId(Long cId) {
        this.cId = cId;
    }

    public Long getElectricCharge() {
        return electricCharge;
    }

    public void setElectricCharge(Long electricCharge) {
        this.electricCharge = electricCharge;
    }

    public Long getOpt() {
        return opt;
    }

    public void setOpt(Long opt) {
        this.opt = opt;
    }

    public Date getRecordTime() {
        return recordTime;
    }

    public void setRecordTime(Date recordTime) {
        this.recordTime = recordTime;
    }


}
