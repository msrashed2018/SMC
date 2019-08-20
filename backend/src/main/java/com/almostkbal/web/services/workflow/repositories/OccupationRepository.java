package com.almostkbal.web.services.workflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.almostkbal.web.services.workflow.entities.Occupation;

//@RepositoryRestResource(collectionResourceRel = "occupations", path = "occupations")
//@PreAuthorize("hasRole('ROLE_ADMIN')")
public interface OccupationRepository extends JpaRepository<Occupation, Integer> {

}
