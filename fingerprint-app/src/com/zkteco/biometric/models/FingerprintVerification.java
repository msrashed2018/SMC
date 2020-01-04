package com.zkteco.biometric.models;

public class FingerprintVerification {

	private long id;
	
	private Fingerprint fingerprint;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Fingerprint getFingerprint() {
		return fingerprint;
	}

	public void setFingerprint(Fingerprint fingerprint) {
		this.fingerprint = fingerprint;
	}



}
