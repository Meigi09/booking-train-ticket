package com.templates.trainbackend.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Reservation {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer reservation_id ;


    @OneToOne
    @JoinColumn(name = "train_id")
    private Train train ;
    private Date journey_date;
    private String class_type;
    private String from_place;
    private String destination;
    private String reservation_status;
    private Boolean payment_status ;
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    private String first_name;

    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    private String last_name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    @Column(unique = true)
    private String email;

    private Long phone_number;

}
