package com.almostkbal.web.services.workflow.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="committee")
public class Committee {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_COMMITTEE")
	@Column(name = "committee_id")
	private long id;
	
//	@Column(name = "committee_name",nullable=false)
//	private String name;
	
	@Column(name = "committee_description")
	private String description;
	
	@Column(name = "committee_date", nullable = false)
	@JsonFormat(pattern="yyyy-MM-dd")
//	@FutureOrPresent(message = "هذا التاريخ غير صحيح... اختر تاريخ في المستقبل")
	private Date date;
	
	@Column(name = "committee_type", nullable = false)
	private String type;
	
	@Column(name = "committee_function", nullable = false)
	private String function;
	
	@OneToOne
	@JoinColumn(name = "zone_id", nullable = false)
//	@NotNull(message = "لابد من ادخال المقر التابع لها اللجنة")
	private Zone zone;
	
	@OneToOne
	@JoinColumn(name="member_one_id")
	private CommitteeMember memberOne;

	@OneToOne
	@JoinColumn(name="member_two_id")
	private CommitteeMember memberTwo;
	
	@OneToOne
	@JoinColumn(name="member_three_id")
	private CommitteeMember memberThree;
	
	
	@OneToOne
	@JoinColumn(name="member_four_id")
	private CommitteeMember memberFour;
	
	@OneToOne
	@JoinColumn(name="member_five_id")
	private CommitteeMember memberFive;
	
	@OneToOne
	@JoinColumn(name="member_six_id")
	private CommitteeMember memberSix;
	
	public Committee() {
		
	}


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

//	public String getName() {
//		return name;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFunction() {
		return function;
	}

	public void setFunction(String function) {
		this.function = function;
	}

	public Zone getZone() {
		return zone;
	}

	public void setZone(Zone zone) {
		this.zone = zone;
	}

	public CommitteeMember getMemberOne() {
		return memberOne;
	}

	public void setMemberOne(CommitteeMember memberOne) {
		this.memberOne = memberOne;
	}

	public CommitteeMember getMemberTwo() {
		return memberTwo;
	}

	public void setMemberTwo(CommitteeMember memberTwo) {
		this.memberTwo = memberTwo;
	}

	public CommitteeMember getMemberThree() {
		return memberThree;
	}

	public void setMemberThree(CommitteeMember memberThree) {
		this.memberThree = memberThree;
	}

	public CommitteeMember getMemberFour() {
		return memberFour;
	}

	public void setMemberFour(CommitteeMember memberFour) {
		this.memberFour = memberFour;
	}

	public CommitteeMember getMemberFive() {
		return memberFive;
	}

	public void setMemberFive(CommitteeMember memberFive) {
		this.memberFive = memberFive;
	}

	public CommitteeMember getMemberSix() {
		return memberSix;
	}

	public void setMemberSix(CommitteeMember memberSix) {
		this.memberSix = memberSix;
	}
	
	
}
