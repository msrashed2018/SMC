package com.almostkbal.web.services.workflow.entities;

import java.sql.Clob;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Past;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="citizen")
public class Citizen {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_CITIZEN")
	@Column(name = "citizen_id")
	private long id;
	
	@Column(name = "national_id",unique=true,nullable=false)
	private long nationalId;
	
	@Column(name = "citizen_name", nullable = false)
	private String name;
	
	@Column(name = "birth_date")
	@JsonFormat(pattern="yyyy-MM-dd")
	@Past
	private Date birthDate;
	
	@Column(name = "address")
	private String address;
	
//	@OneToMany(mappedBy = "citizen",fetch=FetchType.LAZY)
//	@JsonIgnore
//	private List<Request> requests;
	

//	@OneToOne
//	@JoinColumn(name = "gender_id")
//	private Gender gender;
	
	@Column(name = "gender")
	private String gender;
	
	@OneToOne
	@JoinColumn(name = "city_id")
	private City city;

	@OneToOne
	@JoinColumn(name = "governate_id")
	private Governate governate;

	@OneToOne
	@JoinColumn(name = "zone_id")
	private Zone zone;
	
	@OneToOne
	@JoinColumn(name = "occupation_id")
	private Occupation occupation;
	
	@Column(name = "mobile_no")
	private String mobileNumber;
	
	@Column(name = "created_by")
	private String createdBy;
	
	@Column(name = "created_date")
//	@Temporal(TemporalType.DATE)
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date createdDate;
	
	@Column(name = "modified_by")
	private String modifiedBy;
	
	@Column(name = "modified_date")
//	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date modifiedDate;
	
	@Column(name = "fingerprint", columnDefinition="CLOB")
	@Lob
	private String fingerprint;

	public Citizen() {
		
	}

	public Citizen(long nationalId, String name) {
		super();
		this.nationalId = nationalId;
		this.name = name;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getNationalId() {
		return nationalId;
	}

	public void setNationalId(long nationalId) {
		this.nationalId = nationalId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public Governate getGovernate() {
		return governate;
	}

	public void setGovernate(Governate governate) {
		this.governate = governate;
	}

	public Occupation getOccupation() {
		return occupation;
	}

	public void setOccupation(Occupation occupation) {
		this.occupation = occupation;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

//	public List<Request> getRequests() {
//		return requests;
//	}
//
//	public void setRequests(List<Request> requests) {
//		this.requests = requests;
//	}

	public Zone getZone() {
		return zone;
	}

	public void setZone(Zone zone) {
		this.zone = zone;
	}

	public String getFingerprint() {
		return fingerprint;
	}

	public void setFingerprint(String fingerprint) {
		this.fingerprint = fingerprint;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Citizen other = (Citizen) obj;
		if (nationalId == 0) {
			if (other.nationalId != 0)
				return false;
		} else if (nationalId != other.nationalId)
			return false;
		return true;
	}
	
}
