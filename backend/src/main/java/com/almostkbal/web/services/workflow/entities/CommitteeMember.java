package com.almostkbal.web.services.workflow.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="committee_member")
public class CommitteeMember {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_COMMITTEE_MEMBER")
	@Column(name = "committee_member_id")
	private long id;
	
	@Column(name = "member_name",nullable=false)
	@NotBlank
	private String name;
	
	@Column(name = "member_title", nullable = false)
	private String title;
	
	@Column(name = "member_mobile_no")
	private String mobileNumber;
	
	@Column(name = "member_description")
	private String description;
	
	@OneToOne()
	@JoinColumn(name = "zone_id")
	@NotNull(message = "لابد من ادخال المقر التابع له العضو")
	private Zone zone;
	
	public CommitteeMember() {
		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Zone getZone() {
		return zone;
	}

	public void setZone(Zone zone) {
		this.zone = zone;
	}

	

}
