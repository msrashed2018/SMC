package com.almostkbal.web.services.workflow.repositories;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.almostkbal.web.services.workflow.entities.Committee;

public interface CommitteeRepository extends JpaRepository<Committee, Long> {
	
	Page<Committee> findByZoneId(long zoneId, Pageable pageable);
	@Transactional
	@Modifying
	void deleteByIdAndZoneId(long id, long zoneId);

	List<Committee> findByZoneIdAndTypeAndDateGreaterThanAndFunction(long zoneId, String type, Date date, String function);
	
	
	@Query(value = "SELECT count(*) FROM Committee c WHERE c.zone.id=:zoneId AND :memberId in (memberOne.id, memberTwo.id, memberThree.id, memberFour.id, memberFive.id, memberSix.id) AND date between :startDate and :endDate")
	int existsForAnotherCommitteOnSameDate(long zoneId, long memberId, Date startDate, Date endDate);
	
	
	@Query(value = "SELECT count(*) FROM Committee c WHERE c.id != :committeeId AND c.zone.id=:zoneId AND  :memberId in (memberOne.id, memberTwo.id, memberThree.id, memberFour.id, memberFive.id, memberSix.id) AND date between :startDate and :endDate")
	int existsForAnotherCommitteOnSameDateExcept(long committeeId, long zoneId, long memberId, Date startDate, Date endDate);
//	
//	boolean existsByZoneIdAndMemberOneIdAndDate(long zoneId, long memberOneId, Date date);
//	boolean existsByZoneIdAndMemberTwoIdAndDate(long zoneId, long memberTwoId, Date date);
//	boolean existsByZoneIdAndMemberThreeIdAndDate(long zoneId, long memberThreeId, Date date);
//	boolean existsByZoneIdAndMemberFourIdAndDate(long zoneId, long memberFourId, Date date);
//	boolean existsByZoneIdAndMemberFiveIdAndDate(long zoneId, long memberFiveId, Date date);
//	boolean existsByZoneIdAndMemberSixIdAndDate(long zoneId, long memberSixId, Date date);
	
}
