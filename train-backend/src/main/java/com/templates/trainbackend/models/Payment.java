package com.templates.trainbackend.models;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;



@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Payment {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer payment_id;

    @OneToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation_id ;
    private  String amount_paid;
    private Boolean payment_status ;
    private Date payment_date;

}
