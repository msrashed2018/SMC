package com.almostkbal.web.services.workflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.almostkbal.web.services.workflow.entities.EyeReveal;

public interface EyeRevealRepository extends JpaRepository<EyeReveal, Long> {
	
	EyeReveal findByRequestId(long id);
}
