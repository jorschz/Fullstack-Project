package com.backEndSpring.backEndSpring.repository;

import com.backEndSpring.backEndSpring.entity.Inventory;
import jakarta.transaction.Transactional;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    @Query("select count(e) from Inventory e where e.warehouse.id = ?1 ")
    long CountCheckActiveWarehouse(@NonNull Long id);

    @Transactional
    @Modifying
    @Query("update Inventory e set e.product = ?1, e.quantity = ?2 where e.id = ?3")
    void updateProductAndQuantityById(@NonNull String product, @NonNull Integer quantity, @NonNull Long Id);

    @Query("select count(e) from Inventory e where e.animal = ?1 and e.category = ?2")
    Long countByType(String animal, String category, String product);

    @Query("select count(e) from Inventory e where e.animal = ?1 and e.category = ?2")
    long countByAnimalType(String animal, String category);

}
