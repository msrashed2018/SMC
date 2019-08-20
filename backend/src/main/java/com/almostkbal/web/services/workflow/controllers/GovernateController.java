package com.almostkbal.web.services.workflow.controllers;

import java.net.URI;
import java.util.List;
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
import org.springframework.security.core.Authentication;
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

import com.almostkbal.web.services.workflow.auth.UserService;
import com.almostkbal.web.services.workflow.entities.City;
import com.almostkbal.web.services.workflow.entities.Governate;
import com.almostkbal.web.services.workflow.entities.Zone;
import com.almostkbal.web.services.workflow.repositories.CityRepository;
import com.almostkbal.web.services.workflow.repositories.GovernateRepository;

//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins = "*")
@RestController
public class GovernateController {
	@Autowired
	private GovernateRepository governateRepository;

	@Autowired
	private CityRepository cityRepository;
	
	@Autowired
	private UserService userService;

	@GetMapping(value="/api/governates", params= {"page","size"})
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING') OR hasRole('ROLE_CITIZENS_DATA_EDITING')  ")
	public Page<Governate> retrieveZoneGovernates( @RequestParam("page") int page, @RequestParam("size") int size, Authentication authentication) {
		return governateRepository.findByZoneId(userService.getUserZoneId(), PageRequest.of(page, size));
	}

	@GetMapping(value="/api/governates/findAll", params= {"page","size"})
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') ")
	public Page<Governate> retrieveAllGovernates( @RequestParam("page") int page, @RequestParam("size") int size) {
		return governateRepository.findAll(PageRequest.of(page, size));
	}
	
	@GetMapping("/api/governates/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public Governate retrieveGovernateById(@PathVariable int id) {
		Optional<Governate> governate = governateRepository.findById(id);
		if (!governate.isPresent())
			throw new ResourceNotFoundException("id-" + id);
//		Resource<Governate> resource = new Resource<Governate>(governate.get());
		return governate.get();
	}

	@DeleteMapping("/api/governates/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public void deleteGovernate(@PathVariable int id) {
		try {
			System.out.println("\n\n beforeeeeeeeeeeeeeee\n\n\n");
			governateRepository.deleteByIdAndZoneId(id, userService.getUserZoneId());
			System.out.println("\n\n afteeeeeeeeeeeeeer\n\n\n");
		} catch (EmptyResultDataAccessException ex) {
			throw new ResourceNotFoundException("id-"+ id);
	    }
	}

	@PostMapping("/api/governates")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<Object> createGovernate(@Valid @RequestBody Governate governate) {
//		Zone userZone = new Zone();
//		userZone.setId(userService.getUserZoneId());
//		governate.setZone(userZone);
		
		Governate savedGovernate = governateRepository.save(governate);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedGovernate.getId()).toUri();
		return ResponseEntity.created(location).build();

	}

	@PutMapping("/api/governates/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<Governate> updateGovernate(@PathVariable int id, @Valid @RequestBody Governate governate) {
		if (!governateRepository.existsById(id))
			throw new ResourceNotFoundException("id-" + id);
//		governateRepository.deleteById(id);
		
//		Zone userZone = new Zone();
//		userZone.setId(userService.getUserZoneId());
//		governate.setZone(userZone);
		Governate updatedCitzen = governateRepository.save(governate);
		return new ResponseEntity<Governate>(updatedCitzen, HttpStatus.OK);
	}

	@PostMapping("/api/governates/{id}/cities")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<Object> addCity(@PathVariable int id, @Valid @RequestBody City city) {

		Optional<Governate> governateOptional = governateRepository.findById(id);

		if (!governateOptional.isPresent()) {
			throw new ResourceNotFoundException("id-" + id);
		}

		Governate governate = governateOptional.get();

		city.setGovernate(governate);

		cityRepository.save(city);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(city.getId())
				.toUri();

		return ResponseEntity.created(location).build();

	}

	@GetMapping("/api/governates/{id}/cities")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING') ")
	public List<City> retrieveGovernateCities(@PathVariable int id) {
//		Optional<Governate> governateOptional = governateRepository.findById(id);
//		if (!governateOptional.isPresent()) {
//			throw new ResourceNotFoundException("id-" + id);
//		}
//		Governate governate = governateOptional.get();
		return cityRepository.findByGovernateId(id);
	}
}
