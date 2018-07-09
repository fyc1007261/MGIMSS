package com.light.springboot.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

/**
 * Created by sang on 2017/1/10.
 */
@Entity

public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long uid;

    private String username;
    private String password;
    private String email;
    private String phone;
    private String  hardwareHost;
    private String hardwarePort;

    @OneToMany(cascade = {CascadeType.ALL},fetch = FetchType.EAGER)
    @JoinColumn(name="uid")
    private Set<Appliance> appliances;


    @ManyToMany(cascade = {CascadeType.REFRESH},fetch = FetchType.EAGER)
    private List<Role> roles;

    public User(){

    }

    public User(String username, String password, String email,
                String phone, String  hardwareHost, String hardwarePort, List<Role> roles){
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.hardwareHost = hardwareHost;
        this.hardwarePort = hardwarePort;
        this.roles = roles;
    }


    public Long getUid() {
        return uid;
    }

    public void setUid(Long uid) {
        this.uid = uid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public String getHardwarePort() {
        return hardwarePort;
    }

    public void setHardwarePort(String hardwarePort) {
        this.hardwarePort = hardwarePort;
    }

    public String getHardwareHost() {
        return hardwareHost;
    }

    public void setHardwareHost(String hardwareHost) {
        this.hardwareHost = hardwareHost;
    }

    public Set<Appliance> getAppliances() {
        return appliances;
    }

    public void setAppliances(Set<Appliance> appliances) {
        this.appliances = appliances;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> auths = new ArrayList<>();
        List<Role> roles = this.getRoles();
        for (Role role : roles) {
            auths.add(new SimpleGrantedAuthority(role.getName()));
            System.out.println("username: "+username+"role:"+role.getName());
        }
        return auths;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
