package com.mgimss.mgimss.classes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Query("SELECT c from Customer c")
    List<Customer> getAll();

    @Query("select c from Customer c where c.username=:username")
    Customer getCustomerByUsername(@Param("username") String username);
}