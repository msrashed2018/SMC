package com.almostkbal.web.services.workflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.almostkbal.web.services.workflow.entities.FingerprintEnrollment;

public interface FingerprintEnrollmentRepository extends JpaRepository<FingerprintEnrollment, Long> {


	FingerprintEnrollment findByRegisterarUsername(String username);

	@Modifying
	void deleteByRegisterarUsername(String username);
	
}
