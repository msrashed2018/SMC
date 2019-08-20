package com.almostkbal.web.services.workflow.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.almostkbal.web.services.workflow.entities.DocumentCategory;
import com.almostkbal.web.services.workflow.entities.RequestDocument;

public interface RequestDocumentRepository extends JpaRepository<RequestDocument, Long> {
	
	List<RequestDocument> findByRequestId(long id);
	
	List<RequestDocument> findByRequestIdAndDocumentTypeCategory(long id, DocumentCategory category);
	
	List<RequestDocument> findByRequestIdAndDocumentTypeId(long requestId, long documentTypeId);
	
//	@Query(value="select * from request_document where request_id = :requestId",nativeQuery=true)
//	List<RequestDocument> findByRequestIdAndType(/* @Param(value = "requestId") */ long requestId, DocumentType type);
	
	@Query(value="select * from request_document where request_id = :requestId and name= :documentName",nativeQuery=true)
	RequestDocument findByRequestIdAndName(@Param(value = "requestId") long requestId, @Param(value = "documentName") String documentName );
	
	boolean existsByRequestIdAndName(long id,  String name);
	@Transactional
	@Modifying
	int deleteByRequestIdAndName(long id,  String name);

}
