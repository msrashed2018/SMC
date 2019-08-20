package com.almostkbal.web.services.workflow.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.almostkbal.web.services.workflow.auth.UserService;
import com.almostkbal.web.services.workflow.entities.Audit;
import com.almostkbal.web.services.workflow.entities.Citizen;
import com.almostkbal.web.services.workflow.entities.Zone;
import com.almostkbal.web.services.workflow.exceptions.CitizenValidationException;
import com.almostkbal.web.services.workflow.repositories.AuditRepository;
import com.almostkbal.web.services.workflow.repositories.CitizenRepository;

//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins = "*")
@RestController
public class CitizenController {
	@Autowired
	private CitizenRepository citizenRepository;

	@Autowired
	private AuditRepository auditRepository;

	@Autowired
	private UserService userService;

	@GetMapping("/api/citizens")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SUPER_USER')  OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING') OR hasRole('ROLE_CITIZENS_REQUESTS_VIEWING') OR hasRole('ROLE_CITIZENS_DATA_EDITING')")
	public Page<Citizen> retrieveAllCitizens(@RequestParam("page") int page, @RequestParam("size") int size) {

		return citizenRepository.findByZoneId(userService.getUserZoneId(),
				PageRequest.of(page, size, Sort.by("createdDate").ascending().and(Sort.by("id").ascending())));
	}

	@GetMapping("/api/citizens/search/findCitizensBySearchKey")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SUPER_USER')  OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING') OR hasRole('ROLE_CITIZENS_REQUESTS_VIEWING') OR hasRole('ROLE_CITIZENS_DATA_EDITING')")
	public Page<Citizen> findCitizensBySearchKey(@RequestParam String searchKey, @RequestParam("page") int page,
			@RequestParam("size") int size) {
		// check if searchKey is number or string
		try {
			Long key = Long.parseLong(searchKey);

			// No Thrown exception, so searchKey is number
			// check if it is national id or mobile number
			if (searchKey.startsWith("01")) {
				// search key is mobile number because it starts with 01
				return citizenRepository.findByZoneIdAndMobileNumber(userService.getUserZoneId(), searchKey, PageRequest.of(page, size, Sort.by("createdDate").descending().and(Sort.by("id"))));
			} else {
				// assuming search key is national id
				
				return citizenRepository.findByZoneIdAndNationalId(userService.getUserZoneId(), key, PageRequest.of(page, size, Sort.by("createdDate").descending().and(Sort.by("id"))));
			}
		} catch (NumberFormatException | NullPointerException nfe) {
			if(searchKey.contains(":")) {
				String startDate = searchKey.split(":")[0];
				String endDate = searchKey.split(":")[1];
				Calendar start = Calendar.getInstance();
				Calendar end = Calendar.getInstance();
				try {
					formatDates(start, end, startDate, endDate);
				} catch (Exception e) {
					e.printStackTrace();
					return null;
				}
				Date createdDateStart = start.getTime();
				Date createdDateEnd = end.getTime();
				return citizenRepository.findByZoneIdAndCreatedDateBetween(userService.getUserZoneId(), createdDateStart, createdDateEnd, PageRequest.of(page, size, Sort.by("createdDate").descending().and(Sort.by("id"))));
				
			}if (searchKey.contains("-")) {
				// search key is date

				try {
					Calendar start = Calendar.getInstance();
					Calendar end = Calendar.getInstance();

					formatDates(start, end, searchKey, searchKey);
					Date createdDateStart = start.getTime();
					Date createdDateEnd = end.getTime();
					return citizenRepository.findByZoneIdAndCreatedDateBetween(userService.getUserZoneId(), createdDateStart, createdDateEnd, PageRequest.of(page, size, Sort.by("createdDate").descending().and(Sort.by("id"))));
				} catch (Exception e) {
					e.printStackTrace();
					return null;
				}
				
			} else {
				return citizenRepository.findByZoneIdAndNameContaining(userService.getUserZoneId(), searchKey, PageRequest.of(page, size, Sort.by("createdDate").descending().and(Sort.by("id"))));
			}

		}

	}

	@GetMapping("/api/citizens/{id}")
	public Citizen retrieveCitizenById(@PathVariable long id) {
		Optional<Citizen> citizen = citizenRepository.findById(id);
		if (!citizen.isPresent())
			throw new ResourceNotFoundException("id-" + id);
//		Resource<Citizen> resource = new Resource<Citizen>(citizen.get());
		return citizen.get();
	}

	@DeleteMapping("/api/citizens/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SUPER_USER')  OR hasRole('ROLE_REQUEST_REVIEWING') OR hasRole('ROLE_CITIZENS_DATA_EDITING')")
	public void deleteCitizen(@PathVariable long id) {
		try {
			Optional<Citizen> citizen = citizenRepository.findById(id);
			if (!citizen.isPresent())
				throw new ResourceNotFoundException("id-" + id);

			citizenRepository.deleteById(id);

			// auditing
			String action = "مسح بيانات مواطن";
			StringBuilder details = new StringBuilder("");
			details.append(" اسم المواطن : ");
			details.append(citizen.get().getName());
			details.append(" الرقم القومي : ");
			details.append(citizen.get().getNationalId());
			String performedBy = userService.getUsername();
			Audit audit = new Audit(action, details.toString(), 0l, performedBy, userService.getUserZoneId());
			auditRepository.save(audit);
		} catch (EmptyResultDataAccessException ex) {
			throw new ResourceNotFoundException("id-" + id);
		}
	}

	@PostMapping("/api/citizens")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SUPER_USER')  OR hasRole('ROLE_CITIZEN_REQUEST_REGISTERING')")
	public Object createCitizen(@Valid @RequestBody Citizen citizen, Authentication authentication) {
		Citizen savedCitizen = null;
		try {
			Zone zone = new Zone();
			zone.setId(userService.getUserZoneId());
			citizen.setZone(zone);
			
			citizen.setCreatedBy(userService.getUsername());
			citizen.setCreatedDate(new Date());
			savedCitizen = citizenRepository.save(citizen);

			// auditing
			String action = "تسجيل مواطن جديد";
			StringBuilder details = new StringBuilder("");
			details.append(" اسم المواطن : ");
			details.append(savedCitizen.getName());
			details.append(" الرقم القومي : ");
			details.append(savedCitizen.getNationalId());
			String performedBy = authentication.getName();
			Audit audit = new Audit(action, details.toString(), 0l, performedBy, userService.getUserZoneId());
			auditRepository.save(audit);

			return savedCitizen;
		} catch (DataIntegrityViolationException ex) {
			throw new CitizenValidationException("هذا الرقم القومي يوجد بالفعل");

		}
	}

	@PutMapping("/api/citizens/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SUPER_USER')  OR hasRole('ROLE_REQUEST_REVIEWING') OR hasRole('ROLE_CITIZENS_DATA_EDITING')")
	public ResponseEntity<Citizen> updateCitizen(@PathVariable long id, @Valid @RequestBody Citizen citizen,
			Authentication authentication) {

		if (!citizenRepository.existsById(id))
			throw new ResourceNotFoundException("id-" + id);
//		citizenRepository.deleteById(id);

		Citizen updatedCitzen = null;

		try {
			Zone zone = new Zone();
			zone.setId(userService.getUserZoneId());
			citizen.setZone(zone);

			citizen.setModifiedDate(new Date());
			citizen.setModifiedBy(userService.getUsername());
			
			updatedCitzen = citizenRepository.save(citizen);

			// auditing
			String action = "تعديل بيانات مواطن";
			StringBuilder details = new StringBuilder("");
			details.append(" اسم المواطن : ");
			details.append(updatedCitzen.getName());
			details.append(" الرقم القومي : ");
			details.append(updatedCitzen.getNationalId());
			String performedBy = authentication.getName();
			Audit audit = new Audit(action, details.toString(), 0l, performedBy, userService.getUserZoneId());
			auditRepository.save(audit);

			return new ResponseEntity<Citizen>(updatedCitzen, HttpStatus.OK);
		} catch (DataIntegrityViolationException ex) {
			throw new CitizenValidationException("هذا الرقم القومي يوجد بالفعل");

		}

	}
	
	public void formatDates(Calendar start, Calendar end, String startDate, String endDate) throws ParseException {

		// creating a date object with specifed time.

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
		start.setTime(sdf.parse(startDate));
		start.set(Calendar.HOUR_OF_DAY, 0);
		start.set(Calendar.MINUTE, 0);
		start.set(Calendar.SECOND, 0);
		start.set(Calendar.MILLISECOND, 0);

		end.setTime(sdf.parse(endDate));
		end.set(Calendar.HOUR_OF_DAY, 23);
		end.set(Calendar.MINUTE, 59);
		end.set(Calendar.SECOND, 59);
		end.set(Calendar.MILLISECOND, 0);

	}
}
