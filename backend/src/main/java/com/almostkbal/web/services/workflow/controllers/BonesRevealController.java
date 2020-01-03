package com.almostkbal.web.services.workflow.controllers;

import java.util.Date;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.almostkbal.web.services.workflow.auth.UserService;
import com.almostkbal.web.services.workflow.entities.Audit;
import com.almostkbal.web.services.workflow.entities.BonesReveal;
import com.almostkbal.web.services.workflow.entities.BonesRevealState;
import com.almostkbal.web.services.workflow.entities.FingerprintVerification;
import com.almostkbal.web.services.workflow.entities.Request;
import com.almostkbal.web.services.workflow.exceptions.IllegalRequestStateException;
import com.almostkbal.web.services.workflow.repositories.AuditRepository;
import com.almostkbal.web.services.workflow.repositories.BonesRevealRepository;
import com.almostkbal.web.services.workflow.repositories.FingerprintVerificationRepository;
import com.almostkbal.web.services.workflow.repositories.RequestRepository;

//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins = "*")
@RestController
public class BonesRevealController {
	@Autowired
	private BonesRevealRepository bonesRevealRepository;

	@Autowired
	private RequestRepository requestRepository;

	@Autowired
	private AuditRepository auditRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private FingerprintVerificationRepository fingerprintVerificationRepository;
	@GetMapping("/api/requests/{id}/bones-reveal")
//	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_BONES_REVEAL') OR hasRole('ROLE_REQUEST_REVIEWING')  OR hasRole('ROLE_EYE_REVEAL_RESULT_REGISTERING')")
	public BonesReveal retrieveRequestBonesReveal(@PathVariable long id) {
		if (!requestRepository.existsById(id)) {
			throw new ResourceNotFoundException("هذا الطلب غير موجود");
		}
		return bonesRevealRepository.findByRequestId(id);
	}

