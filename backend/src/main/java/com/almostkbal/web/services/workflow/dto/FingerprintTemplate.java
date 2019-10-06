package com.almostkbal.web.services.workflow.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class FingerprintTemplate {
	
	@NotNull
//	@Size(max = 2048, min = 2048)
	private String fingerprintTemplate;

	public String getFingerprintTemplate() {
		return fingerprintTemplate;
	}

	public void setFingerprintTemplate(String fingerprintTemplate) {
		this.fingerprintTemplate = fingerprintTemplate;
	}
	
	
}
