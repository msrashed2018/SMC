package com.almostkbal.web.services.workflow.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "request_document")
public class RequestDocument {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_REQUEST_DOCUMENT")
	@Column(name = "REQUEST_DOCUMENT_ID")
	private long id;
	
	@Column(name = "name",nullable=false)
	private String name;

	@JoinColumn(name = "document_type_id")
	@OneToOne
	private DocumentType documentType;

	@Column(name = "path", nullable = false)
	private String path;

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "request_id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Request request;
	
	public RequestDocument() {

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

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public DocumentType getDocumentType() {
		return documentType;
	}

	public void setDocumentType(DocumentType documentType) {
		this.documentType = documentType;
	}

	public Request getRequest() {
		return request;
	}

	public void setRequest(Request request) {
		this.request = request;
	}

	
}
