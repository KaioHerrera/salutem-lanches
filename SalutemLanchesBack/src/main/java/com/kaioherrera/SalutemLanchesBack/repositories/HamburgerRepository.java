package com.kaioherrera.SalutemLanchesBack.repositories;

import com.kaioherrera.SalutemLanchesBack.entities.Hamburger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HamburgerRepository extends JpaRepository<Hamburger, Long> {
    List<Hamburger> findByCodigoContainingIgnoreCase(String codigo);
    List<Hamburger> findByDescricaoContainingIgnoreCase(String descricao);
}