package com.almostkbal.web.services.workflow.entities;

public enum BonesRevealState {
	PENDING_REVEAL("pending-reveal"), PENDING_REGISTERING("pending-registering"), NA("na"), DONE("done");

    
	BonesRevealState(final String name) {
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
