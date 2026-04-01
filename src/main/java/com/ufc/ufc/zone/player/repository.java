package com.ufc.ufc.zone.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface repository extends JpaRepository<Fighter, String> {
    void deleteByFullName(String fullName);

    Optional<Fighter> findByFullName(String fullName);
}
