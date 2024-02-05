package com.backEndSpring.backEndSpring.Service;

import com.backEndSpring.backEndSpring.dto.AuthenticationResponse;
import com.backEndSpring.backEndSpring.entity.User;
import com.backEndSpring.backEndSpring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User singUp(User user) {
        isFieldsValid(user.getName(), user.getEmail(), user.getPassword(), true);

        return userRepository.save(user);
    }

    public boolean authenticateUser(String email, String password) {
        isFieldsValid(null, email, password, false);

        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return new AuthenticationResponse(true, "Authentication successful").isAuthenticated();
        }

        return new AuthenticationResponse(false, "Invalid credentials").isAuthenticated();
    }

    public User getUserData(String email) {
        User user = userRepository.findByEmail(email);

        return user;
    }

    public void isFieldsValid(String name, String email, String password, boolean isRegistered) {
        if (isRegistered) {
            if (name == null || email == null || password == null) {
                throw new IllegalArgumentException("All fields must be provided");
            }

            if (name.isBlank() || email.isBlank() || password.isBlank()) {
                throw new IllegalArgumentException("All fields must be provided");
            }

            if (name.isEmpty() || email.isEmpty() || password.isEmpty()) {
                throw new IllegalArgumentException("All fields must be provided");
            }

            if (userRepository.existsByEmail(email)) {
                throw new IllegalArgumentException("Email already registered");
            }

        } else {
            if (email == null || password == null) {
                throw new IllegalArgumentException("All fields must be provided");
            }

            if (email.isBlank() || password.isBlank()) {
                throw new IllegalArgumentException("All fields must be provided");
            }

            if (email.isEmpty() || password.isEmpty()) {
                throw new IllegalArgumentException("All fields must be provided");
            }
        }
        if (!email.contains("@") || !email.contains(".")) {
            throw new IllegalArgumentException("Invalid email");
        }
    }
}
