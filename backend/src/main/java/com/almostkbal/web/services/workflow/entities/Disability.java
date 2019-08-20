package com.almostkbal.web.services.workflow.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="disability")
public class Disability {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_DISABILITY")
	@Column(name = "disability_id")
	private int id;
	
	@Column(name = "disability_name", nullable = false, unique = true)
	private String name;
	
	@Column(name = "disability_description")
	private String description;
	
	@OneToOne
	@JoinColumn(name = "equipment_id", nullable = false)
	private Equipment equipment;
	
	@Column(name = "accepted", nullable = false)
	private byte accepted;
	
	public Disability() {
		
	}

	public Disability(String name, String description) {
		super();
		this.name = name;
		this.description = description;
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

	public Equipment getEquipment() {
		return equipment;
	}

	public void setEquipment(Equipment equipment) {
		this.equipment = equipment;
	}

	public byte getAccepted() {
		return accepted;
	}

	public void setAccepted(byte accepted) {
		this.accepted = accepted;
	}

}
