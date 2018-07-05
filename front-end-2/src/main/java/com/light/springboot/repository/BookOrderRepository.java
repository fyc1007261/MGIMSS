package com.light.springboot.repository;



import com.light.springboot.entity.Book;
import com.light.springboot.entity.BookOrder;
import com.light.springboot.entity.OrderPrimaryKey;
import com.light.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface BookOrderRepository extends JpaRepository<BookOrder, Long> {

    Optional<BookOrder> findByOid(Long oid);


    List<BookOrder> findByUid(Long uid);

    @Transactional
    void deleteByOid(Long oid);

    List<BookOrder> findByUidAndDate(Long uid, Date date);

}
