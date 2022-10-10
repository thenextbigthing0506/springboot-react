package com.medable.model.registration;

import java.io.Serializable;

public class UserDTO implements Serializable {

	private static final long serialVersionUID = 5926468583005150707L;
	
	private Integer id;
	
	private String username;
	
	private String password;
	
	//need default constructor for JSON Parsing
	public UserDTO()
	{
		
	}

	public UserDTO(String username, String password) {
		this.setUsername(username);
		this.setPassword(password);
	}

	
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}