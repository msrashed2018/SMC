package com.almostkbal.web.services.workflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.almostkbal.web.services.workflow.entities.Committee;
import com.almostkbal.web.services.workflow.entities.RequestStatus;
import com.almostkbal.web.services.workflow.entities.RequestType;

public interface RequestTypeRepository extends JpaRepository<RequestType, Integer> {

}
