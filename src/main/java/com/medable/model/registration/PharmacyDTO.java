package com.medable.model.registration;

import java.io.Serializable;

public class PharmacyDTO implements Serializable {

	private static final long serialVersionUID = 5926468583005150707L;
	
	private Integer id;
	
	private String branch;
	
	private String name;
	
	private long lon;
	
	private long lat;
	
	
	
	//need default constructor for JSON Parsing
	public PharmacyDTO()
	{
		
	}

	
	
	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}



	public long getLon() {
		return lon;
	}



	public void setLon(long lon) {
		this.lon = lon;
	}



	public long getLat() {
		return lat;
	}



	public void setLat(long lat) {
		this.lat = lat;
	}

	
	
	
}