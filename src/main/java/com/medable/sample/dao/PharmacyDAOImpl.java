package com.medable.sample.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.medable.sample.model.Pharmacy;

@Repository
public class PharmacyDAOImpl  {
	
	@Autowired
	private EntityManager entityManager;
	
	public List<Pharmacy> get() {
		Session currentSession =  entityManager.unwrap(Session.class);
		Query<Pharmacy> query = currentSession.createQuery("from Pharmacy",Pharmacy.class);
		List<Pharmacy> list = query.getResultList();
		return list;
	}

	public Pharmacy get(int id) {
		Session currentSession =  entityManager.unwrap(Session.class);
		Pharmacy pharmacyObj = currentSession.get(Pharmacy.class, id);
		return pharmacyObj;
	}

	public void save(Pharmacy pharmacy) {
		Session currentSession =  entityManager.unwrap(Session.class);
		System.out.println("Pharmacye to add ------------->"+pharmacy.toString());
		currentSession.saveOrUpdate(pharmacy);
	}

	public void delete(int id) {
		Session currentSession =  entityManager.unwrap(Session.class);
		Pharmacy pharmacyObj = currentSession.get(Pharmacy.class, id);
		currentSession.delete(pharmacyObj);
	}

}
