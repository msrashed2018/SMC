package com.almostkbal.web.services.workflow.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="zone")
public class Zone {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_ZONE")
	@Column(name = "zone_id")
	private long id;
	
	@Column(name = "zone_name", nullable = false, unique = true)
	private String name;
	
	@Column(name = "zone_description")
	private String description;
	
	@OneToMany(mappedBy = "zone",fetch=FetchType.LAZY)
	@JsonIgnore
	private List<Governate> governates;
	
	
//	@OneToOne(mappedBy ="zone")
//	@JsonIgnore
//	private CommitteeMember member;
	public Zone() {
		
	}

	public Zone(String name) {
		this.name = name;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Governate> getGovernates() {
		return governates;
	}

	public void setGovernates(List<Governate> governates) {
		this.governates = governates;
	}
//	@PreRemove
//    private void preRemove() {
//        Zone zone = member.getZone();
//        member.setZone(null);
//    }
}
