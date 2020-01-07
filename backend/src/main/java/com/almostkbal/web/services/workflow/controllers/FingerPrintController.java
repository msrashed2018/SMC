package com.almostkbal.web.services.workflow.controllers;

import java.util.Date;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;

import com.almostkbal.web.services.workflow.auth.UserService;
import com.almostkbal.web.services.workflow.entities.Citizen;
import com.almostkbal.web.services.workflow.entities.Fingerprint;
import com.almostkbal.web.services.workflow.entities.FingerprintEnrollment;
import com.almostkbal.web.services.workflow.entities.FingerprintVerification;
import com.almostkbal.web.services.workflow.entities.User;
import com.almostkbal.web.services.workflow.repositories.CitizenRepository;
import com.almostkbal.web.services.workflow.repositories.FingerprintEnrollmentRepository;
import com.almostkbal.web.services.workflow.repositories.FingerprintRepository;
import com.almostkbal.web.services.workflow.repositories.FingerprintVerificationRepository;
import com.almostkbal.web.services.workflow.repositories.UserRepository;
import com.almostkbal.web.services.workflow.services.RequestService;

//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins = "*")
@RestController
public class FingerprintController {
	@Autowired
	private CitizenRepository citizenRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private FingerprintVerificationRepository fingerprintVerificationRepository;

	@Autowired
	private FingerprintEnrollmentRepository fingerprintEnrollmentRepository;

	@Autowired
	private FingerprintRepository fingerprintRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private RequestService requestService;

