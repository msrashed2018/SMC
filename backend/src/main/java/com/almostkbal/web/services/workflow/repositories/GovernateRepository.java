package com.almostkbal.web.services.workflow.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.almostkbal.web.services.workflow.entities.Governate;
import com.almostkbal.web.services.workflow.entities.Zone;

//@CrossOrigin(origins="http://localhost:4201")
//@RepositoryRestResource(collectionResourceRel = "governates", path = "governates")
public interface GovernateRepository extends PagingAndSortingRepository<Governate, Integer> {
	@Query(value = "SELECT c FROM Governate c WHERE c.zone = :zone")
	List<Governate> findByZone(@Param("zone") Zone zone);
	
	Page<Governate> findByZoneId(long zoneId, Pageable pageable);
	
	
	@Transactional
	@Modifying
	void deleteByIdAndZoneId(int id, long zoneId);
}
