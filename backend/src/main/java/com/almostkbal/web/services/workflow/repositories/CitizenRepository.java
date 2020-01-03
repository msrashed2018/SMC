package com.almostkbal.web.services.workflow.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.almostkbal.web.services.workflow.entities.Citizen;

//@PreAuthorize("isAuthenticated()")

//@RepositoryRestResource(collectionResourceRel = "citizens", path = "citizens")
//@PreAuthorize("hasRole('ROLE_ADMIN')")
//@CrossOrigin(origins= "http://192.168.0.100:4200")
public interface CitizenRepository extends JpaRepository<Citizen, Long> {

	Optional<Citizen> findByZoneIdAndNationalId(long zoneId, long nationalId);

	Citizen findByZoneIdAndId(long userZoneId, long citizenId);
	
	int deleteByNationalId(long nationalId);

	Page<Citizen> findByZoneIdAndNationalId(long zoneId, long nationalId, Pageable pageable);

	Page<Citizen> findByZoneIdAndMobileNumber(long zoneId, String mobileNumber, Pageable pageable);

	Page<Citizen> findByZoneIdAndNameContaining(long zoneId, String mobileNumber, Pageable pageable);

	Page<Citizen> findByZoneIdAndCreatedDateBetween(long zoneId, Date createdDateStart, Date createdDateEnd,
			Pageable pageable);

	List<Citizen> findByName(String name);

//	@Query(value = "select * from citizen where TRUNC(created_date)=TO_DATE(:date, 'YYYY-MM-DD')",nativeQuery=true)
	@Query(value = "SELECT c FROM Citizen c WHERE TRUNC(c.createdDate) = TO_DATE(:date, 'yyyy-MM-dd')")
	List<Citizen> findAllByDate(@Param("date") String date);

//	@Query("SELECT c FROM Citizen c WHERE c.name LIKE CONCAT('%',:name,'%')")
	List<Citizen> findByNameContaining(String name);

	Page<Citizen> findByZoneId(long zoneId, Pageable pageable);

	boolean existsByNationalId(long nationalId);

	

}
