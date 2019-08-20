package com.almostkbal.web.services.workflow.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="request_payment")
public class RequestPayment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,  generator="SEQ_REQUEST_PAYMENT")
	@Column(name = "request_payment_id")
	private int id;
	
	@Column(name = "receipt_serial_no", nullable = false)
	private String receiptSerialNumber;
	
	@Column(name = "payment_done")
	private byte paymentDone;
	
	@Column(name = "payment_date")
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date paymentDate;
	
	@Column(name = "price")
	private int price;
	
	@OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "request_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
	private Request request;
	
	public RequestPayment() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getReceiptSerialNumber() {
		return receiptSerialNumber;
	}

	public void setReceiptSerialNumber(String receiptSerialNumber) {
		this.receiptSerialNumber = receiptSerialNumber;
	}

	public byte getPaymentDone() {
		return paymentDone;
	}

	public void setPaymentDone(byte paymentDone) {
		this.paymentDone = paymentDone;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public Request getRequest() {
		return request;
	}

	public void setRequest(Request request) {
		this.request = request;
	}
	

}
