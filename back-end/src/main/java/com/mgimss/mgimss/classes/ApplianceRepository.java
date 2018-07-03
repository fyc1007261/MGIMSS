package com.mgimss.mgimss.classes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplianceRepository extends JpaRepository<Appliance, Long>{
}