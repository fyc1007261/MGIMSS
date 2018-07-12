package com.mgimss.mgimss.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class DailyPowerConsume {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long dpcId;

    private Date date;
    private Long consumption;

    @ManyToOne
    @JoinColumn(name="app_id")
    private Appliance appliance;

    public DailyPowerConsume(){}

    public DailyPowerConsume(Date date, Long consumption, Appliance appliance){
        this.appliance = appliance;
        this.consumption = consumption;
        this.date = date;
    }

    public Appliance getAppliance() {
        return appliance;
    }

    public void setAppliance(Appliance appliance) {
        this.appliance = appliance;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getConsumption() {
        return consumption;
    }

    public void setConsumption(Long consumption) {
        this.consumption = consumption;
    }

}
