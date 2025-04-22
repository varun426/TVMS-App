package com.tvms.dev1.authentication;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
@Service
class AuthService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private TokenRepository tokenRepository;

    private boolean userExists(String username) {
        User user = usersRepository.getUserByUsername(username);
        if(user == null) {
            return false;
        }
        return true;
    }

    public User addUser(User user){
        if(userExists(user.getUsername())){
            throw new RuntimeException("User with name " + user.getUsername() + " already exists.");
        }
        return usersRepository.save(user);
    }

    private String generateToken(String username, String role){
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        String jwt = Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .signWith(key)
                .compact();
        return jwt;
    }

    public Token authenticate(String username, String password) {
        User userFromDb = usersRepository.getUserByUsername(username);
        if(userFromDb == null) {
            throw new RuntimeException("User with name " + username + " is not registered.");
        }
        if(!userFromDb.getPassword().equals(password)) {
            throw new RuntimeException("Invalid Login Credentials.");
        }
    
        Token token = tokenRepository.getTokenByUserId(userFromDb.getUserId());
        
        // Check if token is null
        if (token != null) {
            if (token.getExpireTime().isAfter(LocalDateTime.now())) {
                return token;
            }
        }
    
        // If no valid token, generate a new one
        String jwtToken = generateToken(userFromDb.getUsername(), userFromDb.getRole());
        Token newToken = new Token(jwtToken, userFromDb.getUserId(), LocalDateTime.now(), LocalDateTime.now().plusHours(2));
        return tokenRepository.save(newToken);
    }
}