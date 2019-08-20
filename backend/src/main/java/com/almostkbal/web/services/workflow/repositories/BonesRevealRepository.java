package com.almostkbal.web.services.workflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.almostkbal.web.services.workflow.entities.BonesReveal;

public interface BonesRevealRepository extends JpaRepository<BonesReveal, Long> {
	
	BonesReveal findByRequestId(long id);
	
}
