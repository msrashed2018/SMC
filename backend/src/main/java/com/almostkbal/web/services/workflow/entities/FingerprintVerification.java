package com.almostkbal.web.services.workflow.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "FINGERPRINT_VERIFICATION")
public class FingerprintVerification {

	@Id
	private long id;

	
	@OneToOne(fetch = FetchType.LAZY)
	@MapsId
	@JoinColumn(name = "VERIFIER_ID", nullable=false)
	@JsonIgnore
	@OnDelete(action = OnDeleteAction.CASCADE)
	private User verifier;
	
	
	@OneToOne(/*fetch = FetchType.LAZY*/)
	@JoinColumn(name = "FINGERPRINT_ID", nullable=false)
//	@JsonIgnore
	private Fingerprint fingerprint;

	@Column(name = "VERIFIED")
	private Boolean verified;

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

	public User getVerifier() {
		return verifier;
	}

	public void setVerifier(User verifier) {
		this.verifier = verifier;
	}

	public Boolean isVerified() {
		return verified;
	}

	public void setVerified(Boolean verified) {
		this.verified = verified;
	}


}
