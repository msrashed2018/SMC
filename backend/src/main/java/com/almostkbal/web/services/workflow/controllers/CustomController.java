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

import com.almostkbal.web.services.workflow.entities.Custom;
import com.almostkbal.web.services.workflow.repositories.CustomRepository;


//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins="*")
@RestController
public class CustomController {
	@Autowired
	private CustomRepository customRepository;
	
	@GetMapping("/api/customs")
//	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING') OR hasRole('ROLE_CITIZENS_DATA_EDITING')")
	public Page<Custom> retrieveAllCustoms(@RequestParam("page") int page, @RequestParam("size") int size) {
		return customRepository.findAll(PageRequest.of(page, size));
	}
	
	@GetMapping("/api/customs/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public Custom retrieveCustomById(@PathVariable int id) {
		Optional<Custom> custom = customRepository.findById(id);
		if(!custom.isPresent())
			throw new ResourceNotFoundException("id-"+ id);
//		Resource<Custom> resource = new Resource<Custom>(custom.get());
		return custom.get();
	}

	@DeleteMapping("/api/customs/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public void deleteCustom(@PathVariable int id) {
		try {
			customRepository.deleteById(id);
		} catch (EmptyResultDataAccessException ex) {
			throw new ResourceNotFoundException("id-"+ id);
	    }
	}

	@PostMapping("/api/customs")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<Object> createCustom(@Valid @RequestBody Custom custom) {
		Custom savedCustom = customRepository.save(custom);
		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{id}")
			.buildAndExpand(savedCustom.getId()).toUri();
		return ResponseEntity.created(location).build();
		
	}
	@PutMapping("/api/customs/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<Custom> updateCustom(
			@PathVariable int id, @Valid @RequestBody Custom custom) {
		Optional<Custom> existingCustom = customRepository.findById(id);
		
		if(!existingCustom.isPresent())
			throw new ResourceNotFoundException("id-"+ id);
//		customRepository.deleteById(id);
		Custom updatedCitzen = customRepository.save(custom);
		return new ResponseEntity<Custom>(updatedCitzen, HttpStatus.OK);
	}
}
