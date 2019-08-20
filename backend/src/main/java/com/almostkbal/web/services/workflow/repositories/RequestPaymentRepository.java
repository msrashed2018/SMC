package com.almostkbal.web.services.workflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.almostkbal.web.services.workflow.entities.EyeReveal;
import com.almostkbal.web.services.workflow.entities.RequestPayment;

public interface RequestPaymentRepository extends JpaRepository<RequestPayment, Long> {
	RequestPayment findByRequestId(long id);
}
