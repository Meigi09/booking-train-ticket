package com.templates.trainbackend.controller;

import com.templates.trainbackend.models.Reservation;
import com.templates.trainbackend.models.Train;
import com.templates.trainbackend.repo.ReservationRepository;
import com.templates.trainbackend.repo.TrainRepository;
import com.templates.trainbackend.service.ReservationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationRepository.save(reservation);
    }
}
