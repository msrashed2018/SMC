package com.almostkbal.web.services.workflow.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.almostkbal.web.services.workflow.dto.RequestResultDto;
import com.almostkbal.web.services.workflow.entities.Request;
import com.almostkbal.web.services.workflow.entities.RequestStatus;

public interface RequestService {

	Page<Request> getRequestsForPayment(Pageable pageable);
	
	Page<Request> getRequestsForContinueRegistering(Pageable pageable);
	
	Page<Request> getRequestsForEyeRevealAttending(Pageable page);

	Page<Request> getRequestsForEyeRevealResultRegistering(Pageable page);
	
	Page<Request> getRequestsForBonesRevealResultRegistering(Pageable pageable);

	Page<Request> getRequestsForBonesRevealAttending(Pageable pageable);
	
	Page<Request> getRequestsForReviewing(Pageable pageable);
	
	Page<Request> getRequestsForApproving(Pageable pageable);
	
	Page<Request> getApprovedRequests(Pageable pageable);
	
	Page<Request> getRequestsBySearchKeyForPayment(String searchKey, Pageable pageable);
	
	Page<Request> getRequestsBySearchKeyForContinueRegistering(String searchKey, Pageable pageable);
	
	Page<Request> getRequestsBySearchKeyForEyeRevealAttending(String searchKey, Pageable page);

	Page<Request> getRequestsBySearchKeyForEyeRevealResultRegistering(String searchKey, Pageable page);
	
	Page<Request> getRequestsBySearchKeyForBonesRevealResultRegistering(String searchKey, Pageable pageable);

	Page<Request> getRequestsBySearchKeyForBonesRevealAttending(String searchKey, Pageable pageable);
	
	Page<Request> getRequestsBySearchKeyForReviewing(String searchKey, Pageable pageable);
	
	Page<Request> getRequestsBySearchKeyForApproving(String searchKey, Pageable pageable);
	
	Page<Request> getApprovedRequestsBySearchKey(String searchKey, Pageable pageable);
	
	Page<Request> getAllRequests(Pageable pageable);

	Page<Request> getAllRequestsBySearchKey(String searchKey, Pageable pageable);

	Page<RequestResultDto> getRequestReults(int requestTypeId,String startDate, String endDate, Pageable pageable);
	
//	List<Request> findByNationalId(RequestState state, BonesRevealState bonesRevealState, EyeRevealState eyeRevealState,
//			long nationalId);

	Page<Request> getCitizenRequests(long citizenId, Pageable pageable);

	void deleteRequest(long citizenId, long requestId);

	Request getRequestById(long requestId);

	Object createRequest(long citizenId, Request request);

	ResponseEntity<Request> continueRegisteringRequest(long citizenId, long requestId, Request request);

	ResponseEntity<Request> editRequest(long requestId, Request request);
	
	void updateRequestStatus(long citizenId, long requestId, RequestStatus requestStatus);

	void reviewRequest(long requestId, Request request);

	void approveRequest(long requestId, Request request);


}
