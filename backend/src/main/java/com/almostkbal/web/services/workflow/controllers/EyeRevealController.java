package com.almostkbal.web.services.workflow.controllers;

import java.util.Date;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.almostkbal.web.services.workflow.auth.UserService;
import com.almostkbal.web.services.workflow.entities.Audit;
import com.almostkbal.web.services.workflow.entities.EyeReveal;
import com.almostkbal.web.services.workflow.entities.EyeRevealSetting;
import com.almostkbal.web.services.workflow.entities.EyeRevealState;
import com.almostkbal.web.services.workflow.entities.Request;
import com.almostkbal.web.services.workflow.exceptions.IllegalRequestStateException;
import com.almostkbal.web.services.workflow.repositories.AuditRepository;
import com.almostkbal.web.services.workflow.repositories.EyeRevealRepository;
import com.almostkbal.web.services.workflow.repositories.EyeRevealSettingRepository;
import com.almostkbal.web.services.workflow.repositories.FingerprintVerificationRepository;
import com.almostkbal.web.services.workflow.repositories.RequestRepository;

//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins = "*")
@RestController
public class EyeRevealController {
	@Autowired
	private EyeRevealRepository eyeRevealRepository;

	@Autowired
	private RequestRepository requestRepository;

	@Autowired
	private EyeRevealSettingRepository eyeRevealSettingRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private AuditRepository auditRepository;

	@Autowired
	private FingerprintVerificationRepository fingerprintVerificationRepository;

	@GetMapping("/api/requests/{id}/eye-reveal")
//	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_EYE_REVEAL') OR hasRole('ROLE_REQUEST_REVIEWING')  OR hasRole('ROLE_EYE_REVEAL_RESULT_REGISTERING')")
	public EyeReveal retrieveRequestEyeReveal(@PathVariable long id) {
		if (!requestRepository.existsById(id)) {
			throw new ResourceNotFoundException("هذا الطلب غير موجود");
		}
		return eyeRevealRepository.findByRequestId(id);
	}

	@PostMapping("/api/requests/{id}/eye-reveal")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_EYE_REVEAL')")
	@Transactional
	public ResponseEntity<EyeReveal> addRequestEyeReveal(
			@RequestParam(name = "force", required = false, defaultValue = "false") Boolean force,
			@PathVariable long id, @RequestBody EyeReveal eyeReveal, Authentication authentication) {
		Optional<Request> request = requestRepository.findById(id);

		if (!request.isPresent()) {
			throw new ResourceNotFoundException("هذا الطلب غير موجود");
		}

		if (request.get().getEyeRevealState() != EyeRevealState.PENDING_REVEAL) {
			throw new IllegalRequestStateException(new Date(), "عفوا هذا الطلب ليس في مرحلة كشف النظر",
					"عفوا هذا الطلب ليس في مرحلة كشف النظر");
		}

//		FingerprintVerification fingerprintVerfication = fingerprintVerificationRepository
//				.findByVerifierUsername(userService.getUsername());
//
//		if (fingerprintVerfication == null) {
//			throw new ResourceNotFoundException("لم يتم التحقق من بصمة المواطن");
//		}
//
//		boolean skipFingerprintVerification = false;
//		if (!fingerprintVerfication.isVerified()) {
//			for (GrantedAuthority authority : authentication.getAuthorities()) {
//				if (authority.getAuthority().equals("ROLE_ADMIN")) {
//					skipFingerprintVerification = true;
//				}
//			}
//		}
//		if (skipFingerprintVerification) {
//			throw new ResourceNotFoundException("لم يتم التحقق من بصمة المواطن");
//		}

		eyeReveal.setRequest(request.get());
		EyeReveal savedEyeReveal = eyeRevealRepository.save(eyeReveal);
		if (eyeReveal.getRevealDone() == 1) {
			requestRepository.setEyeRevealState(id, EyeRevealState.PENDING_REGISTERING);
		}
		// auditing

		String action = "تسجيل حضور مواطن لكشف الرمد";
		StringBuilder details = new StringBuilder("");
		details.append("لا يوجد");
		String performedBy = authentication.getName();
		Audit audit = new Audit(action, details.toString(), id, performedBy, userService.getUserZoneId());
		auditRepository.save(audit);
		return new ResponseEntity<EyeReveal>(savedEyeReveal, HttpStatus.OK);

	}

	@PutMapping("/api/requests/{requestId}/eye-reveal/{bonesRevealId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_EYE_REVEAL_RESULT_REGISTERING') OR hasRole('ROLE_REQUEST_REVIEWING')")
	public ResponseEntity<EyeReveal> updateRequestEyeReveal(@PathVariable long requestId,
			@PathVariable long bonesRevealId, @Valid @RequestBody EyeReveal eyeReveal, Authentication authentication) {

		if (!requestRepository.existsById(requestId))
			throw new ResourceNotFoundException("هذا الطلب غير موجود");

		if (!eyeRevealRepository.existsById(bonesRevealId)) {
			throw new ResourceNotFoundException("عفوا لم يتم كشف رمد لهذا المواطن");
		}

		EyeRevealSetting setting = eyeRevealSettingRepository
				.findByRightMeasureAndLeftMeasureAndUseGlassesAndDistinguishColorAndSquint(eyeReveal.getRightEye(),
						eyeReveal.getLeftEye(), eyeReveal.getUseGlasses(), eyeReveal.getDistinguishColor(),
						eyeReveal.getSquint());

		if (setting == null) {
			throw new ResourceNotFoundException("عفوا لا توجد اعدادات كشف رمد لهذه البيانات");
		} else {
			eyeReveal.setResult(setting.getResult());
		}

		Request request = new Request();
		request.setId(requestId);
		eyeReveal.setRequest(request);

		EyeReveal savedEyeReveal = eyeRevealRepository.save(eyeReveal);

		if (eyeReveal.getRevealDone() == 1) {
			requestRepository.setEyeRevealState(requestId, EyeRevealState.DONE);
		}

		// auditing
		String action = "تسجيل بيانات كشف رمد";
		StringBuilder details = new StringBuilder("");
		details.append("نتيجة الكشف");
		details.append(" : " + savedEyeReveal.getResult());
		String performedBy = authentication.getName();
		Audit audit = new Audit(action, details.toString(), requestId, performedBy, userService.getUserZoneId());
		auditRepository.save(audit);
		return new ResponseEntity<EyeReveal>(savedEyeReveal, HttpStatus.OK);

	}

}
