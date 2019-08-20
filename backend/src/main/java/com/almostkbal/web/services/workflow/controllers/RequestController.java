package com.almostkbal.web.services.workflow.controllers;

import java.util.Calendar;
import java.util.Date;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.almostkbal.web.services.workflow.dto.RequestResultDto;
import com.almostkbal.web.services.workflow.entities.BonesRevealState;
import com.almostkbal.web.services.workflow.entities.EyeRevealState;
import com.almostkbal.web.services.workflow.entities.Request;
import com.almostkbal.web.services.workflow.entities.RequestState;
import com.almostkbal.web.services.workflow.entities.RequestStatus;
import com.almostkbal.web.services.workflow.exceptions.IllegalRequestStateException;
import com.almostkbal.web.services.workflow.services.RequestService;

@CrossOrigin(origins = "*")
@RestController
public class RequestController {

	@Autowired
	private RequestService requestService;

	@GetMapping("/api/requests")
	public Page<Request> retrieveAllRequests(@RequestParam("page") int page, @RequestParam("size") int size) {

		return requestService.getAllRequests(
				PageRequest.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
	}

	@GetMapping("/api/requests/retrieveRequestResults")
	public Page<RequestResultDto> retrieveRequestResults(@RequestParam("requestStatusId") int requestStatusId,
			@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate,
			@RequestParam("page") int page, @RequestParam("size") int size) {
		
		return requestService.getRequestReults(requestStatusId, startDate, endDate, PageRequest.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
	}

	@GetMapping("/api/requests/retreiveByRequestStates")
	public Page<Request> retrieveAllRequestsByStates(@RequestParam RequestState state,
			@RequestParam BonesRevealState bonesRevealState, @RequestParam EyeRevealState eyeRevealState,
			@RequestParam("page") int page, @RequestParam("size") int size) {

		if (state == RequestState.PENDING_PAYMENT) {
			return requestService.getRequestsForPayment(
					PageRequest.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
		} else if (state == RequestState.PENDING_CONTINUE_REGISTERING) {
			return requestService.getRequestsForContinueRegistering(
					PageRequest.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
		} else if (state == RequestState.CONTINUE_REGISTERING_DONE) {
			if (bonesRevealState == BonesRevealState.NA) {
				if (eyeRevealState == EyeRevealState.PENDING_REGISTERING) {
					return requestService.getRequestsForEyeRevealResultRegistering(PageRequest.of(page, size,
							Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
				} else if (eyeRevealState == EyeRevealState.PENDING_REVEAL) {
					return requestService.getRequestsForEyeRevealAttending(PageRequest.of(page, size,
							Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
				} else {
					throw new IllegalRequestStateException(new Date(), "هذا الطلب غير صحيح",
							String.format("eye state must be one of %s or %s ", EyeRevealState.PENDING_REGISTERING,
									EyeRevealState.PENDING_REVEAL));
				}
			} else if (eyeRevealState == EyeRevealState.NA) {
				if (bonesRevealState == BonesRevealState.PENDING_REGISTERING) {
					return requestService.getRequestsForBonesRevealResultRegistering(PageRequest.of(page, size,
							Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
				} else if (bonesRevealState == BonesRevealState.PENDING_REVEAL) {
					return requestService.getRequestsForBonesRevealAttending(PageRequest.of(page, size,
							Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
				} else {
					throw new IllegalRequestStateException(new Date(), "هذا الطلب غير صحيح",
							String.format("bones state must be one of %s or %s ", BonesRevealState.PENDING_REGISTERING,
									BonesRevealState.PENDING_REVEAL));
				}
			} else if (bonesRevealState == BonesRevealState.DONE && eyeRevealState == EyeRevealState.DONE) {
				// for reviewing
				return requestService.getRequestsForReviewing(
						PageRequest.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
			} else {
				throw new IllegalRequestStateException(new Date(), "هذا الطلب غير صحيح",
						String.format("eye or bones state must be one of %s, %s, %s or %s ", BonesRevealState.NA,
								BonesRevealState.PENDING_REGISTERING, BonesRevealState.PENDING_REVEAL,
								BonesRevealState.DONE));
			}
		} else if (state == RequestState.REVIEWED) {
			return requestService.getRequestsForApproving(
					PageRequest.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
		} else if (state == RequestState.APPROVED) {
			return requestService.getApprovedRequests(
					PageRequest.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
		} else {
			throw new IllegalRequestStateException(new Date(), "هذا الطلب غير صحيح",
					String.format("request state must be one of %s, %s, %s, %s or %s ", RequestState.PENDING_PAYMENT,
							RequestState.PENDING_CONTINUE_REGISTERING, RequestState.REVIEWED, RequestState.APPROVED,
							RequestState.CONTINUE_REGISTERING_DONE));
		}
	}

	@GetMapping("/api/requests/search/findAllRequestsBySearchKey")
	public Page<Request> findAllRequestsBySearchKey(@RequestParam String searchKey, @RequestParam("page") int page,
			@RequestParam("size") int size) {
		return requestService.getAllRequestsBySearchKey(searchKey,
				PageRequest.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
	}

	@GetMapping("/api/requests/search/findByStatesAndSearchKey")
	public Page<Request> findByNationalId(@RequestParam RequestState state,
			@RequestParam BonesRevealState bonesRevealState, @RequestParam EyeRevealState eyeRevealState,
			@RequestParam String searchKey, @RequestParam("page") int page, @RequestParam("size") int size) {

		if (state == RequestState.PENDING_PAYMENT) {
			return requestService.getRequestsBySearchKeyForPayment(searchKey,
					PageRequest.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
		} else if (state == RequestState.PENDING_CONTINUE_REGISTERING) {
			return requestService.getRequestsBySearchKeyForContinueRegistering(searchKey,
					PageRequest.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
		} else if (state == RequestState.CONTINUE_REGISTERING_DONE) {
			if (bonesRevealState == BonesRevealState.NA) {
				if (eyeRevealState == EyeRevealState.PENDING_REGISTERING) {
					return requestService.getRequestsBySearchKeyForEyeRevealResultRegistering(searchKey, PageRequest
							.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
				} else if (eyeRevealState == EyeRevealState.PENDING_REVEAL) {
					return requestService.getRequestsBySearchKeyForEyeRevealAttending(searchKey, PageRequest.of(page,
							size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
				} else {
					throw new IllegalRequestStateException(new Date(), "هذا الطلب غير صحيح",
							String.format("eye state must be one of %s or %s ", EyeRevealState.PENDING_REGISTERING,
									EyeRevealState.PENDING_REVEAL));
				}
			} else if (eyeRevealState == EyeRevealState.NA) {
				if (bonesRevealState == BonesRevealState.PENDING_REGISTERING) {
					return requestService.getRequestsBySearchKeyForBonesRevealResultRegistering(searchKey, PageRequest
							.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
				} else if (bonesRevealState == BonesRevealState.PENDING_REVEAL) {
					return requestService.getRequestsBySearchKeyForBonesRevealAttending(searchKey, PageRequest.of(page,
							size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
				} else {
					throw new IllegalRequestStateException(new Date(), "هذا الطلب غير صحيح",
							String.format("bones state must be one of %s or %s ", BonesRevealState.PENDING_REGISTERING,
									BonesRevealState.PENDING_REVEAL));
				}
			} else if (bonesRevealState == BonesRevealState.DONE && eyeRevealState == EyeRevealState.DONE) {
				// for reviewing
				return requestService.getRequestsBySearchKeyForReviewing(searchKey,
						PageRequest.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
			} else {
				throw new IllegalRequestStateException(new Date(), "هذا الطلب غير صحيح",
						String.format("eye or bones state must be one of %s, %s, %s or %s ", BonesRevealState.NA,
								BonesRevealState.PENDING_REGISTERING, BonesRevealState.PENDING_REVEAL,
								BonesRevealState.DONE));
			}
		} else if (state == RequestState.REVIEWED) {
			return requestService.getRequestsBySearchKeyForApproving(searchKey,
					PageRequest.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
		} else if (state == RequestState.APPROVED) {
			return requestService.getApprovedRequestsBySearchKey(searchKey,
					PageRequest.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
		} else {
			throw new IllegalRequestStateException(new Date(), "هذا الطلب غير صحيح",
					String.format("request state must be one of %s, %s, %s, %s or %s ", RequestState.PENDING_PAYMENT,
							RequestState.PENDING_CONTINUE_REGISTERING, RequestState.REVIEWED, RequestState.APPROVED,
							RequestState.CONTINUE_REGISTERING_DONE));
		}

	}

	@GetMapping("/api/citizens/{citizenId}/requests")
	public Page<Request> retrieveCitizenRequests(@PathVariable long citizenId, @RequestParam("page") int page,
			@RequestParam("size") int size) {
		return requestService.getCitizenRequests(citizenId,
				PageRequest.of(page, size, Sort.by("requestDate").ascending().and(Sort.by("id").ascending())));
	}

	@DeleteMapping("/api/citizens/{citizenId}/requests/{requestId}")
	public void deleteRequest(@PathVariable long citizenId, @PathVariable long requestId) {
		requestService.deleteRequest(citizenId, requestId);
	}

	@GetMapping("/api/requests/{id}")
	public Request retrieveRequestById(@PathVariable long id) {
		return requestService.getRequestById(id);
	}

	@PostMapping("/api/citizens/{citizenId}/requests")
	public Object createRequest(@PathVariable long citizenId, @Valid @RequestBody Request request) {
		// check if citizen already take request before
		return requestService.createRequest(citizenId, request);
	}

	@PutMapping("/api/citizens/{citizenId}/requests/{requestId}")
	public ResponseEntity<Request> continueRegisteringRequest(@PathVariable long citizenId,
			@PathVariable long requestId, @Valid @RequestBody Request request) {
		return requestService.continueRegisteringRequest(citizenId, requestId, request);
	}

	@PutMapping("/api/requests/{requestId}")
	public ResponseEntity<Request> editRequest(@PathVariable long requestId, @Valid @RequestBody Request request) {
		return requestService.editRequest(requestId, request);
	}

	@PutMapping("/api/citizens/{citizenId}/requests/{requestId}/updateStatus")
	public void updateRequestStatus(@PathVariable long citizenId, @PathVariable long requestId,
			@Valid @RequestBody RequestStatus requestStatus) {
		requestService.updateRequestStatus(citizenId, requestId, requestStatus);
	}

	@PutMapping("/api/requests/{requestId}/review")
	public void reviewRequest(@PathVariable long requestId, @RequestBody Request request) {

		requestService.reviewRequest(requestId, request);

	}

	@PutMapping("/api/requests/{requestId}/approve")
	public void approveRequest(@PathVariable long requestId, @RequestBody Request request) {
		requestService.approveRequest(requestId, request);

	}
}
