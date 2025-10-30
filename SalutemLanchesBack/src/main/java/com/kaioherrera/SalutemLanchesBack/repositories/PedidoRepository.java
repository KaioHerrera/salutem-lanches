package com.kaioherrera.SalutemLanchesBack.repositories;

import com.kaioherrera.SalutemLanchesBack.entities.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByCodigoContainingIgnoreCase(String codigo);
    List<Pedido> findByNomeClienteContainingIgnoreCase(String nomeCliente);
}