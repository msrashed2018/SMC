package com.almostkbal.web.services.workflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.almostkbal.web.services.workflow.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
