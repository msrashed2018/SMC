package com.almostkbal.web.services.workflow.repositories;

import java.util.Collection;
import java.util.Date;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.almostkbal.web.services.workflow.dto.RequestResultDto;
import com.almostkbal.web.services.workflow.entities.BonesRevealState;
import com.almostkbal.web.services.workflow.entities.EyeRevealState;
import com.almostkbal.web.services.workflow.entities.Request;
import com.almostkbal.web.services.workflow.entities.RequestState;
import com.almostkbal.web.services.workflow.entities.RequestStatus;

public interface RequestRepository extends JpaRepository<Request, Long> {
	public static final String FIND_REQUEST_RESULTS_QUERY = "select new  com.almostkbal.web.services.workflow.dto.RequestResultDto (r.id , c.nationalId , c.name , c.address , s.name , d.name	) from Request r, Citizen c, RequestStatus s, BonesReveal b , Disability d, Zone z where  b.request = r AND r.citizen = c AND r.requestStatus = s AND b.disability = d AND r.zone = z AND z.id = :zoneId AND s.id=:requestStatusId AND r.requestDate BETWEEN :startDate AND :endDate ";

	@Query(value = FIND_REQUEST_RESULTS_QUERY)
	public Page<RequestResultDto> findRequestResults(long zoneId, int requestStatusId, Date startDate, Date endDate, Pageable pageable);
	
	boolean existsByZoneIdAndCitizenIdAndRequestDateGreaterThan(long zoneId, long citizenId, Date requestDate);

	Optional<Request> findByZoneIdAndId(long zoneId, long id);

	// retreive citizen requests
	Page<Request> findByZoneIdAndCitizenId(long zoneId, Long nationalId, Pageable pageable);

	// retreive all requests
	Page<Request> findByZoneId(long zoneId, Pageable pageable);

	Page<Request> findByZoneIdAndState(long zoneId, RequestState state, Pageable pageable);

	Page<Request> findByZoneIdAndStateIn(long zoneId, Collection<RequestState> states, Pageable pageable);

	Page<Request> findByZoneIdAndStateAndEyeRevealState(long zoneId, RequestState state, EyeRevealState eyeRevealState,
			Pageable pageable);

	Page<Request> findByZoneIdAndStateAndBonesRevealState(long zoneId, RequestState state,
			BonesRevealState bonesRevealState, Pageable pageable);

	Page<Request> findByZoneIdAndStateAndBonesRevealStateInAndEyeRevealStateIn(long zoneId, RequestState state,
			Collection<BonesRevealState> bonesRevealStates, Collection<EyeRevealState> eyeRevealStates,
			Pageable pageable);

	Page<Request> findByZoneIdAndBonesCommitteeIsNotNullAndState(long zoneId, RequestState state, Pageable pageable);

	Page<Request> findByZoneIdAndRequestStatusIdAndRequestDateBetween(long zoneId, int requestStatusId,
			Date requestDateStart, Date requestDateEnd, Pageable pageable);
	
	

	// ============== for search by national Id
	// ===========================================

	Page<Request> findByZoneIdAndCitizenNationalId(long zoneId, Long nationalId, Pageable pageable);

	Page<Request> findByZoneIdAndStateAndCitizenNationalId(long zoneId, RequestState state, Long nationalId,
			Pageable pageable);

	// for search in eye reveal queue
	Page<Request> findByZoneIdAndStateAndEyeRevealStateAndCitizenNationalId(long zoneId, RequestState state,
			EyeRevealState eyeRevealState, Long nationalId, Pageable pageable);

	// for search in bones reveal queue
	Page<Request> findByZoneIdAndStateAndBonesRevealStateAndCitizenNationalId(long zoneId, RequestState state,
			BonesRevealState bonesRevealState, Long nationalId, Pageable pageable);

	Page<Request> findByZoneIdAndStateAndBonesRevealStateInAndEyeRevealStateInAndCitizenNationalId(long zoneId,
			RequestState state, Collection<BonesRevealState> bonesRevealStates,
			Collection<EyeRevealState> eyeRevealStates, Long nationalId, Pageable pageable);

	// ============== for search by mobile number
	// ===========================================

	Page<Request> findByZoneIdAndCitizenMobileNumber(long zoneId, String mobileNumber, Pageable pageable);

	Page<Request> findByZoneIdAndStateAndCitizenMobileNumber(long zoneId, RequestState state, String mobileNumber,
			Pageable pageable);

