package com.almostkbal.web.services.workflow.services.impl;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import com.almostkbal.web.services.workflow.entities.DocumentType;
import com.almostkbal.web.services.workflow.services.StorageService;

@Service(value = "storageService")
public class StorageServiceImpl implements StorageService{
	@Value(value = "${documents.directory}")
	private String documentsPath;

	Logger log = LoggerFactory.getLogger(this.getClass().getName());

	@Override
	public String store(long requestId, DocumentType documentType, String fileName, MultipartFile file) throws IOException {
			String storedPath = documentsPath + "/" + String.valueOf(requestId) + "/"
					+ documentType.getCategory().getName();
			log.info("storedPath :" + storedPath);

			File directory = new File(storedPath);
			if (!directory.exists()) {
				directory.mkdirs();
				// If you require it to make the entire directory path including parents,
				// use directory.mkdirs(); here instead.
			}

			Path rootLocation = Paths.get(storedPath);
			Files.copy(file.getInputStream(), rootLocation.resolve(fileName));

			return storedPath;
		
	}
	
	@Override
	public Resource loadFile(String path, String filename) {
		try {
			Path rootLocation = Paths.get(path);
			Path file = rootLocation.resolve(filename);
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new ResourceNotFoundException("غير موجود "+filename+" الملف  ");
			}
		} catch (MalformedURLException e) {
			log.error(e.getMessage(), e);
			throw new RuntimeException("FAIL!");
		}
	}
	
	@Override
	public void deleteFile(String path, String filename) throws IOException {
			Path rootLocation = Paths.get(path);
			Path file = rootLocation.resolve(filename);
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				Files.delete(file);
			} else {
				throw new RuntimeException("file "+filename+" not found");
			}
		
	}
	
	@Override
	public void deleteAll() {
		Path rootLocation = Paths.get(documentsPath);
		FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}

	@Override
	public void init() {
		try {
			Path rootLocation = Paths.get(documentsPath);
			if (!Files.exists(rootLocation)) {
				Files.createDirectory(rootLocation);
			}
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			throw new RuntimeException("Could not initialize storage!");
		}
	}
}
