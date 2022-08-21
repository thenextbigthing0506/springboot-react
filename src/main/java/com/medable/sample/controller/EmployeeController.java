package com.medable.sample.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medable.sample.model.Employee;
import com.medable.sample.service.EmployeeService;

@RestController
@RequestMapping("/api")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService; 
	
	@GetMapping("/employee")
	List<Employee> get(){
		return employeeService.get();
	}
	
	@GetMapping("/employee/{id}")
	Employee get(@PathVariable int id){
		return employeeService.get(id);
	}
	
	@PostMapping("/employee")
	Employee save(@RequestBody Employee employee) {
		employeeService.save(employee);
		return employee;
	}
	
	@DeleteMapping("/employee/{id}")
	String delete(@PathVariable int id) {
		employeeService.delete(id);
		return "Employee has been deleted with id:"+id;
	}
	
	@PutMapping("/employee")
	Employee update(@RequestBody Employee employee) {
		employeeService.save(employee);
		return employee;
	}
}
