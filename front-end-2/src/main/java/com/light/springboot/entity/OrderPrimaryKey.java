package com.light.springboot.entity;


import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class OrderPrimaryKey implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long oid;
    private Long bid;
    private Long uid;

    public OrderPrimaryKey() {}

    public OrderPrimaryKey(Long oid, Long bid, Long uid) {
        this.oid = oid;
        this.bid = bid;
        this.uid = uid;
    }

    public Long getBid() {
        return bid;
    }

    public Long getOid() {
        return oid;
    }

    public Long getUid() {
        return uid;
    }

    public void setBid(Long bid) {
        this.bid = bid;
    }

    public void setOid(Long oid) {
        this.oid = oid;
    }

    public void setUid(Long uid) {
        this.uid = uid;
    }
    @Override
    public String toString() {
        return "OrderPrimaryKey [oid=" + oid + ", bid=" + bid +", uid=" + uid+ "]";
    }
}
