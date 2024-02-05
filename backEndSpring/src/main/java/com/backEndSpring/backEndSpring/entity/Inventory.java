package com.backEndSpring.backEndSpring.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

//Lombok
@Data
@AllArgsConstructor
@NoArgsConstructor
//JPA
@Entity
@Table(name = "tbl_inventory")
public class Inventory {

    //Primary key field
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    private Long id;

    //Attributes
    @Column(nullable = false)
    private String product;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private String animal;

    @Column(nullable = false)
    private String category;

    @ManyToOne
    @JoinColumn(name = "warehouse_id", nullable = false)
    @NotNull
    private Warehouse warehouse;
}
