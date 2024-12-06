package com.templates.trainbackend.controller;

import com.templates.trainbackend.models.Reservation;
import com.templates.trainbackend.repo.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @GetMapping
    public List<Reservation> getAllItems(){
        return reservationRepository.findAll();};
}
