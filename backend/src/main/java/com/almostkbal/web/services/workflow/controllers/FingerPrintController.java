package com.almostkbal.web.services.workflow.controllers;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.almostkbal.web.services.workflow.auth.UserService;
import com.almostkbal.web.services.workflow.dto.FingerprintTemplate;
import com.almostkbal.web.services.workflow.entities.Citizen;
import com.almostkbal.web.services.workflow.repositories.CitizenRepository;


//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins="*")
@RestController
public class FingerPrintController {
	@Autowired
	private CitizenRepository citizenRepository;
	@Autowired
	private UserService userService;
	
	@GetMapping("/api/fingerprint")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SUPER_USER') OR hasRole('ROLE_EYE_REVEAL') OR hasRole('ROLE_BONES_REVEAL')")
	public String retrieveCitizenFingerTemplate(@RequestParam(name = "nationalId", required = true) Long nationalId) {
		Optional<Citizen> citizen = citizenRepository.findByZoneIdAndNationalId(userService.getUserZoneId(), nationalId);
		if(!citizen.isPresent())
			throw new ResourceNotFoundException("Citizen not existing");
//		Resource<Citizen> resource = new Resource<Citizen>(citizen.get());
		return citizen.get().getFingerprint();
	}

	@PostMapping("/api/fingerprint")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SUPER_USER')  OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING') ")
	public String createCitizenFingerTemplate(@RequestParam(name = "nationalId", required = true) Long nationalId,@Valid @RequestBody FingerprintTemplate fingerPrintTemplate) {
		
		Optional<Citizen> citizen = citizenRepository.findByZoneIdAndNationalId(userService.getUserZoneId(), nationalId);
		if(!citizen.isPresent())
			return "Error: National-ID["+nationalId+"] isn't existing";
		citizen.get().setFingerprint(fingerPrintTemplate.getFingerprintTemplate());
		citizenRepository.save(citizen.get());
		
		return "Citizen [National-ID : "+nationalId+"] Fingerprint is added successfully";
		
		
	}
	@PutMapping("/api/fingerprint")
	public String updateCitizen(@RequestParam(name = "nationalId", required = true) Long nationalId, @Valid @RequestBody FingerprintTemplate fingerPrintTemplate) {
		Optional<Citizen> citizen = citizenRepository.findByZoneIdAndNationalId(userService.getUserZoneId(), nationalId);
		if(!citizen.isPresent())
			return "Error: National-ID["+nationalId+"] isn't existing";
		citizen.get().setFingerprint(fingerPrintTemplate.getFingerprintTemplate());
		citizenRepository.save(citizen.get());
		
		return "Citizen [National-ID : "+nationalId+"] Fingerprint is updated successfully";
	}
	
	@DeleteMapping("/api/fingerprint")
	public String deleteCitizenFingerTemplate(@RequestParam(name = "nationalId", required = true) Long nationalId) {
		Optional<Citizen> citizen = citizenRepository.findByZoneIdAndNationalId(userService.getUserZoneId(), nationalId);
		if(!citizen.isPresent())
			return "Error: National-ID["+nationalId+"] isn't existing";
		citizen.get().setFingerprint(null);
		citizenRepository.save(citizen.get());
		
		return "Citizen [National-ID : "+nationalId+"] Fingerprint is updated successfully";
	}
}
