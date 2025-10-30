package com.kaioherrera.SalutemLanchesBack.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 20)
    private String codigo;
    
    @Column(nullable = false)
    private LocalDateTime dataPedido;
    
    @Column(length = 200)
    private String descricao;
    
    @Column(nullable = false, length = 100)
    private String nomeCliente;
    
    @Column(nullable = false, length = 200)
    private String enderecoCliente;
    
    @Column(nullable = false, length = 20)
    private String telefoneCliente;
    
    @ManyToMany
    @JoinTable(
        name = "pedido_hamburgers",
        joinColumns = @JoinColumn(name = "pedido_id"),
        inverseJoinColumns = @JoinColumn(name = "hamburger_id")
    )
    private List<Hamburger> hamburgers;
    
    @ManyToMany
    @JoinTable(
        name = "pedido_bebidas", 
        joinColumns = @JoinColumn(name = "pedido_id"),
        inverseJoinColumns = @JoinColumn(name = "bebida_id")
    )
    private List<Bebida> bebidas;
    
    @ElementCollection
    @CollectionTable(name = "pedido_observacoes", joinColumns = @JoinColumn(name = "pedido_id"))
    @Column(name = "observacao")
    private List<String> observacoes;
}