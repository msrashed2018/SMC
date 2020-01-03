package com.almostkbal.web.services.workflow.dto;

import javax.validation.constraints.NotNull;

public class FingerprintTemplate {
	
	
	private String citizenName;
	
	private long citizenNationalId;
	public long getCitizenNationalId() {
		return citizenNationalId;
	}

	public void setCitizenNationalId(long citizenNationalId) {
		this.citizenNationalId = citizenNationalId;
	}

	@NotNull
//	@Size(max = 2048, min = 2048)
	private String fingerprintTemplate;

	public String getFingerprintTemplate() {
		return fingerprintTemplate;
	}

	public void setFingerprintTemplate(String fingerprintTemplate) {
		this.fingerprintTemplate = fingerprintTemplate;
	}

	public String getCitizenName() {
		return citizenName;
	}

	public void setCitizenName(String citizenName) {
		this.citizenName = citizenName;
	}
	
	
}
