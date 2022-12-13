package com.example.EmpDemo.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonFormat;

@Document(collection = "EmpData")
public class EmpData {
	
	 @Id
	 private int employee_id;

//   @Column(name = "employee_name")
   private String employee_name;

//   @Column(name = "employee_status")
   private String employee_status;

//   @Column(name = "designation")
   private String designation;

//   @Column(name = "base_location")
   private String base_location;

//   @Column(name = "company_name")
   private String company_name;

//   @Column(name = "manager_name")
   private String manager_name;

//   @Column(name = "startDate")
   @JsonFormat(pattern="yyyy-MM-dd")
   private Date startDate;

//   @Column(name = "endDate")
   @JsonFormat(pattern="yyyy-MM-dd")
   private Date endDate;
   
   

	public int getEmployee_id() {
		return employee_id;
	}

	public void setEmployee_id(int employee_id) {
		this.employee_id = employee_id;
	}

	public String getEmployee_name() {
		return employee_name;
	}

	public void setEmployee_name(String employee_name) {
		this.employee_name = employee_name;
	}

	public String getEmployee_status() {
		return employee_status;
	}

	public void setEmployee_status(String employee_status) {
		this.employee_status = employee_status;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getBase_location() {
		return base_location;
	}

	public void setBase_location(String base_location) {
		this.base_location = base_location;
	}

	public String getCompany_name() {
		return company_name;
	}

	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}

	public String getManager_name() {
		return manager_name;
	}

	public void setManager_name(String manager_name) {
		this.manager_name = manager_name;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}


	public EmpData() {
		super();
	}

	@Override
	public String toString() {
		return "Employee [employee_id=" + employee_id + ", employee_name=" + employee_name + ", employee_status="
				+ employee_status + ", designation=" + designation + ", base_location=" + base_location
				+ ", company_name=" + company_name + ", manager_name=" + manager_name + ", startDate=" + startDate
				+ ", endDate=" + endDate + "]";
	}

	

}