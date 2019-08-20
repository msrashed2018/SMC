package com.almostkbal.web.services.workflow.controllers;

import java.net.URI;
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

import com.almostkbal.web.services.workflow.entities.RequestType;
import com.almostkbal.web.services.workflow.repositories.RequestTypeRepository;


//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins="*")
@RestController
public class RequestTypeController {
	@Autowired
	private RequestTypeRepository requestTypeRepository;
	
	@GetMapping("/api/request-type")
	public Page<RequestType> retrieveAllRequestTypes(@RequestParam("page") int page, @RequestParam("size") int size) {
		Page<RequestType> requestTypes = requestTypeRepository.findAll(PageRequest.of(page, size));
		return requestTypes;
	}

	
	@GetMapping("/api/request-type/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public RequestType retrieveRequestTypeById(@PathVariable int id) {
		Optional<RequestType> requestType = requestTypeRepository.findById(id);
		if(!requestType.isPresent())
			throw new ResourceNotFoundException("id-"+ id);
//		Resource<RequestType> resource = new Resource<RequestType>(requestType.get());
		return requestType.get();
	}

	@DeleteMapping("/api/request-type/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public void deleteRequestType(@PathVariable int id) {
		try {
			requestTypeRepository.deleteById(id);
		} catch (EmptyResultDataAccessException ex) {
			throw new ResourceNotFoundException("id-"+ id);
	    }
	}

	@PostMapping("/api/request-type")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<Object> createRequestType(@Valid @RequestBody RequestType requestType) {
		RequestType savedRequestType = requestTypeRepository.save(requestType);
		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{id}")
			.buildAndExpand(savedRequestType.getId()).toUri();
		return ResponseEntity.created(location).build();
		
	}
	@PutMapping("/api/request-type/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<RequestType> updateRequestType(
			@PathVariable int id, @Valid @RequestBody RequestType requestType) {
		if(!requestTypeRepository.existsById(id))
			throw new ResourceNotFoundException("id-"+ id);
//		requestTypeRepository.deleteById(id);
		RequestType updatedCitzen = requestTypeRepository.save(requestType);
		return new ResponseEntity<RequestType>(updatedCitzen, HttpStatus.OK);
	}
}