	@PostMapping("/api/requests/{id}/bones-reveal")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_BONES_REVEAL')")
	public ResponseEntity<BonesReveal> addRequestBonesReveal(@PathVariable long id,
			@Valid @RequestBody BonesReveal bonesReveal, Authentication authentication) {

		Optional<Request> request = requestRepository.findById(id);
		
		if (!request.isPresent()) {
			throw new ResourceNotFoundException("هذا الطلب غير موجود");
		}
		if(request.get().getBonesRevealState() != BonesRevealState.PENDING_REVEAL) {
			throw new IllegalRequestStateException(new Date(), "عفوا هذا الطلب ليس في مرحلة كشف العظام", "عفوا هذا الطلب ليس في مرحلة كشف العظام");
		}

		FingerprintVerification fingerprintVerfication = fingerprintVerificationRepository
				.findByVerifierUsername(userService.getUsername());

		if (fingerprintVerfication == null) {
			throw new ResourceNotFoundException("لم يتم التحقق من بصمة المواطن");
		}
		boolean skipFingerprintVerification = false;
		if (!fingerprintVerfication.isVerified()) {
			for (GrantedAuthority authority : authentication.getAuthorities()) {
				if (authority.getAuthority().equals("ROLE_ADMIN")) {
					skipFingerprintVerification = true;
				}
			}
		}
		if (skipFingerprintVerification) {
			throw new ResourceNotFoundException("لم يتم التحقق من بصمة المواطن");
		}
		
		bonesReveal.setRequest(request.get());
		BonesReveal savedBonesReveal = bonesRevealRepository.save(bonesReveal);
		if (bonesReveal.getRevealDone() == 1) {
			requestRepository.setBonesRevealState(id, BonesRevealState.PENDING_REGISTERING);
		}

		// auditing
		String action = "تسجيل حضور مواطن لكشف العظام";
		StringBuilder details = new StringBuilder("");
		details.append("لا يوجد");
		String performedBy = authentication.getName();
		Audit audit = new Audit(action, details.toString(), id, performedBy, userService.getUserZoneId());
		auditRepository.save(audit);

		return new ResponseEntity<BonesReveal>(savedBonesReveal, HttpStatus.OK);

	}

//	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MEDICAL_REGISTERING')")
	@PutMapping("/api/requests/{requestId}/bones-reveal/{bonesRevealId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_BONES_REVEAL_RESULT_REGISTERING') OR hasRole('ROLE_REQUEST_REVIEWING')")
	public ResponseEntity<BonesReveal> registerBonesRevealData(@PathVariable long requestId,
			@PathVariable long bonesRevealId, @Valid @RequestBody BonesReveal bonesReveal,
			Authentication authentication) {

		if (!requestRepository.existsById(requestId))
			throw new ResourceNotFoundException("هذا الطلب غير موجود");

		if (!bonesRevealRepository.existsById(bonesRevealId)) {
			throw new ResourceNotFoundException("عفوا لم يتم كشف عظام لهذا المواطن");
		}
		Request request = new Request();
		request.setId(requestId);
		bonesReveal.setRequest(request);
		BonesReveal savedBonesReveal = bonesRevealRepository.save(bonesReveal);

		if (bonesReveal.getRevealDone() == 1) {
			requestRepository.setBonesRevealState(requestId, BonesRevealState.DONE);
		}
		// auditing
		String action = "تسجيل بيانات كشف عظام";
		StringBuilder details = new StringBuilder("");
		if (savedBonesReveal.getDisability() != null) {
			details.append(" نوع الاعاقة ");
			details.append(" : " + savedBonesReveal.getDisability().getName());

			details.append(" نوع التجهيزة ");
			details.append(" : " + savedBonesReveal.getDisability().getEquipment().getName());
		}
		details.append(" نتيجة الكشف ");
		details.append(" : " + savedBonesReveal.getResult());
		String performedBy = authentication.getName();
		Audit audit = new Audit(action, details.toString(), requestId, performedBy, userService.getUserZoneId());
		auditRepository.save(audit);

		return new ResponseEntity<BonesReveal>(savedBonesReveal, HttpStatus.OK);
	}
	
	
//	@PutMapping("/api/requests/{requestId}/bones-reveal/{bonesRevealId}")
//	@PreAuthorize("hasRole('ROLE_ADMIN') OR  hasRole('ROLE_REQUEST_REVIEWING')")
//	public ResponseEntity<BonesReveal> editBonesRevealData(@PathVariable long requestId,
//			@PathVariable long bonesRevealId, @Valid @RequestBody BonesReveal bonesReveal,
//			Authentication authentication) {
//
//		if (!requestRepository.existsById(requestId))
//			throw new ResourceNotFoundException("هذا الطلب غير موجود");
//
//		if (!bonesRevealRepository.existsById(bonesRevealId)) {
//			throw new ResourceNotFoundException("عفوا لم يتم كشف عظام لهذا المواطن");
//		}
//		Request request = new Request();
//		request.setId(requestId);
//		bonesReveal.setRequest(request);
//		BonesReveal savedBonesReveal = bonesRevealRepository.save(bonesReveal);
//
//		if (bonesReveal.getRevealDone() == 1) {
//			requestRepository.setBonesRevealState(requestId, BonesRevealState.DONE);
//		}
//		// auditing
//		String action = "تسجيل بيانات كشف عظام";
//		StringBuilder details = new StringBuilder("");
//		if (savedBonesReveal.getDisability() != null) {
//			details.append(" نوع الاعاقة ");
//			details.append(" : " + savedBonesReveal.getDisability().getName());
//
//			details.append(" نوع التجهيزة ");
//			details.append(" : " + savedBonesReveal.getDisability().getEquipment().getName());
//		}
//		details.append(" نتيجة الكشف ");
//		details.append(" : " + savedBonesReveal.getResult());
//		String performedBy = authentication.getName();
//		Audit audit = new Audit(action, details.toString(), requestId, performedBy, userService.getUserZoneId());
//		auditRepository.save(audit);
//
//		return new ResponseEntity<BonesReveal>(savedBonesReveal, HttpStatus.OK);
//	}

}
