package com.light.springboot.repository;

import com.light.springboot.entity.Book;
import com.light.springboot.entity.Comment;
import com.light.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository  extends JpaRepository<Comment, Long > {


    Optional<Comment> findById(Long id);


    List<Comment> findByBook(Book book);


    List<Comment> findByUser(User user);


}
