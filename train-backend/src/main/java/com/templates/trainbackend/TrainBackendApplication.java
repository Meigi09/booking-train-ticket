package com.templates.trainbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class TrainBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrainBackendApplication.class, args);
    }

}
