package com.zkteco.biometric.models;

public class FingerprintEnrollment {

	private long id;

	private Citizen citizen;
	
	private String message;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Citizen getCitizen() {
		return citizen;
	}

	public void setCitizen(Citizen citizen) {
		this.citizen = citizen;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "FingerprintEnrollment [id=" + id + ", citizen=" + citizen + "]";
	}
	
	

}
