package com.mgimss.mgimss.classes;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="latest_time")
public class LatestTime {
    @Id
    private int id = 1;

    private String time;

    public void setTime(String time) {
        this.time = time;
    }

    public String getTime() {
        return time;
    }
}
