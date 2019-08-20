package com.almostkbal.web.services.workflow.repositories;

import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.almostkbal.web.services.workflow.entities.Audit;

public interface AuditRepository extends JpaRepository<Audit, Long> {
	
	Page<Audit> findByZoneId(long zoneId, Pageable pageable);
	
	Page<Audit> findByZoneIdAndTimestampGreaterThan(long zoneId, Date timestamp, Pageable pageable);
	
	Page<Audit> findByZoneIdAndRequestId(long zoneId, long requestId, Pageable pageable);
	
	Page<Audit> findByZoneIdAndPerformedBy(long zoneId, String performedBy, Pageable pageable);
	
	@Transactional
	@Modifying
	void deleteByIdAndZoneId(long id, long zoneId);
}
