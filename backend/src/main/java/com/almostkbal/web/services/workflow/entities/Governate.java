package com.almostkbal.web.services.workflow.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="governate")
public class Governate {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_GOVERNATE")
	@Column(name = "governate_id")
	private int id;
	
	@Column(name = "governate_name", nullable = false, unique = true)
	private String name;
	
//	@Column(name = "governate_code", nullable = false, unique = true)
//	private int code;
	
	@OneToMany(mappedBy = "governate",fetch=FetchType.LAZY)
	@JsonIgnore
	private List<City> cities;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "zone_id", nullable = false)
//	@JsonIgnore
	private Zone zone;
	
	public Governate() {
		
	}

	public Governate(String name) {
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

	public List<City> getCities() {
		return cities;
	}

	public void setCities(List<City> cities) {
		this.cities = cities;
	}

//	public int getCode() {
//		return code;
//	}
//
//	public void setCode(int code) {
//		this.code = code;
//	}

	public Zone getZone() {
		return zone;
	}

	public void setZone(Zone zone) {
		this.zone = zone;
	}
	

}
