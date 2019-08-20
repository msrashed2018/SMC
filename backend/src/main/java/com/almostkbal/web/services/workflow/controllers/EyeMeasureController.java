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

import com.almostkbal.web.services.workflow.entities.EyeMeasure;
import com.almostkbal.web.services.workflow.repositories.EyeMeasureRepository;


//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins="*")
@RestController
public class EyeMeasureController {
	@Autowired
	private EyeMeasureRepository EyeMeasureRepository;
	
	@GetMapping("/api/eye-measures")
	public Page<EyeMeasure> retrieveAllEyeMeasures(@RequestParam("page") int page, @RequestParam("size") int size) {
		return EyeMeasureRepository.findAll(PageRequest.of(page, size));
	}
	
	@GetMapping("/api/eye-measures/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public EyeMeasure retrieveEyeMeasureById(@PathVariable int id) {
		Optional<EyeMeasure> EyeMeasure = EyeMeasureRepository.findById(id);
		if(!EyeMeasure.isPresent())
			throw new ResourceNotFoundException("id-"+ id);
//		Resource<EyeMeasure> resource = new Resource<EyeMeasure>(EyeMeasure.get());
		return EyeMeasure.get();
	}

	@DeleteMapping("/api/eye-measures/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public void deleteEyeMeasure(@PathVariable int id) {
		try {
			EyeMeasureRepository.deleteById(id);
		} catch (EmptyResultDataAccessException ex) {
			throw new ResourceNotFoundException("id-"+ id);
	    }
		
	}

	@PostMapping("/api/eye-measures")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<Object> createEyeMeasure(@Valid @RequestBody EyeMeasure EyeMeasure) {
		EyeMeasure savedEyeMeasure = EyeMeasureRepository.save(EyeMeasure);
		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{id}")
			.buildAndExpand(savedEyeMeasure.getId()).toUri();
		return ResponseEntity.created(location).build();
		
	}
	@PutMapping("/api/eye-measures/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<EyeMeasure> updateEyeMeasure(
			@PathVariable int id, @Valid @RequestBody EyeMeasure EyeMeasure) {

		if(!EyeMeasureRepository.existsById(id))
			throw new ResourceNotFoundException("id-"+ id);
//		EyeMeasureRepository.deleteById(id);
		EyeMeasure updatedCitzen = EyeMeasureRepository.save(EyeMeasure);
		return new ResponseEntity<EyeMeasure>(updatedCitzen, HttpStatus.OK);
	}
}
