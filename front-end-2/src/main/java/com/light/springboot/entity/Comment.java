package com.light.springboot.entity;


import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

@Entity

public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cid;

    @ManyToOne(cascade={CascadeType.ALL})
    @JoinColumn(name="uid")
    private User user;

    @ManyToOne(cascade={CascadeType.ALL})
    @JoinColumn(name="id")
    private Book book;

    @Type(type="text")
    private String comment;

    private Date date;

    public Long getId() {
        return cid;
    }

    public void setId(Long id) {
        this.cid = id;
    }

    public User getUser(){
        return user;
    }

    public Book getBook(){
        return book;
    }

    public void setBook(Book book){
        this.book = book;
    }

    public void setUser(User user){
        this.user = user;
    }

    public String getComment(){
        return comment;
    }

    public void setComment(String comment){
        this.comment = comment;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
