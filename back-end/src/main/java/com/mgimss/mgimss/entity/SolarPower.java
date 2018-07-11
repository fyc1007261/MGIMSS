package com.mgimss.mgimss.entity;
import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;

@Entity
@IdClass(SolarPower.SolarPowerId.class)
public class SolarPower
{
    @Id
    @ManyToOne
    @JoinColumn(name="uid")
    private User user;
    @Id
    private Long sid;
    private Long timeInterval;
    private Long forecastData;

    public static class SolarPowerId implements Serializable{
        private User user;
        private Long sid;
        public SolarPowerId(){}
        public Long getSid() {
            return sid;
        }

        public void setSid(Long sid) {
            this.sid = sid;
        }

        public User getUser() {
            return user;
        }

        public void setUser(User user) {
            this.user = user;
        }
    }

    public SolarPower(){}
    public SolarPower(User user, Long sid, Long timeInterval, Long forecastData){
        this.user = user;
        this.sid = sid;
        this.timeInterval = timeInterval;
        this.forecastData = forecastData;
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
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
}