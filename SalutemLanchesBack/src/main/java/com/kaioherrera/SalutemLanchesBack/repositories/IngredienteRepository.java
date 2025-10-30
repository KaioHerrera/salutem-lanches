package com.kaioherrera.SalutemLanchesBack.repositories;

import com.kaioherrera.SalutemLanchesBack.entities.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {
    List<Ingrediente> findByCodigoContainingIgnoreCase(String codigo);
    List<Ingrediente> findByDescricaoContainingIgnoreCase(String descricao);
}