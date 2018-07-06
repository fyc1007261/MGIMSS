package com.light.springboot.repository;

import com.light.springboot.entity.Image;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ImageRepository extends MongoRepository<Image, Long>{

}
