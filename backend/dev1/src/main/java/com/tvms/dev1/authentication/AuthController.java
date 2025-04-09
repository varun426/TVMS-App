package com.tvms.dev1.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/auth")
class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user){
        return authService.addUser(user);
    }

    @PostMapping("/login")
    public Token aunthenticate(@RequestParam String username, @RequestParam String password){
        return authService.authenticate(username, password);
    }

    @GetMapping("/rolename")
    public String getRoleName(@RequestParam String param) {
        return new String();
    }
    

}