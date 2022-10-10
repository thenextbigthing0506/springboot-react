package com.medable.sample.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medable.model.registration.PharmacyRegistrationRequest;
import com.medable.sample.dao.PharmacyDAOImpl;
import com.medable.sample.model.Pharmacy;
import com.medable.sample.model.User;

@Service
public class PharmacyService {

	@Autowired
	private PharmacyDAOImpl pharmacyDAO;

	@Transactional
	public List<Pharmacy> get() {
		return pharmacyDAO.get();
	}

	@Transactional
	public Pharmacy get(int id) {
		Pharmacy pharmacyObj = pharmacyDAO.get(id);
		if (pharmacyObj == null) {
			throw new RuntimeException("Pharmacy not found with id:" + id);
		}
		return pharmacyObj;
	}

	@Transactional
	public void save(Pharmacy pharmacy) {
		pharmacyDAO.save(pharmacy);
	}

	@Transactional
	public void delete(int id) {
		pharmacyDAO.delete(id);
	}

	public void create(PharmacyRegistrationRequest pharmacyRegistrationRequest) {
		if(null!=pharmacyRegistrationRequest
				&&null != pharmacyRegistrationRequest.getUser()) {
		User user=new User();
		user.setId(pharmacyRegistrationRequest.getUser().getId());
		user.setPassword(pharmacyRegistrationRequest.getUser().getPassword());
		user.setUsername(pharmacyRegistrationRequest.getUser().getUsername());
		
		Pharmacy pharmacy=new Pharmacy();
		pharmacy.setUser(user);
		pharmacy.setId(pharmacyRegistrationRequest.getPharmacy().getId());
		pharmacy.setBranch(pharmacyRegistrationRequest.getPharmacy().getBranch());
		pharmacy.setName(pharmacyRegistrationRequest.getPharmacy().getName());
		save(pharmacy);
		}
		
	}

}