	// request registering citizen fingerprint template - Step1 of Enrollment
	// This API is called from Web Applicaton
	@PostMapping("/api/citizens/{citizenId}/fingerprint/enrollmentstep1")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SUPER_USER')  OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING')")
	@Transactional
	public ResponseEntity<Boolean> registerCitizenFingerprintStep1(@PathVariable long citizenId,
			Authentication authentication) {
		Citizen citizen = citizenRepository.findByZoneIdAndId(userService.getUserZoneId(), citizenId);
		if (citizen == null)
			throw new ResourceNotFoundException("The citizen is not exisitng");

		// check if citizen fingerprint is registered before or not. if registered, only
		// admin and super user can edit fingerprint
		Fingerprint existingFingerprint = fingerprintRepository.findByCitizenId(citizenId);
		if (existingFingerprint != null) {
			boolean canUpdateCitizenFingerprint = false;
			for (GrantedAuthority authority : authentication.getAuthorities()) {
				if (authority.getAuthority().equals("ROLE_ADMIN")
						|| authority.getAuthority().equals("ROLE_SUPER_USER")) {
					canUpdateCitizenFingerprint = true;
				}
			}
			if (!canUpdateCitizenFingerprint) {
				throw new ResourceAccessException("تم تسجيل البصمة لهذا المواطن من قبل.. و ليس لديك الصلاحية للتعديل");
			}
		}

		fingerprintEnrollmentRepository.deleteByRegisterarUsername(userService.getUsername());
		FingerprintEnrollment fingerprintEnrollment = new FingerprintEnrollment();
		User registerar = userRepository.findByUsername(userService.getUsername());
		fingerprintEnrollment.setRegisterar(registerar);
		fingerprintEnrollment.setCitizen(citizen);
		fingerprintEnrollment.setEnrolled(false);
		fingerprintEnrollmentRepository.save(fingerprintEnrollment);

		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}

	@DeleteMapping("/api/citizens/fingerprint/cancelenrollment")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SUPER_USER')  OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING')")
	@Transactional
	public void cancelFingerprintRegisteration() {
		fingerprintEnrollmentRepository.deleteByRegisterarUsername(userService.getUsername());
	}

	// After step1 enrollment, the web application send this request each interval
	// time to check if fingerprint is enrolled by fingerprint desktop application
	// or not
	// This API is called from Web Applicaton
	@GetMapping("/api/citizens/{citizenId}/fingerprint/isenrolled")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SUPER_USER')  OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING')")
	@Transactional
	public ResponseEntity<FingerprintEnrollment> isCitizenfigerprintEnrolled(@PathVariable long citizenId) {

		FingerprintEnrollment fingerprintEnrollment = fingerprintEnrollmentRepository
				.findByRegisterarUsername(userService.getUsername());

		if (fingerprintEnrollment == null) {
			throw new ResourceNotFoundException(
					"No previous request has been issued for registering citizen fingerprint");
		}

		if (fingerprintEnrollment.isEnrolled()) {
			fingerprintEnrollmentRepository.deleteByRegisterarUsername(userService.getUsername());
		}
		return new ResponseEntity<FingerprintEnrollment>(fingerprintEnrollment, HttpStatus.OK);
	}

	// this API is called by fingerprint desktop application to get the next
	// enrollment request
	@GetMapping("/api/fingerprint/getnextenrollment")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SUPER_USER')  OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING')")
	public ResponseEntity<FingerprintEnrollment> getNextEnrollment() {

		FingerprintEnrollment fingerprintEnrollment = fingerprintEnrollmentRepository
				.findByRegisterarUsername(userService.getUsername());

		if (fingerprintEnrollment == null || fingerprintEnrollment.isEnrolled()) {
			return null;
		}
		return new ResponseEntity<FingerprintEnrollment>(fingerprintEnrollment, HttpStatus.OK);
	}

	// this API is called by fingerprint desktop application to update enrollment
	// status
	// fingerprint template
	@PostMapping("/api/citizens/fingerprint/updateenrollmentMessage")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SUPER_USER')  OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING')")
	@Transactional
	public FingerprintEnrollment updateEnrollmentStatusMessage(@RequestBody String message) {

		FingerprintEnrollment fingerprintEnrollment = fingerprintEnrollmentRepository
				.findByRegisterarUsername(userService.getUsername());

		if (fingerprintEnrollment == null) {
			throw new ResourceNotFoundException("No Enrollment Request Existing");
		}
		fingerprintEnrollment.setMessage(message);
		return fingerprintEnrollmentRepository.save(fingerprintEnrollment);

	}

	// this API is called by fingerprint desktop application to register citizen
	// fingerprint template
	@PostMapping("/api/citizens/{citizenId}/fingerprint/enrollmentstep2")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SUPER_USER')  OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING')")
	@Transactional
	public ResponseEntity<String> registerCitizenFingerprintStep2(@PathVariable long citizenId,
			@Valid @RequestBody Fingerprint fingerprint, Authentication authentication) {

		Citizen citizen = citizenRepository.findByZoneIdAndId(userService.getUserZoneId(), citizenId);
		if (citizen == null)
			throw new ResourceNotFoundException("The citizen is not exisitng");

		Fingerprint existingFingerprint = fingerprintRepository.findByCitizenId(citizenId);

		if (existingFingerprint != null) {

			boolean canUpdateCitizenFingerprint = false;
			for (GrantedAuthority authority : authentication.getAuthorities()) {
				if (authority.getAuthority().equals("ROLE_ADMIN")
						|| authority.getAuthority().equals("ROLE_SUPER_USER")) {
					canUpdateCitizenFingerprint = true;
				}
			}
			if (canUpdateCitizenFingerprint) {
				throw new ResourceAccessException("تم تسجيل البصمة لهذا المواطن من قبل.. و ليس لديك الصلاحية للتعديل");
			}
			existingFingerprint.setModifiedBy(userService.getUsername());
			existingFingerprint.setModifiedDate(new Date());
		} else {
			fingerprint.setCitizen(citizen);
			fingerprint.setCreatedDate(new Date());
			fingerprintRepository.save(fingerprint);
		}

		FingerprintEnrollment fingerprintEnrollment = fingerprintEnrollmentRepository
				.findByRegisterarUsername(userService.getUsername());

		if (fingerprintEnrollment == null) {
			throw new ResourceNotFoundException("No Enrollment Request Existing");
		}
		fingerprintEnrollment.setEnrolled(true);
		fingerprintEnrollmentRepository.save(fingerprintEnrollment);

		return new ResponseEntity<String>("Citizen Fingerprint is enrolled successfully", HttpStatus.OK);
	}

	///////////////////////// VERIFYING CITIZEN FINGERPRINT /////////////////

	// request verifying citizen fingerprint template - Step1 of Verifying
	// This API is called from Web Applicaton
	@PostMapping("/api/citizens/{citizenId}/fingerprint/verifystep1")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SUPER_USER') OR hasRole('ROLE_EYE_REVEAL') OR hasRole('ROLE_BONES_REVEAL')")
	@Transactional
	public ResponseEntity<Boolean> verifyCitizenFingerprintStep1(@PathVariable long citizenId) {

		// check if this citizen has registered fingerprint or not
		Fingerprint fingerprint = fingerprintRepository.findByCitizenId(citizenId);
		if (fingerprint == null)
			throw new ResourceNotFoundException("لم يتم تسجيل بصمة لهذا المواطن من قبل");

		// delete previous verfication requests
		fingerprintVerificationRepository.deleteByVerifierUsername(userService.getUsername());

		// create new fingerprint verfication request.
		FingerprintVerification fingerprintVerfication = new FingerprintVerification();
		fingerprintVerfication.setFingerprint(fingerprint);
		fingerprintVerfication.setVerified(false);
		fingerprintVerfication.setVerifier(userRepository.findByUsername(userService.getUsername()));
		fingerprintVerificationRepository.save(fingerprintVerfication);

		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}

	@DeleteMapping("/api/citizens/fingerprint/cancelverifification")
	@PreAuthorize("hasRole('ROLE_ADMIN')  OR hasRole('ROLE_SUPER_USER')  OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING')")
	@Transactional
	public void cancelFingerprintVerification() {
		fingerprintVerificationRepository.deleteByVerifierUsername(userService.getUsername());
	}

	// After step1 verification, the web application send this request each interval
	// time to check if fingerprint is verified by fingerprint desktop application
	// or not
	// This API is called from Web Applicaton
	@GetMapping("/api/citizens/{citizenId}/fingerprint/isverified")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SUPER_USER') OR hasRole('ROLE_EYE_REVEAL') OR hasRole('ROLE_BONES_REVEAL')")
	@Transactional
	public ResponseEntity<Boolean> isCitizenfigerprintVerified(@PathVariable long citizenId) {

		FingerprintVerification fingerprintVerfication = fingerprintVerificationRepository
				.findByFingerprintCitizenIdAndVerifierUsername(citizenId, userService.getUsername());

		if (fingerprintVerfication == null) {
			throw new ResourceNotFoundException(
					"No previous request has been issued for verifying citizen fingerprint");
		}

		if (fingerprintVerfication.isVerified() == null) {
			// still not determined if verified or not.
			return null;
		}
		fingerprintVerificationRepository.deleteByVerifierUsername(userService.getUsername());
		return new ResponseEntity<Boolean>(fingerprintVerfication.isVerified(), HttpStatus.OK);
	}

	// this API is called by fingerprint desktop application to get the next
	// verification request
	@GetMapping("/api/fingerprint/getnextverification")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SUPER_USER') OR hasRole('ROLE_EYE_REVEAL') OR hasRole('ROLE_BONES_REVEAL')")
	public ResponseEntity<FingerprintVerification> getNextVerification() {

		FingerprintVerification fingerprintVerfication = fingerprintVerificationRepository
				.findByVerifierUsername(userService.getUsername());

		if (fingerprintVerfication == null || fingerprintVerfication.isVerified()) {
			return null;
		}
		return new ResponseEntity<FingerprintVerification>(fingerprintVerfication, HttpStatus.OK);
	}

	// this API is called by fingerprint desktop application to register citizen
	// fingerprint template
	@PostMapping("/api/citizens/{citizenId}/fingerprint/verifystep2")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SUPER_USER') OR hasRole('ROLE_EYE_REVEAL') OR hasRole('ROLE_BONES_REVEAL')")
	@Transactional
	public ResponseEntity<?> verifyCitizenFingerprintStep2(@PathVariable long citizenId,
			@RequestBody Boolean verified) {
		FingerprintVerification fingerprintVerfication = fingerprintVerificationRepository
				.findByVerifierUsername(userService.getUsername());

		if (fingerprintVerfication == null
				|| fingerprintVerfication.getFingerprint().getCitizen().getId() != citizenId) {
			throw new ResourceNotFoundException("No Verification Request is issued for this citizen");
		}

		fingerprintVerfication.setVerified(verified);
		fingerprintVerificationRepository.save(fingerprintVerfication);

		return ResponseEntity.ok().build();
	}
}
