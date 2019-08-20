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

import com.almostkbal.web.services.workflow.auth.UserService;
import com.almostkbal.web.services.workflow.entities.City;
import com.almostkbal.web.services.workflow.repositories.CityRepository;

//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins = "*")
@RestController
public class CityController {
	@Autowired
	private CityRepository cityRepository;

	
	@Autowired
	private UserService userService;
	
	@GetMapping("/api/cities")
//	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING') OR hasRole('ROLE_CITIZENS_DATA_EDITING')")
	public Page<City> retrieveZoneCities(@RequestParam("page") int page, @RequestParam("size") int size) {
		return cityRepository.findByGovernateZoneId(userService.getUserZoneId(), PageRequest.of(page, size));
	}
	
	@GetMapping("/api/cities/findAll")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') ")
	public Page<City> retrieveAllCities(@RequestParam("page") int page, @RequestParam("size") int size) {
		return cityRepository.findAll(PageRequest.of(page, size));
	}


	@GetMapping("/api/cities/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING') OR hasRole('ROLE_CITIZENS_DATA_EDITING')  ")
	public City retrieveCityById(@PathVariable int id) {
		Optional<City> city = cityRepository.findByIdAndGovernateZoneId(id, userService.getUserZoneId());
		if (!city.isPresent())
			throw new ResourceNotFoundException("id-" + id);
//		Resource<City> resource = new Resource<City>(city.get());
		return city.get();
	}

	@DeleteMapping("/api/cities/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public void deleteCity(@PathVariable int id) {
		try {
			cityRepository.deleteByIdAndGovernateZoneId(id, userService.getUserZoneId());
		} catch (EmptyResultDataAccessException ex) {
			throw new ResourceNotFoundException("id-" + id);
		}
	}

	@PostMapping("/api/cities")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<Object> createCity(@Valid @RequestBody City city) {
		City savedCity = cityRepository.save(city);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedCity.getId())
				.toUri();
		return ResponseEntity.created(location).build();

	}

	@PutMapping("/api/cities/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE')")
	public ResponseEntity<City> updateCity(@PathVariable int id, @Valid @RequestBody City city) {
		if (!cityRepository.existsById(id))
			throw new ResourceNotFoundException("id-" + id);
//		cityRepository.deleteById(id);
		City updatedCitzen = cityRepository.save(city);
		return new ResponseEntity<City>(updatedCitzen, HttpStatus.OK);
	}
}
