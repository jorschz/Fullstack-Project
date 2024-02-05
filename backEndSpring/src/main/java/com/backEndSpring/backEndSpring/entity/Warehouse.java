package com.backEndSpring.backEndSpring.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//Lombok
@Data
@AllArgsConstructor
@NoArgsConstructor
//JPA
@Entity
@Table(name = "tbl_warehouse")
public class Warehouse {

    //Primary key field
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    private Long id;

    //Attributes
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String animal;

    @Column(nullable = false)
    private Boolean status;
}
