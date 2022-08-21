package com.medable.sample.dao;

import java.util.List;

import com.medable.sample.model.Employee;

public interface EmployeeDAO {
	
	public List<Employee> get();
	
	public Employee get(int id);
	
	public void save(Employee employee);
	
	public void delete(int id);

}
