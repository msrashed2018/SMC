package com.almostkbal.web.services.workflow.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SYSTEM_AUDIT")
public class Audit {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "SEQ_AUDIT")
	@Column(name = "audit_id")
	private long id;

	@Column(name = "action", nullable = false)
	private String action;

	@Column(name = "details")
	private String details;

	@Column(name = "request_id")
	private long requestId;

	@Column(name = "performed_by", nullable = false)
	private String performedBy;

	@Column(name = "timestamp")
	private Date timestamp;
	
	@Column(name = "zone_id")
	private long zoneId;

	public Audit() {
	}

	public Audit(String action, String details, long requestId, String performedBy, long zoneId) {
		super();
		this.action = action;
		this.details = details;
		this.requestId = requestId;
		this.performedBy = performedBy;
		this.zoneId = zoneId;
		this.timestamp = new Date();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public long getRequestId() {
		return requestId;
	}

	public void setRequestId(long requestId) {
		this.requestId = requestId;
	}

	public String getPerformedBy() {
		return performedBy;
	}

	public void setPerformedBy(String performedBy) {
		this.performedBy = performedBy;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	public long getZoneId() {
		return zoneId;
	}

	public void setZoneId(long zoneId) {
		this.zoneId = zoneId;
	}


}
