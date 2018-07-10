package com.mgimss.mgimss.entity;

import javax.jws.soap.SOAPBinding;
import javax.persistence.*;

@Entity
public class Battery {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bid;

    @OneToOne
    @JoinColumn(name="uid")
    private User user;
    private Long capacity;
    private Long remain;
    private Long maxOutputPower;

    public Battery(){
    }

    public Battery(User user, Long capacity, Long remain, Long maxOutputPower){
        this.user = user;
        this.capacity = capacity;
        this.remain = remain;
        this.maxOutputPower = maxOutputPower;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getBid() {
        return bid;
    }

    public void setBid(Long bid) {
        this.bid = bid;
    }

    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public Long getMaxOutputPower() {
        return maxOutputPower;
    }

    public void setMaxOutputPower(Long maxOutputPower) {
        this.maxOutputPower = maxOutputPower;
    }

    public Long getRemain() {
        return remain;
    }

    public void setRemain(Long remain) {
        this.remain = remain;
    }
}
