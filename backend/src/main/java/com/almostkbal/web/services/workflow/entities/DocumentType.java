package com.almostkbal.web.services.workflow.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="document_type")
public class DocumentType {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_DOCUMENT_TYPE")
	@Column(name = "document_type_id")
	private long id;
	
	@Column(name = "document_type_name", nullable = false, unique = true)
//	@NotBlank(message = "لابد من ادخال نوع الملف")
	private String name;
	
	@Column(name = "category")
	@Enumerated(EnumType.STRING)
	private DocumentCategory category = DocumentCategory.NA;
	
	@Column(name = "document_type_description")
	private String description;
	
//	@OneToOne(mappedBy="docuemntType", fetch=FetchType.LAZY)
//	private RequestDocument requestDocument;

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

	public DocumentCategory getCategory() {
		return category;
	}

	public void setCategory(DocumentCategory category) {
		this.category = category;
	}
	
}
