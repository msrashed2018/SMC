package com.almostkbal.web.services.workflow.entities;

public enum RequestState {

	PENDING_PAYMENT("pending-payment"),
	PENDING_CONTINUE_REGISTERING("pending-continue-registering"),
	CONTINUE_REGISTERING_DONE("continue-registering-done"),
	REVIEWED("reviewed"),
	APPROVED("approved");
    
    RequestState(final String name) {
        this.name = name;
	}
    private final String name;

    @Override
    public String toString() {
        return name;
    }

	public String getName() {
		return name;
	}
    
}
