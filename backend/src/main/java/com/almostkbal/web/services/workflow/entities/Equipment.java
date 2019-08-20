package com.almostkbal.web.services.workflow.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="equipment")
public class Equipment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_EQUIPMENT")
	@Column(name = "EQUIPMENT_ID")
	private int id;
	
	@Column(name = "EQUIPMENT_NAME", nullable = false, unique = true)
	private String name;
	
	@Column(name = "EQUIPMENT_DESCRIPTION")
	private String description;
	
//	@Column(name = "DISABILITY_ID")
//	private Disability disability;
	
	public Equipment() {
		
	}

	public Equipment(String name) {
		this.name = name;
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

//	public Disability getDisability() {
//		return disability;
//	}
//
//	public void setDisability(Disability disability) {
//		this.disability = disability;
//	}

}
