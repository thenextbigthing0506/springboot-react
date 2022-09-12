package com.medable.sample.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.medable.sample.model.Employee;
import com.medable.sample.model.User;

@Repository
public class UserDAOImpl implements UserDAO {
	
	@Autowired
	private EntityManager entityManager;
	
	@Override
	public List<User> get() {
		Session currentSession =  entityManager.unwrap(Session.class);
		Query<User> query = currentSession.createQuery("from User",User.class);
		List<User> list = query.getResultList();
		return list;
	}
	
	
	@Override
	public User findByUserName(String userName) {
		Session currentSession =  entityManager.unwrap(Session.class);
		Query<User> query = currentSession.createQuery("from User where username ='"+userName+"'",User.class);
		User user =null;
		try {
		 user = query.uniqueResult();
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		return user;
	}


	@Override
	public User get(int id) {
		Session currentSession =  entityManager.unwrap(Session.class);
		User employeeObj = currentSession.get(User.class, id);
		return employeeObj;
	}

	@Override
	public void save(User user) {
		Session currentSession =  entityManager.unwrap(Session.class);
		System.out.println("Employeee to add ------------->"+user.toString());
		currentSession.saveOrUpdate(user);
	}

	@Override
	public void delete(int id) {
		Session currentSession =  entityManager.unwrap(Session.class);
		Employee employeeObj = currentSession.get(Employee.class, id);
		currentSession.delete(employeeObj);
	}

}
