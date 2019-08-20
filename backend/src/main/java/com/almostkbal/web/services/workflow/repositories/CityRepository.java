package com.almostkbal.web.services.workflow.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.almostkbal.web.services.workflow.entities.City;

//@RepositoryRestResource(collectionResourceRel = "cities", path = "cities")
public interface CityRepository extends JpaRepository<City, Integer> {
//	@Query(value = "SELECT c FROM City c WHERE c.governate = :governate")
//	List<City> findByGovernate(@Param("governate") Governate governate);
	
	List<City> findByGovernateId(int id);
	
	Page<City> findByGovernateZoneId(long zoneId, Pageable pageable);
	
	Optional<City> findByIdAndGovernateZoneId(long id, long zoneId);
	
	@Transactional
	@Modifying
	void deleteByIdAndGovernateZoneId(int id, long zoneId);
}
