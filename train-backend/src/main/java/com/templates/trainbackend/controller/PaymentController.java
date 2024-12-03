package com.templates.trainbackend.controller;



import com.templates.trainbackend.models.Payment;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;


@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @PostMapping
    public Payment processPayment(@RequestBody Payment payment) {
        // Simulate saving to the database
        payment.setPayment_date(new Date());
        payment.setPayment_status(true); // Assuming payment succeeds
        return payment; // Return the saved payment (or status if persisted)
    }
}

