package com.kaioherrera.SalutemLanchesBack.controllers;

import com.kaioherrera.SalutemLanchesBack.entities.Bebida;
import com.kaioherrera.SalutemLanchesBack.repositories.BebidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/bebidas")
public class BebidaController {

    @Autowired
    private BebidaRepository bebidaRepository;

    @GetMapping
    public List<Bebida> listarTodas() {
        return bebidaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bebida> buscarPorId(@PathVariable Long id) {
        return bebidaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Bebida criar(@RequestBody Bebida bebida) {
        return bebidaRepository.save(bebida);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bebida> atualizar(@PathVariable Long id, @RequestBody Bebida bebidaAtualizada) {
        if (!bebidaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        bebidaAtualizada.setId(id);
        return ResponseEntity.ok(bebidaRepository.save(bebidaAtualizada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!bebidaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        bebidaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pesquisa")
    public List<Bebida> pesquisar(@RequestParam String termo) {
        List<Bebida> resultados = new ArrayList<>();
        
        resultados.addAll(bebidaRepository.findByCodigoContainingIgnoreCase(termo));
        resultados.addAll(bebidaRepository.findByDescricaoContainingIgnoreCase(termo));
        
        return resultados.stream().distinct().toList();
    }
}