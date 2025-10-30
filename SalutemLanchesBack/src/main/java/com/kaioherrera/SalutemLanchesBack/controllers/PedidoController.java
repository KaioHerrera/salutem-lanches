package com.kaioherrera.SalutemLanchesBack.controllers;

import com.kaioherrera.SalutemLanchesBack.entities.*;
import com.kaioherrera.SalutemLanchesBack.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private HamburgerRepository hamburgerRepository;

    @Autowired
    private BebidaRepository bebidaRepository;

    @GetMapping
    public List<Pedido> listarTodos() {
        return pedidoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscarPorId(@PathVariable Long id) {
        return pedidoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pedido> criar(@RequestBody Pedido pedido) {
        pedido.setDataPedido(LocalDateTime.now());
        
        if (pedido.getHamburgers() != null) {
            for (Hamburger hamburger : pedido.getHamburgers()) {
                if (!hamburgerRepository.existsById(hamburger.getId())) {
                    return ResponseEntity.badRequest().build();
                }
            }
        }
        
        if (pedido.getBebidas() != null) {
            for (Bebida bebida : pedido.getBebidas()) {
                if (!bebidaRepository.existsById(bebida.getId())) {
                    return ResponseEntity.badRequest().build();
                }
            }
        }
        
        return ResponseEntity.ok(pedidoRepository.save(pedido));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pedido> atualizar(@PathVariable Long id, @RequestBody Pedido pedidoAtualizado) {
        if (!pedidoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        if (pedidoAtualizado.getHamburgers() != null) {
            for (Hamburger hamburger : pedidoAtualizado.getHamburgers()) {
                if (!hamburgerRepository.existsById(hamburger.getId())) {
                    return ResponseEntity.badRequest().build();
                }
            }
        }
        
        if (pedidoAtualizado.getBebidas() != null) {
            for (Bebida bebida : pedidoAtualizado.getBebidas()) {
                if (!bebidaRepository.existsById(bebida.getId())) {
                    return ResponseEntity.badRequest().build();
                }
            }
        }
        
        pedidoAtualizado.setId(id);
        return ResponseEntity.ok(pedidoRepository.save(pedidoAtualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!pedidoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        pedidoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pesquisa")
    public List<Pedido> pesquisar(@RequestParam String termo) {
        List<Pedido> resultados = new ArrayList<>();
        resultados.addAll(pedidoRepository.findByCodigoContainingIgnoreCase(termo));
        resultados.addAll(pedidoRepository.findByNomeClienteContainingIgnoreCase(termo));
        return resultados.stream().distinct().toList();
    }
}