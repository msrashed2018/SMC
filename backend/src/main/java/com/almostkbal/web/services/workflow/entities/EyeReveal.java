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
@Table(name="eye_reveal")
public class EyeReveal {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_EYE_REVEAL")
	@Column(name = "eye_reveal_id")
	private long id;
	
//	@OneToOne
//	@JoinColumn(name = "eye_committee_id")
//	private Committee committee;
	
	@OneToOne
	@JoinColumn(name = "right_measure_id")
	private EyeMeasure rightEye;
	
	@OneToOne
	@JoinColumn(name = "left_measure_id")
	private EyeMeasure leftEye;
	
	@Column(name = "use_glasses")
	private byte useGlasses;
	
	@Column(name = "DISTINGUISH_COLOR")
	private byte distinguishColor;
	
	@Column(name = "squint")
	private byte squint;

	@Column(name = "fieldOfSight")
	private String fieldOfSight;
	
	@Column(name = "result")
	private String result;
	
	@Column(name = "reveal_done")
	private byte revealDone;
	
	@Column(name = "description")
	private String description;
	
	
	@OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "request_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
	private Request request;
	
	public EyeReveal() {
		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	

	public EyeMeasure getRightEye() {
		return rightEye;
	}

	public void setRightEye(EyeMeasure rightEye) {
		this.rightEye = rightEye;
	}

	public EyeMeasure getLeftEye() {
		return leftEye;
	}

	public void setLeftEye(EyeMeasure leftEye) {
		this.leftEye = leftEye;
	}

	public byte getUseGlasses() {
		return useGlasses;
	}

	public void setUseGlasses(byte useGlasses) {
		this.useGlasses = useGlasses;
	}

	public byte getDistinguishColor() {
		return distinguishColor;
	}

	public void setDistinguishColor(byte distinguishColor) {
		this.distinguishColor = distinguishColor;
	}

	public byte getSquint() {
		return squint;
	}

	public void setSquint(byte squint) {
		this.squint = squint;
	}

	public String getFieldOfSight() {
		return fieldOfSight;
	}

	public void setFieldOfSight(String fieldOfSight) {
		this.fieldOfSight = fieldOfSight;
	}

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
