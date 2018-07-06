package com.light.springboot.entity;



import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity

public class BookOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long oid;//谁买的

    private Long uid;//谁买的

    private String addr;

    private Long total_proice;

    private String deliver_status;

    private Date date;


    @OneToMany(cascade = {CascadeType.ALL},fetch = FetchType.EAGER)
    @JoinColumn(name="oid")
    private Set<BookOrderItem> items;


    public BookOrder(){

    }

    public BookOrder(Long oid, Long uid,  String addr, Long total_proice,
                     String deliver_status, Date date, Set<BookOrderItem> items) {
        this.oid = oid;
        this.uid = uid;
        this.addr = addr;
        this.total_proice = total_proice;
        this.deliver_status = deliver_status;
        this.date = date;
        this.items = items;
    }

    public Long getOid() {
        return oid;
    }

    public void setOid(Long oid) {
        this.oid = oid;
    }

    public Long getUid() {
        return uid;
    }

    public void setUid(Long uid) {
        this.uid = uid;
    }

    public Long getTotal_proice() {
        return total_proice;
    }

    public void setTotal_proice(Long total_proice) {
        this.total_proice = total_proice;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }


    public String getDeliver_status() {
        return deliver_status;
    }

    public void setDeliver_status(String deliver_status) {
        this.deliver_status = deliver_status;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public Set<BookOrderItem> getItems() {
        return items;
    }

    public void setItems(Set<BookOrderItem> items) {
        this.items = items;
    }
    @Override
    public String toString(){
        System.out.println("oid: "+this.oid+", uid: "+this.uid+"oid: ");
        return null;
    }

}
