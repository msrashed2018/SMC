package com.almostkbal.web.services.workflow.repositories;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.almostkbal.web.services.workflow.entities.CommitteeMember;

public interface CommitteeMemberRepository extends JpaRepository<CommitteeMember, Long> {
	
	Page<CommitteeMember> findByZoneId(long zoneId, Pageable pageable);
	@Transactional
	@Modifying
	void deleteByIdAndZoneId(long id, long zoneId);
}
