package com.kaioherrera.SalutemLanchesBack.controllers;

import com.kaioherrera.SalutemLanchesBack.entities.Ingrediente;
import com.kaioherrera.SalutemLanchesBack.repositories.IngredienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/ingredientes")
public class IngredienteController {

    @Autowired
    private IngredienteRepository ingredienteRepository;

    @GetMapping
    public List<Ingrediente> listarTodos() {
        return ingredienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingrediente> buscarPorId(@PathVariable Long id) {
        return ingredienteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Ingrediente criar(@RequestBody Ingrediente ingrediente) {
        return ingredienteRepository.save(ingrediente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ingrediente> atualizar(@PathVariable Long id, @RequestBody Ingrediente ingredienteAtualizado) {
        if (!ingredienteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        ingredienteAtualizado.setId(id);
        return ResponseEntity.ok(ingredienteRepository.save(ingredienteAtualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!ingredienteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        ingredienteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pesquisa")
    public List<Ingrediente> pesquisar(@RequestParam String termo) {
        List<Ingrediente> resultados = new ArrayList<>();
        resultados.addAll(ingredienteRepository.findByCodigoContainingIgnoreCase(termo));
        resultados.addAll(ingredienteRepository.findByDescricaoContainingIgnoreCase(termo));
        return resultados.stream().distinct().toList();
    }
}