package com.almostkbal.web.services.workflow.dto;

public class RequestResultDto {

	private long requestId;
	private long nationalId;
	private String citizenName;
	private String address;
	private String result;
	private String disability;
	

	public RequestResultDto(long requestId, long nationalId, String citizenName, String address, String result,String disability) {
		super();
		this.requestId = requestId;
		this.nationalId = nationalId;
		this.citizenName = citizenName;
		this.address = address;
		this.result = result;
		this.disability = disability;
	}
	public long getRequestId() {
		return requestId;
	}
	public void setRequestId(long requestId) {
		this.requestId = requestId;
	}
	public long getNationalId() {
		return nationalId;
	}
	public void setNationalId(long nationalId) {
		this.nationalId = nationalId;
	}
	public String getCitizenName() {
		return citizenName;
	}
	public void setCitizenName(String citizenName) {
		this.citizenName = citizenName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getDisability() {
		return disability;
	}
	public void setDisability(String disability) {
		this.disability = disability;
	}
	
	
	

}
