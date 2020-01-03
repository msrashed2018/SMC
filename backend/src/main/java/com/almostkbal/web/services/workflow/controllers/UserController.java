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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

import com.almostkbal.web.services.workflow.entities.Role;
import com.almostkbal.web.services.workflow.entities.User;
import com.almostkbal.web.services.workflow.repositories.UserRepository;


//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins="*")
@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class UserController {
	@Autowired
	private UserRepository userRepository;
	@Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

	
	@GetMapping("/api/users")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') ")
	public Page<User> retrieveAllUsers(@RequestParam("page") int page, @RequestParam("size") int size) {
		return userRepository.findAll(PageRequest.of(page, size));
	}
	
	@GetMapping("/api/users/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') ")
	public User retrieveUserById(@PathVariable long id) {
		Optional<User> user = userRepository.findById(id);
		if(!user.isPresent())
			throw new ResourceNotFoundException("id-"+ id);
//		Resource<User> resource = new Resource<User>(user.get());
		return user.get();
	}

	@DeleteMapping("/api/users/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') ")
	public void deleteUser(@PathVariable long id) {
		try {
			userRepository.deleteById(id);
		} catch (EmptyResultDataAccessException ex) {
			throw new ResourceNotFoundException("id-"+ id);
	    }
	}

	@PostMapping("/api/users")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') ")
	public ResponseEntity<Object> createUser(@Valid @RequestBody User user) {

		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		User savedUser = userRepository.save(user);
		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{id}")
			.buildAndExpand(savedUser.getId()).toUri();
		return ResponseEntity.created(location).build();
		
	}
	@PutMapping("/api/users/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') ")
	public ResponseEntity<User> updateUser(
			@PathVariable long id, @Valid @RequestBody User user) {
		Optional<User> existingUser = userRepository.findById(id);

		if(!existingUser.isPresent())
			throw new ResourceNotFoundException("id-"+ id);
//		userRepository.deleteById(id);
		User updatedCitzen = userRepository.save(user);
		return new ResponseEntity<User>(updatedCitzen, HttpStatus.OK);
	}
	
	@PostMapping("/api/users/{id}/roles")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') ")
	public ResponseEntity<Object> addRole(@PathVariable long id, @RequestBody Role role) {

		Optional<User> userOptional = userRepository.findById(id);

		if (!userOptional.isPresent()) {
			throw new ResourceNotFoundException("id-" + id);
		}

		User user = userOptional.get();
		user.addRole(role);
		
		userRepository.save(user);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(role.getId())
				.toUri();

		return ResponseEntity.created(location).build();

	}
	
	
	@GetMapping("/api/users/{id}/roles")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') ")
	public List<Role> retrieveUserRoles(@PathVariable long id) {
		Optional<User> userOptional = userRepository.findById(id);
		if (!userOptional.isPresent()) {
			throw new ResourceNotFoundException("id-" + id);
		}
		User user = userOptional.get();

		return user.getRoles();
	}
}
