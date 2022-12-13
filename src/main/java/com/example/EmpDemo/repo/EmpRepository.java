package com.example.EmpDemo.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.EmpDemo.model.EmpData;

@Repository
public interface EmpRepository extends MongoRepository<EmpData, Integer>{
	




}
