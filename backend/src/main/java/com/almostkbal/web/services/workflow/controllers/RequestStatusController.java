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

import com.almostkbal.web.services.workflow.entities.RequestStatus;
import com.almostkbal.web.services.workflow.repositories.RequestStatusRepository;


//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins="*")
@RestController
public class RequestStatusController {
	@Autowired
	private RequestStatusRepository requestStatusRepository;
	
	@GetMapping("/api/request-status")
	public Page<RequestStatus> retrieveAllRequestStatuss(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return requestStatusRepository.findAll(PageRequest.of(page, size));
	}

	
	@GetMapping("/api/request-status/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public RequestStatus retrieveRequestStatusById(@PathVariable int id) {
		Optional<RequestStatus> requestStatus = requestStatusRepository.findById(id);
		if(!requestStatus.isPresent())
			throw new ResourceNotFoundException("id-"+ id);
//		Resource<RequestStatus> resource = new Resource<RequestStatus>(requestStatus.get());
		return requestStatus.get();
	}

	@DeleteMapping("/api/request-status/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public void deleteRequestStatus(@PathVariable int id) {
		try {
			requestStatusRepository.deleteById(id);
		} catch (EmptyResultDataAccessException ex) {
			throw new ResourceNotFoundException("id-"+ id);
	    }
	}

	@PostMapping("/api/request-status")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<Object> createRequestStatus(@Valid @RequestBody RequestStatus requestStatus) {
		RequestStatus savedRequestStatus = requestStatusRepository.save(requestStatus);
		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{id}")
			.buildAndExpand(savedRequestStatus.getId()).toUri();
		return ResponseEntity.created(location).build();
		
	}
	@PutMapping("/api/request-status/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<RequestStatus> updateRequestStatus(
			@PathVariable int id, @Valid @RequestBody RequestStatus requestStatus) {
		if(!requestStatusRepository.existsById(id))
			throw new ResourceNotFoundException("id-"+ id);
//		requestStatusRepository.deleteById(id);
		RequestStatus updatedCitzen = requestStatusRepository.save(requestStatus);
		return new ResponseEntity<RequestStatus>(updatedCitzen, HttpStatus.OK);
	}
}
