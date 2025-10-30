package com.kaioherrera.SalutemLanchesBack.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Entity
@Table(name = "hamburgers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hamburger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 20)
    private String codigo;
    
    @Column(nullable = false, length = 100)
    private String descricao;
    
    @Column(nullable = false)
    private Double valor;
    
    @ManyToMany
    @JoinTable(
        name = "hamburger_ingredientes",
        joinColumns = @JoinColumn(name = "hamburger_id"),
        inverseJoinColumns = @JoinColumn(name = "ingrediente_id")
    )
    private List<Ingrediente> ingredientes;
}