	// for search in eye reveal queue
	Page<Request> findByZoneIdAndStateAndEyeRevealStateAndCitizenMobileNumber(long zoneId, RequestState state,
			EyeRevealState eyeRevealState, String mobileNumber, Pageable pageable);

	// for search in bones reveal queue
	Page<Request> findByZoneIdAndStateAndBonesRevealStateAndCitizenMobileNumber(long zoneId, RequestState state,
			BonesRevealState bonesRevealState, String mobileNumber, Pageable pageable);

	Page<Request> findByZoneIdAndStateAndBonesRevealStateInAndEyeRevealStateInAndCitizenMobileNumber(long zoneId,
			RequestState state, Collection<BonesRevealState> bonesRevealStates,
			Collection<EyeRevealState> eyeRevealStates, String mobileNumber, Pageable pageable);

	// ============== for search by name containing
	// ===========================================

	Page<Request> findByZoneIdAndCitizenNameContaining(long zoneId, String name, Pageable pageable);

	Page<Request> findByZoneIdAndStateAndCitizenNameContaining(long zoneId, RequestState state, String name,
			Pageable pageable);

	// for search in eye reveal queue
	Page<Request> findByZoneIdAndStateAndEyeRevealStateAndCitizenNameContaining(long zoneId, RequestState state,
			EyeRevealState eyeRevealState, String name, Pageable pageable);

	// for search in bones reveal queue
	Page<Request> findByZoneIdAndStateAndBonesRevealStateAndCitizenNameContaining(long zoneId, RequestState state,
			BonesRevealState bonesRevealState, String name, Pageable pageable);

	Page<Request> findByZoneIdAndStateAndBonesRevealStateInAndEyeRevealStateInAndCitizenNameContaining(long zoneId,
			RequestState state, Collection<BonesRevealState> bonesRevealStates,
			Collection<EyeRevealState> eyeRevealStates, String name, Pageable pageable);

	// ============== for search by request date
	// ===========================================

	Page<Request> findByZoneIdAndRequestDateBetween(long zoneId, Date requestDateStart, Date requestDateEnd,
			Pageable pageable);

	Page<Request> findByZoneIdAndStateAndRequestDateBetween(long zoneId, RequestState state, Date requestDateStart,
			Date requestDateEnd, Pageable pageable);

	// for search in eye reveal queue
	Page<Request> findByZoneIdAndStateAndEyeRevealStateAndRequestDateBetween(long zoneId, RequestState state,
			EyeRevealState eyeRevealState, Date requestDateStart, Date requestDateEnd, Pageable pageable);

	// for search in bones reveal queue
	Page<Request> findByZoneIdAndStateAndBonesRevealStateAndRequestDateBetween(long zoneId, RequestState state,
			BonesRevealState bonesRevealState, Date requestDateStart, Date requestDateEnd, Pageable pageable);

	Page<Request> findByZoneIdAndStateAndBonesRevealStateInAndEyeRevealStateInAndRequestDateBetween(long zoneId,
			RequestState state, Collection<BonesRevealState> bonesRevealStates,
			Collection<EyeRevealState> eyeRevealStates, Date requestDateStart, Date requestDateEnd, Pageable pageable);

	// for payment'
//	@Query("select r from Request r , BonesReveal e where e.request = r")
//	List<Request> findForEyeReveal();

//	@Query("SELECT new com.jeejava.dto.DeptEmpDto(d.name, e.name, e.email, e.address) "
//			+ "FROM Department d INNER JOIN d.employees e")
//	List<DeptEmpDto> fetchEmpDeptDataInnerJoin();

	// ================================Updating
	// Request==================================//
	@Transactional
	@Modifying
	@Query("update Request r set r.state = :state where r.id= :requestId")
	void setRequestState(@Param("requestId") long requestId, @Param("state") RequestState state);

	@Transactional
	@Modifying
	@Query("update Request r set r.requestStatus = :requestStatus where r.id= :requestId")
	void setRequestStatus(@Param("requestId") long requestId, @Param("requestStatus") RequestStatus requestStatus);

	@Transactional()
	@Modifying
	@Query("update Request r set r.eyeRevealState = :state where r.id= :requestId")
	void setEyeRevealState(@Param("requestId") long requestId, @Param("state") EyeRevealState eyeRevealState);

	@Transactional
	@Modifying
	@Query("update Request r set r.bonesRevealState = :state where r.id= :requestId")
	void setBonesRevealState(@Param("requestId") long requestId, @Param("state") BonesRevealState bonesRevealState);

}
