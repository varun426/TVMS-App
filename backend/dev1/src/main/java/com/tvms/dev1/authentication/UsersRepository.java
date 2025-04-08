package com.tvms.dev1.authentication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface UsersRepository extends JpaRepository<User, Integer> {

    User getUserByUsername(String username);

}