package com.tvms.dev1.authentication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface TokenRepository extends JpaRepository<Token, Integer> {

    Token getTokenByUserId(int userId);


}