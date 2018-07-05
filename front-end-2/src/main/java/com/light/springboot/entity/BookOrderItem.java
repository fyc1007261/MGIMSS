package com.light.springboot.entity;

import javax.persistence.*;

@Entity

public class BookOrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long boiId;

    @ManyToOne
    @JoinColumn(name="oid")
    private BookOrder order;//用于和bo交接

    @ManyToOne
    @JoinColumn(name="id")
    private Book book; //买的什么书

    private Long count;//买了几本

    public BookOrderItem(){

    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public void setOrder(BookOrder order) {
        this.order = order;
    }

    public BookOrder getOrder() {
        return order;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Book getBook() {
        return book;
    }

}
