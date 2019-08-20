package com.almostkbal.web.services.workflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.almostkbal.web.services.workflow.entities.Disability;

@RepositoryRestResource(collectionResourceRel = "disabilities", path = "disabilities")
public interface DisabilityRepository extends JpaRepository<Disability, Integer> {
	
}
