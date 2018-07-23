package com.mgimss.mgimss.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Gesture {

    @Id
    private  String gname;

    @ManyToOne
    @JoinColumn(name="uid")
    private User User;

    private String name;

    public Gesture(){}

    public Gesture(String gname,String name, User user){
        this.gname = gname;
        this.name = name;
        this.User = user;
    }

    public com.mgimss.mgimss.entity.User getUser() {
        return User;
    }

    public void setUser(com.mgimss.mgimss.entity.User user) {
        User = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGname() {
        return gname;
    }

    public void setGname(String gname) {
        this.gname = gname;
    }
}
