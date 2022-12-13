package com.example.EmpDemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.EmpDemo.Service.EmpService;
import com.example.EmpDemo.model.EmpData;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class EmpController {

	@Autowired
	private EmpService ser;
	
	@PostMapping("/postEmp")
	public String save(@RequestBody EmpData emp) {
		ser.saveEmp(emp);
		
		return " Emp added";
	}
	
	@PostMapping("/postAllEmp")
	public String saveAll(@RequestBody List<EmpData> emp){
		return ser.saveAllEmp(emp);
	
	}

	
	@GetMapping("/allemployee")
    private List<EmpData> getAllEmp(){
    	return ser.getAllEmp();
    }

	@DeleteMapping("/employee/{employee_id}")
    private void deleteEmp(@PathVariable("employee_id") int employee_id) {
    	ser.delete(employee_id);
    }


	@PutMapping("/employeeUpdate/{employee_id}")
    private EmpData update(@RequestBody EmpData emp) {
		ser.saveEmp(emp);
        return emp;
    }

    
    @GetMapping("/getemployee/{employee_id}")
    private EmpData getEmp(@PathVariable("employee_id") int employee_id) {
    	return ser.getEmpById(employee_id);
    }

}

	

