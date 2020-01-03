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
@Table(name = "FINGERPRINT_ENROLLMENT")
public class FingerprintEnrollment {

	@Id
	private long id;

	@OneToOne(fetch = FetchType.LAZY)
	@MapsId
	@JoinColumn(name = "REGISTERAR_ID", nullable=false)
	@JsonIgnore
	@OnDelete(action = OnDeleteAction.CASCADE)
	private User registerar;
	
	@OneToOne(/*fetch = FetchType.LAZY*/)
	@JoinColumn(name = "CITIZEN_ID")
//	@JsonIgnore
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Citizen citizen;



	@Column(name = "ENROLLED")
	private boolean enrolled = false;

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

	public User getRegisterar() {
		return registerar;
	}

	public void setRegisterar(User registerar) {
		this.registerar = registerar;
	}

	public boolean isEnrolled() {
		return enrolled;
	}

	public void setEnrolled(boolean enrolled) {
		this.enrolled = enrolled;
	}
	
}
