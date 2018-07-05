package com.light.springboot.entity;

import javax.persistence.Id;

public class Image {
    @Id
    private Long id;

    private String imgCode;

    public Image() {}

    public Image(Long id, String imgCode){
        this.id = id;
        this.imgCode = imgCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImgCode() {
        return imgCode;
    }

    public void setImgCode(String imgCode) {
        this.imgCode = imgCode;
    }
}

