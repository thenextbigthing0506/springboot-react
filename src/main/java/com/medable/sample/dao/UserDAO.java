package com.medable.sample.dao;

import java.util.List;

import com.medable.sample.model.Employee;
import com.medable.sample.model.User;

public interface UserDAO {
	
	public List<User> get();
	
	public User get(int id);
	
	public void save(User employee);
	
	public void delete(int id);

	public User findByUserName(String userName);

}
