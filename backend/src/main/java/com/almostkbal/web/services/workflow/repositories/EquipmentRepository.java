package com.almostkbal.web.services.workflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.almostkbal.web.services.workflow.entities.Equipment;

public interface EquipmentRepository extends JpaRepository<Equipment, Integer> {

}
