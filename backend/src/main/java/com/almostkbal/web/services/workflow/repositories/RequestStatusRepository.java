package com.almostkbal.web.services.workflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.almostkbal.web.services.workflow.entities.Committee;
import com.almostkbal.web.services.workflow.entities.RequestStatus;

public interface RequestStatusRepository extends JpaRepository<RequestStatus, Integer> {

}
