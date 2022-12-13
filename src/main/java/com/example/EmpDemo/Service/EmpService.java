package com.example.EmpDemo.Service;

import java.text.Collator;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.EmpDemo.model.EmpData;
import com.example.EmpDemo.repo.EmpRepository;

@Service
public class EmpService{
	
	@Autowired
	private EmpRepository repo;
	
	
	//post
	public String saveEmp(EmpData emp) {
		repo.save(emp);
		return "Emp Added";
	}
	
	//postAll
	public String saveAllEmp(List<EmpData> emp) {
		List<EmpData> savedEmp = new ArrayList<>();
		repo.saveAll(emp).forEach(savedEmp::add);
		return "All data saved"+savedEmp.stream().map(u->u.getEmployee_id()).collect(Collectors.toList());
	}	
		

//get
	public List<EmpData> getAllEmp() {
		List<EmpData> employeeList = new ArrayList<EmpData>();
		repo.findAll().forEach(emp1 -> employeeList.add(emp1));
        return employeeList;
	
	}

//delete
	public void delete(int employee_id) {
		repo.deleteById(employee_id);
		
	}

	//update
    public void update(EmpData emp, int employee_id) {
    	repo.deleteById(emp.getEmployee_id());
    	repo.save(emp);
    }

	//get spesific
	public EmpData getEmpById(int employee_id) {
		
		return repo.findById(employee_id).get();
	}

}
