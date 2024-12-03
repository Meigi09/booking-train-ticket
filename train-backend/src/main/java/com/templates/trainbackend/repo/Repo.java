package com.templates.trainbackend.repo;

import com.templates.trainbackend.models.Payment;
import com.templates.trainbackend.models.Reservation;
import com.templates.trainbackend.models.Train;
import com.templates.trainbackend.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface Repo {


    @Repository
    public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    }




}
