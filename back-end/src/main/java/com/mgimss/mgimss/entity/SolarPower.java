package com.mgimss.mgimss.entity;
import javax.persistence.*;

@Entity
public class SolarPower
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long solarId;

    private Long sid;

    private Long time;

    @ManyToOne
    @JoinColumn(name="uid")
    private User user;

    private Long timeInterval;
    private Long forecastData;


    public SolarPower(){}
    public SolarPower(Long sid, User user, Long timeInterval, Long forecastData,Long time){
        this.sid = sid;
        this.user = user;
        this.timeInterval = timeInterval;
        this.forecastData = forecastData;
        this.time = time % 24;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getSolarId() {
        return solarId;
    }

    public void setSolarId(Long solarId) {
        this.solarId = solarId;
    }

    public Long getSid() {
        return sid;
    }

    public void setSid(Long sid) {
        this.sid = sid;
    }

    public void setInterval(Long timeInterval)
    {
        this.timeInterval = timeInterval;
    }
    public Long getInterval()
    {
        return this.timeInterval;
    }
    public void setForecastData(Long forecasData)
    {
        this.forecastData = forecastData;
    }
    public Long getForecastData()
    {
        return this.forecastData;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }
}