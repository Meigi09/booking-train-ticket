package com.templates.trainbackend.service;



import com.templates.trainbackend.models.Users;
import com.templates.trainbackend.repo.Repo;
import com.templates.trainbackend.repo.UsersRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {


    private UsersRepo userRepository;


    public Users registerNewUser(Users user) {
        // Check if username or email already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }



        // Set default role if not specified
        if (user.getRole() == null) {
            user.setRole(Users.UserRole.USER);
        }

        return userRepository.save(user);
    }

    public Users authenticateUser(String username, String password) {
        Optional<Users> userOptional = userRepository.findByUsername(username);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Users user = userOptional.get();


        return user;
    }
}