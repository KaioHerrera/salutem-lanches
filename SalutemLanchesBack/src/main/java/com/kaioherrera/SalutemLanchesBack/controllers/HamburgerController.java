package com.kaioherrera.SalutemLanchesBack.controllers;

import com.kaioherrera.SalutemLanchesBack.entities.Hamburger;
import com.kaioherrera.SalutemLanchesBack.entities.Ingrediente;
import com.kaioherrera.SalutemLanchesBack.repositories.HamburgerRepository;
import com.kaioherrera.SalutemLanchesBack.repositories.IngredienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hamburgers")
public class HamburgerController {

    @Autowired
    private HamburgerRepository hamburgerRepository;

    @Autowired
    private IngredienteRepository ingredienteRepository;

    @GetMapping
    public List<Hamburger> listarTodos() {
        return hamburgerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hamburger> buscarPorId(@PathVariable Long id) {
        return hamburgerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Hamburger> criar(@RequestBody Hamburger hamburger) {
        if (hamburger.getIngredientes() != null) {
            for (Ingrediente ingrediente : hamburger.getIngredientes()) {
                if (!ingredienteRepository.existsById(ingrediente.getId())) {
                    return ResponseEntity.badRequest().build();
                }
            }
        }
        
        return ResponseEntity.ok(hamburgerRepository.save(hamburger));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hamburger> atualizar(@PathVariable Long id, @RequestBody Hamburger hamburgerAtualizado) {
        if (!hamburgerRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        if (hamburgerAtualizado.getIngredientes() != null) {
            for (Ingrediente ingrediente : hamburgerAtualizado.getIngredientes()) {
                if (!ingredienteRepository.existsById(ingrediente.getId())) {
                    return ResponseEntity.badRequest().build();
                }
            }
        }
        
        hamburgerAtualizado.setId(id);
        return ResponseEntity.ok(hamburgerRepository.save(hamburgerAtualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!hamburgerRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        hamburgerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pesquisa")
    public List<Hamburger> pesquisar(@RequestParam String termo) {
        List<Hamburger> resultados = new ArrayList<>();
        resultados.addAll(hamburgerRepository.findByCodigoContainingIgnoreCase(termo));
        resultados.addAll(hamburgerRepository.findByDescricaoContainingIgnoreCase(termo));
        return resultados.stream().distinct().toList();
    }
}