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

import com.almostkbal.web.services.workflow.entities.Disability;
import com.almostkbal.web.services.workflow.repositories.DisabilityRepository;


//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins="*")
@RestController
public class DisabilityController {
	@Autowired
	private DisabilityRepository disabilityRepository;
	
	@GetMapping("/api/disabilities")
//	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') OR hasRole('ROLE_BONES_REVEAL_RESULT_REGISTERING') OR hasRole('ROLE_REQUEST_REVIEWING')")
	public Page<Disability> retrieveAllDisabilities(@RequestParam("page") int page, @RequestParam("size") int size) {
		return disabilityRepository.findAll(PageRequest.of(page, size));
	}
	
	@GetMapping("/api/disabilities/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public Disability retrieveDisabilityById(@PathVariable int id) {
		Optional<Disability> disability = disabilityRepository.findById(id);
		if(!disability.isPresent())
			throw new ResourceNotFoundException("id-"+ id);
//		Resource<Disability> resource = new Resource<Disability>(disability.get());
		return disability.get();
	}

	@DeleteMapping("/api/disabilities/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public void deleteDisability(@PathVariable int id) {
		try {
			disabilityRepository.deleteById(id);
		} catch (EmptyResultDataAccessException ex) {
			throw new ResourceNotFoundException("id-"+ id);
	    }
	}

	@PostMapping("/api/disabilities")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<Object> createDisability(@Valid @RequestBody Disability disability) {
		Disability savedDisability = disabilityRepository.save(disability);
		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{id}")
			.buildAndExpand(savedDisability.getId()).toUri();
		return ResponseEntity.created(location).build();
		
	}
	@PutMapping("/api/disabilities/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<Disability> updateDisability(
			@PathVariable int id, @Valid @RequestBody Disability disability) {

		if(!disabilityRepository.existsById(id))
			throw new ResourceNotFoundException("id-"+ id);
//		disabilityRepository.deleteById(id);
		Disability updatedCitzen = disabilityRepository.save(disability);
		return new ResponseEntity<Disability>(updatedCitzen, HttpStatus.OK);
	}
}
