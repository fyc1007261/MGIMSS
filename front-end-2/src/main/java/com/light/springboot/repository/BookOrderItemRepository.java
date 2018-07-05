package com.light.springboot.repository;

import com.light.springboot.entity.BookOrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookOrderItemRepository  extends JpaRepository<BookOrderItem, Long> {
}
