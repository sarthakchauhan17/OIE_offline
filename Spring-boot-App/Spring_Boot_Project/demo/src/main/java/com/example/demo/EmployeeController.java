 package com.example.demo;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.bean.Employee;
import com.example.demo.bean.EmployeeResponse;
import com.example.demo.repository.EmployeeRepository;

@RestController
@RequestMapping("/")

public class EmployeeController {
	
	@Autowired
	EmployeeRepository employeeRepository;

	
	@GetMapping("/data1")
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
}
	
	// Create a new Note
    @PostMapping("/create")
    /*@CrossOrigin(origins="http://10.135.156.230:4200")*/
    //@CrossOrigin(origins="http://127.0.0.1:4200")
    @CrossOrigin(origins="http://127.0.0.1:4200")
    public Employee createEmployee(@Valid @RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }
    
    @GetMapping("/data")
    //@CrossOrigin(origins="http://10.135.155.230:4200")
    //@CrossOrigin(origins="http://127.0.0.1:4200")
    @CrossOrigin(origins="http://127.0.0.1:4200")
    public ResponseEntity<EmployeeResponse> getEmployeesList(Pageable pageable) {
        Page<Employee> employees = employeeRepository.findAll(new PageRequest(pageable.getPageNumber(), pageable.getPageSize()));
        EmployeeResponse empResp = new EmployeeResponse();
        empResp.setEmployee(employees.getContent());
        empResp.setNumber(employees.getNumber());
        empResp.setNumberOfElements(employees.getNumberOfElements()); 
        empResp.setSize(employees.getSize());
        empResp.setTotalPages(employees.getTotalPages());
        empResp.setTotalElements(employees.getTotalElements());
        if(!employees.hasContent())
            return new ResponseEntity<EmployeeResponse>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<EmployeeResponse>(empResp, HttpStatus.OK);
    } 
    
}
    
    
    
    	
