package com.medable.model.registration;

import java.io.Serializable;

public class PharmacyRegistrationRequest implements Serializable {

	private static final long serialVersionUID = 5926468583005150707L;
	
	private UserDTO user;
	
	private PharmacyDTO pharmacy;

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public PharmacyDTO getPharmacy() {
		return pharmacy;
	}

	public void setPharmacy(PharmacyDTO pharmacy) {
		this.pharmacy = pharmacy;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	

	
}