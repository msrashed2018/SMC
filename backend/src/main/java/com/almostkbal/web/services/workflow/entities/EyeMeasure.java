package com.almostkbal.web.services.workflow.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="eye_measure")
public class EyeMeasure {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_EYE_MEASURE")
	@Column(name = "MEASURE_ID")
	private int id;
	
	@Column(name = "MEASURE_TITLE", nullable = false, unique = true)
	private String title;
	
	@Column(name = "MEASURE_DESCRIPTION")
	private String description;
	public EyeMeasure() {
		
	}
	public EyeMeasure(String measureTitle, String measureDescription) {
		this.title = measureTitle;
		this.description = measureDescription;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
}

