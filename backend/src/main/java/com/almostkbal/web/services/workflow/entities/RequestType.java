package com.almostkbal.web.services.workflow.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="request_type")
public class RequestType {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_REQUEST_TYPE")
	@Column(name = "REQUEST_TYPE_ID")
	private int id;
	
	@Column(name = "REQUEST_TYPE_NAME", nullable = false, unique = true)
	@NotNull
	private String name;
	
	@Column(name = "REQUEST_TYPE_DESCRIPTION")
	private String description;
	
	@Column(name = "REQUEST_TYPE_PRICE")
	private int price;
	
	public RequestType() {
		
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

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
}
