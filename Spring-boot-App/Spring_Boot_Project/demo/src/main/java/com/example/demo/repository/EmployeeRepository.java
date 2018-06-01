package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.bean.Employee;
import com.example.demo.bean.Note;

@Repository
//@CrossOrigin(origins="http://10.135.155.230:4200")
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
