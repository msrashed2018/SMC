package com.almostkbal.web.services.workflow.controllers;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.almostkbal.web.services.workflow.auth.UserService;
import com.almostkbal.web.services.workflow.entities.Audit;
import com.almostkbal.web.services.workflow.entities.Request;
import com.almostkbal.web.services.workflow.entities.RequestPayment;
import com.almostkbal.web.services.workflow.entities.RequestState;
import com.almostkbal.web.services.workflow.repositories.AuditRepository;
import com.almostkbal.web.services.workflow.repositories.RequestPaymentRepository;
import com.almostkbal.web.services.workflow.repositories.RequestRepository;

//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins = "*")
@RestController
public class RequestPaymentController {
	@Autowired
	private RequestPaymentRepository requestPaymentRepository;

	@Autowired
	private RequestRepository requestRepository;

	@Autowired
	private AuditRepository auditRepository;

	@Autowired
	private UserService userService;
	
	@GetMapping("/api/requests/{id}/payment")
//	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_REQUEST_REVIEWING') OR hasRole('ROLE_PAYMENTS_REGISTRATION')")
	public RequestPayment retrieveRequestRequestPayment(@PathVariable long id) {
		if (!requestRepository.existsById(id)) {
			throw new ResourceNotFoundException("هذا الطلب غير موجود");
		}
		return requestPaymentRepository.findByRequestId(id);
	}

	@PostMapping("/api/requests/{id}/payment")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_REQUEST_REVIEWING') OR hasRole('ROLE_PAYMENTS_REGISTRATION')")
	public ResponseEntity<RequestPayment> addRequestPayment(@PathVariable long id,
			@Valid @RequestBody RequestPayment requestPayment, Authentication authentication) {

		
		if (!requestRepository.existsById(id)) {
			throw new ResourceNotFoundException("هذا الطلب غير موجود");
		}
		Request request = new Request();
		request.setId(id);
		if (requestPayment.getPaymentDone() == 1) {
			requestRepository.setRequestState(id, RequestState.PENDING_CONTINUE_REGISTERING);
		}
		requestPayment.setRequest(request);
		RequestPayment savedRequestPayment = requestPaymentRepository.save(requestPayment);
		
		
		// auditing
		String action = "تسجيل مدفوعات طلب";
		StringBuilder details = new StringBuilder("");
		details.append(" المبلغ ");
		details.append(" : "+ savedRequestPayment.getPrice());
		details.append(" رقم الايصال ");
		details.append(" : "+ savedRequestPayment.getReceiptSerialNumber());
		String performedBy = authentication.getName();
		Audit audit = new Audit(action, details.toString(), id, performedBy, userService.getUserZoneId());
		auditRepository.save(audit);

		return new ResponseEntity<RequestPayment>(savedRequestPayment, HttpStatus.OK);

	}
	
//	@PutMapping("/api/requests/{id}/payment")
//	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_REQUEST_REVIEWING') OR hasRole('ROLE_PAYMENTS_REGISTRATION')")
//	public ResponseEntity<RequestPayment> editRequestPayment(@PathVariable long id,
//			@Valid @RequestBody RequestPayment requestPayment, Authentication authentication) {
//
//		
//		if (!requestRepository.existsById(id)) {
//			throw new ResourceNotFoundException("هذا الطلب غير موجود");
//		}
//		Request request = new Request();
//		request.setId(id);
//		if (requestPayment.getPaymentDone() == 1) {
//			requestRepository.setRequestState(id, RequestState.PENDING_CONTINUE_REGISTERING);
//		}
//		requestPayment.setRequest(request);
//		RequestPayment savedRequestPayment = requestPaymentRepository.save(requestPayment);
//		
//		
//		// auditing
//		String action = "تسجيل مدفوعات طلب";
//		StringBuilder details = new StringBuilder("");
//		details.append(" المبلغ ");
//		details.append(" : "+ savedRequestPayment.getPrice());
//		details.append(" رقم الايصال ");
//		details.append(" : "+ savedRequestPayment.getReceiptSerialNumber());
//		String performedBy = authentication.getName();
//		Audit audit = new Audit(action, details.toString(), id, performedBy, userService.getUserZoneId());
//		auditRepository.save(audit);
//
//		return new ResponseEntity<RequestPayment>(savedRequestPayment, HttpStatus.OK);
//
//	}

}
