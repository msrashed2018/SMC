package com.almostkbal.web.services.workflow.cmd;

import javax.validation.Valid;

import com.almostkbal.web.services.workflow.entities.Citizen;
import com.almostkbal.web.services.workflow.entities.Request;

public class CitizenRequestCommand {

	@Valid
	private Citizen citizen;
	
	@Valid
	private Request request;

	public Citizen getCitizen() {
		return citizen;
	}

	public void setCitizen(Citizen citizen) {
		this.citizen = citizen;
	}

	public Request getRequest() {
		return request;
	}

	public void setRequest(Request request) {
		this.request = request;
	}
	
}
