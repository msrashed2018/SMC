package com.almostkbal.web.services.workflow.controllers;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.almostkbal.web.services.workflow.entities.DocumentCategory;
import com.almostkbal.web.services.workflow.entities.DocumentType;
import com.almostkbal.web.services.workflow.entities.Request;
import com.almostkbal.web.services.workflow.entities.RequestDocument;
import com.almostkbal.web.services.workflow.exceptions.ExceptionResponse;
import com.almostkbal.web.services.workflow.repositories.DocumentTypeRepository;
import com.almostkbal.web.services.workflow.repositories.RequestDocumentRepository;
import com.almostkbal.web.services.workflow.repositories.RequestRepository;
import com.almostkbal.web.services.workflow.services.impl.StorageServiceImpl;
import com.google.common.net.HttpHeaders;

//@CrossOrigin(origins="http://192.168.0.100:4200")
@CrossOrigin(origins = "*")
@RestController
public class RequestDocumentController {

	@Autowired
	StorageServiceImpl storageService;

	@Autowired
	RequestDocumentRepository documentRepository;

	@Autowired
	DocumentTypeRepository documentTypeRepository;

	@Autowired
	RequestRepository requestRepository;
	Logger log = LoggerFactory.getLogger(this.getClass().getName());

	@PostMapping(value = "/api/requests/{id}/documents" /* consumes = "application/pdf" */)
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_REQUEST_CONTINUE_REGISTERING') OR hasRole('ROLE_EYE_REVEAL_RESULT_REGISTERING') OR hasRole('ROLE_BONES_REVEAL_RESULT_REGISTERING')")
	public ResponseEntity<String> uploadRequestDocument(@PathVariable long id, @RequestParam long documentTypeId,
			@RequestParam("file") MultipartFile file) {
		String message = "";
		String currentUploadFileName = "";
		try {

			if (!requestRepository.existsById(id)) {
				throw new ResourceNotFoundException("هذا الطلب غير موجود");
			}

			Optional<DocumentType> documentType = documentTypeRepository.findById(documentTypeId);
			if (!documentType.isPresent()) {
				throw new ResourceNotFoundException("نوع الملف غير موجود");
			}

			Request request = new Request();
			request.setId(id);

			currentUploadFileName = file.getOriginalFilename();
//			if (!file.getContentType().equals("application/pdf")) {
//				ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),
//						"file[ " + currentUploadFileName + " ] type is not supported ",
//						"file[ " + currentUploadFileName + " ] type is not supported ");
//				return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
//			}

			log.info("store file :" + currentUploadFileName);
			String documentName = documentType.get().getName().concat(".pdf");
			String storedPath = storageService.store(id, documentType.get(), documentName, file);

			RequestDocument document = new RequestDocument();

			document.setName(documentName);
			document.setPath(storedPath);
			document.setDocumentType(documentType.get());
			document.setRequest(request);
//				files.add(file.getOriginalFilename());

			documentRepository.save(document);

			message = currentUploadFileName + " is successfully stored...";
			return ResponseEntity.status(HttpStatus.OK).body(message);

		} catch (ResourceNotFoundException e) {
			throw new ResourceNotFoundException("Request with ID " + id + " is not found");
		} catch (DataIntegrityViolationException ex) {
			log.error(ex.getMessage(), ex);
			message = "تم حفظ ملف من هذا النوع من قبل";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}catch (FileAlreadyExistsException ex) {
			log.error(ex.getMessage(), ex);
			message = "تم حفظ ملف من هذا النوع من قبل";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}catch (Exception e) {
			log.error(e.getMessage(), e);
			message = "  فشل في حفظ الملف " + currentUploadFileName + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}

	@GetMapping("/api/requests/{id}/documents/findByCategory")
//	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_REQUEST_CONTINUE_REGISTERING') OR hasRole('ROLE_EYE_REVEAL_RESULT_REGISTERING') OR hasRole('ROLE_BONES_REVEAL_RESULT_REGISTERING') OR hasRole('ROLE_REQUEST_REVIEWING') ")
	public ResponseEntity<List<RequestDocument>> getRequestDocuments(@PathVariable long id,
			@RequestParam DocumentCategory category, Model model) {

		if (!requestRepository.existsById(id)) {
			throw new ResourceNotFoundException("هذا الطلب غير موجود");
		}
		if(category.equals(DocumentCategory.ALL)) {
			List<RequestDocument> documents = documentRepository.findByRequestId(id);
			return ResponseEntity.ok().body(documents);
		}else {
			List<RequestDocument> documents = documentRepository.findByRequestIdAndDocumentTypeCategory(id, category);
			return ResponseEntity.ok().body(documents);
		}

		
	}

	@GetMapping("/api/requests/{id}/documents/{filename:.+}")
	@ResponseBody
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_REQUEST_CONTINUE_REGISTERING') OR hasRole('ROLE_EYE_REVEAL_RESULT_REGISTERING') OR hasRole('ROLE_BONES_REVEAL_RESULT_REGISTERING') OR hasRole('ROLE_REQUEST_REVIEWING') ")
	public ResponseEntity<Resource> retreiveRequestDocument(@PathVariable long id, @PathVariable String filename) {

		RequestDocument document = documentRepository.findByRequestIdAndName(id, filename);
		if (document == null) {
			throw new ResourceNotFoundException("document[" + filename + "] is not found");
		}
		log.info("getFile , request-ID=" + id + " docuemnt-path=" + document.getPath() + "  filename="
				+ document.getName());
		Resource file = storageService.loadFile(document.getPath(), document.getName());
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}

	@DeleteMapping("/api/requests/{id}/documents/{filename:.+}")
	@ResponseBody
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_REQUEST_REVIEWING') ")
	public void deleteRequestDocument(@PathVariable long id, @PathVariable String filename) {

		RequestDocument document = documentRepository.findByRequestIdAndName(id, filename);
		if (document == null) {
			throw new ResourceNotFoundException("هذا الملف غير موجود");
		}
		int deleted = documentRepository.deleteByRequestIdAndName(id, filename);

		if (deleted != 0) {
			try {
				storageService.deleteFile(document.getPath(), document.getName());
			} catch (IOException e) {
				throw new RuntimeException(e.getMessage());
			}
		}
	}
}
