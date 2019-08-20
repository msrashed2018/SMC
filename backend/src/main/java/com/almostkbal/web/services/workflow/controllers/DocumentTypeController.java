package com.almostkbal.web.services.workflow.controllers;

import java.net.URI;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Currency;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.almostkbal.web.services.workflow.entities.DocumentCategory;
import com.almostkbal.web.services.workflow.entities.DocumentType;
import com.almostkbal.web.services.workflow.repositories.DocumentTypeRepository;


//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins="*")
@RestController
public class DocumentTypeController {
	@Autowired
	private DocumentTypeRepository documentTypeRepository;
	
	public static Currency getByCode(int code) {
	    for(Currency c : Currency.getAvailableCurrencies()) {
	        if(c.getNumericCode() == code) {
	            return c;
	        }
	    }
	    throw new IllegalArgumentException("Unkown currency code: " + code);
	}
	

	
	
	@GetMapping("/api/document-types")
	public Page<DocumentType> retrieveAllDocumentTypes(@RequestParam("page") int page, @RequestParam("size") int size) {
		return documentTypeRepository.findAll(PageRequest.of(page, size));
	}
	@GetMapping("/api/document-types/findByCategory")
//	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public List<DocumentType> retreiveDocumentTypesByCategory(@RequestParam("category") DocumentCategory category) {
		if(category.equals(DocumentCategory.ALL)) {
			return documentTypeRepository.findAll();
		}else {
		return documentTypeRepository.findByCategory(category);
		}
	}
	@GetMapping("/api/document-types/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public DocumentType retrieveDocumentTypeById(@PathVariable long id) {
		Optional<DocumentType> DocumentType = documentTypeRepository.findById(id);
		if(!DocumentType.isPresent())
			throw new ResourceNotFoundException("id-"+ id);
//		Resource<DocumentType> resource = new Resource<DocumentType>(DocumentType.get());
		return DocumentType.get();
	}

	@DeleteMapping("/api/document-types/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public void deleteDocumentType(@PathVariable long id) {
		try {
			documentTypeRepository.deleteById(id);
		} catch (EmptyResultDataAccessException ex) {
			throw new ResourceNotFoundException("id-"+ id);
	    }
	}

	@PostMapping("/api/document-types")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<Object> createDocumentType(@Valid @RequestBody DocumentType DocumentType) {
		DocumentType savedDocumentType = documentTypeRepository.save(DocumentType);
		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{id}")
			.buildAndExpand(savedDocumentType.getId()).toUri();
		return ResponseEntity.created(location).build();
		
	}
	@PutMapping("/api/document-types/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<DocumentType> updateDocumentType(
			@PathVariable long id, @Valid @RequestBody DocumentType documentType) {
		
		if(!documentTypeRepository.existsById(id))
			throw new ResourceNotFoundException("id-"+ id);
		DocumentType updatedDocumentType = documentTypeRepository.save(documentType);
		return new ResponseEntity<DocumentType>(updatedDocumentType, HttpStatus.OK);
	}
}
