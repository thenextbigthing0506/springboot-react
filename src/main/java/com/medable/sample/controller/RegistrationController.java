package com.medable.sample.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.medable.model.registration.PharmacyRegistrationRequest;
import com.medable.sample.service.PharmacyService;

@RestController
@RequestMapping("/api")
public class RegistrationController {

	@Autowired
	private PharmacyService pharmacyService; 
	
//	@RequestMapping(value = "/pharmacy-register", method = RequestMethod.POST)
//	public ResponseEntity<?> createPharmacy(@RequestBody PharmacyRegistrationRequest pharmacyRegistrationRequest) throws Exception {
//		pharmacyService.create(pharmacyRegistrationRequest);
//		return ResponseEntity.ok("Saved User");
//	}
	
	
	@RequestMapping(value = "/add-pharmacy", method = RequestMethod.POST)
	public ResponseEntity<?> addPharmacy(@RequestBody PharmacyRegistrationRequest pharmacyRegistrationRequest) throws Exception {
		pharmacyService.create(pharmacyRegistrationRequest);
		return ResponseEntity.ok("Saved User");
	}
	
	@RequestMapping(value = "/update-pharmacy", method = RequestMethod.PUT)
	public ResponseEntity<?> updatePharmacy(@RequestBody PharmacyRegistrationRequest pharmacyRegistrationRequest) throws Exception {
		pharmacyService.create(pharmacyRegistrationRequest);
		return ResponseEntity.ok("Saved User");
	}
	
	@RequestMapping(value = "/get-list-pharmacies", method = RequestMethod.GET)
	public ResponseEntity<?> getPharmacies() throws Exception {
		return ResponseEntity.ok(pharmacyService.get());
	}
	
	@RequestMapping(value = "/get-pharmacy/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getPharmacy(@PathVariable int id) throws Exception {
		return ResponseEntity.ok(pharmacyService.get(id));
	}
}
