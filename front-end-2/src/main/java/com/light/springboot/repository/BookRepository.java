package com.light.springboot.repository;

import com.light.springboot.entity.Book;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import java.util.List;
import java.util.Optional;

/**
 * Created by wan on 2017/1/17.
 */
@Repository
@Table(name="books4")
@Qualifier("bookRepository")
public interface BookRepository extends JpaRepository<Book, Long > {
    @Nullable
    Optional<Book> findById(Long id);

    @Nullable
    List<Book> findByTitle(String title);

    @Nullable
    List<Book> findByAuthor(String author);

    @Nullable
    List<Book> findByLanguage(String language);

    @Nullable
    List<Book> findByPublished(String published);

    @Nullable
    List<Book> findBySales(String sales);

    @Nullable
    List<Book> findByPrice(Long price);

    @Nullable
    @Query("select book from Book book where lower(book.title) like CONCAT('%',lower(:title),'%') " +
            "and  lower(book.author) like concat('%',lower(:author),'%') and book.stock > 0")
    List<Book> findByTitleAndAuthorNoFormat(@Param("title") String title, @Param("author") String author);

    @Nullable
    @Query("select book from Book book where lower(book.title) like CONCAT('%',lower(:title),'%') " +
            "and book.stock > 0")
    List<Book> findByTitleNoFormat(@Param("title") String title);

    @Nullable
    @Query("select book from Book book where lower(book.author) like CONCAT('%',lower(:author),'%') " +
            "and book.stock > 0 ")
    List<Book> findByAuthorNoFormat(@Param("author") String author);
}