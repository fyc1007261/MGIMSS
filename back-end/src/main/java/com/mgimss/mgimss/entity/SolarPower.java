package com.mgimss.mgimss.entity;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.util.ArrayList;

@Entity
public class SolarPower
{
    @ManyToOne
    @JoinColumn(name="uid")
    private User user;
    private Long sid;
    private Long interval;
    private Long forecastData;

    public SolarPower(){}
    public SolarPower(User user, Long fid, Long interval, Long forecastData){
        this.user = user;
        this.sid = sid;
        this.interval = interval;
        this.forecastData = forecastData;
    }

    public Long getSid() {
        return sid;
    }

    public void setSid(Long sid) {
        this.sid = sid;
    }

    public void setInterval(Long interval)
    {
        this.interval = interval;
    }
    public Long getInterval()
    {
        return this.interval;
    }
    public void setForecastData(Long forecasData)
    {
        this.forecastData = forecastData;
    }
    public Long getForecastData()
    {
        return this.forecastData;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
}