package com.project.myRNM.Service;

import com.project.myRNM.Models.Entity.Car;
import com.project.myRNM.Repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public Car createCar(Car car) {
        return carRepository.save(car); // Save the car and auto-generate the id
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public List<Car> saveAllCars(List<Car> cars) {
        return carRepository.saveAll(cars);
    }

}