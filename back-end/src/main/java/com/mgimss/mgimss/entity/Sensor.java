package com.mgimss.mgimss.entity;

import javax.persistence.*;

@Entity
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  Long senid;

    @ManyToOne
    @JoinColumn(name="uid")
    private User User;

    private Long aid;

    private Long sensorid;

    public Sensor(){}

    public Sensor(Long sensorid,Long aid , User user){
        this.sensorid = sensorid;
        this.aid = aid;
        this.User = user;
    }

    public void setUser(com.mgimss.mgimss.entity.User user) {
        User = user;
    }

    public com.mgimss.mgimss.entity.User getUser() {
        return User;
    }

    public Long getAid() {
        return aid;
    }

    public void setAid(Long aid) {
        this.aid = aid;
    }

    public Long getSenid() {
        return senid;
    }

    public void setSenid(Long senid) {
        this.senid = senid;
    }

    public Long getSensorid() {
        return sensorid;
    }

    public void setSensorid(Long sensorid) {
        this.sensorid = sensorid;
    }
}
