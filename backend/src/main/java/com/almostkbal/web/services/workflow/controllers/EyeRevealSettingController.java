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

import com.almostkbal.web.services.workflow.entities.EyeRevealSetting;
import com.almostkbal.web.services.workflow.repositories.EyeRevealSettingRepository;


//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins="*")
@RestController
public class EyeRevealSettingController {
	@Autowired
	private EyeRevealSettingRepository EyeRevealSettingRepository;
	
	@GetMapping("/api/eye-reveal-settings")
	public Page<EyeRevealSetting> retrieveAllEyeRevealSettings(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return EyeRevealSettingRepository.findAll(PageRequest.of(page, size));
	}
	
	@GetMapping("/api/eye-reveal-settings/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public EyeRevealSetting retrieveEyeRevealSettingById(@PathVariable long id) {
		Optional<EyeRevealSetting> EyeRevealSetting = EyeRevealSettingRepository.findById(id);
		if(!EyeRevealSetting.isPresent())
			throw new ResourceNotFoundException("id-"+ id);
//		Resource<EyeRevealSetting> resource = new Resource<EyeRevealSetting>(EyeRevealSetting.get());
		return EyeRevealSetting.get();
	}

	@DeleteMapping("/api/eye-reveal-settings/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public void deleteEyeRevealSetting(@PathVariable long id) {
		try {
			EyeRevealSettingRepository.deleteById(id);
		} catch (EmptyResultDataAccessException ex) {
			throw new ResourceNotFoundException("id-"+ id);
	    }
		
	}

	@PostMapping("/api/eye-reveal-settings")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<Object> createEyeRevealSetting(@Valid @RequestBody EyeRevealSetting EyeRevealSetting) {
		EyeRevealSetting savedEyeRevealSetting = EyeRevealSettingRepository.save(EyeRevealSetting);
		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{id}")
			.buildAndExpand(savedEyeRevealSetting.getId()).toUri();
		return ResponseEntity.created(location).build();
		
	}
	@PutMapping("/api/eye-reveal-settings/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<EyeRevealSetting> updateEyeRevealSetting(
			@PathVariable long id, @Valid @RequestBody EyeRevealSetting EyeRevealSetting) {
		Optional<EyeRevealSetting> existingEyeRevealSetting = EyeRevealSettingRepository.findById(id);

		if(!existingEyeRevealSetting.isPresent())
			throw new ResourceNotFoundException("id-"+ id);
//		EyeRevealSettingRepository.deleteById(id);
		EyeRevealSetting updatedCitzen = EyeRevealSettingRepository.save(EyeRevealSetting);
		return new ResponseEntity<EyeRevealSetting>(updatedCitzen, HttpStatus.OK);
	}
}
