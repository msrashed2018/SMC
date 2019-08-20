package com.almostkbal.web.services.workflow.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="bones_reveal")
public class BonesReveal {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_BONES_REVEAL")
	@Column(name = "bones_reveal_id")
	private long id;	
	
//	@OneToOne
//	@JoinColumn(name = "bones_committee_id")
//	private Committee committee;
	
	@OneToOne
	@JoinColumn(name = "disability_id")
	private Disability disability;
	
//	@OneToOne
//	@JoinColumn(name = "equipment_id")
//	private Equipment equipment;
	
	@Column(name = "result")
	private String result;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "reveal_done")
	private byte revealDone;
	
	
	@OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "request_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
	private Request request;
	
	public BonesReveal() {
		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Disability getDisability() {
		return disability;
	}

	public void setDisability(Disability disability) {
		this.disability = disability;
	}

//	public Equipment getEquipment() {
//		return equipment;
//	}
//
//	public void setEquipment(Equipment equipment) {
//		this.equipment = equipment;
//	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

//	public Committee getCommittee() {
//		return committee;
//	}
//
//	public void setCommittee(Committee committee) {
//		this.committee = committee;
//	}

	public Request getRequest() {
		return request;
	}

	public void setRequest(Request request) {
		this.request = request;
	}

	public byte getRevealDone() {
		return revealDone;
	}

	public void setRevealDone(byte revealDone) {
		this.revealDone = revealDone;
	}
	

}
