package com.almostkbal.web.services.workflow.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="occupation")
public class Occupation {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_OCCUPATION")
	@Column(name = "occupation_id")
	private int id;
	
	@Column(name = "occupation_name", nullable = false, unique = true)
	private String name;
	
	@Column(name = "occupation_description")
	private String description;
	
	public Occupation() {
		
	}

	public Occupation(String name) {
		super();
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
	

}
