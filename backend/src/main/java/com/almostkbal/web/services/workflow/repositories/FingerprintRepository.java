package com.almostkbal.web.services.workflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.almostkbal.web.services.workflow.entities.Fingerprint;

public interface FingerprintRepository extends JpaRepository<Fingerprint, Long> {

	Fingerprint findByCitizenId(Long citizenId);
	
	Fingerprint findByCitizenNationalId(Long nationalId);

}
