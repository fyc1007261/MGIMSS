package com.light.springboot.entity;




import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;

@Entity

public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private String title;
    private String author;
    private String language;
    private String published;
    private String sales;
    private Long price;

    @Type(type="text")
    private String description;
    private Long stock;
    private int star;

    @OneToMany(cascade = {CascadeType.ALL},fetch = FetchType.EAGER)
    @JoinColumn(name="id")
    private List<Comment> comments;

    public Book() {

    }

    public Book(Book b) {
        this.id = b.getId();
        this.title = b.getTitle();
        this.author = b.getAuthor();
        this.language = b.getLanguage();
        this.published = b.getPublished();
        this.sales = b.getSales();
        this.price = b.getPrice();
        this.description = b.getDescription();
        this.star = b.getStar();
        this.stock = b.getStock();

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getPublished() {
        return published;
    }

    public void setPublished(String published) {
        this.published = published;
    }

    public String getSales() {
        return sales;
    }

    public void setSales(String sales) {
        this.sales = sales;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getStock() {
        return stock;
    }

    public void setStock(Long stock) {
        this.stock = stock;
    }

    public int getStar() {
        return star;
    }

    public void setStar(int star) {
        this.star = star;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<Comment> getComments() {
        return comments;
    }
}
