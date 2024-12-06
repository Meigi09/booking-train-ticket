package com.templates.trainbackend.controller;

import com.templates.trainbackend.models.Reservation;
import com.templates.trainbackend.models.Train;
import com.templates.trainbackend.repo.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/trains")
public class TrainController {

    @Autowired
    private TrainRepository trainRepository;
//    @GetMapping
//    public List<Train> getTrains() {
//        return Arrays.asList(
//                new Train(1, 101, "Express Breeze", "Kigali", "Kampala", "First Class, Economy"),
//                new Train(2, 102, "Mountain Liner", "Kigali", "Nairobi", "First Class, Economy"),
//                new Train(3, 103, "Coastal Express", "Kigali", "Dar es Salaam", "First Class, Economy")
//        );
//
//    }
@PostMapping
public Train createTrain(@RequestBody Train train) {
    return trainRepository.save(train);
}
    @GetMapping
    public List<Train> getAllItems(){
        return trainRepository.findAll();
};
}
