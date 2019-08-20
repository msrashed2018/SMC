package com.almostkbal.web.services.workflow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.almostkbal.web.services.workflow.repositories.RequestRepository;
import com.almostkbal.web.services.workflow.services.impl.StorageServiceImpl;

@SpringBootApplication
public class MoHRestfulApplication implements ApplicationRunner{
	@Autowired
	RequestRepository  requestRepository;
	
	
	@Autowired
	private StorageServiceImpl storageService;
	public static void main(String[] args) {
		SpringApplication.run(MoHRestfulApplication.class, args);
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
//		storageService.deleteAll();
		
		storageService.init();
		
	}
}
