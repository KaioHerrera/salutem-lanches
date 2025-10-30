package com.kaioherrera.SalutemLanchesBack.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "bebidas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bebida {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 20)
    private String codigo;
    
    @Column(nullable = false, length = 100)
    private String descricao;
    
    @Column(nullable = false, name = "preco_unitario")
    private Double precoUnitario;
    
    @Column(nullable = false, name = "possui_acucar")
    private Boolean possuiAcucar;
}