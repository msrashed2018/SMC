package com.almostkbal.web.services.workflow.controllers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.almostkbal.web.services.workflow.auth.UserService;
import com.almostkbal.web.services.workflow.entities.Audit;
import com.almostkbal.web.services.workflow.repositories.AuditRepository;

//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins = "*")
@RestController
@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_SYSTEM_TABLES_MAINTENANCE') ")
public class AuditController {
	@Autowired
	private AuditRepository auditRepository;

	@Autowired
	UserService userService;

	@GetMapping("/api/audits")
	public Page<Audit> retrieveAllAudits(@RequestParam("page") int page, @RequestParam("size") int size) {
		return auditRepository.findByZoneId(userService.getUserZoneId(), PageRequest.of(page, size, Sort.by("timestamp").descending().and(Sort.by("id").descending())));
	}

	@GetMapping("/api/audits/search/findBySearchKey")
	public Page<Audit> findBySearchKey(@RequestParam String searchKey, @RequestParam("page") int page,
			@RequestParam("size") int size) {
		// check if searchKey is number or string
		try {
			Long key = Long.parseLong(searchKey);
			// search key is request id 
			return auditRepository.findByZoneIdAndRequestId(userService.getUserZoneId(),key, PageRequest.of(page, size));
		} catch (NumberFormatException | NullPointerException nfe) {
			if (searchKey.contains("-")) {
				// search key is date
				DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
				try {
					Date timestamp = (Date) formatter.parse(searchKey);
					return auditRepository.findByZoneIdAndTimestampGreaterThan(userService.getUserZoneId(),timestamp, PageRequest.of(page, size));
				} catch (ParseException e) {
					e.printStackTrace();
					return null;
				}
			} else {
				//search key is performedBy 
				return auditRepository.findByZoneIdAndPerformedBy(userService.getUserZoneId(),searchKey, PageRequest.of(page, size));
			}

		}

//		return auditRepository.findAll(PageRequest.of(page, size));
	}

	@DeleteMapping("/api/audits/{id}")
	public void deleteAudit(@PathVariable long id) {
		try {
			auditRepository.deleteByIdAndZoneId(id, userService.getUserZoneId());
		} catch (EmptyResultDataAccessException ex) {
			throw new ResourceNotFoundException("id-" + id);
		}
	}

	@DeleteMapping("/api/audits")
	public void deleteAllAudits() {
		try {
			auditRepository.deleteAllInBatch();
		} catch (EmptyResultDataAccessException ex) {
			throw new ResourceNotFoundException("audits");
		}
	}

}
