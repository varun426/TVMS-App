package com.tvms.dev1.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/auth")
class AuthController {

    @Autowired
    private AuthService authService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public User registerUser(@RequestBody User user){
        return authService.addUser(user);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public Token loginUser(@RequestBody User user) {
        return authService.authenticate(user.getUsername(), user.getPassword());
    }

    @GetMapping("/rolename")
    public String getRoleName(@RequestParam String param) {
        return new String();
    }
    

}