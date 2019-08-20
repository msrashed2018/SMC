package com.almostkbal.web.services.workflow.services;

import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.almostkbal.web.services.workflow.entities.DocumentType;

public interface StorageService {

	String store(long requestId, DocumentType documentType, String fileName, MultipartFile file) throws IOException;

	Resource loadFile(String path, String filename);

	void deleteFile(String path, String filename) throws IOException;

	void deleteAll();

	void init();
}
