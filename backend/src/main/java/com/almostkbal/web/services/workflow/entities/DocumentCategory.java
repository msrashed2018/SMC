package com.almostkbal.web.services.workflow.entities;

public enum DocumentCategory {
	PERSONAL("personal"), EYE("eye"), BONES("bones"), ALL("all"),OTHER("other"), NA("not applicable");

	DocumentCategory(final String name) {
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
