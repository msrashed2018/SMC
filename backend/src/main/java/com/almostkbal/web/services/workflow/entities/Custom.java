package com.almostkbal.web.services.workflow.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="custom")
public class Custom {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_CUSTOM")
	@Column(name = "custom_id")
	private int id;
	
	@Column(name = "custom_name", nullable = false, unique = true)
	private String name;
	
	@Column(name = "custom_description")
	private String description;
	
	public Custom() {
		
	}

	public Custom(String customName, String customDescription) {
		this.name = customName;
		this.description = customDescription;
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
