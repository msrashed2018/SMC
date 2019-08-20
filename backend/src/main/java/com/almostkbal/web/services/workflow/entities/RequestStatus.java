package com.almostkbal.web.services.workflow.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="request_status")
public class RequestStatus {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_REQUEST_STATUS")
	@Column(name = "REQUEST_STATUS_ID")
	private int id;
	
	@Column(name = "REQUEST_STATUS_NAME", unique = true, nullable = false)
	private String name;
	
	@Column(name = "REQUEST_STATUS_DESCRIPTION")
	private String description;
	
	public RequestStatus() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
