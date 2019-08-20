package com.almostkbal.web.services.workflow.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.almostkbal.web.services.workflow.entities.Role;
import com.almostkbal.web.services.workflow.repositories.RoleRepository;


//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins="*")
@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class RoleController {
	@Autowired
	private RoleRepository roleRepository;
	
	@GetMapping("/api/roles")
	public List<Role> retrieveAllRoles(){
		return roleRepository.findAll();
	}
	
	@GetMapping("/api/roles/{id}")
	public Role retrieveRoleById(@PathVariable long id) {
		Optional<Role> role = roleRepository.findById(id);
		if(!role.isPresent())
			throw new ResourceNotFoundException("id-"+ id);
//		Resource<Role> resource = new Resource<Role>(role.get());
		return role.get();
	}

	@DeleteMapping("/api/roles/{id}")
	public void deleteRole(@PathVariable long id) {
		try {
			roleRepository.deleteById(id);
		} catch (EmptyResultDataAccessException ex) {
			throw new ResourceNotFoundException("id-"+ id);
	    }
	}

	@PostMapping("/api/roles")
	public ResponseEntity<Object> createRole(@Valid @RequestBody Role role) {
		Role savedRole = roleRepository.save(role);
		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{id}")
			.buildAndExpand(savedRole.getId()).toUri();
		return ResponseEntity.created(location).build();
		
	}
	@PutMapping("/api/roles/{id}")
	public ResponseEntity<Role> updateRole(
			@PathVariable long id, @RequestBody Role role){
		Optional<Role> existingRole = roleRepository.findById(id);

		if(!existingRole.isPresent())
			throw new ResourceNotFoundException("id-"+ id);
//		roleRepository.deleteById(id);
		Role updatedCitzen = roleRepository.save(role);
		return new ResponseEntity<Role>(updatedCitzen, HttpStatus.OK);
	}
}
