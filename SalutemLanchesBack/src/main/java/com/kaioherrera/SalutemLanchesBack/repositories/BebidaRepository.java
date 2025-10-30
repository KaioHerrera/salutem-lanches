package com.kaioherrera.SalutemLanchesBack.repositories;

import com.kaioherrera.SalutemLanchesBack.entities.Bebida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BebidaRepository extends JpaRepository<Bebida, Long> {
    
    List<Bebida> findByCodigoContainingIgnoreCase(String codigo);
    List<Bebida> findByDescricaoContainingIgnoreCase(String descricao);

}