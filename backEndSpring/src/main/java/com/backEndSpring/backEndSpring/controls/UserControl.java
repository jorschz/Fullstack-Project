package com.backEndSpring.backEndSpring.controls;

import com.backEndSpring.backEndSpring.Service.UserService;
import com.backEndSpring.backEndSpring.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserControl {

    private final UserService userService;

    @Autowired
    public UserControl(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/singUp")
    public ResponseEntity<User> signUp(@RequestBody User user) {
        User newUser = userService.singUp(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        boolean loggedIn = userService.authenticateUser(user.getEmail(), user.getPassword());

        if (loggedIn) {
            User loggedInUser = userService.getUserData(user.getEmail());
            return ResponseEntity.ok(loggedInUser);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/login")
    public ResponseEntity checkConnection() {
        return ResponseEntity.ok("{\"message\" : \"ok\"}");
    }

    @GetMapping("/signUp")
    public ResponseEntity checkConnectionRegistration() {
        return ResponseEntity.ok("{\"message\" : \"ok\"}");
    }
}

    