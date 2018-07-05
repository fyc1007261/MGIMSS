package com.mgimss.mgimss.classes;


import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name= "appliance")
@IdClass(Appliance.ApplianceId.class)
public class Appliance {



    @Id
    @Column(name = "id")
    private int id;
    @Id
    @Column(name = "time")
    private String time;
    @Id
    @Column(name="username")
    private String username;

    private String name;
    private float voltage;
    private float current;
    private int status;

    public static class ApplianceId implements Serializable{
        private int id;
        private String time;
        private String username;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getTime() {
            return time;
        }

        public int getId() {
            return id;
        }

        public void setTime(String time) {
            this.time = time;
        }

        public void setId(int id) {
            this.id = id;
        }
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTime() {
        return time;
    }

    public int getId() {
        return id;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setId(int id) {
        this.id = id;
    }
    public float getCurrent() {
        return current;
    }

    public void setCurrent(float current) {
        this.current = current;
    }

    public float getVoltage() {
        return voltage;
    }

    public void setVoltage(float voltage) {
        this.voltage = voltage;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
