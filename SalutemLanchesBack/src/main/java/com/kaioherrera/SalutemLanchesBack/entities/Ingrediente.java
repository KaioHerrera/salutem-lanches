package com.kaioherrera.SalutemLanchesBack.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "ingredientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ingrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 20)
    private String codigo;
    
    @Column(nullable = false, length = 100)
    private String descricao;
    
    @Column(nullable = false, name = "preco_unitario")
    private Double precoUnitario;
    
    @Column(nullable = false, name = "eh_adicional")
    private Boolean ehAdicional;
}