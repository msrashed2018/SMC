package com.almostkbal.web.services.workflow.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.almostkbal.web.services.workflow.entities.DocumentCategory;
import com.almostkbal.web.services.workflow.entities.DocumentType;

public interface DocumentTypeRepository extends JpaRepository<DocumentType, Long> {
	
	List<DocumentType> findByCategory(DocumentCategory category);
	
	List<DocumentType> findByName(String name);
	
}
